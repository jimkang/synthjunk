function synth({ index, modFreq, carrierType, carrierFreq, ctx }) {
  const deviation = index * modFreq;
  var modulator = ctx.createOscillator();
  modulator.frequency.value = modFreq;

  var modulatorAmp = ctx.createGain();
  modulatorAmp.gain.value = deviation;

  var carrierOsc = ctx.createOscillator();
  carrierOsc.type = carrierType;
  carrierOsc.frequency.value = carrierFreq;

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
