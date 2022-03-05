import type { GameMode } from './types';

const NUM_ATTEMPTS = 'Num Attempts';
const DEFAULT_NUM_ATTEMPTS = '6';

const WORD_LENGTH = 'Word Length';
const DEFAULT_WORD_LENGTH = '5';

const GAME_MODE = 'Game Mode';
const DEFAULT_GAME_MODE = 'Daily';

const TRAINING_SEED = 'Training Seed';

export const getNumAttempts = (): number => {
  return parseInt(localStorage.getItem(NUM_ATTEMPTS) || DEFAULT_NUM_ATTEMPTS);
};

export const getWordLength = (): number => {
  return parseInt(localStorage.getItem(WORD_LENGTH) || DEFAULT_WORD_LENGTH);
};

export const getGameMode = (): GameMode => {
  return (localStorage.getItem(GAME_MODE) || DEFAULT_GAME_MODE) as GameMode;
};

export const setGameMode = (mode: GameMode): void => {
  return localStorage.setItem(GAME_MODE, mode);
};

export const getTrainingSeed = () => {
  const numAttempts = getNumAttempts();
  const wordSize = getWordLength();

  let seed = localStorage.getItem(TRAINING_SEED);
  if (seed !== null) {
    const seedParts = seed.split('@');
    if (
      seedParts[0] === numAttempts.toString() &&
      seedParts[1] === wordSize.toString()
    ) {
      return seed;
    }
  }

  const randomSeedPart = Math.random().toString();
  seed = [numAttempts, wordSize, randomSeedPart].join('@');
  localStorage.setItem(TRAINING_SEED, seed);
  return seed;
};

export const removeTrainingSeed = () => {
  localStorage.removeItem(TRAINING_SEED);
};

export const getStoredData = (seed: string) => {
  const storedData = localStorage.getItem(seed);
  return storedData === null ? [] : JSON.parse(storedData);
};
