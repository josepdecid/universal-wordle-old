import { InputState } from './types';

export const getColorFromState = (state: InputState): string => {
  switch (state) {
    case InputState.Correct:
      return '#50a940';
    case InputState.Missplaced:
      return '#d69a2a';
    case InputState.Missing:
      return '#3a3a3c';
    default:
      return 'transparent';
  }
};
