'use client';
import { useEffect, useState } from 'react';
import { Metadata } from 'next';
import {
  // FingerprintIcon,
  // History,
  LoaderIcon,
  // MicIcon,
  // SunIcon,
  // UploadIcon,
} from 'lucide-react';

import { Button } from '~/components/ui/button';
import rotateRightIcon from '~/../public/images/rotate-right.svg';
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from '~/components/ui/hover-card';
// import { Separator } from '~/components/ui/separator';
// import { Textarea } from '~/components/ui/textarea';
// import { CodeViewer } from './components/code-viewer';
// import { Icons } from './components/icons';
import { Label } from '~/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { MaxLengthSelector } from './components/maxlength-selector';
import { ModelSelector } from './components/model-selector';
import { DropdownSelector } from './components/dropdrown-selector';
import exportIcon from '~/../public/images/export.svg';
import documentIcon from '~/../public/images/document-upload.svg';
import micIcon from '~/../public/images/Mic.svg';
import miniMusicIcon from '~/../public/images/mini-music-sqaure.svg';
import { KeyAlgorithm, presets as keyAlgorithmPresets } from './data/algorithms';
// import { PresetActions } from './components/preset-actions';
// import { PresetSave } from './components/preset-save';
// import { PresetSelector } from './components/preset-selector';
// import { TopPSelector } from './components/top-p-selector';
// import { PresetShare } from './components/preset-share';
import { TemperatureSelector } from './components/temperature-selector';
import { Model, types } from './data/models';
// import { presets } from './data/presets';
import Image from 'next/image';
// import { FireIcon } from '@heroicons/react/24/outline';
// import { WandIcon } from 'lucide-react';
// import { UploadCloudIcon } from 'lucide-react';
import { Switch } from '~/components/ui/switch';
import { useDropzone } from 'react-dropzone';
import { useReward } from 'react-rewards';

import Microphone from '~/components/Microphone';
import Recorder from '~/components/Recorder/index';
import useGetModels from '~/lib/models/hooks/use-get-models';
import useUserId from '~/core/hooks/use-user-id';
// import { ScrollArea } from '@radix-ui/react-scroll-area';
// import { AlbumArtwork } from '../tasks/components/album-artwork';
// import { ScrollBar } from '~/components/ui/scroll-area';
import useGetAudioConversions from '~/lib/audio_conversions/hooks/use-get-audio-conversions';
import { deductOrganizationBalance } from '~/lib/user/database/mutations';
import useSupabase from '~/core/hooks/use-supabase';
import fileFromatIcon from '~/../public/images/file-format.svg';
import closeCircle from '~/../public/images/close-circle.svg';
import useCreateAudioConversions from '~/lib/audio_conversions/hooks/use-create-audio-conversion';
import WaveformAudioPlayer from '../components/WaveformAudioPlayer';
// import axios from 'axios';
// import "./styles.css"

// export const metadata: Metadata = {
//   title: "Playground",
//   description: "The OpenAI Playground built using the components.",
// }

const AudioHistoryItem = ({ audioConversion, handleReuseModel }: any) => {
  return (
    <div className="relative m-[10px] w-full rounded-[12px] bg-[#1f1d2d] px-[24px] py-[16px] lg:w-[calc(100%/2-20px)]">
      <div className="flex flex-row items-center justify-between">
        <p>{audioConversion?.model.name}</p>
        <svg
          className="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="3"
          height="15"
          viewBox="0 0 3 15"
          fill="none"
        >
          <circle cx="1.42026" cy="1.42026" r="1.42026" fill="white" />
          <circle cx="1.42026" cy="7.1019" r="1.42026" fill="white" />
          <circle cx="1.42026" cy="12.7816" r="1.42026" fill="white" />
        </svg>
      </div>
      <div className=" mt-[8px] flex flex-row items-center justify-between">
        <p>Duration: 02:43</p>
        <p>23/06/2023</p>
      </div>
      <button
        onClick={() => {
          handleReuseModel(audioConversion);
        }}
        className="flex items-center justify-center w-full px-2 py-1 mt-2 text-sm text-white rounded-sm bg-gradient-radial"
      >
        reuse same model
      </button>
      {/* {showReuseModelModal && (
      )} */}
    </div>
  );
};

