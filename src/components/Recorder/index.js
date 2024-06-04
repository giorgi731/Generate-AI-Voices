import React, { useState, useEffect, useMemo } from 'react';
import Recording from './Recording';
import { ReactMic } from '~/lib/react-mic/index';
import BoxHeaderActions from './HeaderActions';
import BoxHeaderDetails from './HeaderDetails';
import CountUpTimer from '~/lib/react-mic/custom-hooks/CountUpTimer';
import { FingerprintIcon, WandIcon } from 'lucide-react';
import Button from '~/core/ui/Button';
import { LoaderIcon } from 'lucide-react';

const visualizerGradient = (ctx) => {
  const gradient = ctx.createLinearGradient(0, 50, 640, 50);
  gradient.addColorStop(0, '#b721ff');
  gradient.addColorStop(1, '#21d4fd');

  return gradient;
};

export default function Recorder({
  seconds: maxTime,
  hasStarted,
  isLoading,
  onSubmittedRecording,
}) {
  const [status, setStatus] = useState('Start');
  const [stillRecording, setStillRecording] = useState(false);
  const [totalTime, setTotalTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(null);
  const [hasRecording, setHasRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(null);
  const [recordedTime, setRecordedTime] = useState(null);

  const time = {
    seconds: 30,
  };

  const {
    seconds,
    minutes,
    start: startTimer,
    pause: pauseTimer,
    restart: restartTimer,
  } = CountUpTimer({
    time,
    onExpire: (time) => {
      if (!recordedTime) {
        setRecordedTime(time);
        setStillRecording(false);
      }
    },
  });

  const onStop = (recordedBlob) => {
    const { blobURL } = recordedBlob;
    setRecordedBlob(recordedBlob);
    setRecording(blobURL);
    setHasRecording(true);
  };

  const setTimeInverval = () => {
    const time = new Date();
    const seconds = parseInt(maxTime, 10);
    time.setSeconds(time.getSeconds() + seconds);
    restartTimer(time);
  };

  const startRecording = () => {
    setTimeInverval();
    setStillRecording(true);
    startTimer();
    setStatus('Recording');
  };

  const stopRecording = () => {
    setStillRecording(false);
    pauseTimer();
    setStatus('Recording pause');
  };

  const startPlaying = () => {
    if (isPlaying === null) {
      restartTimer(recordedTime);
    } else {
      startTimer();
    }

    setIsPlaying(true);
    setStatus('Recording playing');
  };

  const stopPlaying = ({ end }) => {
    if (end) {
      restartTimer(recordedTime);
    }

    pauseTimer();
    setIsPlaying(false);
    setStatus('Recording pause');
  };

  const timeGen = (seconds = 0, minutes = 0) => {
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  useEffect(() => {
    if (hasStarted) startRecording();
  }, [hasStarted]);

  useEffect(() => {
    const totalTime = timeGen(time.seconds, time.minutes);
    setTotalTime(totalTime);
  }, [time]);

  useEffect(() => {
    const totalTime = timeGen(seconds, minutes);
    setTimeSpent(totalTime);
  }, [seconds, minutes]);

  return (
    <div className="flex flex-col">
      {/* <div className="flex justify-between w-full mb-2">
        <BoxHeaderDetails
          status={status}
          timeSpent={timeSpent}
          totalTime={totalTime}
        />
      </div> */}
      <div className="flex flex-col items-center justify-center flex-auto">
        <div className="flex items-center justify-center w-full">
          {hasRecording ? (
            <Recording
              recording={recording}
              isPlaying={isPlaying}
              startPlaying={startPlaying}
              stopPlaying={stopPlaying}
            />
          ) : (
            <ReactMic
              record={stillRecording}
              onStop={onStop}
              visualSetting="sinewave"
              strokeColor={visualizerGradient}
              backgroundColor="#0a0118"
              mimeType="audio/mp3"
              className="border-2 border-gray-200 box__recorder rounded-md dark:border-black-500"
              echoCancellation={true}
              autoGainControl={true}
              noiseSuppression={true}
            />
          )}
        </div>
        {hasRecording && (
          <div className="flex justify-end w-full mt-10">
            <div className="w-[150px] rounded-3xl bg-gradient-radial p-[2px]">
              <div className="back flex h-full w-full flex-col items-center justify-center rounded-3xl bg-[rgba(0,0,0,_60%)] px-[40px] backdrop-blur-[30px] backdrop-filter">
                <Button
                  onClick={() => {
                    onSubmittedRecording(recordedBlob);
                  }}
                  disabled={isLoading}
                  className="p-0 text-white bg-transparent font-custom hover:bg-transparent"
                >
                  {isLoading && (
                    <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />
                  )}
                  <span id="rewardId" />
                  Revocalize
                </Button>
              </div>
            </div>
          </div>
        )}
        <BoxHeaderActions
          hasRecording={hasRecording}
          recording={recording}
          stillRecording={stillRecording}
          stopRecording={stopRecording}
        />
      </div>
    </div>
  );
}

function pad(n) {
  return n < 10 ? '0' + n : n;
}
