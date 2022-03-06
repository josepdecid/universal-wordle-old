<script lang="ts">
  import type { InputState } from '../../../utils/types';

  import { getInputStates } from '../../../utils/utils';

  import { Key } from 'ts-key-enum';
  import { Cell } from '../../../components/game';
  import { notifications } from '../../../utils/notifications';
  import {
    storeKeyPressed,
    storeKeyTouched,
    updateStoreLetterState,
  } from '../../../utils/stores';

  // Properties ----------
  export let targetWord: string;

  export let inputWord: string = null;
  export let locked: boolean = false;

  export let checkWordExists: (word: string) => boolean;
  export let handleSubmitSolution: (word: string) => void;
  // ---------------------

  let rowElement;
  let isValid: boolean = true;
  let uncover: boolean = false;
  let cellsValues = [];
  let inputStates: Array<InputState> = [];

  // If the input word is already given (e.g. previously saved state)
  // set the colors and uncover the row.
  if (inputWord) {
    uncover = true;
    cellsValues = inputWord.split('');
    inputStates = getInputStates(cellsValues, targetWord.split(''));
    updateStoreLetterState(cellsValues, inputStates);
  }

  const checkValidSolution = (inputWord: string): boolean => {
    isValid = checkWordExists(inputWord);
    if (!isValid) {
      notifications.warning('Ei! Aquesta paraula no existeix!', 3000);
      return false;
    }

    inputStates = getInputStates(inputWord.split(''), targetWord.split(''));
    updateStoreLetterState(cellsValues, inputStates);

    return true;
  };

  const handleKeyboardInput = (value: string) => {
    if (locked) return;
    storeKeyPressed.update((_) => value);

    if (value === Key.Enter) {
      if (cellsValues.length === targetWord.length) {
        const inputWord = cellsValues.join('').toUpperCase();
        const validSolution = checkValidSolution(inputWord);
        if (validSolution) {
          uncover = true;
          handleSubmitSolution(inputWord);
        }
      }
      return;
    }

    if (value === Key.Backspace) {
      if (cellsValues.length > 0) {
        cellsValues.splice(-1);
        cellsValues = [...cellsValues];
      }
      return;
    }

    value = value.toUpperCase();
    if (
      (value.length === 1 && value >= 'A' && value <= 'Z') ||
      value === 'Ç' ||
      value === 'Ñ'
    ) {
      if (cellsValues.length < targetWord.length) {
        cellsValues = [...cellsValues, value];
      }
    }
  };

  storeKeyTouched.subscribe((value) => {
    if (value !== null) {
      handleKeyboardInput(value);
      storeKeyTouched.update((_) => '');
    }
  });

  document.addEventListener('keydown', (e) => handleKeyboardInput(e.key));
</script>

<div bind:this={rowElement} class={isValid ? '' : 'invalid-word-shake'}>
  {#each Array(targetWord.length) as _, idx (idx)}
    <Cell
      selected={!locked && cellsValues.length === idx}
      cellIndex={idx}
      value={cellsValues[idx]}
      status={inputStates[idx]}
      {uncover}
    />
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    max-width: 325px;
    width: 100%;

    column-gap: 8px;
  }

  .invalid-word-shake {
    animation: shake 0.5s linear;
  }
</style>
