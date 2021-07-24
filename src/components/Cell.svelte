<script lang="ts">
  import { cellSize, cols, rows } from "../services/stores";
  export let index: number;
  export let cells;

  export function cellState(newstate?: string) {
    if (newstate) {
      state = newstate;
    }
    return state;
  }
  export function getCoords() {
    return coords(index);
  }
  export function prepareFate() {
    let { x, y } = coords(index);
    const sum =
      add(x - 1, y - 1) +
      add(x, y - 1) +
      add(x + 1, y - 1) +
      add(x - 1, y) +
      add(x + 1, y) +
      add(x - 1, y + 1) +
      add(x, y + 1) +
      add(x + 1, y + 1);

    if (state === "not-alive") {
      if (sum === 3) {
        state = "emerging";
      }
    } else if (state === "alive") {
      if (sum < 2 || sum > 3) {
        state = "dying";
      }
    }
  }
  export function acceptFate(): string {
    if (state === "dying") {
      state = "not-alive";
    }
    if (state === "emerging") {
      state = "alive";
    }
    return state;
  }

  let state = "not-alive";
  function clicked() {
    state = state === "alive" ? "not-alive" : "alive";
  }

  function add(x: number, y: number) {
    if (x < 0) {
      x = $cols - 1;
    }
    if (x >= $cols) {
      x = 0;
    }
    if (y < 0) {
      y = $rows - 1;
    }
    if (y >= $rows) {
      y = 0;
    }
    const i = y * $cols + x;
    const s = cells[i].cellState();
    if (s === "alive" || s === "dying") {
      return 1;
    } else {
      return 0;
    }
  }

  function coords(index: number) {
    const x = index % $cols;
    const y = Math.floor(index / $cols);
    return { x, y };
  }
</script>

<div
  class="{state} cell"
  style="top:{coords(index).y * $cellSize}px;left:{coords(index).x *
    $cellSize}px;width:{$cellSize}px;height:{$cellSize}px;position:absolute;"
  on:click={clicked}
/>

<style>
  .emerging {
    background-color: lightgreen;
  }
  .dying {
    background-color: lightslategray;
  }
  .not-alive {
    background-color: lightgray;
  }
  .alive {
    background-color: blue;
  }
  .cell {
    border: 1px solid white;
  }
</style>
