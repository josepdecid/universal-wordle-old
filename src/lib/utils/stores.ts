import { writable } from 'svelte/store';
import type { InputState } from './types';
import { zip } from './utils';

export const modal = writable(null);
export const windowStyle = writable({});

export const storeLetterStatus = writable<Record<string, InputState>>({});
export const updateStoreLetterState = (
  word: Array<string>,
  states: Array<InputState>
): void => {
  for (const [letter, state] of zip(word, states)) {
    storeLetterStatus.update((keyboardState) => {
      if (keyboardState[letter] && keyboardState[letter] >= state) {
        return keyboardState;
      }

      return { ...keyboardState, [letter]: state };
    });
  }
};

export const storeKeyPressed = writable<string>(null);
export const storeKeyTouched = writable<string>(null);
