<script>
export let synthDef;

import synthDefPropDefs from './synth-def-prop-defs';
import { playSynth } from './synth';
import ContextKeeper from 'audio-context-singleton';
import ErrorMessage from 'svelte-error-message';
import ep from 'errorback-promise';

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

</script>

<li>
  <ul>
    {#each synthDefPropDefs as propDef }
    <li>
      <label for="{propDef.propName}-input">{propDef.displayName}</label>
      {#if propDef.inputType === 'select'}
        <select id="{propDef.propName}-input" bind:value={synthDef[propDef.propName]}>
          {#each propDef.valueOptions as option}
            <option>{option}</option>
          {/each}
        </select>
      {:else if propDef.inputType === 'text'}
        <input type="text" id="{propDef.propName}-input" bind:value={synthDef[propDef.propName]}>
      {:else if propDef.inputType === 'number'}
        <input type="number" id="{propDef.propName}-input" step={propDef.step} bind:value={synthDef[propDef.propName]}>
      {:else if propDef.inputType === 'range'}
        <input type="range" id="{propDef.propName}-input" bind:value={synthDef[propDef.propName]}>
      {:else if propDef.inputType === 'checkbox'}
        <input type="checkbox" id="{propDef.propName}-input" bind:checked={synthDef[propDef.propName]}>
      {/if}
    </li>
    {/each}
  </ul>
  <button on:click={onPlayClick}>Play</button>
  <ErrorMessage error={error} />
</li>
