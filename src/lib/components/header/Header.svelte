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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-width: 325px;
    padding: 2rem;
    margin: auto;
  }
</style>
