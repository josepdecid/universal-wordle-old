<script lang="ts">
  import { Key } from 'ts-key-enum';
  import { notifications } from '../../../utils/notifications';
  import {
    storeKeyPressed,
    storeKeyTouched,
    updateStoreLetterStatus,
  } from '../../../utils/stores';
  import type { CellStatus } from '../../../utils/types';
  import { Cell } from '../../../components/game';

  // Properties ----------
  export let currentWord: string;
  export let targetWord: string;
  export let locked: boolean;

  export let handleCheckCorrectWord: (word: string) => boolean;
  export let handleSubmitSolution: (word: string) => void;
  // ---------------------

  const getCellStatus = (
    target: string,
    current: string,
    options: string
  ): CellStatus => {
    // The letter is correct and in the correct position
    if (target === current) return 'Correct';
    // The letter exists but in another position
    if (options.includes(current)) return 'TmpMissplaced';
    // The letter does not appear in the word
    return 'Missing';
  };

  const refineCellStatus = (
    cellsValues: Array<string>,
    cellsStatus: Array<CellStatus>
  ) => {
    const availableMissplaces = {};
    for (const letter of cellsValues) {
      if (letter in Object.keys(availableMissplaces))
        ++availableMissplaces[letter];
      else availableMissplaces[letter] = 1;
    }

    for (let i = 0; i < cellsValues.length; ++i) {
      if (cellsStatus[i] === 'Correct') {
        --availableMissplaces[cellsValues[i]];
      }
    }

    for (let i = 0; i < cellsValues.length; ++i) {
      if (cellsStatus[i] === 'TmpMissplaced') {
        if (availableMissplaces[cellsValues[i]] > 0) {
          cellsStatus[i] = 'Missplaced';
          --availableMissplaces[cellsValues[i]];
        } else {
          cellsStatus[i] = 'Missing';
        }
      }

      updateStoreLetterStatus(cellsValues[i], cellsStatus[i]);
    }
  };

  let isValid = true;
  let uncover = false;
  let cellsValues = [];
  let cellsStatus = [];

  if (currentWord) {
    uncover = true;
    cellsValues = currentWord.split('');
    for (let idx = 0; idx < targetWord.length; ++idx) {
      const status = getCellStatus(
        targetWord[idx],
        currentWord[idx],
        targetWord
      );
      cellsStatus.push(status);
    }

    refineCellStatus(cellsValues, cellsStatus);
  }

  const handleCheckSolution = (inputWord: string): boolean => {
    isValid = handleCheckCorrectWord(inputWord);
    if (!isValid) {
      notifications.warning('This word does not exist!', 3000);
      return false;
    }

    for (let idx = 0; idx < targetWord.length; ++idx) {
      const status = getCellStatus(targetWord[idx], inputWord[idx], targetWord);
      cellsStatus = [...cellsStatus, status];
    }

    refineCellStatus(cellsValues, cellsStatus);

    return true;
  };

  const handleKeyboardInput = (value: string) => {
    if (locked) return;
    storeKeyPressed.update((_) => value);

    if (value === Key.Enter) {
      if (cellsValues.length === targetWord.length) {
        const inputWord = cellsValues.join('').toUpperCase();
        const validSolution = handleCheckSolution(inputWord);
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

<div class={isValid ? '' : 'invalid-word-shake'}>
  {#each Array(targetWord.length) as _, idx (idx)}
    <Cell
      selected={!locked && cellsValues.length === idx}
      cellIndex={idx}
      value={cellsValues[idx]}
      status={cellsStatus[idx]}
      {uncover}
    />
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    column-gap: 8px;
  }

  .invalid-word-shake {
    animation: shake 0.5s linear;
  }
</style>
