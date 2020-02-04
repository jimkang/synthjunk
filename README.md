synthjunk
==================

A place to mess around with sounds:

[Web site.](https://jimkang.com/synthjunk/)

A module for creating rudimentary synths:

    npm install --save synthjunk

    var playSynth = require('synthjunk');

    playSynth({
      index: +indexField.value, // Integer
      modFreq: +modFreqField.value, // Float
      carrierType: waveTypeSelect.value, // 'sine', 'square', 'sawtooth', 'triangle', or 'custom'
      carrierFreq: +carrierField.value, // Float
      carrierCustomWaveArrayLength: +arrayLengthField.value, // Integer
      carrierCustomWaveSeed: waveSeedField.value, // String
      envelopePeakRate: +peakRateField.value, // Float
      envelopeDecayRate: +decayRateField.value, // Float
      vibratoRateFreq: +vibratoRateField.value, // Float
      vibratoPitchVariance: vibratoPitchField.value, // Float
      durationSeconds: +durationField.value, // Float
      ctx // AudioContext
    });

See [app.js](app.js) for a more detailed example.

TODO: Types?

License
-------

BSD

Copyright (c) 2020 Jim Kang
