import seedrandom from 'seedrandom';
import { getGameMode, getTrainingSeed } from './storage';
import { GameMode } from './types';

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
