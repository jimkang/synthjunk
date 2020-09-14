<script>
export let synthDef;

import synthDefPropDefs from './synth-def-prop-defs';

</script>

<li>
  <ul>
    {#each synthDefPropDefs as propDef }
    <li>
      <label>{propDef.displayName}</label>
      {#if propDef.inputType === 'select'}
        <select bind:value={synthDef[propDef.propName]}>
          {#each propDef.valueOptions as option}
            <option>{option}</option>
          {/each}
        </select>
      {:else if propDef.inputType === 'text'}
        <input type="text" bind:value={synthDef[propDef.propName]}>
      {:else if propDef.inputType === 'number'}
        <input type="number" bind:value={synthDef[propDef.propName]}>
      {:else if propDef.inputType === 'range'}
        <input type="range" bind:value={synthDef[propDef.propName]}>
      {/if}
    </li>
    {/each}
  </ul>
</li>
