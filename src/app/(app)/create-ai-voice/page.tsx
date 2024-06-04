'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppContainer from '../components/AppContainer';
import useCreateModel from '~/lib/models/hooks/use-create-model';
import useUserId from '~/core/hooks/use-user-id';
import useApiKey from '~/core/hooks/use-api-key';
import ModelVoiceType from '~/lib/models/types/model-voice-type';
import { useRouter } from 'next/navigation';
import { TbFileMusic, TbFileUpload, TbFileXFilled, TbFileCheck } from 'react-icons/tb';
import { BsX, BsFileImage } from 'react-icons/bs';
import { Progress } from '~/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import useGetOrganization from "~/lib/organizations/hooks/use-get-organization";
import useSupabase from '~/core/hooks/use-supabase';
import { deductOrganizationSlots } from '~/lib/user/database/mutations';
import { useDropzone } from 'react-dropzone';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';

function page() {
  const [step, setStep] = useState<any>(1);
  const client = useSupabase();
  const organization = useCurrentOrganization();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const userId = useUserId();
  // TODO: Remove this
  const adminUserId = '9239503e-f9cb-4cd5-9493-755dc12cbd4e'
  const priorityUsers = [
    "",
    // "cb646b53-1ed9-40d8-bf47-c7b5c56280dd",  // damon.sharpe@gmail.com
    // "b7f15461-b02a-45bf-898d-64aa6500a5f1", // 00eyal@gmail.com
    // "891fb6f7-e0e1-41ff-87d0-b01ea590e64c", // Thebeatlocker@gmail.com
    // "0d984031-5919-45c5-80a4-3e4cc10ef620", // Moga.marius@gmail.com
    // "79319572-4d6c-4129-9441-f1e0c9cb5ebe", // alextruta@gmail.com
    // "cb646b53-1ed9-40d8-bf47-c7b5c56280dd", // Damon.sharpe@gmail.com
    // "891fb6f7-e0e1-41ff-87d0-b01ea590e64c", // Thebeatlocker@gmail.com
    // "", // Teodora.blaj@demoga.com
    // "", // Sambo@demoga.com
  ]


  // const createModel = useCreateModel(userId);
  const apiKey = useApiKey();
  const [selectedTypes, setSelectedTypes] = useState<any>({
    rapping: false,
    singing: false,
    speaking: false,
    character: false,
    instrument: false
  })
  const [selectedLanguages, setSelectedLanguages] = useState<any>({
    english: false,
    spanish: false,
    korean: false,
    chinese: false,
    russian: false,
    portuguese: false,
    turkish: false,
    japanese: false,
    german: false
  })
  const [files, setFiles] = useState<any>([]);
  const [voiceName, setVoiceName] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [error, setError] = useState<any>(false);
  const [modelType, setModelType] = useState<any>('Starter');
  const imageRef = useRef() as any;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>(null);

  const handleUploadChange = async (e: any) => {
    const newFiles = e;
    console.log(newFiles, 'newFiles')
    let totalSize = files.reduce((total: number, file: any) => total + file.size, 0);
    for (const file of newFiles) {
      // Check if the file is an audio file
      if (!file.type.startsWith('audio/')) {
        alert('Invalid file type. Please upload an audio file.');
        return;
      }
      // Check if the file size is less than or equal to 300MB
      if (file.size > 300 * 1024 * 1024 && userId != adminUserId && !priorityUsers.includes(userId as string)) {
        alert('File size exceeds 300MB. Please upload a smaller file.');
        return;
      }
      // Check if the total size of all uploaded files is less than or equal to 300MB
      totalSize += file.size;
      if (totalSize > 300 * 1024 * 1024 && userId != adminUserId && !priorityUsers.includes(userId as string)) {
        alert('Total file size exceeds 300MB. Please upload smaller files.');
        return;
      }
    }
    console.log("New files: ", newFiles)
    // If all checks pass, add the files to the state
    setFiles((prev: any) => [...prev, ...newFiles.map((file: File) => ({ name: file.name, size: file.size, file: file, uploading: true, uploadProgress: 0, uploadError: false }))]);

    // Upload the new file/s to the S3 bucket
    newFiles.forEach(async (file: File) => {
      await uploadAudioToS3(file, file.name, file.type);
    });
  }
  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop: handleUploadChange,
    // @ts-ignore:next-line
    accept: {
      'audio/mp3': ['.wav', '.mp3', '.ogg', '.flac'],
    },
    maxFiles: 20,
  });
  // const [currentStep, setCurrentStep] = useState(0);
  // const [selectedItem, setSelectedItem] = useState<number | null>(null);
  // const lyrics = [
  //   'in and follow my lead Well, I found a girl',
  //   'beautiful and lorem ipsum dolor sit',
  //   'lorem ipsium',
  //   'beautiful and lorem ipsum dolor sit',
  // ];
  const FAQ = [
    { question: 'What is a Supermodel?', answer: `A Supermodel is a voice model that can sing, rap, speak, and do impressions. It is the most versatile voice model available on the market.` },
    { question: 'How can I create a Supermodel?', answer: `You can create a Supermodel by providing a variety of voice samples that include singing, rapping, speaking, and doing impressions.` },
    { question: 'What languages does the Supermodel support?', answer: `The Supermodel supports multiple languages including English, Spanish, Korean, Chinese, Russian, Portuguese, Turkish, Japanese, and German.` },
    { question: 'How long does it take to create a Supermodel?', answer: `The creation of a Supermodel depends on the complexity and variety of the voice samples provided. It usually takes a few hours to a few days.` },
  ]

  const products = [
    { id: 'price_1NLF7AELSZjChMNFhpdKRJWI', name: 'Starter', price: 3 },
    // { id: 'price_1NLF7oELSZjChMNFrYRkv4IF', name: 'Creator', price: 5 },
    { id: 'price_1NLF5NELSZjChMNFgdK4acku', name: 'Platinum', price: 10 },
  ];

  const uploadAudioToS3 = async (file: any, filename?: string, fileType?: string) => {
    let encodedFilename = encodeURIComponent(filename || '');
    let encodedFileType = encodeURIComponent(fileType || '');
    const res = await fetch(
      `/api/upload-file?file=${encodedFilename}&fileType=${encodedFileType}&training=true`
    );
    const { s3_url, url, fields } = await res.json();

    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => { formData.append(key, value as string) });
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        const percentCompleted = Math.round((e.loaded * 100) / e.total);
        setFiles((currentFiles: any) => currentFiles.map((f: any) => f.name === file.name ? { ...f, uploading: true, uploadProgress: percentCompleted } : f));
      }
    };
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 204)
        setFiles((currentFiles: any) => currentFiles.map((f: any) => f.name === file.name ? { ...f, uploading: false, uploadProgress: 100, uploadError: false, s3_url: s3_url } : f));
      else
        setFiles((currentFiles: any) => currentFiles.map((f: any) => f.name === file.name ? { ...f, uploading: false, uploadProgress: 0, uploadError: true } : f));
    };
    xhr.send(formData);
    // Calculate the duration of the audio file
    let audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = () => {
      setFiles((currentFiles: any) => currentFiles.map((f: any) => f.name === file.name ? { ...f, duration: audio.duration } : f));
    };
  };

  const uploadImageToS3 = async (file: any) => {
    const encodedFilename = encodeURIComponent(file.name);
    const encodedFileType = encodeURIComponent(file.type);
    const res = await fetch(
      `/api/upload-file?file=${encodedFilename}&fileType=${encodedFileType}&image=true`
    );
    const { s3_url, url, fields } = await res.json();
    const formData = new FormData();
    for (const key in fields)
      formData.append(key, fields[key]);
    formData.append('file', file);
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      setImageUrl(s3_url);
      console.log("Image uploaded successfully: ", s3_url)
    }
  };

  const startTraining = async () => {
    if (!userId) {
      // TODO: Show login modal
    } else {
      // Check if the user has enough training slots to train a new model
      // TODO: 

      // Check if the files are done uploading
      if (files.some((file: any) => file.uploading)) {
        alert('Please wait for all files to finish uploading.');
        return;
      }

      // Check if there's at least 1 minute of audio
      files.forEach((file: any) => { console.log(`Duration of ${file.name}: ${file.duration} seconds`); });
      const audioLengthSeconds = files.reduce((total: number, file: any) => total + (file.duration || 0), 0);
      console.log("Total audio length: ", audioLengthSeconds, " seconds")
      if (audioLengthSeconds < 60) {
        alert('Please upload at least 1 minute of audio.');
        return;
      }

      // Set training request settings
      setIsLoading(true);
      const formData = new FormData();
      const settings = {
        training_data: JSON.stringify(files.map((file: any) => file.s3_url)),
        name: voiceName,
        ...(imageUrl ? { imageUrl } : {}),
        voice_type: ModelVoiceType.SUPERMODEL,
        type: modelType,
        description: 'Web Trained Model',
        age: 'adult',
        gender: 'Male',
        genre: 'pop',
        user_id: userId,
        public: false,
        ...(userId == adminUserId || priorityUsers.includes(userId) ? { priority: true } : {}),
        ...(Object.entries(selectedLanguages).filter(([key, value]) => value).length > 0 || Object.entries(selectedTypes).filter(([key, value]) => value).length > 0 ? {
          traits: [
            ...(Object.entries(selectedLanguages).filter(([key, value]) => value).length > 0 ? [{
              trait_type: 'languages',
              trait_values: Object.entries(selectedLanguages).filter(([key, value]) => value).map(([key, value]) => key),
            }] : []),
            ...(Object.entries(selectedTypes).filter(([key, value]) => value).length > 0 ? [{
              trait_type: 'types',
              trait_values: Object.entries(selectedTypes).filter(([key, value]) => value).map(([key, value]) => key),
            }] : []),
          ],
        } : {}),
      };
      Object.entries(settings).forEach(([key, value]) => { if (value) formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value)) });
      try {
        formData.append("sample", files?.[0])
        formData.append("image", image)
        const response = await fetch('/api/models/train', {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}` },
          body: formData
        });
        if (response.ok) {
          const data = await response.json();
          const { model_id } = data;
          await deductOrganizationSlots(client, {
            slots: 1,
            id: organization?.id,
          });
          router.push('/my-models');

        } else {
          setErrorMessage('Error uploading audio file. Please try again.');
          setIsLoading(false);
        }
      } catch (error) {
        setErrorMessage('Error uploading audio file. Please try again.');
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <AppContainer>
        {
          <>
            <div className="flex py-6 px-6 lg:px-0 lg:py-[100px] w-full flex-col items-center justify-center rounded-xl my-0 group hover:saturate-[1.4] transition-all duration-500"
              style={{
                background: 'linear-gradient(328.78deg, #030086 14.45%, #BD6177 84.36%), linear-gradient(301.28deg, #209B4A 0%, #7000FF 100%), radial-gradient(100% 138.56% at 100% 0%, #D50000 0%, #00FFE0 100%), radial-gradient(100% 148.07% at 0% 0%, #D50000 0%, #00FFFF 100%)',
                backgroundBlendMode: 'soft-light, overlay, difference, normal'
              }}
            >
              {step === 1 && (
                <div className="flex flex-col items-center justify-center">
                  <div className="block w-[42px] mb-3 mt-1">
                    <img className="rotate-180"
                      src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' aria-labelledby='title' aria-describedby='desc' role='img' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3ERecord%3C/title%3E%3Cdesc%3EA line styled icon from Orion Icon Library.%3C/desc%3E%3Cpath data-name='layer1' d='M44 50a12 12 0 0 1-12 12 12 12 0 0 1-12-12V31a12 12 0 0 1 12-12 12 12 0 0 1 12 12z' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='3' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3Cpath data-name='layer2' d='M12 37.7V31a20 20 0 0 1 20-20 20 20 0 0 1 20 20v6.7M12 35h40M32 11V2' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='3' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3Cpath data-name='layer1' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='3' d='M20 44h8m-7.8 8H28m8 0h7.8M36 44h8' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3C/svg%3E" alt="Record" />
                  </div>
                  <h1 className="mb-5 text-2xl font-black dark:text-white md:text-4xl">
                    Create your AI Voice
                  </h1>

                  <p className="font-[400] text-white">
                    Train your own AI Voice Model in seconds by uploading audio
                    files of the voice you want to clone.
                  </p>
                  <button className="mt-8 rounded-lg px-10 py-5 font-[400] bg-white text-black-700 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D] transition-all duration-200 group"
                    onClick={() => {
                      if ((organization?.slots || 0) > 0) {
                        setError(false)
                        setStep(2)
                      } else setError(true)
                    }}
                  >
                    Upload Audio
                  </button>
                  {error && <p className="mt-8 text-white">You ran out of AI voices. <a className="underline" href="/plans">Upgrade or buy additional voices</a> for more training.</p>}
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className='text-4xl font-extrabold text-center text-white mb-7'>Upload your training audio</h2>
                  {/* <p className="mt-2 text-center">
                    The more audio you upload, the better your AI voice will be.
                  </p> */}

                  {!(files.length > 0) && (
                    <div {...getRootProps()} >
                      <input type="file" accept=".mp3, .ogg, .wav, .flac" ref={inputRef} {...getInputProps()} className="hidden" multiple />
                      <button className="flex px-10 lg:px-0 py-10 lg:py-0 lg:h-[300px] w-[100%] lg:w-[768px] flex-col items-center justify-center rounded-[24px] border-[1.5px] border-dashed border-[#EAEAEB66] hover:bg-[#FFFFFF26] transition-all duration-300">
                        <div className="inline-block w-[42px] mb-3 mt-1">
                          <img src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' aria-labelledby='title' aria-describedby='desc' role='img' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EAdd%3C/title%3E%3Cdesc%3EA solid styled icon from Orion Icon Library.%3C/desc%3E%3Cpath data-name='layer1' d='M53 29H35V11a3 3 0 0 0-6 0v18H11a3 3 0 0 0 0 6h18v18a3 3 0 0 0 6 0V35h18a3 3 0 0 0 0-6z' fill='%23ffffff'%3E%3C/path%3E%3C/svg%3E" alt="Add" />
                        </div>

                        <h2 className="mb-3 text-xl font-semibold text-white">
                          Drag and drop or click to upload your audio files
                        </h2>
                        <p className="text-sm font-[500] text-[#FFFFFF80]">
                          Max file size: <span className="text-white">300 MB</span>,
                          Max dataset duration:{' '}
                          <span className="text-white">60 minutes</span>, Max
                          dataset size: <span className="text-white">300 MB</span>
                        </p>

                      </button>
                    </div>
                  )}
                  {!(files.length > 0) && (
                    <ul className="mt-5 text-sm text-center list-disc list-inside">
                      <li className="text-sm font-[400]">
                        Single-voice, monophonic (no layers, harmonies, chorus) audio
                      </li>
                      <li className="text-sm font-[400]">
                        Dry audio with no effects (no reverb, delay, backing tracks)
                      </li>
                      <li className="text-sm font-[400]">
                        Include as much training data volume (minutes of audio) and variation (pitch / tempo) as possible
                      </li>
                    </ul>
                  )}

                  {files.length > 0 && (
                    <div className='w-[100%] lg:w-[768px] flex flex-col'>
                      <div className="items-center justify-between w-full lg:flex lg:flex-row">
                        <div className="flex flex-row items-center">
                          <div className="h-[24px] w-[24px]">
                            <img src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' aria-labelledby='title' aria-describedby='desc' role='img' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EMusic File%3C/title%3E%3Cdesc%3EA line styled icon from Orion Icon Library.%3C/desc%3E%3Cpath data-name='layer2' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='2' d='M10 2v60h44V18L38 2H10z' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3Cpath data-name='layer2' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='2' d='M38 2v16h16' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3Cellipse data-name='layer1' cx='27' cy='48' rx='7' ry='6' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='2' strokeLinejoin='round' strokeLinecap='round'%3E%3C/ellipse%3E%3Cpath data-name='layer1' d='M34 48l-2-26s9 1.3 9 10' fill='none' stroke='%23ffffff' stroke-miterlimit='10' strokeWidth='2' strokeLinejoin='round' strokeLinecap='round'%3E%3C/path%3E%3C/svg%3E" alt="Music File" />
                          </div>
                          <p className='ml-2 font-[400] text-md'>
                            {files.filter((file: any) => !file.uploading && !file.uploadError).length === 1 ? '1 file uploaded' : `${files.filter((file: any) => !file.uploading).length} files uploaded `}
                            {files.filter((file: any) => !file.uploading && !file.uploadError).length > 0 ? `(${Math.floor(files.filter((file: any) => !file.uploading).reduce((total: number, file: any) => total + (parseInt(file.duration) || 0), 0) / 60)} minutes, ${files.filter((file: any) => !file.uploading).reduce((total: number, file: any) => total + (parseInt(file.duration) || 0), 0) % 60} seconds)` : ""}
                          </p>
                        </div>
                        <div className="flex flex-row items-center mt-3 lg:mt-0">
                          <div {...getRootProps()} >
                            <input type="file" accept=".mp3, .ogg, .wav, .flac" ref={inputRef} {...getInputProps()} className="hidden" />

                            <button className='mr-3 rounded-lg border-[1px] border-[#FFFFFF1A] bg-transparent px-5 py-2 text-sm font-[400] hover:border-[#FFFFFF80] disabled:border-[#FFFFFF26] disabled:text-[#FFFFFF4D]'
                            >Add more audio files</button>
                          </div>
                          <button className='mr-0 rounded-lg border-[1px] border-[#FFFFFF1A] bg-transparent px-5 py-2 text-sm font-[400] hover:border-[#FFFFFF80] disabled:border-[#FFFFFF26] disabled:text-[#FFFFFF4D]'
                            onClick={() => setFiles([])}>Remove all</button>
                        </div>
                      </div>
                      <div className='bg-[#FFFFFF0D] lg:h-60 p-5 mt-4 rounded-lg overflow-y-scroll'>
                        <div className='flex flex-col w-full'>
                          {Array.from(files)?.map((i: any, index: number) =>
                            <div className={`flex flex-row py-2 px-3 bg-[#FFFFFF0D] mb-4 w-full justify-between items-center rounded-lg ${i.uploading ? 'animate-pulse' : ''}`} key={index}>
                              <div className='flex flex-row items-center'>
                                <div className='flex flex-row items-center'>
                                  {i.uploading && <TbFileUpload className='text-lg text-white animate-pulse' style={{ flexShrink: 0 }} />}
                                  {i.uploadError && <TbFileXFilled className='text-lg text-red-500' style={{ flexShrink: 0 }} />}
                                  {!i.uploading && !i.uploadError && i.s3_url && <TbFileCheck className='text-lg text-green-500' style={{ flexShrink: 0 }} />}
                                  <p className='ml-3 text-sm font-semibold text-white'>
                                    {i?.name}
                                    {" "}<span className='text-[#FFFFFF80] ml-1'>({(i?.size / 1024 / 1024).toFixed(1)}MB{i?.duration ? `, ${Math.round(i?.duration)} seconds` : ""})</span>
                                  </p>
                                </div>
                              </div>
                              <div className='flex flex-row items-center'>
                                {i.uploading && (
                                  <div className='flex flex-row items-center'>
                                    <Progress value={i.uploadProgress} className='w-20 ml-3 mr-2' />
                                    <p className='mr-2 text-sm font-semibold text-white'>{i.uploadProgress}%</p>
                                  </div>
                                )}
                                <button onClick={() => setFiles((prev: any) => Array.from(prev).filter((j: any) => j?.name !== i?.name))}>
                                  <BsX className='text-xl font-semibold transition-all duration-200 hover:scale-90' />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='flex flex-row items-center justify-center w-full mt-7'>
                    <button className='mr-3 rounded-lg border-[1px] border-[#FFFFFF1A] bg-transparent px-[35px] py-[16px] font-[500] hover:border-[#FFFFFF80] disabled:border-[#FFFFFF26] disabled:text-[#FFFFFF4D] transition-all duration-200' onClick={() => setStep((prev: number) => prev - 1)}>Back</button>
                    <button className="rounded-lg border-[1px] border-[#FFFFFF0D] px-[35px] py-[16px] font-[500] bg-white text-black-700 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D] transition-all duration-200"
                      disabled={files.some((file: any) => file.uploading) || files.length === 0}
                      onClick={() => {
                        // Check if there's at least 1 minute of audio
                        const audioLengthSeconds = files.reduce((total: number, file: any) => total + (file.duration || 0), 0);
                        if (audioLengthSeconds < 60) {
                          alert('Please upload at least 1 minute of audio.');
                          return;
                        }
                        setStep((prev: number) => prev + 1)
                      }
                      }>
                      {files.some((file: any) => file.uploading) ? (
                        <>
                          <div className="inline-flex mr-3 align-middle animate-spin">
                            <svg fill="none" height="16" stroke="currentColor" transform="matrix(1.35 0 0 1.35 0 0)" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M14 8C14 11.3137 11.3137 14 8 14 4.68629 14 2 11.3137 2 8 2 4.68629 4.68629 2 8 2 11.3137 2 14 4.68629 14 8Z" opacity=".15" /><path d="M14 8C14 11.3137 11.3137 14 8 14 4.68629 14 2 11.3137 2 8 2 4.68629 4.68629 2 8 2" strokeLinecap="round" /></svg>
                          </div>
                          Uploading...
                        </>) : "Continue"}
                    </button>
                  </div>
                </div>
              )}
              {step === 3 && <div>
                <input
                  type="file"
                  ref={imageRef}
                  className="hidden"
                  onChange={(e: any) => {
                    setImage(URL.createObjectURL(e.target.files[0] instanceof Blob ? e.target.files[0] : new Blob([e.target.files[0]])))
                    uploadImageToS3(e.target.files[0])
                  }}
                  accept="image/*"
                />
                <h2 className='mb-12 text-4xl font-extrabold text-center text-white'>Set up your AI voice</h2>
                <div className='lg:flex lg:flex-row lg:items-center lg:justify-center'>
                  <div className='lg:flex lg:flex-col lg:items-end lg:w-1/3'>
                    <div>
                      <p className='mb-2 font-medium text-left text-white'>Add image <i>(optional)</i></p>
                      <button onClick={() => imageRef?.current?.click()} className='w-[100%] h-60 lg:h-72 lg:w-72 rounded-xl bg-[#FFFFFF0D] hover:bg-[#FFFFFF26] flex justify-center items-center transition-all duration-300'>
                        {!image && <div className='flex flex-col items-center'>
                          <BsFileImage className='text-[#FFFFFF4D] text-4xl' />
                          <p className='mt-3 font-medium'>Add or drop image</p>
                        </div>}
                        {image && <img src={image} alt={image?.name} className='object-cover w-full h-full rounded-xl' />}
                      </button>
                    </div>
                  </div>
                  <div className='lg:w-1/2 lg:ml-11 w-[100%]'>
                    <h2 className='font-semibold text-white'>Name your voice model</h2>
                    <input placeholder='Voice name' className='mb-6 px-6 py-4 bg-[#FFFFFF0D] rounded-xl mt-2 w-full' value={voiceName} onChange={(e) => setVoiceName(e.target.value)} />
                    <h2 className='font-semibold text-white'>Voice Type</h2>
                    <div className='flex flex-wrap w-full mt-2'>
                      {["rapping", "singing", "speaking", "character", "instrument"].map(type =>
                        <button
                          onClick={() => setSelectedTypes((prev: any) => ({ ...prev, [type]: !prev[type] }))}
                          className={`px-4 py-2 rounded-3xl bg-${selectedTypes?.[type] ? 'white' : "[#FFFFFF0D]"} text-${selectedTypes?.[type] ? "black-700" : "white"} mr-2 mb-3 text-sm hover:bg-[#FFFFFF26] transition-all duration-200 hover:scale-95 hover:text-white`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      )}
                    </div>
                    <h2 className='mt-5 font-semibold text-white'>Language</h2>
                    <div className='flex flex-wrap w-4/5 mt-2'>
                      {["english", "spanish", "korean", "chinese", "russian", "portuguese", "turkish", "japanese", "german"].map(language =>
                        <button
                          onClick={() => setSelectedLanguages((prev: any) => ({ ...prev, [language]: !prev[language] }))}
                          className={`px-4 py-2 rounded-3xl bg-${selectedLanguages?.[language] ? 'white' : "[#FFFFFF0D]"} text-${selectedLanguages?.[language] ? "black-700" : "white"} mr-2 mb-3 text-sm hover:bg-[#FFFFFF26] transition-all duration-200 hover:scale-95 hover:text-white`}
                        >
                          {language.charAt(0).toUpperCase() + language.slice(1)}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex flex-row items-center justify-center w-full mt-10'>
                  <button
                    disabled={isLoading}
                    className='mr-3 rounded-lg border-[1px] border-[#FFFFFF1A] bg-transparent px-[35px] py-[16px] font-[500] hover:border-[#FFFFFF80] disabled:border-[#FFFFFF26] disabled:text-[#FFFFFF4D] transition-all duration-200' onClick={() => setStep((prev: number) => prev - 1)}>Back</button>
                  <button className={`rounded-lg border-[1px] border-[#FFFFFF0D] px-[35px] py-[16px] font-[500] bg-white text-black-700 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D] transition-all duration-200 ${isLoading ? 'animate-pulse' : ''}`}
                    disabled={(!voiceName.length) || isLoading}
                    onClick={startTraining}>
                    {isLoading && (
                      <div className="inline-flex mr-3 align-middle animate-spin">
                        <svg fill="none" height="16" stroke="currentColor" transform="matrix(1.35 0 0 1.35 0 0)" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M14 8C14 11.3137 11.3137 14 8 14 4.68629 14 2 11.3137 2 8 2 4.68629 4.68629 2 8 2 11.3137 2 14 4.68629 14 8Z" opacity=".15" /><path d="M14 8C14 11.3137 11.3137 14 8 14 4.68629 14 2 11.3137 2 8 2 4.68629 4.68629 2 8 2" strokeLinecap="round" /></svg>
                      </div>
                    )}
                    Train
                  </button>
                </div>
              </div>}
            </div>

            <div className='mx-auto mt-[13px] mb-[30px] py-20 rounded-xl'>
              <div className="w-full pl-[30px]">
                {/* <h2 className="mb-3 font-semibold dark:text-white text-xl md:text-3xl leading-[53px]">Audio example</h2> */}
                {/* FAQ */}

                <h1 className="mb-5 text-2xl font-black text-center dark:text-white md:text-4xl">

                  Voice Training F.A.Q.
                </h1>
                <div className="flex flex-row w-full py-2 align-top faq-row">
                  <Accordion type="single" collapsible className='!flex-col items-center max-w-2xl mx-auto'>
                    {FAQ.map((faq, index) => (
                      <AccordionItem value={`item-${index}`} className='w-full' key={index}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </>
        }
      </AppContainer >
    </div>
  );
}

export default page;
