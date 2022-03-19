<script lang="ts">
  import Game from 'src/lib/components/game/Game.svelte';
  import Header from 'src/lib/components/header/Header.svelte';
  import Keyboard from 'src/lib/components/keyboard/Keyboard.svelte';
  import { Toast } from 'src/lib/components/misc';
  import Modal from 'src/lib/components/misc/modal';
  import { modal } from 'src/lib/utils/stores';

  import { isLoading } from 'svelte-i18n';
</script>

<main>
  {#if $isLoading}
    Please wait...
  {:else}
    <Modal show={$modal}>
      <Header />
      <Game />
    </Modal>
    <Toast />
    <Keyboard />
  {/if}
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    background-color: #0e0e0f;
  }
</style>
