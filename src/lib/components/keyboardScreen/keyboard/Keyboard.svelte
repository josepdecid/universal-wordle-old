<script lang="ts">
  import { getKeyboardLayout } from '../../../utils/keyboards';
  import { Key } from '../../../components/keyboardScreen';

  const layout = getKeyboardLayout('ca-ES');
</script>

<div id="keyboard">
  {#each layout as row}
    <div class="keyboard-row">
      {#each row as key (key)}
        <Key {key} />
      {/each}
    </div>
  {/each}
</div>

<style>
  #keyboard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: calc(100% - 2rem);

    row-gap: 5px;
    margin: 2rem 1rem;
  }

  .keyboard-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    column-gap: 5px;
  }
</style>
