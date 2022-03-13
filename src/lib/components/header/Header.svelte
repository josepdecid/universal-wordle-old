<script lang="ts">
  import Title from './Title.svelte';
  import Menu from './Menu.svelte';
</script>

<header>
  <Title />
  <Menu />
</header>

<style>
  header {
    padding: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
