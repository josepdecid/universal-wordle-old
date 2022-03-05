import { writable } from 'svelte/store';
import type { CellStatus } from './types';

export const modal = writable(null);
export const windowStyle = writable({});

export const storeLetterStatus = writable<Record<string, CellStatus>>({});
export const updateStoreLetterStatus = (
  inputLetter: string,
  status: CellStatus
): void => {
  storeLetterStatus.update((x) => {
    if (x[inputLetter] === 'Correct') return x;
    if (x[inputLetter] === 'Missplaced' && status === 'Missing') return x;
    return { ...x, [inputLetter]: status };
  });
};

export const storeKeyPressed = writable<string>(null);
export const storeKeyTouched = writable<string>(null);
