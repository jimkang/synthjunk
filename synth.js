function synth({
  index,
  modFreq,
  carrierType,
  carrierFreq,
  envelopePeakRate,
  envelopeDecayRate,
  timeNeededForEnvelopeDecay = 2,
  ctx
}) {
  const deviation = index * modFreq;
  var modulator = ctx.createOscillator();
  modulator.frequency.value = modFreq;

  var modulatorAmp = ctx.createGain();
  modulatorAmp.gain.value = deviation;

  var carrierOsc = ctx.createOscillator();
  carrierOsc.type = carrierType;
  carrierOsc.frequency.value = carrierFreq;

  var envelope = ctx.createGain();

  modulator.connect(modulatorAmp);
  modulatorAmp.connect(carrierOsc.frequency);
  carrierOsc.connect(envelope);
  envelope.connect(ctx.destination);

  return play;

  function play({ delaySeconds, durationSeconds }) {
    const startTime = ctx.currentTime + delaySeconds;
    const stopTime = startTime + durationSeconds;
    envelope.gain.value = 0;
    envelope.gain.setTargetAtTime(1, startTime, envelopePeakRate);
    envelope.gain.setTargetAtTime(0, stopTime, envelopeDecayRate);
    modulator.start(startTime);
    modulator.stop(stopTime);
    carrierOsc.start(startTime);
    carrierOsc.stop(stopTime + timeNeededForEnvelopeDecay);
  }
}

module.exports = synth;
