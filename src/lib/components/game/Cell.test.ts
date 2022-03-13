import '@testing-library/jest-dom';

import Cell from './Cell.svelte';
import { cleanup, render } from '@testing-library/svelte';
import { InputState } from '../../utils/types';
import { getColorFromState } from '../../utils/colors';
import { TRANSITION_DELAY } from '../../utils/constants';

describe('Cell component', () => {
  it('renders the Cell component with the default values', () => {
    const { getByTestId } = render(Cell, { cellIndex: 1 });

    const cell = getByTestId('cell');
    expect(cell).toBeInTheDocument();
    expect(cell).not.toHaveClass('flip-cells');

    const cellFront = getByTestId('cell-front');
    expect(cellFront).not.toHaveClass('cell-cursor');
    expect(cellFront).toHaveTextContent('');

    const cellBack = getByTestId('cell-back');
    expect(cellBack).toHaveTextContent('');
  });

  it('contains the given value twice (front and back)', () => {
    const expectedValue = 'C';
    const { getAllByText } = render(Cell, { value: expectedValue });

    const queryResults = getAllByText(expectedValue);
    expect(queryResults).toHaveLength(2);
    queryResults.forEach((result) => expect(result).toBeInTheDocument());
  });

  it('adds a selected class to the front view shows a cursor', () => {
    const { getByTestId } = render(Cell, { selected: true });

    const cellFront = getByTestId('cell-front');
    expect(cellFront).toHaveClass('cell-cursor');

    const cellBack = getByTestId('cell-back');
    expect(cellBack).not.toHaveClass('cell-cursor');
  });

  it('sets the expected background color to the back view', () => {
    const states = [
      InputState.Correct,
      InputState.Missplaced,
      InputState.Missing,
      InputState.Empty,
    ];

    states.forEach((state) => {
      const expectedBackgroundColor = getColorFromState(state);

      const { getByTestId } = render(Cell, { uncover: true, state });
      const cellBack = getByTestId('cell-back');

      expect(cellBack).toHaveStyle({
        'background-color': expectedBackgroundColor,
      });

      cleanup();
    });
  });

  it('delays the flip animation proporitonal to the cell index', () => {
    const cellIndex = 3;
    const expectedDelay = `${TRANSITION_DELAY * cellIndex}s`;

    const { getByTestId } = render(Cell, { cellIndex });

    const cellInner = getByTestId('cell-inner');
    expect(cellInner).toHaveStyle({ 'transition-delay': expectedDelay });
  });
});
