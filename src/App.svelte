<script>
import SynthPanel from './SynthPanel.svelte';
import { version } from '../package.json';
import synthDefDefaults from './synth-def-defaults';
import RouteState from 'route-state';
import { synthDefs } from './store';

let routeState = RouteState({
  followRoute,
  windowObject: window
});

routeState.routeFromHash();

function followRoute({ defs }) {
  if (defs) {
    $synthDefs.defs = defs;
  }
}

function commitStoreToHash() {
  routeState.addToRoute({ defs: $synthDefs.defs }, false);
}

function onAddSynthClick() {
  synthDefs.set({ defs: $synthDefs.defs.concat(createSynthDef()) });
}

function createSynthDef() {
  return Object.assign({}, synthDefDefaults);
}

function onSaveSynthsClick() {
  commitStoreToHash();
  // TODO: Render url in page body, too.
}

</script>

<main>
  <h1>Synthjunk</h1>

  <ul class="panel-list">
    {#each $synthDefs.defs as synthDef }
      <SynthPanel synthDef={synthDef} />
    {/each}
  </ul>

  <button id="add-synth-button" on:click={onAddSynthClick}>Add synth</button>

  <button id="save-synths-button" on:click={onSaveSynthsClick}>Save synths to URL</button>

  <div id="version-info">{version}</div>
</main>

<footer>
</footer>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

  footer {
    text-align: center;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
