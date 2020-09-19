<script>
export let synthInst;

import synthPropDefs from './synth-prop-defs';
import { playSynth } from './synth';
import ContextKeeper from 'audio-context-singleton';
import ErrorMessage from 'svelte-error-message';
import ep from 'errorback-promise';
import SynthProp from './SynthProp.svelte';
import { nestPropDefs } from './nest-prop-defs';

let error;

var { getNewContext } = ContextKeeper();

async function onPlayClick() {
  var result = await ep(getNewContext);
  if (result.error) {
    error = result.error;
    return;
  }

  var ctx = result.values[0];

  playSynth(Object.assign({ delaySeconds: 0, ctx }, synthInst));
}

function onPropChanged(e) {
  //console.log(e.detail.changedProp);
  // TODO: Rerender just the props that depend on changedProp.
  synthInst = synthInst;
}

</script>

<li>
  <ul>
    {#each nestPropDefs(synthPropDefs) as group}
      <li>
        <h3>{group.displayName}</h3>
        <ul>
          {#each group.dependents as synthPropDefsChild }
            <SynthProp propDef={synthPropDefsChild} synthInst={synthInst} on:propChanged={onPropChanged} />
        {/each}
      </li>
    {/each}
  </ul>
  <button on:click={onPlayClick}>Play</button>
  <ErrorMessage error={error} />
</li>
