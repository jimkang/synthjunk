var synthDefPropDefs = [
  {
    propName: 'name',
    displayName: 'Name',
    inputType: 'text',
    defaultValue: 'Cool new synth'
  },
  {
    propName: 'modIndex',
    displayName: 'Modulation index',
    inputType: 'number',
    defaultValue: 1
  },
  {
    propName: 'modFreq',
    displayName: 'Modulation frequency',
    inputType: 'number',
    defaultValue: 300
  },
  {
    propName: 'carrierFreq',
    displayName: 'Carrier frequency',
    inputType: 'number',
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
    propName: 'customWaveArrayLength',
    displayName: 'Custom wave array length',
    inputType: 'number',
    defaultValue: 2
  },
  {
    propName: 'customWaveSeed',
    displayName: 'Custom wave seed',
    inputType: 'text',
    defaultValue: 'woom'
  },
  {
    propName: 'envelopePeakRateK',
    displayName: 'Envelope peak rate constant',
    inputType: 'number',
    defaultValue: 0.1
  },
  {
    propName: 'envelopeDecayRateK',
    displayName: 'envelope decay rate constant',
    inputType: 'number',
    defaultValue: 0.2
  },
  {
    propName: 'vibratoRateHz',
    displayName: 'Vibrato rate (Hz)',
    inputType: 'number',
    defaultValue: 5
  },
  {
    propName: 'vibratoPitchVarCents',
    displayName: 'Vibrato pitch variance (cents)',
    inputType: 'number',
    defaultValue: 30
  },
  {
    propName: 'reverbSeconds',
    displayName: 'Reverb length (seconds)',
    inputType: 'number',
    defaultValue: 1
  },
  {
    propName: 'reverbWet',
    displayName: 'Proportion of wet signal in reverb',
    inputType: 'number',
    defaultValue: 0.8
  },
  {
    propName: 'reverbDry',
    displayName: 'Proportion of dry signal in reverb',
    inputType: 'number',
    defaultValue: 0.6
  },
  {
    propName: 'soundDurationSeconds',
    displayName: 'Duration of sound (seconds)',
    inputType: 'number',
    defaultValue: 1
  }
];

export default synthDefPropDefs;
