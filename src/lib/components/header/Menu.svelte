<script lang="ts">
  import {
    getGameMode,
    removeTrainingSeed,
    setGameMode,
  } from '../../utils/storage';
  import { GameMode } from '../../utils/types';

  const gameMode = getGameMode();

  const handleChangeGameMode = (newGameMode: GameMode): void => {
    setGameMode(newGameMode);
    location.reload();
  };

  const handleResetWordle = () => {
    removeTrainingSeed();
    location.reload();
  };

  let isOpen = false;
  const handleToggleMenu = () => {
    isOpen = !isOpen;
  };
</script>

<div class="actions">
  {#if gameMode === GameMode.Training}
    <button on:click={handleResetWordle}>
      <img src="/universal-wordle/icons/refresh.svg" alt="Refresh Wordle" />
    </button>
  {/if}

  <button on:click={handleToggleMenu} id="menu-button">
    <img
      src="/universal-wordle/icons/{isOpen ? 'cross' : 'burger'}.svg"
      alt="Menu button"
    />
  </button>

  {#if isOpen}
    <div class="popover-bg" on:click={() => handleToggleMenu()} />
    <div class="popover">
      <ul>
        <li>
          <button on:click={() => handleChangeGameMode(GameMode.Daily)}>
            Repte diari
          </button>
        </li>
        <li>
          <button on:click={() => handleChangeGameMode(GameMode.Training)}>
            Pràctica
          </button>
        </li>
      </ul>
    </div>
  {/if}
</div>

<style type="text/scss">
  .actions {
    display: flex;
    justify-content: center;
    column-gap: 10px;
    margin-left: 20px;

    button {
      width: 42px;
      height: 42px;
      padding: 10px;
      border-radius: 100%;
      background-color: white;
      border: none;
      cursor: pointer;

      &:hover {
        transition-duration: 0.2s;
        opacity: 0.5;
      }
    }

    #menu-button {
      z-index: 20;
    }

    .popover-bg {
      position: absolute;
      backdrop-filter: blur(5px);
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1;
    }

    .popover {
      top: 22px;
      width: fit-content;
      right: calc(50vw - 165px);
      position: absolute;
      z-index: 10;

      ul {
        background-color: white;
        border-radius: 5px;
        margin-top: 8px;
        padding-top: 48px;

        li {
          font-family: 'Poppins';
          font-size: 1rem;
          line-height: 3rem;
          padding-left: 15px;
          padding-right: 15px;
          border-top: 1px solid #ccc;

          button {
            width: 100%;
            text-align: left;
            font-size: large;
          }
        }
      }
    }
  }
</style>
