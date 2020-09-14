var synthDefPropDefs = [
  {
    propName: 'name',
    displayName: 'Name',
    inputType: 'text',
    defaultValue: 'Cool new synth'
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
    defaultValue: 2
  },
  {
    propName: 'carrierCustomWaveSeed',
    displayName: 'Custom wave seed',
    inputType: 'text',
    defaultValue: 'woom'
  },
  {
    propName: 'envelopePeakRateK',
    displayName: 'Envelope peak rate constant',
    inputType: 'number',
    step: 0.1,
    defaultValue: 0.1
  },
  {
    propName: 'envelopeDecayRateK',
    displayName: 'envelope decay rate constant',
    inputType: 'number',
    step: 0.1,
    defaultValue: 0.2
  },
  {
    propName: 'vibratoRateHz',
    displayName: 'Vibrato rate (Hz)',
    inputType: 'number',
    step: 1,
    defaultValue: 5
  },
  {
    propName: 'vibratoPitchVarCents',
    displayName: 'Vibrato pitch variance (cents)',
    inputType: 'number',
    step: 1,
    defaultValue: 30
  },
  {
    propName: 'reverbSeconds',
    displayName: 'Reverb length (seconds)',
    inputType: 'number',
    step: 0.1,
    defaultValue: 1
  },
  {
    propName: 'reverbWet',
    displayName: 'Proportion of wet signal in reverb',
    inputType: 'number',
    step: 0.1,
    defaultValue: 0.8
  },
  {
    propName: 'reverbDry',
    displayName: 'Proportion of dry signal in reverb',
    inputType: 'number',
    step: 0.1,
    defaultValue: 0.6
  },
  {
    propName: 'soundDurationSeconds',
    displayName: 'Duration of sound (seconds)',
    inputType: 'number',
    step: 0.1,
    defaultValue: 1
  }
];

export default synthDefPropDefs;
