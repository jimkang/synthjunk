// Warning! Rerendering after changes props that have a
// dependency only work for checkbox and select props
// that are dependencies right now.
var synthPropDefs = [
  {
    propName: 'name',
    displayName: 'Name',
    inputType: 'text',
    defaultValue: 'Cool new synth'
  },
  {
    propName: 'carrierFreq',
    displayName: 'Carrier frequency',
    inputType: 'number',
    step: 1,
    defaultValue: 100
  },
  {
    propName: 'carrierWaveType',
    displayName: 'Carrier wave type',
    inputType: 'select',
    defaultValue: 'sawtooth',
    valueOptions: ['sawtooth', 'sine', 'square', 'triangle', 'custom']
  },
  {
    propName: 'carrierCustomWaveArrayLength',
    displayName: 'Custom wave array length',
    inputType: 'number',
    step: 1,
    defaultValue: 2,
    conditionProp: 'carrierWaveType',
    conditionPropVal: 'custom'
  },
  {
    propName: 'carrierCustomWaveSeed',
    displayName: 'Custom wave seed',
    inputType: 'text',
    defaultValue: 'woom',
    conditionProp: 'carrierWaveType',
    conditionPropVal: 'custom'
  },
  {
    propName: 'modOn',
    displayName: 'Modulate',
    inputType: 'checkbox',
    defaultValue: true
  },
  {
    propName: 'modIndex',
    displayName: 'Modulation index',
    inputType: 'number',
    step: 1,
    defaultValue: 1,
    conditionProp: 'modOn',
    conditionPropVal: true
  },
  {
    propName: 'modFreq',
    displayName: 'Modulation frequency',
    inputType: 'number',
    step: 1,
    defaultValue: 300,
    conditionProp: 'modOn',
    conditionPropVal: true
  },
  {
    propName: 'envelopeOn',
    displayName: 'Envelope',
    inputType: 'checkbox',
    defaultValue: true
  },
  {
    propName: 'envelopePeakRateK',
    displayName: 'Envelope peak rate constant',
    inputType: 'number',
    step: 0.1,
    defaultValue: 0.1,
    conditionProp: 'envelopeOn',
    conditionPropVal: true
  },
  {
    propName: 'envelopeDecayRateK',
    displayName: 'envelope decay rate constant',
    inputType: 'number',
    step: 0.1,
    defaultValue: 0.2,
    conditionProp: 'envelopeOn',
    conditionPropVal: true
  },
  {
    propName: 'vibratoOn',
    displayName: 'On',
    inputType: 'checkbox',
    defaultValue: true
  },
  {
    propName: 'vibratoRateHz',
    displayName: 'Vibrato rate (Hz)',
    inputType: 'number',
    step: 1,
    defaultValue: 5,
    conditionProp: 'vibratoOn',
    conditionPropVal: true
  },
  {
    propName: 'vibratoPitchVarCents',
    displayName: 'Vibrato pitch variance (cents)',
    inputType: 'number',
    step: 1,
    defaultValue: 30,
    conditionProp: 'vibratoOn',
    conditionPropVal: true
  },
  {
    propName: 'reverbOn',
    displayName: 'On',
    inputType: 'checkbox',
    defaultValue: true
  },
  {
    propName: 'reverbSeconds',
    displayName: 'Reverb length (seconds)',
    inputType: 'number',
    step: 0.1,
    defaultValue: 1,
    conditionProp: 'reverbOn',
    conditionPropVal: true
  },
  {
    propName: 'reverbWet',
    displayName: 'Proportion of wet signal in reverb',
    inputType: 'number',
    step: 0.1,
    defaultValue: 0.8,
    conditionProp: 'reverbOn',
    conditionPropVal: true
  },
  {
    propName: 'reverbDry',
    displayName: 'Proportion of dry signal in reverb',
    inputType: 'number',
    step: 0.1,
    defaultValue: 0.6,
    conditionProp: 'reverbOn',
    conditionPropVal: true
  },
  {
    propName: 'soundDurationSeconds',
    displayName: 'Duration of sound (seconds)',
    inputType: 'number',
    step: 0.1,
    defaultValue: 1
  }
];

export default synthPropDefs;
