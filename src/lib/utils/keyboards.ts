export type KeyboardLayout = Array<string>;

const QUERTY: KeyboardLayout = ['QWERTYUIOP', 'ASDFGHJKLÑÇ', '⏎ZXCVBNM⌫'];

export const getKeyboardLayout = (): KeyboardLayout => {
  return QUERTY;
};
