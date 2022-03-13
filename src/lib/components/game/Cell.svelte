<script lang="ts">
  import { getColorFromState } from 'src/lib/utils/colors';
  import { InputState } from 'src/lib/utils/types';
  import { TRANSITION_DELAY } from 'src/lib/utils/constants';

  // Properties ----------
  export let value: string;
  export let cellIndex: number;

  export let uncover: boolean = false;
  export let selected: boolean = false;
  export let state: InputState = InputState.Empty;
  // ---------------------

  $: color = getColorFromState(state);
</script>

<div data-testId="cell" class={`cell ${uncover ? 'flip-cells' : ''}`}>
  <div
    data-testId="cell-inner"
    class={`cell-inner ${uncover ? 'flip-cells' : ''}`}
    style="transition-delay: {TRANSITION_DELAY * cellIndex}s;"
  >
    <div
      data-testId="cell-front"
      class={`cell-front ${selected ? 'cell-cursor' : ''}`}
    >
      {value || ''}
    </div>
    <div
      data-testId="cell-back"
      class="cell-back"
      style="background-color: {color}"
    >
      {value || ''}
    </div>
  </div>
</div>

<style>
  .cell {
    flex: 1;
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

  .cell-cursor::after {
    content: '';
    width: 2px;
    height: 28px;
    background: white;
    opacity: 0;
    display: inline-block;
    animation: blink 1s ease-in-out infinite alternate;
  }
</style>
