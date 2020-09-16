import Reverb from 'soundbank-reverb';
import { Carrier, VibratoGenerator, VibratoAmp } from './synth-node';

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
  vibratoOn = true,
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

  var vibratoGen = new VibratoGenerator(ctx, {
    rateFreq: vibratoRateHz
  });

  var vibratoAmp = new VibratoAmp(ctx, { pitchVariance: vibratoPitchVarCents });

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
    modulator.connect(modulatorAmp);
    modulatorAmp.connect(carrier.node.frequency);

    vibratoAmp.connect({ destNode: modulator });
  }

  if (vibratoOn) {
    vibratoAmp.connect({ destNode: carrier.node });
  }
  vibratoGen.connect({ synthNode: vibratoAmp });

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
      vibratoGen.play({ startTime, endTime });
    }
  }
}
