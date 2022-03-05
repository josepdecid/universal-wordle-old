<script lang="ts">
  import {
    getGameMode,
    removeTrainingSeed,
    setGameMode,
  } from '../utils/storage';
  import { GameMode } from '../utils/types';
  import Toggle from './misc/Toggle.svelte';

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

<header>
  <div class="title">
    <img src="/flags/ca.svg" alt="Language" />
    <h1>WORDLE</h1>
  </div>
  <div class="actions">
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
        <img src="/icons/refresh.svg" alt="Daily Challenge" />
      </button>
    {/if}
  </div>
</header>

<style>
  header {
    padding: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .title {
    display: flex;
    flex-direction: row;
    column-gap: 5px;
  }

  h1 {
    color: white;
    text-transform: capitalize;
    text-align: center;
    font-family: 'Poppins';
    font-size: 1.8rem;
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
