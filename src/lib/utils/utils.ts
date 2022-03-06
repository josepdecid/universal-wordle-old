import seedrandom from 'seedrandom';
import { getGameMode, getTrainingSeed } from './storage';
import { InputState as InputState, GameMode } from './types';

export const computeCurrentDayString = (): string => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return currentDate.toString();
};

export const getSeedForWord = (): string => {
  const mode = getGameMode();

  if (mode === GameMode.Daily) {
    return computeCurrentDayString();
  }

  if (mode === GameMode.Training) {
    return getTrainingSeed();
  }

  return undefined;
};

export const getRandomGenerator = () => {
  const seed = getSeedForWord();
  return { randomGenerator: seedrandom(seed), seed };
};

// ?? Set proper type
type Counter<T extends string> = Partial<Record<T, number>>;
export const countElementsInList = <T extends string>(
  list: Array<T>
): Counter<T> => {
  const counter: Counter<T> = {};
  list.forEach((element) => {
    const count = counter[element] || 0;
    counter[element] = count + 1;
  });

  return counter;
};

export const zip = (a: Array<any>, b: Array<any>) =>
  a.map((k: any, i: any) => [k, b[i]]);

export const getInputStates = (
  inputWord: Array<string>,
  targetWord: Array<string>
) => {
  const targetCounts = countElementsInList<string>(targetWord);
  const inputStates: Array<InputState> = [...Array(targetWord.length)].fill(
    InputState.Empty
  );

  for (let i = 0; i < targetWord.length; ++i) {
    const inputLetter = inputWord[i];
    const targetLetter = targetWord[i];

    // The letter is correct and in the correct position
    if (inputLetter === targetLetter) {
      inputStates[i] = InputState.Correct;
      --targetCounts[targetLetter];
    }

    // The letter does not appear in the word
    else if (!targetWord.includes(inputLetter)) {
      inputStates[i] = InputState.Missing;
    }
  }

  // The letter exists but in another position
  for (let i = 0; i < targetWord.length; ++i) {
    const inputLetter = inputWord[i];
    if (
      inputStates[i] === InputState.Empty &&
      targetWord.includes(inputLetter)
    ) {
      if (targetCounts[inputLetter] > 0) {
        inputStates[i] = InputState.Missplaced;
        --targetCounts[inputLetter];
      } else {
        inputStates[i] = InputState.Missing;
      }
    }
  }

  return inputStates;
};
