<script lang="ts">
  import type { CellStatus } from '../../utils/types';
  import {
    storeKeyPressed,
    storeKeyTouched,
    storeLetterStatus,
  } from '../../utils/stores';
  import { getColorFromState } from '../../utils/colors';
  import { Key } from 'ts-key-enum';

  export let key: string;

  let letterStatus: CellStatus = null;
  storeLetterStatus.subscribe((value) => {
    letterStatus = value[key];
  });

  let keyPressed: boolean = false;
  storeKeyPressed.subscribe((value) => {
    if (value === Key.Backspace) value = '⌫';
    else if (value === Key.Enter) value = '⏎';
    else value = value?.toUpperCase();

    keyPressed = value === key;

    setTimeout(() => {
      keyPressed = false;
    }, 1000);
  });

  const handleScreenKeyboardInput = () => {
    storeKeyTouched.update((_) => {
      if (key === '⌫') return Key.Backspace;
      if (key === '⏎') return Key.Enter;
      return key;
    });
  };

  $: getKeyBackgroundColor = () => {
    if (letterStatus) return getColorFromState(letterStatus);
    return '#7f7e80';
  };

  $: getKeyPressedColor = () => {
    return keyPressed ? 0.75 : 1;
  };
</script>

<button
  on:click={handleScreenKeyboardInput}
  class="keyboard-key"
  style="
    background-color: {getKeyBackgroundColor()};
    filter: brightness({getKeyPressedColor()});
  "
>
  {key}
</button>

<style>
  .keyboard-key {
    min-width: 30px;
    height: 50px;

    border: none;
    cursor: pointer;
    border-radius: 5px;

    background-color: #7c7e80;
    color: white;

    text-transform: capitalize;
    font-family: 'Poppins';
    font-size: 1rem;
    line-height: 2rem;
  }

  .keyboard-key:hover {
    filter: brightness(0.75) !important;
  }
</style>
