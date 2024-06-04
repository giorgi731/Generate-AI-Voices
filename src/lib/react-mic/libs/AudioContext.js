let audioCtx;
let analyser;

if (typeof window !== 'undefined') {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioCtx.createAnalyser();
}

const AudioContext  = {

  getAudioContext() {
    return audioCtx;
  },

  getAnalyser() {
    return analyser;
  },

  resetAnalyser() {
    if (audioCtx) {
      analyser = audioCtx.createAnalyser();
    }
  },
  decodeAudioData(audioData) {
    console.log('decodeAudioData');
    console.log(audioData);
    if (audioCtx && audioData) {
      return new Promise((resolve, reject) => {
        audioCtx.decodeAudioData(audioData, function(decodedData) {
          // use the decoded data here
          console.log('decodedData');
          console.log(decodedData);
          resolve(decodedData);
        }, function(e) {
          console.log('Error with decoding audio data' + e.err);
          reject(e.err);
        });
      });
    }
  }

}

export default AudioContext;

