<script lang="ts">
  import type Cell from "./Cell.svelte";
  import { onMount } from "svelte";
  import { cols, rows, cellSize } from "../services/stores";

  export let cells: Array<Cell>;
  let generation = 0;
  let sum = 0;
  let timer;
  let buttontext = "Start";
  let initializations = {};
  let currentSet;
  let selection: string;

  /**
   * retrieve stored sets from the browser's localStorage
   */
  onMount(() => {
    const stored = localStorage.getItem("svelte-life") || "{}";
    initializations = JSON.parse(stored);
  });
  /**
   * start or stop
   */
  function run() {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
      buttontext = "Start";
    } else {
      timer = setInterval(step, 100);
      buttontext = "Stop";
      currentSet = cells
        .filter((c) => c.cellState() === "alive")
        .map((c) => c.getCoords());
      console.log(currentSet);
    }
  }

  /**
   * single step
   */
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
  /**
   * store current cell set to the browser's localStorage
   */
  function save() {
    const name = prompt("Name für die Startposition");
    if (name) {
      initializations[name] = currentSet;
      localStorage.setItem("svelte-life", JSON.stringify(initializations));
    }
  }
  /**
   * load a new cell set from the selection box.
   */
  function load() {
    generation = 0;
    sum = 0;
    if (selection.startsWith("--")) {
      for (const cell of cells) {
        cell.cellState("not-alive");
      }
    } else {
      const conf = initializations[selection];
      if (conf) {
        for (const cell of conf) {
          const index = cell.x + cell.y * $cols;
          cells[index].cellState("alive");
        }
      }
    }
  }
</script>

<template>
  <div class="bar">
    <div class="display">
      Generation: {generation}; Zahl lebender Zellen: {sum}
    </div>
    <button on:click={step}>Schritt</button>
    <button on:click={run}>{buttontext}</button>
    <button on:click={save}>Speichern</button>
    <select bind:value={selection} on:change={load}>
      <option on:click={load}>--Leeren--</option>
      {#each Object.keys(initializations) as set}
        <option>{set}</option>
      {/each}
    </select>
  </div>
</template>

<style>
  .display {
    margin-right: 10px;
    margin-left: 4px;
    background-color: cornsilk;
    padding: 6px;
    font-family: monospace;
  }
  .bar {
    display: flex;
    flex-direction: row;
  }
  button {
    background-color: lightskyblue;
    color: black;
    padding: 4px;
    margin-right: 4px;
    margin-top: 2px;
  }
  button:hover {
    background-color: blue;
    color: white;
  }
</style>
