<script lang="ts">
  import type Cell from "./Cell.svelte";

  export let cells: Array<Cell>;
  let generation = 0;
  let sum = 0;
  let timer;
  let buttontext = "Start";

  function run() {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
      buttontext = "Start";
    } else {
      timer = setInterval(step, 100);
      buttontext = "stop";
    }
  }

  function step() {
    sum = 0;
    for (const cell of cells) {
      cell.prepareFate();
    }
    for (const cell of cells) {
      if (cell.acceptFate() == "alive") {
        sum += 1;
      }
    }
    generation += 1;
  }
</script>

<template>
  <p>Generation: {generation}; Zahl lebender Zellen: {sum}</p>
  <button on:click={step}>Schritt</button>
  <button on:click={run}>{buttontext}</button>
</template>
