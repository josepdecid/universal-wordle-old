<script lang="ts">
  export let targetWord: string;
  export let wonGame: boolean;
</script>

<div>
  {#if wonGame}
    Has trobat la paraula amgada: {targetWord}
  {:else}
    No has aconseguit trobar la paraula amgada: {targetWord}
  {/if}
</div>

<style>
  div {
    font-size: 2rem;
    text-align: center;
  }
</style>
