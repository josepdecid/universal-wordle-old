import { Key } from 'ts-key-enum';

export const getKeyboardInput = (
  event: KeyboardEvent,
  targetWord: string,
  cellsValues: Array<string>,
  uncover: boolean,
  handleCheckSolution: (word: string) => boolean,
  handleSubmitSolution: (word: string) => void
) => {
  let value = event.key;

  if (value === Key.Enter) {
    if (cellsValues.length === targetWord.length) {
      const inputWord = cellsValues.join('').toUpperCase();
      const validSolution = handleCheckSolution(inputWord);
      if (validSolution) {
        uncover = true;
        handleSubmitSolution(inputWord);
      }
    }
    return;
  }

  if (value === Key.Backspace) {
    if (cellsValues.length > 0) {
      cellsValues.splice(-1);
      cellsValues = [...cellsValues];
    }
    return;
  }

  value = value.toUpperCase();
  if (value.length === 1 && value >= 'A' && value <= 'Z') {
    if (cellsValues.length < targetWord.length) {
      cellsValues = [...cellsValues, value];
    }
  }
};
