var playSynth = require('./synth');
var handleError = require('handle-error-web');
var oknok = require('oknok');
var ContextKeeper = require('audio-context-singleton');
var d3 = require('d3-selection');
var accessor = require('accessor');
var pairs = require('lodash.pairs');

var synthRoot = d3.select('#synth-root');

var { getCurrentContext } = ContextKeeper();

document.getElementById('create-button').addEventListener('click', createSynth);
var indexField = document.getElementById('index-field');
var modFreqField = document.getElementById('mod-freq-field');
var carrierField = document.getElementById('carrier-field');
var waveTypeSelect = document.getElementById('wave-type-select');
var peakRateField = document.getElementById('peak-rate-field');
var decayRateField = document.getElementById('decay-rate-field');
var vibratoRateField = document.getElementById('vibrato-rate-field');
var vibratoPitchField = document.getElementById('vibrato-pitch-field');
var durationField = document.getElementById('duration-field');
var arrayLengthField = document.getElementById('array-length-field');
var waveSeedField = document.getElementById('wave-seed-field');

var synths = [];

function createSynth() {
  var opts = {
    index: +indexField.value,
    modFreq: +modFreqField.value,
    carrierType: waveTypeSelect.value,
    carrierFreq: +carrierField.value,
    carrierCustomWaveArrayLength: +arrayLengthField.value,
    carrierCustomWaveSeed: waveSeedField.value,
    envelopePeakRate: +peakRateField.value,
    envelopeDecayRate: +decayRateField.value,
    vibratoRateFreq: +vibratoRateField.value,
    vibratoPitchVariance: vibratoPitchField.value,
    durationSeconds: +durationField.value
  };
  synths.push({ opts });
  renderSynths(synths);
}

function renderSynths(synthData) {
  // Don't worry about keying elements for now.
  var formattedData = synthData.map(formatSynthDatum);
  var synths = synthRoot.selectAll('.synth').data(formattedData);
  synths.exit().remove();
  var newSynths = synths
    .enter()
    .append('li')
    .classed('synth', true);
  newSynths.append('table');
  newSynths.append('button').text('Play');

  var survivingSynths = newSynths.merge(synths);
  survivingSynths.select('table').each(renderTable);
  survivingSynths.select('button').on('click', onPlay);
}

function onPlay({ opts }) {
  getCurrentContext(oknok({ ok: useContext, nok: handleError }));

  function useContext(ctx) {
    playSynth(Object.assign({ delaySeconds: 0 }, opts, { ctx }));
  }
}

function renderTable({ nameValueDictArray }) {
  var table = d3.select(this);
  var rows = table.selectAll('tr').data(nameValueDictArray);
  rows.exit().remove();
  var newRows = rows.enter().append('tr');
  newRows.append('td').classed('name-cell', true);
  newRows.append('td').classed('value-cell', true);
  var survivingRows = newRows.merge(rows);
  survivingRows.select('.name-cell').text(accessor('name'));
  survivingRows.select('.value-cell').text(accessor('value'));
}

function formatSynthDatum({ opts }) {
  return {
    opts,
    nameValueDictArray: pairs(opts).map(([name, value]) => ({ name, value }))
  };
}
