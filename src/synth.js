import seedrandom from 'seedrandom';
import Reverb from 'soundbank-reverb';

export function playSynth({
  modOn = false,
  modIndex,
  modFreq,
  carrierWaveType,
  carrierFreq,
  carrierCustomWaveArrayLength,
  carrierCustomWaveSeed,
  envelopeOn = false,
  envelopePeakRateK,
  envelopeDecayRateK,
  timeNeededForEnvelopeDecay = 2,
  vibratoRateHz,
  vibratoPitchVarCents,
  delaySeconds,
  soundDurationSeconds,
  reverbSeconds,
  reverbWet,
  reverbDry,
  ctx
}) {
  var vibrato = getVibrato({
    rateFreq: vibratoRateHz,
    pitchVariance: vibratoPitchVarCents,
    ctx
  });

  var carrierOsc = ctx.createOscillator();
  if (
    carrierWaveType === 'custom' &&
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
    carrierOsc.type = carrierWaveType;
    carrierOsc.frequency.value = carrierFreq;
  }

  var compressor = ctx.createDynamicsCompressor();

  var reverb;
  if (reverbSeconds) {
    reverb = Reverb(ctx);
    reverb.time = reverbSeconds;
    reverb.wet.value = reverbWet;
    reverb.dry.value = reverbDry;
  }

  if (modOn) {
    const deviation = modIndex * modFreq;
    var modulator = ctx.createOscillator();
    modulator.frequency.value = modFreq;
    var modulatorAmp = ctx.createGain();
    modulatorAmp.gain.value = deviation;
    vibrato.amp.connect(modulator.detune);
    modulator.connect(modulatorAmp);
    modulatorAmp.connect(carrierOsc.frequency);
  }

  let envelope = ctx.createGain();
  carrierOsc.connect(envelope);

  if (reverbSeconds) {
    envelope.connect(reverb);
    reverb.connect(compressor);
  } else {
    envelope.connect(compressor);
  }

  compressor.connect(ctx.destination);

  play();

  function play() {
    const startTime = ctx.currentTime + delaySeconds;
    const stopTime = startTime + +soundDurationSeconds;
    if (envelopeOn) {
      envelope.gain.value = 0;
      envelope.gain.setTargetAtTime(0.1, startTime, envelopePeakRateK);
      envelope.gain.setTargetAtTime(0, stopTime, envelopeDecayRateK);
    }
    compressor.threshold.setValueAtTime(-50, startTime);
    compressor.knee.setValueAtTime(40, startTime);
    compressor.ratio.setValueAtTime(12, startTime);
    compressor.attack.setValueAtTime(0, startTime);
    compressor.release.setValueAtTime(0.25, startTime);

    const endTime = stopTime + (envelopeOn ? timeNeededForEnvelopeDecay : 0);

    if (modOn) {
      modulator.start(startTime);
      modulator.stop(endTime);
    }
    carrierOsc.start(startTime);
    carrierOsc.stop(endTime);
    vibrato.generator.start(startTime);
    vibrato.generator.stop(endTime);
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
