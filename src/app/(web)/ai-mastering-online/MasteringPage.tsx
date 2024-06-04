'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppContainer from '~/app/(app)/components/AppContainer';
import useCreateModel from '~/lib/models/hooks/use-create-model';
import useUserId from '~/core/hooks/use-user-id';
import useApiKey from '~/core/hooks/use-api-key';
import ModelVoiceType from '~/lib/models/types/model-voice-type';
import { useRouter } from 'next/navigation';
import { TbFileMusic, TbFileUpload, TbFileXFilled, TbFileCheck } from 'react-icons/tb';
import { BsX, BsFileImage } from 'react-icons/bs';
import { Progress } from '~/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"

function page() {
  const [step, setStep] = useState<any>(1);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const userId = useUserId();
  
  // const createModel = useCreateModel(userId);
  const apiKey = useApiKey();
  const [audioFile, setAudioFile] = useState<any>(null);
  const [audioDuration, setAudioDuration] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef() as any;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const FAQ = [
    { question: "What is AI Audio Mastering?", answer: "AI Audio Mastering is a tool that uses artificial intelligence to master your audio tracks. It is the fastest, best sounding, and free artist-driven Mastering tool." },
    { question: "How does AI Audio Mastering work?", answer: "AI Audio Mastering uses artificial intelligence to analyze your audio and apply the same mastering techniques used by the best mastering engineers in the world." },
    { question: "What is mastering?", answer: "Mastering is the final step in the music production process. It is the process of preparing and transferring recorded audio from a source containing the final mix to a data storage device (the master); the source from which all copies will be produced (via methods such as pressing, duplication, replication, and digital downloads). In recent years digital masters have become usual, although analog masters—such as audio tapes—are still being used by the manufacturing industry, particularly by a few engineers who specialize in analog mastering." },
    { question: "What is the difference between mixing and mastering?", answer: "Mixing is the process of putting multiple layers of audio together to make one final track, or to musically modify an existing track. Mastering is the final step of audio post-production. The purpose of mastering is to balance sonic elements of a stereo mix and optimize playback across all systems and media formats. Traditionally, mastering is done using tools like equalization, compression, limiting and stereo enhancement." },
    { question: "Why does Revocalize AI Audio Mastering sound so good?", answer: "Revocalize AI Audio Mastering uses artificial intelligence to analyze your audio and apply the same mastering techniques used by the best mastering engineers in the world." },
  ]
  const genres = [
    "Acoustic",
    "Classical",
    "Pop",
    "RnB",
    "Techno",
    "Hip Hop",
    "Rap",
    "Trap",
    "Lo-Fi",
  ]
  const [selectedGenre, setSelectedGenre] = useState<string>("Pop");

  const uploadAudioToS3 = async (file: any, filename?: string, fileType?: string) => {
    let encodedFilename = encodeURIComponent(filename || '');
    let encodedFileType = encodeURIComponent(fileType || '');
    const res = await fetch(
      `/api/upload-file?file=${encodedFilename}&fileType=${encodedFileType}&mastering=true`
    );
    const { s3_url, url, fields } = await res.json();
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        const percentCompleted = Math.round((e.loaded * 100) / e.total);
        setUploadProgress(percentCompleted);
      }
    };
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 204) 
        setAudioFile(s3_url);
      else 
        setErrorMessage('Error uploading audio file. Please try again.');
    };
    xhr.send(formData);
    // Calculate the duration of the audio file
    let audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = () => {
      setAudioDuration(audio.duration);
    };
  };

  const startMastering = async () => {
    // try {
    //     setIsLoading(true);
    //     const formData = new FormData();
    //     formData.append('genre', selectedGenre);
    //     formData.append('file', audioFile);
    //     formData.append('duration', audioDuration.toString());

    //     const response = await fetch('/api/mastering', {
    //       method: 'POST',
    //       headers: { Authorization: `Bearer ${apiKey}`,},
    //       body: formData,
    //     });
    //     if (response.ok) {
    //       const data = await response.json();
    //       const { model_id } = data;
    //       router.push(`/my-models/${model_id}`);
    //     } else {
    //       const errorData = await response.json();
    //       setErrorMessage(errorData.message || 'Error uploading audio file. Please try again.');
    //       setIsLoading(false);
    //     } 
    //   } catch (error) {
    //     // setErrorMessage(error.message || 'Error uploading audio file. Please try again.');
    //     setIsLoading(false);
    //   }
    // }
  };

  return (
    <div>
      <AppContainer>
        {
          <>
            <div className="flex pt-9 pb-9 w-full flex-col items-center justify-center rounded-xl my-0 group hover:saturate-[1.4] transition-all duration-500" 
              style={{background: 'linear-gradient(328.78deg, #030086 14.45%, #BD6177 84.36%), linear-gradient(301.28deg, #209B4A 0%, #7000FF 100%), radial-gradient(100% 138.56% at 100% 0%, #D50000 0%, #00FFE0 100%), radial-gradient(100% 148.07% at 0% 0%, #D50000 0%, #ff0000 100%)',
              backgroundBlendMode: 'soft-light, overlay, difference, normal'}}
            >
              {step === 1 && (
                <div className="flex flex-col items-center justify-center">
                  <p className="mt-3 text-[#e099fa] uppercase text-[14px] font-semibold">AI Audio Mastering</p>
                  <h1 className="mb-1 font-black dark:text-white text-2xl md:text-3xl leading-[53px]">Master your tracks professionally with AI</h1>
                  <p className="mt-2 leading-7 text-center text-white">
                        Instantly master your tracks with the most advanced AI mastering engine.{" "}
                    <br/>
                    Hear the difference mastering can make with the fastest, best sounding, and free artist-driven Mastering tool.
                    {/* <span className="mt-4">
                    {" "}
                      <Link className="text-black dark:text-white underline decoration-yellow-200 underline-offset-[6px]"
                        href="#">
                        AI Voice Creation tutorial
                      </Link>.
                    </span> */}
                  </p>

                 

                  {!audioFile && (
                    <button
                      className="flex h-[130px] w-[420px] mt-8 flex-col items-center justify-center rounded-lg border-[1px] border-dashed border-[#EAEAEB66] hover:bg-[#FFFFFF26] transition-all duration-300"
                      onClick={() => fileRef?.current?.click()}
                    >
                      <h2 className="mb-3 text-xl font-semibold text-white">
                        Upload your audio track
                      </h2>
                      <p className="mb-0 text-sm font-[500] text-[#FFFFFF80]">
                        Max file size: <span className="text-white">100 MB</span>
                      </p>
                    </button>
                  )}
                  <input
                      type="file"
                      ref={fileRef}
                      className="hidden"
                      onChange={async (e: any) => {
                        const newFiles = Array.from(e.target.files) as File[];
                        for (const file of newFiles) {
                            // Check if the file is an audio file
                            if (!file.type.startsWith('audio/')) {
                                alert('Invalid file type. Please upload an audio file.');
                                return;
                            }
                            // Check if the file size is less than or equal to 300MB
                            if (file.size > 100 * 1024 * 1024) {
                                alert('File size exceeds 100MB. Please upload a smaller file.');
                                return;
                            }
                        }
                        console.log("New files: ", newFiles)
                        setAudioFile(newFiles[0]);

                        // Upload the new file/s to the S3 bucket
                        newFiles.forEach(async (file: File) => {
                            await uploadAudioToS3(file, file.name, file.type);
                        });
                      }}
                      accept="audio/*"
                  />

                  {/* <button
                    className="mt-10 rounded-lg border-[1px] px-[35px] py-[16px] font-[500] bg-white text-black-700 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D] transition-all duration-200 group"
                    onClick={() => setStep(2)}
                  >
                    Create AI Voice <span className='ml-2 transition-all duration-200 group-hover:translate-x-1'>→</span>
                  </button> */}

                   <div className='flex mt-8 flex-wrap items-center justify-center w-full max-w-[550px]'>
                      {genres.map(genre => 
                        <button 
                          onClick={() => setSelectedGenre(genre)}
                          className={`px-5 py-3 rounded-3xl bg-${selectedGenre == genre ? 'white' : "[#FFFFFF0D]"} text-${selectedGenre == genre ? "black-700" : "white"} mr-2 mb-3 text-md hover:bg-[#FFFFFF26] transition-all duration-200 hover:scale-95 hover:text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_15%)]`}
                        >
                            {genre}
                        </button>
                      )}
                    </div>
                </div>
              )}
            
             
            </div>

            <div className='container max-w-[768px] mx-auto py-16'>
              {/* <h2 className="mb-3 font-semibold dark:text-white text-xl md:text-3xl leading-[53px]">Audio example</h2> */}
              {/* FAQ */}
              <h3 className="mb-3 font-semibold dark:text-white text-xl md:text-3xl leading-[53px]">Mastering FAQ</h3>
              <Accordion type="single" collapsible>
                {FAQ.map((faq, index) => (
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </>
        }
      </AppContainer >
    </div>
  );
}

export default page;
