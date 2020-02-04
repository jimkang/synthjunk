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

function start() {
  console.log('started');

  getCurrentContext(oknok({ ok: useContext, nok: handleError }));

  function useContext(ctx) {
    var play = synth({
      ctx,
      index: indexField.value,
      modFreq: modFreqField.value,
      carrierType: waveTypeSelect.value,
      carrierFreq: carrierField.value
    });

    play({ delaySeconds: 0, durationSeconds: 1 });
  }
}
