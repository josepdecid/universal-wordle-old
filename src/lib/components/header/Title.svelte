<script lang="ts">
  import { getGameMode } from 'src/lib/utils/storage';
  import { GameMode } from 'src/lib/utils/types';

  const gameMode = getGameMode();
  const gameModeIcon = gameMode === GameMode.Daily ? 'calendar' : 'training';
  const gameModeAlt =
    gameMode === GameMode.Daily ? 'Daily Challenge' : 'Training Mode';
</script>

<div class="title">
  <img src="/universal-wordle/flags/ca.svg" alt="Language" />
  <img src="/universal-wordle/icons/{gameModeIcon}.svg" alt={gameModeAlt} />
  <h1>WORDLE</h1>
</div>

<style type="text/scss">
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 5px;

    h1 {
      color: white;
      text-transform: capitalize;
      text-align: center;
      font-family: 'Poppins';
      font-size: 1.8rem;
    }

    img {
      width: 32px;
      height: 32px;
    }
  }
</style>