export default function PlaygroundPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { reward, isAnimating } = useReward('rewardId', 'confetti');
  const client = useSupabase();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [showButton, setShowButton] = useState<any>(false);
  const [selectedAudio, setSelectedAudio] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const audioConversions = useGetAudioConversions();

  const [hasStarted, setHasStarted] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const start = async () => {
    if (!hasPermission) {
      await getPermission(() => {
        setHasStarted(true);
      });
    }
  };
  const getPermission = (onSuccessFn: any) => {
    return navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then(() => {
        setHasPermission(true);
        onSuccessFn();
      })
      .catch((err) => {
        setHasPermission(false);
        console.log(err);
      });
  };

  const modelsData = useGetModels();
  const [model, setModel] = useState<any>(null);
  const [transpose, setTranspose] = useState<any>(0);
  const [algorithm, setAlgorithm] = useState<any>('dio');
  const [isolateVocals, setIsolateVocals] = useState(false);
  const [generations_count, setGenerationsCount] = useState(1);
  const [taskId, setTaskId] = useState(null);

  // Harmony
  const [harmony, setHarmony] = useState<any>('off');
  const [harmonyRootKey, setHarmonyRootKey] = useState('C');
  const [harmonyScale, setHarmonyScale] = useState('major');
  const [harmonyType, setHarmonyType] = useState('upper');
  const [clear, setClear] = useState(false);

  const [audioLength, setAudioLength] = useState<any>(null);
  const [audioLengthSeconds, setAudioLengthSeconds] = useState<any>(null);
  const [taskStatus, setTaskStatus] = useState<any>(null);
  const userId = useUserId();
  const createAudioConversions = useCreateAudioConversions(userId);
  const [uploadProgress, setUploadProgress] = useState<any>(null);

  useEffect(() => {
    let intervalId: any;
    if (taskId) {
      const fetchTaskStatus = async () => {
        try {
          const res = await fetch(`/api/check-task/${taskId}`);
          const data = await res.json();
          setTaskStatus(data);
          setIsLoading(false);

          if (data.status !== 'in_progress') clearInterval(intervalId);

          if (data.status == 'completed') reward();
        } catch (error) {
          console.error(error);
        }
      };
      // Call fetchTaskStatus immediately
      fetchTaskStatus();

      intervalId = setInterval(() => {
        fetchTaskStatus();
      }, 2000); // Fetch task status every 2 seconds (2000 milliseconds)
    }

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [taskId]);

  useEffect(() => {
    const createAudioConversionsF = async () => {
      await createAudioConversions.trigger({
        user_id: userId,
        date: new Date().toISOString(),
        duration: audioLength,
        name: selectedFile?.name,
        input_url: taskStatus?.input_audio_url,
        model_id: taskStatus?.model_id,
        options: {
          pitch: 'test1',
          style: 'test2',
          vocal: 'test3',
        },
        result: taskStatus?.output_audio_urls,
        cost: undefined
      });
    };

    if (taskStatus) {
      createAudioConversionsF();
    }
  }, [taskStatus]);

  const onDrop = (acceptedFiles: any) => {
    setSelectedFile(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // @ts-ignore:next-line
    accept: '.wav,.mp3,.ogg,.aiff',
  });

  const handleStartGeneration = async (file: any) => {
    if (!file) {
      setErrorMessage('Please provide a valid audio file.');
      return;
    }
    setErrorMessage('');

    reward();

    const formData = new FormData();
    formData.append('audio', file);
    if (model?.id) formData.append('model', model?.id);
    if (transpose !== undefined)
      formData.append('transpose', transpose.toString());
    if (algorithm) formData.append('algorithm', algorithm);
    if (isolateVocals !== undefined)
      formData.append('isolateVocals', isolateVocals.toString());
    if (generations_count !== undefined)
      formData.append('generations_count', generations_count.toString());
    if (harmony)
      formData.append(
        'harmony',
        JSON.stringify({
          root_key: harmonyRootKey,
          scale: harmonyScale,
          type: harmonyType,
        })
      );
    if (model && model?.is_rvc)
        formData.append('is_rvc', model?.is_rvc.toString());
        
    try {
      setIsLoading(true);
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMTEyMzQ1IiwiaWF0IjoxNjgyMzQxNjIyfQ.J1tKZY2yk-StXtTHHkHlnWBw__ZCdFzysoh35LPfBPs' },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { task_id } = data;

        setTaskId(task_id);

        await deductOrganizationBalance(client, {
          balance: Math.floor(Number((Number(audioLengthSeconds) / 60).toPrecision(2)) * model?.cost),
          id: userId,
        });
        // go to `/tasks/${task_id}`
        // window.location.href = `/tasks/${task_id}`;
      } else {
        setIsLoading(false);
        setErrorMessage('Error uploading audio file. Please try again.');
      }

      // if (response.ok) {
      //   const data = await response.json();
      //   const { task_id } = data;

      //   await deductUserBalance(client, {
      //     balance: Math.floor((Number(audioLengthSeconds) / 60) * model?.cost),
      //     id: userId,
      //   });
      //   // go to `/tasks/${task_id}`
      //   // window.location.href = `/tasks/${task_id}`;
      // } else {
      //   setIsLoading(false);
      //   setErrorMessage('Error uploading audio file. Please try again.');
      // }
    } catch (error) {
      setErrorMessage('Error uploading audio file. Please try again.');
    }
  };

  useEffect(() => {
    if (selectedFile) {
      const audio = new Audio(URL.createObjectURL(selectedFile));

      audio.onloadedmetadata = async () => {
        const durationInMinutes = Math.floor(audio.duration / 60) as any;
        const seconds = Math.floor(audio.duration % 60);
        const timeFormatted = `${String(durationInMinutes).padStart(
          2,
          '0'
        )}:${String(seconds).padStart(2, '0')}`;
        setAudioLength(timeFormatted);
        setAudioLengthSeconds(audio.duration);
      };
    }
  }, [selectedFile]);

  const handleReuseModel = (modelData: any) => {
    setModel(modelData.model);
    setSelectedAudio(modelData);
    setShowButton(true);
  };

  return (
    <>
      <div className="flex flex-col h-full ">
        <div className="flex flex-col items-start justify-between space-y-2 py-10 sm:flex-row sm:items-center sm:space-y-0 bg-[#160E24] rounded-xl b-0">
          <div className="container flex mx-auto">
            <div className="w-1/2">
              <h2 className="mb-4 text-2xl font-semibold whitespace-nowrap font-custom">
                My AI Voices
              </h2>

              <p className='text-sm'>
                Your library of AI voice models made on Revocalize AI.
                <br></br>Go to <a href="/create-ai-voice">Create an AI Voice</a> to create and share your own voice now.
              </p>
              <ModelSelector
                className="pr-24 mt-5"
                expandBelow={true}
                hideLabel={true}
                types={types}
                models={modelsData?.data}
                clear={clear}
                model={model}
                onValueChange={(value: any) => {
                  console.log(`Is RVC: ${value.is_rvc}`);
                  setModel(value);
                }}
              />
            </div>

            <div className="w-1/2">
              <p> this is the model details </p>  
            </div>

          </div>

        </div>
        <Tabs defaultValue="upload" className="flex-1">
          <div className="container h-full py-6">
            <div className="mb-5 mt-[50px] flex w-full flex-col items-center pt-3 lg:mt-0 lg:flex-row lg:justify-between">
              <TabsList className="flex flex-col h-12 lg:flex-row">
                <TabsTrigger value="upload">
                  {/* <UploadIcon className="w-4 h-4 mr-2" /> */}
                  <Image src={documentIcon} alt="document icon" />
                  <p className="ml-[10px]">Upload audio</p>
                </TabsTrigger>
                <TabsTrigger value="record">
                  <Image src={micIcon} alt="microphone icon" />
                  <span className="ml-[10px]">Record audio</span>
                </TabsTrigger>
                <TabsTrigger value="audio">
                  <Image src={miniMusicIcon} alt="mini music icon" />
                  <span className="ml-[10px]">Audio history</span>
                </TabsTrigger>
              </TabsList>
              <div className="mt-[100px] flex flex-row items-center lg:mt-0">
                <h2 className="text-[24px] font-bold">Audio Settings</h2>
                <button
                  className="flex items-center"
                  onClick={() => {
                    setClear((prev) => !prev);
                    setHarmony('off');
                  }}
                >
                  <p className="ml-[65px] mr-[10px] text-[16px] font-semibold">
                    Reset
                  </p>
                  <Image src={rotateRightIcon} alt="rotate right icon" />
                </button>
              </div>
            </div>
            <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_300px]">
              <div className="flex flex-col order-1 sm:flex md:order-2">
                <div className="flex-col items-center justify-center rounded-[12px] bg-gradient-radial-transparent p-[1px] text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-gradient-radial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:flex">
                  <div className="back flex h-full w-full flex-col justify-center rounded-[12px] bg-[#160E24] p-[30px] text-white">
                    <ModelSelector
                      types={types}
                      models={modelsData?.data}
                      clear={clear}
                      model={model}
                      onValueChange={(value: any) => {
                        setModel(value);
                      }}
                    />
                    <TemperatureSelector
                      clear={clear}
                      defaultValue={[0]}
                      onValueChange={(value) => {
                        setTranspose(value);
                      }}
                    />
                    <MaxLengthSelector
                      clear={clear}
                      defaultValue={[1]}
                      onValueChange={(value) => {
                        setGenerationsCount(value);
                      }}
                    />
                    <DropdownSelector
                      className="hidden"
                      clear={clear}
                      label="Algorithm"
                      options={keyAlgorithmPresets}
                      onValueChange={(value: any) => {
                        setAlgorithm(value.id);
                      }}
                    />
                    {/* <div className="grid gap-2 pt-3">
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Key detection algorithm
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[320px] text-sm" side="left">
                      Choose the key dection algorithm to use. The options are: 
                      <ul>
                        <li><b>Dio</b> – balanced pitch tracking and pronunciation.</li>
                        <li><b>Crepe</b> – notes are more stable, but has more mispronunciations.</li>
                        <li><b>Parsel/Harvest</b> – more natural tone of voice, but matches the input pitch less.</li>
                      </ul>
                    </HoverCardContent>
                  </HoverCard>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="complete">
                      <span className="sr-only">Complete</span>
                      <SunIcon className="w-5 h-5" />
                    </TabsTrigger>
                    <TabsTrigger value="insert">
                      <span className="sr-only">Insert</span>
                      <WandIcon className="w-5 h-5" />
                    </TabsTrigger>
                    <TabsTrigger value="edit">
                      <span className="sr-only">Edit</span>
                      <FireIcon className="w-5 h-5" />
                    </TabsTrigger>
                  </TabsList>
                </div> */}
                    <div className="my-[15px] flex place-content-between items-center space-x-2 pt-2">
                      <Label htmlFor="isolate-vocals">Clean Vocals</Label>
                      <Switch id="isolate-vocals" />
                    </div>
                    <DropdownSelector
                      clear={clear}
                      label="Harmony"
                      options={[
                        { id: 'off', name: 'Off' },
                        { id: '3rd', name: '3rd Harmony' },
                      ]}
                      onValueChange={(value: any) => {
                        setHarmony(value.id);
                      }}
                      hideHoverCard={true}
                    />

                    {harmony !== 'off' && (
                      <>
                        <DropdownSelector
                          clear={clear}
                          label="Root Key"
                          options={[
                            { id: 'C', name: 'C' },
                            { id: 'C# / Db', name: 'C# / Db' },
                            { id: 'D', name: 'D' },
                            { id: 'D# / Eb', name: 'D# / Eb' },
                            { id: 'E', name: 'E' },
                            { id: 'F', name: 'F' },
                            { id: 'F# / Gb', name: 'F# / Gb' },
                            { id: 'G', name: 'G' },
                            { id: 'G# / Ab', name: 'G# / Ab' },
                            { id: 'A', name: 'A' },
                            { id: 'A# / Bb', name: 'A# / Bb' },
                            { id: 'B', name: 'B' },
                          ]}
                          onValueChange={(value: any) => {
                            setHarmonyRootKey(value.id);
                          }}
                          hideHoverCard={true}
                        />
                        <DropdownSelector
                          clear={clear}
                          label="Scale"
                          options={[
                            { id: 'major', name: 'Major' },
                            { id: 'minor', name: 'Minor' },
                          ]}
                          onValueChange={(value: any) => {
                            setHarmonyScale(value.id);
                          }}
                          hideHoverCard={true}
                        />
                        <DropdownSelector
                          clear={clear}
                          label="Harmony Type"
                          options={[
                            { id: 'upper', name: 'Upper' },
                            { id: 'lower', name: 'Lower' },
                          ]}
                          onValueChange={(value: any) => {
                            setHarmonyType(value.id);
                          }}
                          hideHoverCard={true}
                        />
                      </>
                    )}
                  </div>
                  {/* <TopPSelector defaultValue={[0.9]} /> */}
                </div>
                <div className="flex flex-col items-center mt-10 space-x-2 lg:hidden">
                  {selectedFile && model?.cost && (
                    <p className="flex w-full text-center text-[10px] font-normal text-[#E0E1E6] lg:text-left lg:text-[16px]">
                      Uploaded file length {audioLength} - Generation cost{' '}
                      <span className="ml-2 font-bold text-[#30DAFF]">
                        {model?.cost} credits
                      </span>
                    </p>
                  )}

                  {selectedFile && model && (
                    <div className="mt-5 flex h-[44px] w-full justify-end">
                      <div className="w-[150px] rounded-3xl bg-gradient-radial p-[2px]">
                        <div className="back flex h-full w-full flex-col items-center justify-center rounded-3xl bg-[rgba(0,0,0,_60%)] px-[40px] backdrop-blur-[30px] backdrop-filter">
                          <Button
                            onClick={() => handleStartGeneration(selectedFile)}
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
                  {selectedAudio && model && (
                    <div className="flex justify-end w-full">
                      <div className="w-[150px] rounded-3xl bg-gradient-radial p-[2px]">
                        <div className="back flex h-full w-full flex-col items-center justify-center rounded-3xl bg-[rgba(0,0,0,_60%)] px-[40px] backdrop-blur-[30px] backdrop-filter">
                          <Button
                            onClick={async () => {
                              const response = await fetch(
                                selectedAudio?.input_url
                              );
                              const audioData = await response.blob();
                              handleStartGeneration(audioData);
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

                  {!model && (
                    <div className="flex h-[44px] w-full justify-end lg:hidden">
                      <div className="h-full w-[150px] p-[2px]">
                        <div className="flex h-full back">
                          <Button className=" h-full rounded-[40px] border-[2px] border-[#716784] bg-transparent p-0 px-[40px] py-[10px] font-custom text-[#716784] hover:bg-transparent">
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
                </div>
              </div>
              <div className="md:order-1">
                <TabsContent value="upload" className="p-0 mt-0 border-0">
                  <div className="flex flex-col h-full space-y-4">
                    {isLoading ? (
                      <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
                        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                          <LoaderIcon className="w-10 h-10 animate-spin text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-semibold animate-pulse">
                            Revocalizing your voice using our AI magic...
                          </h3>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {selectedFile && (
                          <div className="group flex h-[450px] shrink-0 cursor-pointer items-center justify-center rounded-md border border-dashed border-primary-950 transition-all duration-300 hover:scale-95 hover:border-double hover:border-primary-800 dark:bg-purple-950/10">
                            <div className="group flex w-full cursor-pointer flex-col px-2 text-center lg:px-[86px]">
                              <div className="flex flex-col items-center">
                                <Image src={exportIcon} alt="export icon" />
                                <h3 className="mt-4 text-lg font-semibold transition-colors duration-300 dark:group-hover:text-white">
                                  Drag & drop your audio file
                                </h3>
                                <p className="mb-4 mt-2 text-[16px] text-[#AAADB3] text-muted-foreground">
                                  Supported formats:
                                </p>
                                <div className="mb-[50px] flex flex-row">
                                  <div className=" items-center justify-center rounded-[4px] bg-primary bg-gradient-radial p-[1px] text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    <div className="back flex flex-col items-center justify-center rounded-[4px] bg-[#160E24] px-[15px] py-[5px] text-white">
                                      .mp3
                                    </div>
                                  </div>
                                  <div className=" ml-[15px] items-center justify-center rounded-[4px] bg-primary bg-gradient-radial p-[1px] text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    <div className="back flex flex-col items-center justify-center rounded-[4px] bg-[#160E24] px-[15px] py-[5px] text-white">
                                      .ogg
                                    </div>
                                  </div>
                                  <div className=" ml-[15px] items-center justify-center rounded-[4px] bg-primary bg-gradient-radial p-[1px] text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    <div className="back flex flex-col items-center justify-center rounded-[4px] bg-[#160E24] px-[15px] py-[5px] text-white">
                                      .aiff
                                    </div>
                                  </div>
                                  <div className="ml-[15px] items-center justify-center rounded-[4px] bg-primary bg-gradient-radial p-[1px] text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    <div className="back flex w-full flex-col items-center justify-center rounded-[4px] bg-[#160E24] px-[15px] py-[5px] text-white">
                                      .wav
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {selectedFile && (
                                <div className="flex items-center rounded-3xl bg-gradient-to-br from-yellow-500  via-purple-500 to-cyan-500 p-0.5">
                                  <div className="back flex h-full w-full flex-col justify-center rounded-3xl bg-[#160E24] px-[20px] py-[15px] lg:px-[40px]">
                                    <div className="flex flex-row items-center w-full">
                                      <div>
                                        <Image
                                          src={fileFromatIcon}
                                          alt="file icon"
                                        />
                                      </div>
                                      <div className="ml-[20px] w-full items-center">
                                        <div className="flex flex-row items-center justify-between w-full">
                                          <div className="text-left text-[10px] font-bold text-white lg:text-lg">
                                            {/* @ts-ignore:next-line */}
                                            {selectedFile.name}
                                          </div>
                                          <button
                                            onClick={() =>
                                              setSelectedFile(null)
                                            }
                                          >
                                            <Image
                                              src={closeCircle}
                                              alt="file icon"
                                              className="ml-0"
                                            />
                                          </button>
                                        </div>
                                        <div className="flex flex-row items-center justify-between w-full">
                                          <p className="text-sm font-semibold text-left text-gray-500">
                                            {(
                                              selectedFile?.size /
                                              (1024 * 1024)
                                            ).toFixed(2)}
                                            MB - 15 seconds left
                                          </p>
                                          <p className="text-[#AAADB3]">100%</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="my-[19px] h-[1px] w-full bg-[#231d33]" />
                                    <div className="relative">
                                      <div className="absolute left-0 top-0 h-[6px] w-full rounded-[40px] bg-[#231d33]" />
                                      <div className="absolute left-0 top-0 h-[6px] w-full rounded-[40px] bg-gradient-radial" />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {!selectedFile && (
                                <button className="relative inline-flex items-center justify-center px-3 text-sm font-medium transition-colors rounded-md h-9 bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4 mr-2"
                                  >
                                    <line x1={12} x2={12} y1={5} y2={19} />
                                    <line x1={5} x2={19} y1={12} y2={12} />
                                  </svg>
                                  Browse files
                                </button>
                              )}
                              <button
                                type="button"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="radix-:r163:"
                                data-state="closed"
                              />

                              <input
                                type="file"
                                id="file-upload"
                                style={{ display: 'none' }}
                                accept=".wav,.mp3,.ogg,.aiff"
                                onChange={(e) => {
                                  if (
                                    e.target.files &&
                                    e.target.files.length > 0
                                  ) {
                                    onDrop(e.target.files);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        )}
                        {!selectedFile && (
                          <div
                            {...getRootProps()}
                            className="group flex h-[450px] shrink-0 cursor-pointer items-center justify-center rounded-md outline-dashed outline-[2px] outline-[#533c41]/60 transition-all duration-300 hover:scale-95 hover:border-double dark:bg-[#160E24]/40"
                          >
                            <input {...getInputProps()} />
                            <div className="group flex w-full cursor-pointer flex-col px-2 text-center  lg:px-[86px]">
                              <div className="flex flex-col items-center">
                                <Image src={exportIcon} alt="export icon" />
                                <h3 className="mt-4 text-[22px] font-semibold transition-colors duration-300 dark:group-hover:text-white">
                                  Drag & drop or{' '}
                                  <span className="text-[#59E1FF]">choose</span>{' '}
                                  your audio file
                                </h3>
                                <p className="mb-4 mt-2 text-[16px] text-[#AAADB3] text-muted-foreground">
                                  Supported formats:
                                </p>
                                <div className="mb-[50px] flex flex-row">
                                  <div className=" items-center justify-center rounded-[4px] bg-primary bg-gradient-radial p-[1px] text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    <div className="back flex flex-col items-center justify-center rounded-[4px] bg-[#160E24] px-[15px] py-[5px] text-white">
                                      .mp3
                                    </div>
                                  </div>
                                  <div className=" ml-[15px] items-center justify-center rounded-[4px] bg-primary bg-gradient-radial p-[1px] text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    <div className="back flex flex-col items-center justify-center rounded-[4px] bg-[#160E24] px-[15px] py-[5px] text-white">
                                      .ogg
                                    </div>
                                  </div>
                                  <div className=" ml-[15px] items-center justify-center rounded-[4px] bg-primary bg-gradient-radial p-[1px] text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    <div className="back flex flex-col items-center justify-center rounded-[4px] bg-[#160E24] px-[15px] py-[5px] text-white">
                                      .aiff
                                    </div>
                                  </div>
                                  <div className="ml-[15px] items-center justify-center rounded-[4px] bg-primary bg-gradient-radial p-[1px] text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    <div className="back flex w-full flex-col items-center justify-center rounded-[4px] bg-[#160E24] px-[15px] py-[5px] text-white">
                                      .wav
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* {!selectedFile && (
                                <button className="h-[104px] w-full items-center justify-center rounded-[12px] bg-primary bg-[radial-gradient(133.02%_176.97%_at_-20.56%_-17.05%,_#FEDC8F_0%,_#F16681_42.02%,_#A76DFA_70.78%,_#33D6FA_91.05%)] p-[1px] text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                  <div className="back flex h-full w-full flex-col items-center justify-center rounded-[12px] bg-[#160E24] p-[24px] text-[#30DAFF] underline">
                                    Upload your audio file
                                  </div>
                                </button>
                              )} */}
                              <button
                                type="button"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="radix-:r163:"
                                data-state="closed"
                              />

                              <input
                                type="file"
                                id="file-upload"
                                style={{ display: 'none' }}
                                accept=".wav,.mp3,.ogg,.aiff"
                                onChange={(e) => {
                                  if (
                                    e.target.files &&
                                    e.target.files.length > 0
                                  ) {
                                    onDrop(e.target.files);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      {selectedFile && model?.cost && (
                        <p className="hidden w-full text-[10px] font-normal text-[#E0E1E6] lg:flex lg:text-[16px]">
                          Uploaded file length {audioLength} - Generation cost{' '}
                          <span className="ml-2 font-bold text-[#30DAFF]">
                            {model?.cost} credits
                          </span>
                        </p>
                      )}
                      {/* <Button
                        variant="secondary"
                        onClick={() => {
                          window.location.href = '/tasks';
                        }}
                      >
                        <span className="sr-only">Show history</span>
                        <History className="w-4 h-4" />
                      </Button> */}
                      {selectedFile && model && (
                        <div className="justify-end hidden w-full lg:flex">
                          <div className="w-[150px] rounded-3xl bg-gradient-radial p-[2px]">
                            <div className="back flex h-full w-full flex-col items-center justify-center rounded-3xl bg-[rgba(0,0,0,_60%)] px-[40px] backdrop-blur-[30px] backdrop-filter">
                              <Button
                                onClick={() =>
                                  handleStartGeneration(selectedFile)
                                }
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

                      {!model && (
                        <div className="justify-end hidden w-full h-full lg:flex">
                          <div className="h-full w-[150px] p-[2px]">
                            <div className="flex h-full back">
                              <Button className=" h-full rounded-[40px] border-[2px] border-[#716784] bg-transparent p-0 px-[40px] py-[10px] font-custom text-[#716784] hover:bg-transparent">
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
                      {!selectedFile && model && (
                        <div className="flex justify-end w-full h-full">
                          <div className="h-full w-[150px] p-[2px]">
                            <div className="flex h-full back">
                              <Button className=" h-full rounded-[40px] border-[2px] border-[#716784] bg-transparent p-0 px-[40px] py-[10px] font-custom text-[#716784] hover:bg-transparent">
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
                      {errorMessage && (
                        <div className="mt-2 text-red-500">{errorMessage}</div>
                      )}
                    </div>
                    {taskStatus && (
                      <h2 className="text-[24px] font-semibold">
                        Generated Audio Results
                      </h2>
                    )}
                    {taskStatus?.output_audio_urls &&
                      taskStatus?.output_audio_urls.map(
                        (url: string, index: number) => (
                          <WaveformAudioPlayer key={index} src={url} />
                        )
                      )}
                  </div>
                </TabsContent>
                <TabsContent
                  value="record"
                  className="mt-0 rounded-[12px] border-[2px] border-dashed bg-[#160E24] px-0 py-[48px] lg:px-[79px]"
                >
                  <div className="flex flex-col space-y-4">
                    <div className="relative flex flex-col items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <g filter="url(#filter0_b_1164_7513)">
                          <path
                            d="M20 36.55C11.6 36.55 4.75 29.7167 4.75 21.3V18.1667C4.75 17.5167 5.28333 17 5.91667 17C6.55 17 7.08333 17.5333 7.08333 18.1667V21.3C7.08333 28.4167 12.8667 34.2 19.9833 34.2C27.1 34.2 32.8833 28.4167 32.8833 21.3V18.1667C32.8833 17.5167 33.4167 17 34.05 17C34.6833 17 35.2167 17.5333 35.2167 18.1667V21.3C35.25 29.7167 28.4 36.55 20 36.55Z"
                            fill="white"
                          />
                          <path
                            d="M20.0026 3.33398C14.4026 3.33398 9.83594 7.90065 9.83594 13.5007V21.3173C9.83594 26.9173 14.4026 31.484 20.0026 31.484C25.6026 31.484 30.1693 26.9173 30.1693 21.3173V13.5007C30.1693 7.90065 25.6026 3.33398 20.0026 3.33398ZM23.6359 17.6507C23.5193 18.1007 23.1026 18.4007 22.6526 18.4007C22.5693 18.4007 22.4693 18.384 22.3859 18.3673C20.6859 17.9007 18.8859 17.9007 17.1859 18.3673C16.6359 18.5173 16.0859 18.2007 15.9359 17.6507C15.7859 17.1173 16.1026 16.5507 16.6526 16.4007C18.7026 15.834 20.8693 15.834 22.9193 16.4007C23.4693 16.5507 23.7859 17.1007 23.6359 17.6507ZM25.0526 13.034C24.9026 13.4507 24.5193 13.7007 24.1026 13.7007C23.9859 13.7007 23.8693 13.684 23.7526 13.634C21.2026 12.7007 18.4026 12.7007 15.8526 13.634C15.3193 13.834 14.7359 13.5673 14.5359 13.034C14.3526 12.5173 14.6193 11.934 15.1526 11.734C18.1526 10.6507 21.4526 10.6507 24.4359 11.734C24.9693 11.934 25.2359 12.5173 25.0526 13.034Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_b_1164_7513"
                            x="-5.25"
                            y="-6.66602"
                            width="50.4648"
                            height="53.2158"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              flood-opacity="0"
                              result="BackgroundImageFix"
                            />
                            <feGaussianBlur
                              in="BackgroundImageFix"
                              stdDeviation="5"
                            />
                            <feComposite
                              in2="SourceAlpha"
                              operator="in"
                              result="effect1_backgroundBlur_1164_7513"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_backgroundBlur_1164_7513"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                      <p className="mb-5 text-[22px] font-medium">
                        Start recording audio
                      </p>
                      <div
                        className={`box-wrapper ${
                          hasStarted ? '' : 'box-wrapper--hidden'
                        }`}
                      >
                        <Recorder
                          seconds="30"
                          hasStarted={hasStarted}
                          isLoading={isLoading}
                          onSubmittedRecording={(blob: any) => {
                            setIsLoading(true);
                            // convert blob to file

                            console.log(blob, 'blog');
                            const file = new File(
                              [blob.blob],
                              'recording.mp3',
                              {
                                type: 'audio/mp3',
                              }
                            );

                            // console.log(file)
                            // const url = window.URL.createObjectURL(file);
                            // const a = document.createElement('a');
                            // a.style.display = 'none';
                            // a.href = url;
                            // // the filename you want
                            // a.download = 'recording.mp3';
                            // document.body.appendChild(a);
                            // a.click();
                            // window.URL.revokeObjectURL(url);

                            console.log(file)

                            onDrop([file]);
                            handleStartGeneration(file);
                          }}
                        />
                      </div>
                      {hasStarted ? null : <Microphone onClick={start} />}
                      {taskStatus && (
                        <h2 className="text-[24px] font-semibold">
                          Generated Audio Result
                        </h2>
                      )}
                      {taskStatus?.output_audio_urls &&
                        taskStatus?.output_audio_urls.map(
                          (url: string, index: number) => (
                            <WaveformAudioPlayer key={index} src={url} />
                          )
                        )}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="audio">
                  <div className="mt-0 h-[500px] overflow-y-scroll rounded-[12px] border-[2px] border-dashed bg-[#160E24] p-[10px] lg:p-[24px]">
                    <div className="flex flex-row flex-wrap">
                      {audioConversions?.data?.map((item, index) => {
                        return (
                          <AudioHistoryItem
                            key={index}
                            audioConversion={item}
                            handleReuseModel={handleReuseModel}
                          />
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
}
