var synth = require('./synth');
var handleError = require('handle-error-web');
var oknok = require('oknok');
var ContextKeeper = require('audio-context-singleton');

var { getCurrentContext } = ContextKeeper();

document.getElementById('start-button').addEventListener('click', start);
var indexField = document.getElementById('index-field');
var modFreqField = document.getElementById('mod-freq-field');
var carrierField = document.getElementById('carrier-field');
var waveTypeSelect = document.getElementById('wave-type-select');
var peakRateField = document.getElementById('peak-rate-field');
var decayRateField = document.getElementById('decay-rate-field');
var vibratoRateField = document.getElementById('vibrato-rate-field');
var vibratoPitchField = document.getElementById('vibrato-pitch-field');

function start() {
  getCurrentContext(oknok({ ok: useContext, nok: handleError }));

  function useContext(ctx) {
    var play = synth({
      ctx,
      index: indexField.value,
      modFreq: modFreqField.value,
      carrierType: waveTypeSelect.value,
      carrierFreq: carrierField.value,
      envelopePeakRate: peakRateField.value,
      envelopeDecayRate: decayRateField.value,
      vibratoRateFreq: vibratoRateField.value,
      vibratoPitchVariance: vibratoPitchField.value
    });

    play({ delaySeconds: 0, durationSeconds: 1 });
  }
}
