<script>
export let synthDef;

</script>

<li>
  <ul>
    <li>
      <label>Name</label>
      <input class="name-field" type="text" bind:value={synthDef.name}>
    </li>
    <li>
      <label>Modulation index:</label
      ><input class="index-field" type="number" value="1" />
    </li>
    <li>
      <label>Modulation frequency:</label
      ><input class="mod-freq-field" type="number" value="300" />
    </li>
    <li>
      <label>Carrier frequency:</label
      ><input class="carrier-field" type="number" value="100" />
    </li>
    <li>
      <label>Carrier wave type:</label
      ><select class="wave-type-select">
        <option value="sawtooth" selected>sawtooth</option>
        <option value="sine">sine</option>
        <option value="square">square</option>
        <option value="triangle">triangle</option>
        <option value="custom">custom</option>
      </select>
    </li>
    <li>
      <label>Custom wave array length:</label>
      <input class="array-length-field" type="number" value="2" />
    </li>
    <li>
      <label>Custom wave seed:</label>
      <input class="wave-seed-field" type="text" value="woom" />
    </li>
    <li>
      <label>Envelope peak rate constant:</label
      ><input class="peak-rate-field" type="number" value="0.1" />
    </li>
    <li>
      <label>Envelope decay rate constant:</label
      ><input class="decay-rate-field" type="number" value="0.2" />
    </li>
    <li>
      <label>Vibrato rate frequency (Hz):</label
      ><input class="vibrato-rate-field" type="number" value="5" />
    </li>
    <li>
      <label>Vibrato pitch variance (cents):</label
      ><input class="vibrato-pitch-field" type="number" value="30" />
    </li>
    <li>
      <label>Reverb time (seconds)</label
      ><input class="reverb-time-field" type="number" value="1" />
    </li>
    <li>
      <label>Reverb wet:</label
      ><input class="reverb-wet-field" type="number" value="0.8" />
    </li>
    <li>
      <label>Reverb dry:</label
      ><input class="reverb-dry-field" type="number" value="0.6" />
    </li>
    <li>
      <label>Sound duration (seconds):</label
      ><input class="duration-field" type="number" value="1" />
    </li>
  </ul>
</li>
