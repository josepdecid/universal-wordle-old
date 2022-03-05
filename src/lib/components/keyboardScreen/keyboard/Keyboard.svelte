<script lang="ts">
  import { getKeyboardLayout } from '../../../utils/keyboards';
  import { Key } from '../../../components/keyboardScreen';

  const layout = getKeyboardLayout();
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
    align-items: center;
    row-gap: 5px;
    margin-top: 2rem;
  }

  .keyboard-row {
    display: flex;
    flex-direction: row;
    column-gap: 5px;
  }
</style>
