<script lang="ts">
  import {
    getGameMode,
    removeTrainingSeed,
    setGameMode,
  } from 'src/lib/utils/storage';
  import { GameMode } from 'src/lib/utils/types';
  import { getContext } from 'svelte';
  import { _ } from 'svelte-i18n';
  import Language from 'src/lib/components/modals/Language.svelte';

  const { open } = getContext('simple-modal');

  let isMenuOpen = false;
  const setIsOpen = (menuOpen: boolean) => {
    isMenuOpen = menuOpen;
  };

  const gameMode = getGameMode();

  const changeGameMode = (newGameMode: GameMode): void => {
    setGameMode(newGameMode);
    location.reload();
  };

  const resetTrainingWord = () => {
    removeTrainingSeed();
    location.reload();
  };

  const openLanguageSelector = () => {
    setIsOpen(false);

    open(Language);
  };

  const popoverOptions = [
    {
      text: $_('gameModes.daily'),
      onClick: () => changeGameMode(GameMode.Daily),
    },
    {
      text: $_('gameModes.training'),
      onClick: () => changeGameMode(GameMode.Training),
    },
    // {
    //   text: $_('otherLanguages'),
    //   onClick: openLanguageSelector,
    // },
  ];
</script>

<div class="actions">
  {#if gameMode === GameMode.Training}
    <button on:click={resetTrainingWord}>
      <img src="/universal-wordle/icons/refresh.svg" alt={$_('refreshWord')} />
    </button>
  {/if}

  <button on:click={() => setIsOpen(!isMenuOpen)} id="menu-button">
    <img
      src="/universal-wordle/icons/{isMenuOpen ? 'cross' : 'burger'}.svg"
      alt={$_('menuButton')}
    />
  </button>

  {#if isMenuOpen}
    <div class="popover-bg" on:click={() => setIsOpen(false)} />
    <div class="popover">
      <ul>
        {#each popoverOptions as { text, onClick }}
          <li>
            <button on:click={onClick}>
              {text}
            </button>
          </li>
        {/each}
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
