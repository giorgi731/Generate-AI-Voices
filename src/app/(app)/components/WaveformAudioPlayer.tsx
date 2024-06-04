'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { HiOutlineDownload, HiLink } from 'react-icons/hi';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAudioContext } from '../../AudioContext';

// Plugins
dayjs.extend(relativeTime);
dayjs.extend(utc);

const WaveformAudioPlayer = ({
  src,
  isPlayingSound,
  imageUrl,
  conversionId,
  reset,
  artistName,
  modelType,
  genre,
  conversion,
  variant = 'primary',
  hideLinkButton = false,
  hideDownloadButton = false,
  onModelNameClick,
}: any) => {
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('00:00');
  const [duration, setDuration] = useState<string>('00:00');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [play, setPlay] = useState<boolean>(false);
  const waveformRef = useRef<any>(null);
  const playButtonRef = useRef(null);
  const progressCircleRef = useRef(null);
  const wavesurferRef = useRef<any>(null);
  const isPlayerLoadedRef = useRef(false);
  const playerRef = useRef(null);
  const { activeUrl, setActiveUrl } = useAudioContext();
  useEffect(() => {
    if (src) {
      setAudioUrl(src);
    } else if (conversion && conversion.result) {
      const newAudioUrl = Array.isArray(conversion.result)
        ? conversion.result[0]
        : conversion.result;
      setAudioUrl(newAudioUrl);
    }
  }, [src, conversion]);

  useEffect(() => {
    let observer: IntersectionObserver;
    const currentRef = playerRef.current;

    // Only load the player when it's visible in the viewport
    if (currentRef) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            if (!isPlayerLoadedRef.current) {
              wavesurferRef.current = WaveSurfer?.create({
                container: waveformRef?.current,
                waveColor: 'white',
                progressColor: 'white',
                cursorColor: 'transparent',
                barWidth: 1.75,
                barRadius: 1,
                barGap: 2.5,
                height: 40,
                url: audioUrl,
                // Fix to show mono audio as stereo
                splitChannels: [
                  // @ts-ignore:next-line
                  {
                    waveColor: 'white',
                    progressColor: 'white',
                    cursorColor: 'transparent',
                    barWidth: 1.75,
                    barRadius: 1,
                    barGap: 2.5,
                    height: 36,
                  },
                  // @ts-ignore:next-line
                  {
                    waveColor: 'transparent',
                    progressColor: 'transparent',
                    cursorColor: 'transparent',
                    barGap: 0,
                    barWidth: 0,
                    height: 0,
                  },
                ],
              });

              wavesurferRef.current.on('ready', () => {
                const audioDuration = wavesurferRef.current.getDuration();
                const formattedDuration = formatTime(audioDuration);
                setDuration(formattedDuration);
                setLoading(false);
              });

              wavesurferRef.current.on('audioprocess', () => {
                const currentTime = wavesurferRef.current.getCurrentTime();
                const formattedTime = formatTime(currentTime);
                setCurrentTime(formattedTime);

                // const progressCircle = progressCircleRef.current as any;)
                // const waveformWidth = waveformRef.current.clientWidth;
                // const waveformDuration = wavesurferRef.current.getDuration();
                // const progressPercentage = currentTime / waveformDuration;
                // const progressPosition = progressPercentage * waveformWidth;
                // progressCircle.style.left = `${progressPosition}px`;
              });

              wavesurferRef.current.on('finish', () => {
                console.log('onfinish');
                setIsPlaying(false);
                setCurrentTime('00:00');
                wavesurferRef.current.seekTo(0);
                setPlay(false);
              });

              isPlayerLoadedRef.current = true;
            } else {
              // If the WaveSurfer instance is already created, unload the current audio and load the new audioUrl
              wavesurferRef.current.load(audioUrl);
            }
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        }
      );
      observer.observe(currentRef);
    }
    return () => {
      if (observer && currentRef) observer.unobserve(currentRef);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (isPlayingSound) isPlayingSound(isPlaying);
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
    borderRadius: '10px',
    padding: '2px 10px',
    position: 'relative',
  } as any;

  const waveformPlayerStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    flexGrow: 1,
    position: 'relative',
  } as any;

  const waveformStyle = {
    height: '45px',
    marginTop: '5px',
    marginBottom: '5px',
    position: 'relative',
    zIndex: 1,
  } as any;

  const playButtonStyle = {
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: 'lg',
  } as any;

  const handleAudio = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.renderer.canvasWrapper.style.cursor = 'pointer';

      if (play && activeUrl === audioUrl) {
        setIsPlaying(true);
        wavesurferRef.current.play();
        wavesurferRef.current.options.splitChannels[0].waveColor = '#897d9a';
        wavesurferRef.current.renderer.options.waveColor = '#897d9a';
        wavesurferRef.current.options.splitChannels[0].progressColor = 'white';
      } else {
        setIsPlaying(false);
        wavesurferRef.current.pause();
        wavesurferRef.current.options.splitChannels[0].waveColor = '#897d9a';
        wavesurferRef.current.renderer.options.splitChannels[0].waveColor =
          '#897d9d';
        wavesurferRef.current.options.splitChannels[0].progressColor = 'white';
      }
    }
  }, [play, activeUrl, audioUrl, wavesurferRef.current]);

  useEffect(() => {
    handleAudio();
  }, [handleAudio]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setActiveUrl('');
      setPlay(false);
    } else {
      setPlay(true);
      setActiveUrl(audioUrl);
    }
    wavesurferRef.current.setOptions(wavesurferRef.current.options);
    setIsPlaying(!isPlaying);
  };

  const playIcons = isPlaying ? (
    <BsPauseFill className="text-white" />
  ) : (
    <BsPlayFill className="text-white" />
  );

  return (
    <div className="my-2.5 inline-block w-full" ref={playerRef}>
      {conversion && (
        <div className="mb-[8px] flex flex-row items-center">
          {/* <Image className="h-[20px] w-[20px] rounded-full" src={selectedModel?.image || girlSingingModel} width={20} height={20} alt={selectedModel?.name} /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-1 h-5 w-5"
          >
            {' '}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />{' '}
          </svg>
          <p className="text-[13px] text-[#FFFFFF80]">
            {`created ${dayjs(conversion?.date).utc(true).fromNow()} using `}
            <span
              className="cursor-pointer font-[500] text-white transition-colors duration-200 hover:text-[#FFFFFF80]"
              onClick={() => {
                onModelNameClick(conversion.model);
              }}
            >
              {conversion?.model?.name || conversion?.name}
            </span>
          </p>
        </div>
      )}

      {variant === 'primary' && (
        <div style={containerStyle} className="bg-[#FFFFFF0D] p-[16px]">
          <div style={waveformPlayerStyle} className="relative">
            <div className="flex w-full flex-col">
              <div className="relative flex flex-row items-center">
                <button
                  style={playButtonStyle}
                  ref={playButtonRef}
                  onClick={handleTogglePlay}
                  className="rounded-lg bg-transparent text-[24px] transition-all duration-100 hover:bg-[#FFFFFF1A]"
                >
                  {playIcons}
                </button>
                <div className="relative ml-2 w-full">
                  <div style={waveformStyle} ref={waveformRef}></div>
                </div>
                {reset && (
                  <button className="ml-[10px]" onClick={reset}>
                    <svg
                      fill="none"
                      height="24"
                      viewBox="0 0 16 16"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.81803 4.81802 11.182 11.182M11.182 4.81802 4.81803 11.182"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {variant === 'secondary' && (
        <div className="flex w-full flex-row items-center rounded-[12px] bg-[#FFFFFF0D] p-[12px]">
          <Image
            src={imageUrl}
            width={170}
            height={170}
            alt="male pop artist"
            className="h-[100px] w-[100px] rounded-[12px] lg:h-[170px] lg:w-[170px]"
          />
          <div className="ml-[16px] w-full">
            <h1 className="text-[18px] font-[900] text-white">
              {artistName?.toUpperCase()}
            </h1>
            <p className="mt-[5px] text-[12px] font-[500] text-white">
              {modelType?.toUpperCase()}
            </p>
            <p className="mt-[5px] text-[12px] font-[500] text-[#FFFFFF4D]">
              {genre?.toUpperCase()}
            </p>
            <div style={waveformPlayerStyle} className="relative">
              <div className="flex w-full flex-col">
                <div className="relative flex flex-row items-center">
                  <button
                    style={playButtonStyle}
                    className="rounded-lg bg-transparent transition-all duration-100 hover:bg-[#FFFFFF1A]"
                    ref={playButtonRef}
                    onClick={handleTogglePlay}
                  >
                    {playIcons}
                  </button>
                  <div className="relative ml-2 w-full">
                    <div style={waveformStyle} ref={waveformRef}></div>
                  </div>
                </div>
              </div>
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
      )}
      {variant === 'tertiary' && (
        <div style={containerStyle} className="bg-[#FFFFFF0D] p-[16px]">
          <div style={waveformPlayerStyle} className="relative">
            <div className="flex w-full flex-col">
              <div className="relative flex flex-row items-center">
                <button
                  style={playButtonStyle}
                  className="rounded-lg bg-transparent transition-all duration-100 hover:bg-[#FFFFFF1A]"
                  ref={playButtonRef}
                  onClick={handleTogglePlay}
                >
                  {playIcons}
                </button>
                <div className="relative ml-2 mr-[10px] w-full">
                  <div style={waveformStyle} ref={waveformRef}></div>
                </div>
                <a download className="ml-[10px]" href={audioUrl}>
                  <svg
                    fill="none"
                    height="25"
                    viewBox="0 0 16 16"
                    width="25"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 9.66663V11.8889C13 12.1835 12.883 12.4662 12.6746 12.6745 12.4662 12.8829 12.1836 13 11.8889 13H4.11111C3.81643 13 3.53381 12.8829 3.32544 12.6745 3.11706 12.4662 3 12.1835 3 11.8889V9.66663"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.7779 6.88884 8.00007 9.66663 5.22229 6.88884"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 9.66663V2.99995"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${window.location.host}/conversions/${conversionId}`
                    )
                  }
                  className="ml-[10px]"
                >
                  <svg
                    fill="none"
                    height="19"
                    viewBox="0 0 17 16"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.008 8.66666C7.2943 9.04942 7.65957 9.36612 8.07903 9.59529 8.49849 9.82446 8.96233 9.96074 9.4391 9.99489 9.91586 10.029 10.3944 9.96024 10.8422 9.79318 11.2901 9.62613 11.6967 9.36471 12.0347 9.02666L14.0347 7.02666C14.6419 6.39799 14.9778 5.55598 14.9702 4.68199 14.9626 3.808 14.6121 2.97196 13.9941 2.35394 13.376 1.73591 12.54 1.38535 11.666 1.37775 10.792 1.37016 9.95 1.70614 9.32133 2.31333L8.17466 3.45333"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.67465 7.33334C9.38835 6.95058 9.02308 6.63388 8.60362 6.40471 8.18416 6.17554 7.72031 6.03926 7.24355 6.00511 6.76679 5.97097 6.28826 6.03976 5.84042 6.20681 5.39258 6.37387 4.98591 6.63529 4.64799 6.97334L2.64799 8.97334C2.04079 9.60201 1.70481 10.444 1.71241 11.318 1.72 12.192 2.07056 13.028 2.68859 13.6461 3.30662 14.2641 4.14266 14.6147 5.01665 14.6222 5.89064 14.6298 6.73265 14.2939 7.36132 13.6867L8.50132 12.5467"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {variant === 'quaternary' && (
        <div
          className={`relative flex w-full flex-row items-center rounded-lg px-[8px] py-[4px] ${loading ? 'animate-pulse' : ''
            } bg-[#FFFFFF14]`}
          style={{
            background:
              'radial-gradient(94.12% 1915.46% at 50.09% 0%, #6529b9bf 0%, #241048 50%, #000000 100%)',
          }}
        >
          <div style={waveformPlayerStyle} className="relative">
            <div className="flex w-full flex-col">
              <div className="relative flex flex-row items-center">
                {loading ? (
                  <div className="ml-2 animate-spin">
                    <svg
                      fill="none"
                      height="16"
                      stroke="#fff"
                      transform="matrix(1.35 0 0 1.35 0 0)"
                      viewBox="0 0 16 16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m14 8c0 3.3137-2.6863 6-6 6-3.31371 0-6-2.6863-6-6 0-3.31371 2.68629-6 6-6 3.3137 0 6 2.68629 6 6z"
                        opacity=".15"
                      />
                      <path
                        d="m14 8c0 3.3137-2.6863 6-6 6-3.31371 0-6-2.6863-6-6 0-3.31371 2.68629-6 6-6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <button
                    className="duration-600 rounded-sm bg-transparent text-[24px] transition-all hover:bg-[#FFFFFF1A]"
                    style={playButtonStyle}
                    ref={playButtonRef}
                    onClick={handleTogglePlay}
                  >
                    {playIcons}
                  </button>
                )}
                <div className="relative ml-1 w-full pt-2 sm:ml-2 sm:pr-3">
                  <div
                    style={waveformStyle}
                    ref={waveformRef}
                    className={`transition-all duration-1000 ${!loading ? 'opacity-1' : 'opacity-0'
                      }`}
                  ></div>
                </div>
                {/* <a download className="ml-3 p-1.5 text-[22px] text-white bg-transparent hover:bg-[#FFFFFF1A] rounded-lg transition-all duration-100" href={src}>
                   <HiOutlineDownload className='text-white' />
                 </a>
                 <button onClick={() => navigator.clipboard.writeText(`${window.location.host}/conversions/${conversionId}`)}
                   className="ml-1 p-1.5 text-[22px] text-white bg-transparent hover:bg-[#FFFFFF1A] rounded-lg transition-all duration-100"
                 >
                   <HiLink className='text-white' />
                 </button>
                  */}
              </div>
            </div>
          </div>
        </div>
      )}
      {variant === 'quinary' && (
        <div
          className={`relative flex w-full flex-row items-center rounded-lg px-[8px] py-[4px] ${loading ? 'animate-pulse' : ''
            } position-relative bg-[#FFFFFF14] transition-all duration-500`}
        >
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'
              } rounded-lg`}
            style={{ background: '#FFFFFF14' }}
          ></div>
          <div style={waveformPlayerStyle} className="relative">
            <div className="flex w-full flex-col">
              <div className="relative flex flex-row items-center">
                {loading ? (
                  <div className="ml-2 animate-spin">
                    <svg
                      fill="none"
                      height="16"
                      stroke="#fff"
                      transform="matrix(1.35 0 0 1.35 0 0)"
                      viewBox="0 0 16 16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m14 8c0 3.3137-2.6863 6-6 6-3.31371 0-6-2.6863-6-6 0-3.31371 2.68629-6 6-6 3.3137 0 6 2.68629 6 6z"
                        opacity=".15"
                      />
                      <path
                        d="m14 8c0 3.3137-2.6863 6-6 6-3.31371 0-6-2.6863-6-6 0-3.31371 2.68629-6 6-6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <button
                    className="duration-600 rounded-sm bg-transparent text-[24px] transition-all hover:bg-[#FFFFFF1A]"
                    style={playButtonStyle}
                    ref={playButtonRef}
                    onClick={handleTogglePlay}
                  >
                    {playIcons}
                  </button>
                )}
                <div className="relative ml-1 w-full pt-2 sm:ml-2">
                  <div
                    style={waveformStyle}
                    ref={waveformRef}
                    className={`transition-all duration-1000 ${!loading ? 'opacity-1' : 'opacity-0'
                      }`}
                  ></div>
                </div>

                {!hideDownloadButton && (
                  <a
                    download
                    className="group ml-0 rounded-sm bg-transparent p-[7px] text-[22px] text-white transition-all duration-100 hover:bg-[#FFFFFF1A] sm:ml-2"
                    href={audioUrl}
                  >
                    <HiOutlineDownload className="text-white transition-all duration-300 group-hover:scale-90" />
                  </a>
                )}

                {!hideLinkButton && conversion && (
                  <button
                    className="group rounded-sm bg-transparent p-[7px] text-[22px] text-white transition-all duration-100 hover:bg-[#FFFFFF1A]"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${window.location.host}/conversions/${conversion.id}`
                      )
                    }
                  >
                    <HiLink className="text-white transition-all duration-300 group-hover:scale-90" />
                  </button>
                )
                //  : (
                //   <button
                //     className="group rounded-sm bg-transparent p-[7px] text-[22px] text-white transition-all duration-100 hover:bg-[#FFFFFF1A]"
                //     onClick={() => navigator.clipboard.writeText(audioUrl)}
                //   >
                //     <HiLink className="text-white transition-all duration-300 group-hover:scale-90" />
                //   </button>
                // )
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaveformAudioPlayer;
