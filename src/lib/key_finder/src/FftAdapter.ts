class FftAdapterPrivate {
  inputReal: number[] = [];
  outputComplex: Complex[] = [];
}

class InverseFftAdapterPrivate {
  inputComplex: Complex[] = [];
  outputReal: number[] = [];
}

import { Complex, DFT } from './Dft';

export class FftAdapter {
  frameSize: number;
  private priv: FftAdapterPrivate | null;
  dft: DFT;

  constructor(inFrameSize: number) {
    this.frameSize = inFrameSize;
    this.priv = new FftAdapterPrivate();
    this.dft = new DFT();
  }

  destroy(): void {
    this.priv = null;
  }

  getFrameSize(): number {
    return this.frameSize;
  }

  setInput(i: number, real: number): void {
    if (!this.priv) throw new Error('Instance destroyed');
    if (i >= this.frameSize) {
      throw new Error(`Cannot set out-of-bounds sample (${i}/${this.frameSize})`);
    }
    if (!isFinite(real) || isNaN(real)) {
      throw new Error('Cannot set sample to NaN');
    }
    this.priv.inputReal[i] = real;
  }

  getOutputReal(i: number): number {
    if (!this.priv) throw new Error('Instance destroyed');
    if (i >= this.frameSize) {
      throw new Error(`Cannot get out-of-bounds sample (${i}/${this.frameSize})`);
    }
    return this.priv.outputComplex[i].real;
  }

  getOutputImaginary(i: number): number {
    if (!this.priv) throw new Error('Instance destroyed');
    if (i >= this.frameSize) {
      throw new Error(`Cannot get out-of-bounds sample (${i}/${this.frameSize})`);
    }
    return this.priv.outputComplex[i].imag;
  }

  getOutputMagnitude(i: number): number {
    if (!this.priv) throw new Error('Instance destroyed');
    if (i >= this.frameSize) {
      throw new Error(`Cannot get out-of-bounds sample (${i}/${this.frameSize})`);
    }
    return Math.sqrt(Math.pow(this.getOutputReal(i), 2) + Math.pow(this.getOutputImaginary(i), 2));
  }

  execute(): void {
    if (!this.priv) throw new Error('Instance destroyed');
    this.priv.outputComplex = this.dft.execute(this.priv.inputReal);
  }
}

export class InverseFftAdapter {
  frameSize: number;
  private priv: InverseFftAdapterPrivate | null;
  dft: DFT;

  constructor(inFrameSize: number) {
    this.frameSize = inFrameSize;
    this.priv = new InverseFftAdapterPrivate();
    this.dft = new DFT();
  }

  destroy(): void {
    this.priv = null;
  }

  getFrameSize(): number {
    return this.frameSize;
  }

  setInput(i: number, real: number, imag: number): void {
    if (i >= this.frameSize) {
      throw new Error('Cannot set out-of-bounds sample (' + i + '/' + this.frameSize + ')');
    }
    if (!isFinite(real) || !isFinite(imag)) {
      throw new Error('Cannot set sample to NaN');
    }
    const complex = new Complex(real, imag);
    if (!this.priv) throw new Error('Instance destroyed');
    this.priv.inputComplex.push(complex);
  }

  getOutput(i: number): number {
    if (!this.priv) throw new Error('Instance destroyed');
    if (i >= this.frameSize) {
      throw new Error(`Cannot set out-of-bounds sample (${i}/${this.frameSize})`);
    }
    return this.priv.outputReal[i] / this.frameSize;
  }

  execute(): void {
    if(!this.priv) throw new Error('Instance destroyed');
    this.priv.outputReal = this.dft.executeInverse(this.priv.inputComplex);
  }

}
