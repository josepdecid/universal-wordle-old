<script lang="ts">
  export let targetWord: string;
  export let wonGame: boolean;
</script>

<div>
  <p>
    {#if wonGame}
      Has trobat la paraula amagada:
    {:else}
      No has aconseguit trobar la paraula amgada:
    {/if}
  </p>
  <strong>{targetWord}</strong>
</div>

<style>
  div {
    margin: 2rem 0.2rem 1rem 0.2rem;

    text-align: center;
    font-size: 1.5rem;
    line-height: 2rem;
  }

  strong {
    font-family: 'Poppins';
  }
</style>
