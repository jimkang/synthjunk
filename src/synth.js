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
  timeNeededForEnvelopeDecay = 1, // TODO: Expose in UI
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
  var activeSynths = [];
  setUpSynthChain();
  play();

  function setUpSynthChain() {
    if (vibratoOn) {
      activeSynths.push(new VibratoGenerator(ctx, { rateFreq: vibratoRateHz }));

      activeSynths.push(
        new VibratoAmp(ctx, { pitchVariance: vibratoPitchVarCents })
      );
    }

    if (modOn) {
      const deviation = modIndex * modFreq;
      activeSynths.push(new VibratoGenerator(ctx, { rateFreq: modFreq }));
      activeSynths.push(
        new VibratoAmp(ctx, { pitchVariance: deviation, destProp: 'frequency' })
      );
    }

    activeSynths.push(
      new Carrier(ctx, {
        carrierFreq,
        carrierWaveType,
        carrierCustomWaveArrayLength,
        carrierCustomWaveSeed
      })
    );

    if (envelopeOn) {
      activeSynths.push(
        new Envelope(ctx, {
          envelopePeakRateK,
          envelopeDecayRateK,
          timeNeededForEnvelopeDecay
        })
      );
    }

    if (reverbOn) {
      activeSynths.push(
        new Reverb(ctx, { reverbSeconds, reverbWet, reverbDry })
      );
    }

    if (compressorOn) {
      activeSynths.push(
        new Compressor(ctx, {
          compressorThreshold,
          compressorKnee,
          compressorRatio,
          compressorAttack,
          compressorRelease
        })
      );
    }

    // All of this assumes that every node only connects
    // to one other node.
    for (var i = 0; i < activeSynths.length - 1; ++i) {
      let synth = activeSynths[i];
      let nextSynth = activeSynths[i + 1];
      synth.connect({ synthNode: nextSynth });
    }
    activeSynths[activeSynths.length - 1].connect({
      audioNode: ctx.destination
    });
  }

  function play() {
    const startTime = ctx.currentTime + delaySeconds;
    const endTime = startTime + +soundDurationSeconds;

    activeSynths.forEach(synthNode => synthNode.play({ startTime, endTime }));
  }
}
