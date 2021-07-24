import { writable } from "svelte/store";
export const cellSize = writable(20);
export const rows = writable(100);
export const cols = writable(100);

