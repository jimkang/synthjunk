<script>
export let synthDef;

import synthDefPropDefs from './synth-def-prop-defs';

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
      {/if}
    </li>
    {/each}
  </ul>
</li>
