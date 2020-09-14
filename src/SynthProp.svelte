<script>
export let propDef;
export let synthDef;

import { createEventDispatcher } from 'svelte';

$: enabled = !propDef.conditionProp || synthDef[propDef.conditionProp] === propDef.conditionPropVal;

var dispatch = createEventDispatcher();

function onPropControlChange() {
  dispatch('propChanged', { changedProp: propDef });
}

</script>
{#if enabled}
    <li>
      <label for="{propDef.propName}-input">{propDef.displayName}</label>
      {#if propDef.inputType === 'select'}
        <select id="{propDef.propName}-input" bind:value={synthDef[propDef.propName]} on:change={onPropControlChange}>
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
        <input type="checkbox" id="{propDef.propName}-input" bind:checked={synthDef[propDef.propName]} on:change={onPropControlChange}>
      {/if}
    </li>
{/if}
