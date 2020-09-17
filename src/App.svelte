<script>
import SynthPanel from './SynthPanel.svelte';
import { version } from '../package.json';
import synthPropDefs from './synth-prop-defs';
import RouteState from 'route-state';
import { synthInsts } from './store';
import cloneDeep from 'lodash.clonedeep';
import curry from 'lodash.curry';

let routeState = RouteState({
  followRoute,
  windowObject: window
});

routeState.routeFromHash();

function followRoute({ insts }) {
  if (insts) {
    $synthInsts.insts = insts.map(convertRouteBoolsFromHash);
  }
}

function commitStoreToHash() {
  var insts = $synthInsts.insts.map(convertRouteBoolsForHash);
  routeState.addToRoute({ insts }, false);
}

function onAddSynthClick() {
  synthInsts.set({ insts: $synthInsts.insts.concat(createSynthInst()) });
}

function createSynthInst() {
  var newInst = {};
  synthPropDefs.forEach(curry(addDefault)(newInst));
  return newInst;

  function addDefault(targetInst, propDef) {
    targetInst[propDef.propName] = propDef.defaultValue;
  }
}

function onSaveSynthsClick() {
  commitStoreToHash();
  // TODO: Render url in page body, too.
}

function convertRouteBoolsForHash(origInst) {
  var inst = cloneDeep(origInst);

  for (var key in inst) {
    if (typeof inst[key] === 'boolean') {
      inst[key] = inst[key] ? 'yes' : 'no';
    }
  }

  return inst;
}

function convertRouteBoolsFromHash(hashInst) {
  var inst = cloneDeep(hashInst);

  for (var key in inst) {
    if (inst[key] === 'yes') {
      inst[key] = true;
    } else if (inst[key] === 'no') {
      inst[key] = false;
    }
  }

  return inst;
}

</script>

<main>
  <h1>Synthjunk</h1>

  <ul class="panel-list">
    {#each $synthInsts.insts as synthInst }
      <SynthPanel synthInst={synthInst} />
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
