function synth({ index, modFreq, carrierOsc, ctx }) {
  const deviation = index * modFreq;
  var modulator = ctx.createOscillator();
  modulator.frequency.value = modFreq;

  var modulatorAmp = ctx.createGain();
  modulatorAmp.gain.value = deviation;

  modulator.connect(modulatorAmp);
  modulatorAmp.connect(carrierOsc.frequency);
  carrierOsc.connect(ctx.destination);

  return play;

  function play({ delaySeconds, durationSeconds }) {
    const startTime = ctx.currentTime + delaySeconds;
    const stopTime = startTime + durationSeconds;
    modulator.start(startTime);
    modulator.stop(stopTime);
    carrierOsc.start(startTime);
    carrierOsc.stop(stopTime);
  }
}

module.exports = synth;
