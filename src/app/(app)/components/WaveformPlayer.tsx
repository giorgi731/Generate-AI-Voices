import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioPlayer = ({ audioFile }: any) => {
  const waveformRef = useRef(null) as any;
  const wavesurfer = useRef(null) as any;

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
    });

    wavesurfer?.current?.load(audioFile);

    return () => {
      wavesurfer.current.destroy();
    };
  }, [audioFile]);

  return <div ref={waveformRef}></div>;
};

export default AudioPlayer;
