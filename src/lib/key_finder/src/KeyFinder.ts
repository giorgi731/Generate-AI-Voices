import {Constants, key_t} from './Constants';
import {AudioData} from './AudioData';
import {Workspace} from './Workspace';
import {Chromagram} from './Chromagram';
import {SpectrumAnalyser} from './SpectrumAnalyser';
import {TemporalWindowFactory} from './TemporalWindowFactory';
import {ChromaTransformFactory} from './ChromaTransformFactory';
import {KeyClassifier} from './KeyClassifier';
import {LowPassFilterFactory} from './LowPassFilterFactory';
import {LowPassFilter} from './LowPassFilter';
import {FftAdapter} from './FftAdapter';
const friendlyKeyMapping = [
  'A_MAJOR',
  'A_MINOR',
  'B_FLAT_MAJOR',
  'B_FLAT_MINOR',
  'B_MAJOR',
  'B_MINOR',
  'C_MAJOR',
  'C_MINOR',
  'D_FLAT_MAJOR',
  'D_FLAT_MINOR',
  'D_MAJOR',
  'D_MINOR',
  'E_FLAT_MAJOR',
  'E_FLAT_MINOR',
  'E_MAJOR',
  'E_MINOR',
  'F_MAJOR',
  'F_MINOR',
  'G_FLAT_MAJOR',
  'G_FLAT_MINOR',
  'G_MAJOR',
  'G_MINOR',
  'A_FLAT_MAJOR',
  'A_FLAT_MINOR',
  'SILENCE'
];

export class KeyFinder {
  public static friendlyKeyMapping = friendlyKeyMapping;
  private lpfFactory: LowPassFilterFactory = new LowPassFilterFactory();
  private ctFactory: ChromaTransformFactory = new ChromaTransformFactory();
  private twFactory: TemporalWindowFactory = new TemporalWindowFactory();

  keyOfAudio(originalAudio: AudioData): key_t {
    const workspace: Workspace = new Workspace();
    this.progressiveChromagram(originalAudio, workspace);
    this.finalChromagram(workspace);
    return this.keyOfChromaVector(workspace.chromagram?.collapseToOneHop() || []);
  }

  progressiveChromagram(audio: AudioData, workspace: Workspace): void {
    this.preprocess(audio, workspace);
    workspace.preprocessedBuffer.append(audio);
    this.chromagramOfBufferedAudio(workspace);
  }

  finalChromagram(workspace: Workspace): void {
    // flush remainder buffer
    if (workspace.remainderBuffer.getSampleCount() > 0) {
      const flush: AudioData = new AudioData(); // TODO: Инициализация под вопросом
      this.preprocess(flush, workspace, true);
    }
    // zero padding
    const paddedHopCount = Math.ceil(workspace.preprocessedBuffer.getSampleCount() / Constants.HOPSIZE);
    const finalSampleLength = Constants.FFTFRAMESIZE + ((paddedHopCount - 1) * Constants.HOPSIZE);
    workspace.preprocessedBuffer.addToSampleCount(finalSampleLength - workspace.preprocessedBuffer.getSampleCount());
    this.chromagramOfBufferedAudio(workspace);
  }

  preprocess(workingAudio: AudioData, workspace: Workspace, flushRemainderBuffer: boolean = false): void {

    workingAudio.reduceToMono();

    if (workspace.remainderBuffer.getChannels() > 0) {
      workingAudio.prepend(workspace.remainderBuffer);
      workspace.remainderBuffer.discardFramesFromFront(workspace.remainderBuffer.getFrameCount());
    }

    // TODO: there is presumably some good maths to determine filter frequencies. For now, this approximates original experiment values.
    const lpfCutoff = Constants.getLastFrequency() * 1.012;
    const dsCutoff = Constants.getLastFrequency() * 1.10;
    const downsampleFactor = Math.floor(workingAudio.getFrameRate() / 2 / dsCutoff);

    const bufferExcess = workingAudio.getSampleCount() % downsampleFactor;
    if (!flushRemainderBuffer && bufferExcess !== 0) {
      let remainder: AudioData | null = workingAudio.sliceSamplesFromBack(bufferExcess);
      workspace.remainderBuffer.append(remainder);
    remainder = null;
    }

    const lpf: LowPassFilter = this.lpfFactory.getLowPassFilter(160, workingAudio.getFrameRate(), lpfCutoff, 2048);
    lpf.filter(workingAudio, workspace, downsampleFactor);
    // note we don't delete the LPF; it's stored in the factory for reuse

    workingAudio.downsample(downsampleFactor);
  }

  chromagramOfBufferedAudio(workspace: Workspace): void {
    if (workspace.fftAdapter === null) {
      workspace.fftAdapter = new FftAdapter(Constants.FFTFRAMESIZE);
    }
    const sa: SpectrumAnalyser = new SpectrumAnalyser(workspace.preprocessedBuffer.getFrameRate(), this.ctFactory, this.twFactory);
    let c: Chromagram | null = sa.chromagramOfWholeFrames(workspace.preprocessedBuffer, workspace.fftAdapter);
    workspace.preprocessedBuffer.discardFramesFromFront(Constants.HOPSIZE * c.getHops());
    if (workspace.chromagram === null) {
      workspace.chromagram = c;
    } else {
      workspace.chromagram.append(c);
      c = null;
    }
  }

  keyOfChromaVector(chromaVector: number[]): key_t {
    const classifier: KeyClassifier = new KeyClassifier(Constants.toneProfileMajor(), Constants.toneProfileMinor());
    const result =  classifier.classify(chromaVector);
    classifier.destroy();
    return result;
  }

  keyOfChromaVectorProfile(chromaVector: number[], overrideMajorProfile: number[], overrideMinorProfile: number[]): key_t {
    const classifier: KeyClassifier = new KeyClassifier(overrideMajorProfile, overrideMinorProfile);
    const result =  classifier.classify(chromaVector);
    classifier.destroy();
    return result;
  }

  keyOfChromagram(workspace: Workspace): key_t {
    const classifier: KeyClassifier = new KeyClassifier(Constants.toneProfileMajor(), Constants.toneProfileMinor());
    const result =  classifier.classify(workspace.chromagram?.collapseToOneHop() || []);
    classifier.destroy();
    return result;
  }

}
