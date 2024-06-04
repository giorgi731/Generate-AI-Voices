import {AudioData} from './AudioData';
import {Chromagram} from './Chromagram';
import {FftAdapter} from './FftAdapter';

export class Workspace {
  remainderBuffer: AudioData = new AudioData();
  preprocessedBuffer: AudioData = new AudioData();
  chromagram: Chromagram | null = null;
  fftAdapter: FftAdapter | null = null;
  lpfBuffer: number[] | null = null;
}
