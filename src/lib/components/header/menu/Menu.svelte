<script lang="ts">
  import {
    getGameMode,
    removeTrainingSeed,
    setGameMode,
  } from '../../../utils/storage';
  import type { GameMode } from '../../../utils/types';

  const gameMode = getGameMode();

  const handleChangeGameMode = (newGameMode: GameMode): void => {
    setGameMode(newGameMode);
    location.reload();
  };

  const handleResetWordle = () => {
    removeTrainingSeed();
    location.reload();
  };
</script>

<button>
  <img src="/universal-wordle/icons/menu.svg" alt="Menu button" />
</button>

<!-- <div class="actions">
  <Toggle
    leftContent={{
      fileName: 'daily',
      alt: 'Daily Challenge',
      value: GameMode.Daily,
    }}
    rightContent={{
      fileName: 'training',
      alt: 'Training Mode',
      value: GameMode.Training,
    }}
    initialValue={gameMode === GameMode.Training}
    onChange={(mode) => handleChangeGameMode(mode)}
  />

  {#if gameMode === GameMode.Training}
    <button on:click={handleResetWordle}>
      <img src="/universal-wordle/icons/refresh.svg" alt="Daily Challenge" />
    </button>
  {/if}
</div> -->
<style>
  button {
    border-radius: 100%;
  }

  .actions {
    display: flex;
    justify-content: center;
    column-gap: 10px;
    margin-left: 20px;
  }

  .actions > button {
    display: flex;
    align-items: center;
    width: 28px;
    height: 28px;
    padding: 5px;
    border-radius: 100%;
    background-color: transparent;
    cursor: pointer;
    border: none;
    place-content: center;
  }
</style>
