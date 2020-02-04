function playSynth({
  index,
  modFreq,
  carrierType,
  carrierFreq,
  envelopePeakRate,
  envelopeDecayRate,
  timeNeededForEnvelopeDecay = 2,
  vibratoRateFreq,
  vibratoPitchVariance,
  delaySeconds,
  durationSeconds,
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
  carrierOsc.type = carrierType;
  carrierOsc.frequency.value = carrierFreq;

  var envelope = ctx.createGain();

  vibrato.amp.connect(modulator.detune);
  modulator.connect(modulatorAmp);
  modulatorAmp.connect(carrierOsc.frequency);
  carrierOsc.connect(envelope);
  envelope.connect(ctx.destination);

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

module.exports = playSynth;
