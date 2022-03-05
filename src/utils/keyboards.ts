export type KeyboardLayout = Array<string>;

const QUERTY: KeyboardLayout = ['QWERTYUIOP', 'ASDFGHJKL', '⏎ZXCVBNM⌫'];

export const getKeyboardLayout = (): KeyboardLayout => {
  return QUERTY;
};
