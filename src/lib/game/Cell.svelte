<script lang="ts">
  import { getColorFromState } from '../../utils/colors';
  import type { CellStatus } from '../../utils/types';

  // Properties ----------
  export let cellIndex: number;
  export let status: CellStatus;
  export let value: string;
  export let selected: boolean;
  export let uncover: boolean;
  // ---------------------

  $: color = getColorFromState(status);
</script>

<div class={`cell ${uncover ? 'flip-cells' : ''}`}>
  <div
    class={`cell-inner ${uncover ? 'flip-cells' : ''}`}
    style="transition-delay: {0.2 * cellIndex}s;"
  >
    <div class={`cell-front ${selected ? 'selected-cell' : ''}`}>
      {value || ''}
    </div>
    <div class="cell-back" style="background-color: {color}">
      {value || ''}
    </div>
  </div>
</div>

<style>
  .cell {
    width: 56px;
    height: 56px;
  }

  .cell-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .cell-front,
  .cell-back {
    position: absolute;
    width: 100%;
    height: 100%;

    display: inline-flex;
    justify-content: center;
    place-items: center;

    background-color: transparent;
    border-radius: 5px;

    text-transform: capitalize;
    font-family: 'Poppins';
    font-size: 2rem;
    line-height: 2rem;

    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .cell-front {
    color: white;
    border: 2px solid #3a3a3c;
  }

  .cell-back {
    color: white;
    transform: rotateY(180deg);
    border: 2px solid transparent;
  }

  .flip-cells .cell-inner {
    margin-left: 4px;
    transform: rotateY(180deg);
  }

  .selected-cell::after {
    content: '';
    width: 2px;
    height: 28px;
    background: white;
    opacity: 0;
    display: inline-block;
    animation: blink 1s ease-in-out infinite alternate;
  }
</style>
