var seedrandom = require('seedrandom');
var Reverb = require('soundbank-reverb');

function playSynth({
  index,
  modFreq,
  carrierType,
  carrierFreq,
  carrierCustomWaveArrayLength,
  carrierCustomWaveSeed,
  envelopePeakRate,
  envelopeDecayRate,
  timeNeededForEnvelopeDecay = 2,
  vibratoRateFreq,
  vibratoPitchVariance,
  delaySeconds,
  durationSeconds,
  reverbTime,
  reverbWet,
  reverbDry,
  ctx
}) {
  const deviation = index * modFreq;

  var vibrato = getVibrato({
    rateFreq: vibratoRateFreq,
    pitchVariance: vibratoPitchVariance,
    ctx
  });
  var modulator = ctx.createOscillator();
  modulator.frequency.value = modFreq;

  var modulatorAmp = ctx.createGain();
  modulatorAmp.gain.value = deviation;

  var carrierOsc = ctx.createOscillator();
  if (
    carrierType === 'custom' &&
    carrierCustomWaveArrayLength &&
    carrierCustomWaveSeed
  ) {
    carrierOsc.setPeriodicWave(
      getCustomWave({
        carrierCustomWaveArrayLength,
        carrierCustomWaveSeed,
        ctx
      })
    );
  } else {
    carrierOsc.type = carrierType;
    carrierOsc.frequency.value = carrierFreq;
  }

  var envelope = ctx.createGain();
  envelope.gain.value = 0.7;

  var reverb;
  if (reverbTime) {
    reverb = Reverb(ctx);
    reverb.time = reverbTime;
    reverb.wet.value = reverbWet;
    reverb.dry.value = reverbDry;
  }

  vibrato.amp.connect(modulator.detune);
  modulator.connect(modulatorAmp);
  modulatorAmp.connect(carrierOsc.frequency);
  carrierOsc.connect(envelope);
  envelope.connect(ctx.destination);

  if (reverbTime) {
    envelope.connect(reverb);
    reverb.connect(ctx.destination);
  } else {
    envelope.connect(ctx.destination);
  }

  play();

  function play() {
    const startTime = ctx.currentTime + delaySeconds;
    const stopTime = startTime + durationSeconds;
    envelope.gain.value = 0;
    envelope.gain.setTargetAtTime(1, startTime, envelopePeakRate);
    envelope.gain.setTargetAtTime(0, stopTime, envelopeDecayRate);

    modulator.start(startTime);
    modulator.stop(stopTime + timeNeededForEnvelopeDecay);
    carrierOsc.start(startTime);
    carrierOsc.stop(stopTime + timeNeededForEnvelopeDecay);
    vibrato.generator.start(startTime);
    vibrato.generator.stop(stopTime + timeNeededForEnvelopeDecay);
  }
}

function getVibrato({ rateFreq, pitchVariance, ctx }) {
  var generator = ctx.createOscillator();
  generator.frequency.value = rateFreq;
  var amp = ctx.createGain();
  amp.gain.value = pitchVariance;
  generator.connect(amp);
  return { generator, amp };
}

function getCustomWave({
  carrierCustomWaveArrayLength,
  carrierCustomWaveSeed,
  ctx
}) {
  var random = seedrandom(carrierCustomWaveSeed);
  var real = new Float32Array(carrierCustomWaveArrayLength);
  var imaginary = new Float32Array(carrierCustomWaveArrayLength);
  real[0] = 0;
  imaginary[0] = 0;
  for (var i = 1; i < carrierCustomWaveArrayLength; ++i) {
    real[i] = -1.0 + random() * 2;
    imaginary[i] = -1.0 + random() * 2;
  }
  //console.log('real', real, 'imaginary', imaginary);
  return ctx.createPeriodicWave(real, imaginary);
}

module.exports = playSynth;
