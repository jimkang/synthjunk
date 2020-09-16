import {
  Carrier,
  VibratoGenerator,
  VibratoAmp,
  Envelope,
  Reverb,
  Compressor
} from './synth-node';

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
  reverbOn = false,
  reverbSeconds,
  reverbWet,
  reverbDry,
  compressorOn = false,
  compressorThreshold = -50,
  compressorKnee = 40,
  compressorRatio = 12,
  compressorAttack = 0,
  compressorRelease = 0.25,
  ctx
}) {
  var carrier = new Carrier(ctx, {
    carrierFreq,
    carrierWaveType,
    carrierCustomWaveArrayLength,
    carrierCustomWaveSeed
  });

  var compressor = new Compressor(ctx, {
    compressorThreshold,
    compressorKnee,
    compressorRatio,
    compressorAttack,
    compressorRelease
  });

  var vibratoGen = new VibratoGenerator(ctx, {
    rateFreq: vibratoRateHz
  });

  var vibratoAmp = new VibratoAmp(ctx, { pitchVariance: vibratoPitchVarCents });

  var modGen;
  var modAmp;

  var reverb;
  if (reverbOn) {
    reverb = new Reverb(ctx, { reverbSeconds, reverbWet, reverbDry });
  }

  if (modOn) {
    const deviation = modIndex * modFreq;
    modGen = new VibratoGenerator(ctx, { rateFreq: modFreq });
    modAmp = new VibratoAmp(ctx, {
      pitchVariance: deviation,
      destProp: 'frequency'
    });

    modGen.connect({ synthNode: modAmp });
    modAmp.connect({ synthNode: carrier });

    vibratoAmp.connect({ synthNode: modGen });
  }

  if (vibratoOn) {
    vibratoAmp.connect({ audioNode: carrier.node });
  }
  vibratoGen.connect({ synthNode: vibratoAmp });

  var envelope = new Envelope(ctx, { envelopePeakRateK, envelopeDecayRateK });
  carrier.connect({ synthNode: envelope });

  if (reverbOn) {
    envelope.connect({ synthNode: reverb });
    reverb.connect({ synthNode: compressor });
  } else {
    envelope.connect({ synthNode: compressor });
  }

  compressor.connect({ audioNode: ctx.destination });

  play();

  function play() {
    const startTime = ctx.currentTime + delaySeconds;
    const stopTime = startTime + +soundDurationSeconds;
    if (envelopeOn) {
      envelope.play({ startTime, endTime: stopTime });
    }
    if (compressorOn) {
      compressor.play({ startTime });
    }

    const endTime = stopTime + (envelopeOn ? timeNeededForEnvelopeDecay : 0);

    if (modOn) {
      modGen.play({ startTime, endTime });
    }
    carrier.play({ startTime, endTime });

    if (vibratoOn) {
      vibratoGen.play({ startTime, endTime });
    }
  }
}
