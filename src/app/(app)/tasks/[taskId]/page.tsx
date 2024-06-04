'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Separator } from '~/components/ui/separator';
import { useReward } from 'react-rewards';
import useUserId from '~/core/hooks/use-user-id';
import useCreateAudioConversions from '~/lib/audio_conversions/hooks/use-create-audio-conversion';
import WaveformAudioPlayer from '../../components/WaveformAudioPlayer';
// import Loading from '~/components/Loading';

type TaskStatus = {
  status: string;
  progress?: number;
  input_audio_url: string;
  output_audio_urls: [string];
  model_id: number | undefined;
  // harmony: {
  //   // TODO: Define other properties of taskStatus.harmony
  //   audio_url: string;
  // }
};

/* @ts-ignore:next-line */
export default function TaskPage({ params }) {
  //      const router = useRouter();

  const [taskStatus, setTaskStatus] = useState<TaskStatus>();
  const userId = useUserId();
  const createAudioConversions = useCreateAudioConversions(userId);
  const [isLoading, setIsLoading] = useState(true);
  const { reward, isAnimating } = useReward('rewardId', 'confetti', {
    position: 'absolute',
    angle: 60,
  });

  useEffect(() => {
    let intervalId: any;
    const fetchTaskStatus = async () => {
      try {
        const res = await fetch(`/api/check-task/${params.taskId}`);
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

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [params.taskId]);

  useEffect(() => {
    const createAudioConversionsF = async () => {
      await createAudioConversions.trigger({
        user_id: userId,
        date: new Date().toISOString(),
        name: "",
        duration: '2000',
        input_url: taskStatus?.input_audio_url,
        model_id: taskStatus?.model_id,
        options: {
          pitch: 'test1',
          style: 'test2',
          vocal: 'test3',
        },
        result: taskStatus?.output_audio_urls,
        cost: undefined,
      });
    };

    if (taskStatus) {
      createAudioConversionsF();
    }
  }, [taskStatus]);

  const renderStatus = () => {
    console.log(taskStatus, userId);

    switch (taskStatus?.status) {
      case 'completed':
        return (
          <>
            <h1 className="text-3xl font-semibold text-center font-custom text-black-500">
              Task Completed
            </h1>
            {/* Before badge */}
            <div className="flex flex-col mt-6">
              <h2 className="mx-auto text-xl font-semibold text-gray-500">
                Before
              </h2>
              {taskStatus?.input_audio_url && (
                <WaveformAudioPlayer src={taskStatus.input_audio_url} />
              )}
            </div>
            {/* After badge */}
            <div className="flex flex-col mt-6">
              <h2 className="relative flex mx-auto text-xl font-semibold text-fuchsia-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-flex mr-2 align-middle"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                  <path d="M5 3v4"></path>
                  <path d="M19 17v4"></path>
                  <path d="M3 5h4"></path>
                  <path d="M17 19h4"></path>
                </svg>
                <span className="inline-flex ml-2">After</span>
              </h2>
              {taskStatus?.output_audio_urls &&
                taskStatus?.output_audio_urls.map(
                  (url: string, index: number) => (
                    <WaveformAudioPlayer key={index} src={url} />
                  )
                )}
              {/* if taskStatus.harmony */}
              {/* {taskStatus.harmony && (
                    <div className="flex flex-col mt-6">
                        <h2 className="mx-auto text-xl font-semibold text-gray-500">Harmony</h2>
                        <audio controls src={taskStatus.harmony.audio_url} className="mx-auto mt-4">
                          Your browser does not support the audio element.
                        </audio>
                    </div>
                )} */}
            </div>
          </>
        );
      case 'in_progress':
        return (
          <div className="flex-row items-center justify-center block text-center">
            <div className="w-12 h-12 mx-auto border-t-4 border-b-4 rounded-full animate-spin border-fuchsia-500"></div>
            <h3 className="mt-4 text-lg font-semibold animate-pulse font-custom text-black-600">
              Revocalizing your voice using our AI magic...
            </h3>
            {/* If taskStatus.progress exists, show a progress bar using TailwindCSS */}
            {taskStatus?.progress && (
              <div className="w-full h-4 mt-5 overflow-hidden bg-gray-200 rounded-full">
                <div
                  className="h-full rounded-full animate-pulse bg-fuchsia-500 transition-all duration-500"
                  style={{ width: `${taskStatus.progress}%` }}
                ></div>
              </div>
            )}
          </div>
        );
      case 'failed':
        return <h1 className="text-2xl font-semibold">Task failed</h1>;
      default:
        return <h1 className="text-2xl font-semibold">Unknown task status</h1>;
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-6 sm:py-12">
      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div className="absolute inset-0 shadow-lg to-light-blue-500 -skew-y-6 transform bg-gradient-to-r from-cyan-400 sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
        <div className="relative w-auto h-auto px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <span id="rewardId" className="left-0 right-0 mx-auto text-center" />
          {isLoading ? (
            <div className="flex-row items-center justify-center block text-center">
              <div className="w-12 h-12 mx-auto border-t-4 border-b-4 rounded-full animate-spin border-fuchsia-500"></div>
              <h3 className="mt-4 text-lg font-semibold animate-pulse font-custom text-black-600">
                Loading...
              </h3>
            </div>
          ) : (
            renderStatus()
          )}
        </div>
      </div>
    </div>
  );
}
