import { writable } from 'svelte/store';

var synthDefsContainer = { defs: [] };
export const synthDefs = writable(synthDefsContainer);
