'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import pauseIcon from '~/../public/images/pause.svg';
import playIcon from '~/../public/images/circle-play.svg';

const WaveformAudioPlayer = ({ src, isPlayingSound }: any) => {
  const waveformRef = useRef(null) as any;
  const playButtonRef = useRef(null);
  const progressCircleRef = useRef(null);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurferRef = useRef(null) as any;

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'white',
      progressColor: ["#A76DFA", "#33D6FA"],
      cursorColor: 'transparent',
      barWidth: 2,
      height: 20,
      url: src,
    });

    wavesurferRef.current.on('ready', () => {
      const audioDuration = wavesurferRef.current.getDuration();
      const formattedDuration = formatTime(audioDuration);
      setDuration(formattedDuration);
    });

    wavesurferRef.current.on('audioprocess', () => {
      const currentTime = wavesurferRef.current.getCurrentTime();
      const formattedTime = formatTime(currentTime);
      setCurrentTime(formattedTime);

      const progressCircle = progressCircleRef.current as any;
      const waveformWidth = waveformRef.current.clientWidth;
      const waveformDuration = wavesurferRef.current.getDuration();
      const progressPercentage = currentTime / waveformDuration;
      const progressPosition = progressPercentage * waveformWidth;
      progressCircle.style.left = `${progressPosition}px`;
    });

    wavesurferRef.current.on('finish', () => {
      setIsPlaying(false);
      setCurrentTime('00:00');
      wavesurferRef.current.seekTo(0);
    });

    return () => {
      wavesurferRef.current.destroy();
    };
  }, [src]);

  useEffect(() => {
    if (isPlayingSound) 
      isPlayingSound(isPlaying);
  }, [isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#000',
    borderRadius: '10px',
    padding: '10px',
    position: 'relative',
  } as any;

  const waveformPlayerStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    flexGrow: 1,
    position: 'relative',
  } as any;

  const waveformStyle = {
    height: '40px',
    position: 'relative',
    zIndex: 1,
  } as any;

  const playButtonStyle = {
    backgroundColor: '#000',
    color: '#ff00e8',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
  } as any;

  const svgStyle = {
    fill: 'white',
  };

  const progressCircleStyle = {
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translate(-50%, -50%)',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#4fc3f7',
    zIndex: 5,
  } as any;

  const handleTogglePlay = () => {
    if (isPlaying) {
      wavesurferRef.current.pause();
    } else {
      wavesurferRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const playIcons = isPlaying ? (
    <Image src={pauseIcon} alt="pause icon" />
  ) : (
    <Image src={playIcon} alt="pause icon" />
  );

  return (
    <div className="w-full">
      <div style={containerStyle}>
        <div style={waveformPlayerStyle} className="relative">
          <div className="flex flex-col w-full">
            <div className="relative flex flex-row items-center">
              <button
                style={playButtonStyle}
                ref={playButtonRef}
                onClick={handleTogglePlay}
              >
                {playIcons}
              </button>

              <div className="relative w-full ml-2">
                <div style={waveformStyle} ref={waveformRef}></div>
                <div style={progressCircleStyle} ref={progressCircleRef}></div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-white">{currentTime}</span>
              <span className="ml-[10px] text-white">{duration}</span>
            </div>
          </div>
          {/* {!showModal && (
            <button
              className="absolute -bottom-[5px] right-[0] ml-1 text-[16px] font-medium"
              onClick={() => setShowModal((prev) => !prev)}
            >
              ...
            </button>
          )}
          {showModal && (
            <a
              download
              href={src}
              className="absolute -bottom-[5px] right-[0] ml-1 text-[10px] font-bold"
            >
              Download
            </a>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default WaveformAudioPlayer;
