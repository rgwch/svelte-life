<script lang="ts">
  import Cell from "./components/Cell.svelte";
  import Controller from "./components/Controller.svelte";
  import { rows, cols } from "./services/stores";

  let cells = new Array<Cell>($rows * $cols);
</script>

<template>
  <div class="fixed">
    <Controller {cells} />
  </div>
  <div style="top:40px;width:100%;height:100%;position:fixed; overflow:auto">
    {#each cells as cell, index}
      <Cell {index} {cells} bind:this={cell} />
    {/each}
  </div>
</template>

<style>
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
