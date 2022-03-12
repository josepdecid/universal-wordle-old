<script lang="ts">
  import Game from './lib/components/game';
  import Header from './lib/components/header';
  import { Keyboard } from './lib/components/keyboardScreen';
  import { Modal, Toast } from './lib/components/misc';

  import { modal } from './lib/utils/stores';
</script>

<main>
  <Header />
  <Modal show={$modal}>
    <Game />
  </Modal>
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
