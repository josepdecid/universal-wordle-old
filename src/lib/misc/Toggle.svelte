<script lang="ts">
  import type { GameMode } from 'src/utils/types';

  interface ContentProps {
    fileName: string;
    alt: string;
    value: GameMode;
  }

  // Properties ----------
  export let leftContent: ContentProps;
  export let rightContent: ContentProps;
  export let initialValue: boolean;
  export let onChange: (mode: GameMode) => void;
  // ---------------------

  console.log(initialValue);

  const handleChangeValue = (event: any) => {
    const isChecked = event.target.checked;
    onChange(isChecked ? rightContent.value : leftContent.value);
  };
</script>

<div>
  <img
    src="/universal-wordle/icons/{leftContent.fileName}.svg"
    alt={leftContent.alt}
  />
  <label class="switch">
    <input
      type="checkbox"
      checked={initialValue}
      on:change={handleChangeValue}
    />
    <span class="slider round" />
  </label>
  <img
    src="/universal-wordle/icons/{rightContent.fileName}.svg"
    alt={rightContent.alt}
  />
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 5px;
  }

  img {
    width: 28px;
    height: 28px;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 20px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #d69a2a;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #50a940;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #50a940;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(14px);
    -ms-transform: translateX(14px);
    transform: translateX(14px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
