<script lang="ts">
  import Game from './lib/components/game/Game.svelte';
  import Header from './lib/components/header/Header.svelte';
  import Keyboard from './lib/components/keyboard/Keyboard.svelte';
  import { Toast } from './lib/components/misc';
</script>

<main>
  <Header />
  <Game />
  <Toast />
  <Keyboard />
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    background-color: #0e0e0f;
  }
</style>
