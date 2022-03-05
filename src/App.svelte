<script lang="ts">
  import Game from './lib/game/Game.svelte';
  import Header from './lib/Header.svelte';
  import Keyboard from './lib/keyboard/Keyboard.svelte';
  import Modal from './lib/misc/Modal.svelte';
  import Toast from './lib/misc/Toast.svelte';

  import { modal } from './utils/stores';
</script>

<main>
  <Header />
  <Modal show={$modal}>
    <Game />
  </Modal>
  <Keyboard />
  <Toast />
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    background-color: #0e0e0f;
  }
</style>
