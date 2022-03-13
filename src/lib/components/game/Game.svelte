<script lang="ts">
  import { ConfettiExplosion } from 'svelte-confetti-explosion';
  import dictionary from 'src/assets/dictionaries/ca-ES/dictionary.json';
  import {
    getNumAttempts,
    getStoredData,
    getWordLength,
  } from 'src/lib/utils/storage';
  import { getRandomGenerator } from 'src/lib/utils/utils';
  import Row from 'src/lib/components/game/Row.svelte';
  import Popup from 'src/lib/components/misc/popup/Popup.svelte';
  import { getContext } from 'svelte';

  // The size of the board is fetche from the stored settings.
  const numAttempts = getNumAttempts();
  const wordSize = getWordLength();

  // We only need the words that have the same exact size as the target WORD SIZE.
  const candidateWords = dictionary.filter((word) => word.length === wordSize);

  // We obtain a different seed depending on the GAME MODE.
  // Therefore, the TARGET WORD remains the same even if you refresh the page.
  const { randomGenerator, seed } = getRandomGenerator();
  const randomWordIndex = Math.floor(randomGenerator() * candidateWords.length);
  const targetWord = candidateWords[randomWordIndex];

  // The game may be an already started one so we check if there is saved data for the seed.
  const savedData = getStoredData(seed);

  // Game Variables
  let wonGame = savedData[savedData.length - 1] === targetWord;
  let currentAttemptIdx = wonGame ? null : savedData.length;

  const checkWordExistsInDictionary = (word: string): boolean =>
    candidateWords.includes(word);

  const goToNextAttempt = (inputWord: string) => {
    ++currentAttemptIdx;
    savedData.push(inputWord);
    localStorage.setItem(seed, JSON.stringify(savedData));

    if (savedData[savedData.length - 1] === targetWord) {
      wonGame = true;
      currentAttemptIdx = null;
      return;
    }
  };

  const { open } = getContext('simple-modal');
  $: if (currentAttemptIdx >= numAttempts || currentAttemptIdx === null) {
    open(Popup, { wonGame, targetWord });
  }
</script>

<div>
  {#each { length: numAttempts } as _, idx}
    <Row
      {targetWord}
      inputWord={savedData[idx]}
      locked={idx !== currentAttemptIdx}
      checkWordExists={checkWordExistsInDictionary}
      handleSubmitSolution={goToNextAttempt}
    />
  {/each}

  {#if wonGame}
    <ConfettiExplosion --x="0" --y="-50vh" particleCount={50} duration={5000} />
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: calc(100% - 2rem);

    row-gap: 8px;
    margin: 0 1rem;
  }
</style>
