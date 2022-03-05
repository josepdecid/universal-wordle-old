<script lang="ts">
  import { Game } from './lib/components/game';
  import { Keyboard } from './lib/components/keyboardScreen';
  import { Header, Modal, Toast } from './lib/components/misc';

  import { modal } from './lib/utils/stores';
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
