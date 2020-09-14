<script>
export let synthDef;

import synthDefPropDefs from './synth-def-prop-defs';
import { playSynth } from './synth';
import ContextKeeper from 'audio-context-singleton';
import ErrorMessage from 'svelte-error-message';
import ep from 'errorback-promise';
import SynthProp from './SynthProp.svelte';

let error;

var { getNewContext } = ContextKeeper();

async function onPlayClick() {
  var result = await ep(getNewContext);
  if (result.error) {
    error = result.error;
    return;
  }

  var ctx = result.values[0];

  playSynth(Object.assign({ delaySeconds: 0, ctx }, synthDef));
}

function onPropChanged(e) {
  //console.log(e.detail.changedProp);
  // TODO: Rerender just the props that depend on changedProp.
  synthDef = synthDef;
}

</script>

<li>
  <ul>
    {#each synthDefPropDefs as propDef }
      <SynthProp propDef={propDef} synthDef={synthDef} on:propChanged={onPropChanged} />
    {/each}
  </ul>
  <button on:click={onPlayClick}>Play</button>
  <ErrorMessage error={error} />
</li>
