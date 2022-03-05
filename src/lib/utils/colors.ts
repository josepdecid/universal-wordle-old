import type { CellStatus } from './types';

export const getColorFromState = (state: CellStatus): string => {
  switch (state) {
    case 'Correct':
      return '#50a940';
    case 'Missplaced':
      return '#d69a2a';
    case 'Missing':
      return '#3a3a3c';
    default:
      return 'transparent';
  }
};
