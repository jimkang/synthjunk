import seedrandom from 'seedrandom';

export class SynthNode {
  constructor(ctx, params) {
    this.ctx = ctx;
    this.params = params;
    this.node = null;
  }
  node() {
    return this.node;
  }
  connect({ synthNode, destNode }) {
    if (destNode) {
      this.node.connect(destNode);
    } else if (synthNode) {
      this.node.connect(synthNode.node);
    } else {
      throw new Error('No synthNode or raw AudioNode passed to connect.');
    }
  }
  play({ startTime, endTime }) {
    this.node.start(startTime);
    this.node.stop(endTime);
  }
}

export class VibratoGenerator extends SynthNode {
  constructor(ctx, params) {
    super(ctx, params);
    this.node = this.ctx.createOscillator();
    this.node.frequency.value = this.params.rateFreq;
  }
}

export class VibratoAmp extends SynthNode {
  constructor(ctx, params) {
    super(ctx, params);
    this.node = this.ctx.createGain();
    this.node.gain.value = this.params.pitchVariance;
  }
  connect({ destNode }) {
    this.node.connect(destNode.detune);
  }
}

export class Carrier extends SynthNode {
  constructor(ctx, params) {
    super(ctx, params);
    this.node = this.ctx.createOscillator();
    if (
      this.params.carrierWaveType === 'custom' &&
      this.params.carrierCustomWaveArrayLength &&
      this.params.carrierCustomWaveSeed
    ) {
      this.node.setPeriodicWave(
        getCustomWave({
          carrierCustomWaveArrayLength: this.params
            .carrierCustomWaveArrayLength,
          carrierCustomWaveSeed: this.params.carrierCustomWaveSeed,
          ctx: this.ctx
        })
      );
    } else {
      this.node.type = this.params.carrierWaveType;
      this.node.frequency.value = this.params.carrierFreq;
    }
  }
}

export class Envelope extends SynthNode {
  constructor(ctx, params) {
    super(ctx, params);
    this.node = this.ctx.createGain();
  }
  play({ startTime, endTime }) {
    this.node.gain.value = 0;
    this.node.gain.setTargetAtTime(
      0.1,
      startTime,
      this.params.envelopePeakRateK
    );
    this.node.gain.setTargetAtTime(0, endTime, this.params.envelopeDecayRateK);
  }
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
