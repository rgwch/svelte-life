<script lang="ts">
  import Cell from "./components/Cell.svelte";
  import Controller from "./components/Controller.svelte";
  import { rows, cols } from "./services/stores";

  const cells = new Array<Cell>($rows * $cols);
</script>

<template>
  <Controller {cells} />

  <div style="width:100%;height:100%; background-color:green;position:absolute">
    {#each cells as cell, index}
      <Cell {index} {cells} bind:this={cell} />
    {/each}
  </div>
</template>
