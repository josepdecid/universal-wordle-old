export type KeyboardLayout = Array<string>;

const layouts: Record<string, KeyboardLayout> = {
  'en-US': ['QWERTYUIOP', 'ASDFGHJKLÑÇ', '⏎ZXCVBNM⌫'],
  'ca-ES': ['QWERTYUIOP', 'ASDFGHJKLÇ', '⏎ZXCVBNM⌫'],
  'es-ES': ['QWERTYUIOP', 'ASDFGHJKLÑ', '⏎ZXCVBNM⌫'],
};

export const getKeyboardLayout = (langCode = 'en-US'): KeyboardLayout => {
  return layouts[langCode];
};
