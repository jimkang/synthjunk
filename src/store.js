import { writable } from 'svelte/store';

var synthInstsContainer = { insts: [] };
export const synthInsts = writable(synthInstsContainer);
