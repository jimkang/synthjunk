import Reverb from 'soundbank-reverb';
import { Carrier } from './synth-node';

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
  vibratoOn = false,
  vibratoRateHz,
  vibratoPitchVarCents,
  delaySeconds,
  soundDurationSeconds,
  reverbSeconds,
  reverbWet,
  reverbDry,
  ctx
}) {
  var carrier = new Carrier(ctx, {
    carrierFreq,
    carrierWaveType,
    carrierCustomWaveArrayLength,
    carrierCustomWaveSeed
  });

  var compressor = ctx.createDynamicsCompressor();

  var reverb;
  if (reverbSeconds) {
    reverb = Reverb(ctx);
    reverb.time = reverbSeconds;
    reverb.wet.value = reverbWet;
    reverb.dry.value = reverbDry;
  }

  var vibrato = getVibrato({
    rateFreq: vibratoRateHz,
    pitchVariance: vibratoPitchVarCents,
    ctx
  });

  if (modOn) {
    const deviation = modIndex * modFreq;
    var modulator = ctx.createOscillator();
    modulator.frequency.value = modFreq;
    var modulatorAmp = ctx.createGain();
    modulatorAmp.gain.value = deviation;
    if (vibratoOn) {
      vibrato.amp.connect(modulator.detune);
    }
    modulator.connect(modulatorAmp);
    modulatorAmp.connect(carrier.node().frequency);
  } else if (vibratoOn) {
    //vibrato.amp.connect();
  }

  let envelope = ctx.createGain();
  carrier.connect({ destNode: envelope });

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
    carrier.play({ startTime, endTime });

    if (vibratoOn) {
      vibrato.generator.start(startTime);
      vibrato.generator.stop(endTime);
    }
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
