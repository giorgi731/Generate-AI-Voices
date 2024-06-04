'use client';
import Image from 'next/image';
import defaultImage from '~/../public/images/default.png';
import { useRouter } from 'next/navigation';
import WaveformAudioPlayer from '../../components/WaveformAudioPlayer';
import { EventHandler, MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useCreatePermision from '~/lib/permisions/hooks/use-create-permision';
import useGetUserIdByEmail from '~/lib/user/hooks/use-get-userId-by-email';
import useApiKey from '~/core/hooks/use-api-key';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import Modal from '~/components/modal';
import useUserId from '~/core/hooks/use-user-id';
import ImageWithFallback from '~/components/ImageWithFallback';
import { Menu, Transition } from '@headlessui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import classNames from 'classnames';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';
import { PenBox } from 'lucide-react';
dayjs.extend(relativeTime);
dayjs.extend(utc);

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: any;
  aspectRatio?: 'video' | 'square';
  width?: number;
  height?: number;
  beforeAudioUri?: string;
  afterAudioUrl?: string | any;
  showModel?: boolean;
  shared: boolean;
  onCancelTrain?: () => void;
  onRemove?: MouseEventHandler;
  onEdit?: MouseEventHandler;
}

export function AlbumArtwork({
  album,
  aspectRatio = 'video',
  width,
  height,
  beforeAudioUri,
  afterAudioUrl,
  className,
  showModel = false,
  shared = false,
  onCancelTrain,
  onEdit,
  onRemove,
  ...props
}: AlbumArtworkProps) {
  const [showModal, setShowModal] = useState(false);

  const userId = useUserId();
  const router = useRouter();
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [email, setEmail] = useState('');
  const [jobProgress, setJobProgress] = useState(null);
  const [jobPlaceInQueue, setJobPlaceInQueue] = useState<number | undefined>(undefined);
  const { mutate: getUserIdByEmail } = useGetUserIdByEmail();
  const createPermisions = useCreatePermision();
  const apiKey = useApiKey();
  const [canceling, setCanceling] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
  }
  const currentUserId = useUserId();
  const handleClick = useCallback(async () => {
    const getUserByIdData = await getUserIdByEmail(email);
    const userId = getUserByIdData?.data?.id;
    await createPermisions.trigger({
      user_id: userId,
      granted_at: new Date().toISOString(),
      granted_by: album?.user_id,
      permission_type: 'user',
      model_id: album?.id,
      updated_at: album?.date,
    });
  }, [email]);
  // console.log(album, 'album')

  const handleCancelTrain = () => {
    if (album && album.id) {
      setCanceling(true)
      onCancelTrain && onCancelTrain()
    }
  }

  // const [state, dispatch] = useGlobalState();
  // console.log(state, 'state')
  // const isActivePlan = useMemo(() => (id: number) => {
  //   if (state.currentPlan?.name === configuration.stripe.products[id].name) {
  //     return true
  //   }
  //   if ((!state.currentPlan?.name && id === 0)) {
  //     return true
  //   }
  //   return false
  // }, [state.currentPlan?.name])

  useEffect(() => {
    const checkStatus = async () => {
      if (!album?.job_id || !album?.id || album?.enabled) return;

      console.log('Checking status...');
      try {
        const response = await fetch(`/api/models/check-status/${album.job_id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          }
        });
        if (!response.ok) throw new Error('Network response was not ok.');

        const status = await response.json();
        if (status?.data?.error === 'Training job not found!') {
          console.log('Training job not found, stopping checks for this job_id');
          return;
        }

        setJobProgress(status?.job_progress);
        if (status?.place_in_queue) setJobPlaceInQueue(status?.place_in_queue);
        console.log('status', status);

        if (status?.job_state === 'completed' || status?.job_progress === 100) {
          console.log('Training completed!');
        }
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Error checking training status: ', error);
        }
      }
    };
    checkStatus(); // Check status immediately when component loads
  }, []); // Include apiKey if it's dynamic

  const handleChange = useCallback((e: any) => {
    setEmail(e.target.value);
  }, []);

  const formatTimeRemaining = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours} hour${hours > 1 ? 's' : ''}${mins > 0 ? ` ${mins} min${mins > 1 ? 's' : ''}` : ''} `;
    } else
      return `${minutes} min${minutes > 1 ? 's' : ''} `;
  };


  // console.log(album, "album-artwork")

  return (
    <div className="w-[100%] lg:w-1/2 rounded-lg px-[6px]">
      <div className="mb-[13px] rounded-xl bg-[#170E27] lg:p-[20px]">
        <div className="ah-wrap">
          <div className="relative">
            {isShowingModal && (
              <div className="absolute -bottom-[240px] right-[100px] z-10 w-[138px] rounded-[5px] bg-[#2B2041] px-[12px] py-[14px]">
                <button className="mb-[9px] text-[12px]">
                  Share (Copy link)
                </button>
                <button className="mb-[9px] text-[12px]">
                  Share (Email invite)
                </button>
                <p className="mb-[9px] text-[12px]">Download</p>
                <div className="mb-[9px] h-[1px] w-full bg-white opacity-10" />
                <button className="mb-[9px] text-[12px]">Play next</button>
                <button className="mb-[9px] text-[12px]">Play later</button>
                <button className="mb-[9px] text-[12px]">Create station</button>
                <div className="mb-[9px] h-[1px] w-full bg-white opacity-10" />
                <button className="mb-[9px] text-[12px]">Add to library</button>
                <button className="mb-[9px] text-[12px]">
                  Add to playlist
                </button>
              </div>
            )}
            <div>
              <div>
                <div className="mb-[15px] flex  flex-wrap pt-1 sm:pt-0">
                  <div className="flex-none">
                    <ImageWithFallback
                      src={album.image_url ? album.image_url : defaultImage}
                      alt={`${album?.name}'s AI voice model`}
                      width={90}
                      height={90}
                      className="aspect-square h-[90px]	w-[90px] rounded-lg"
                    />
                  </div>
                  <div className="ml-[15px] flex-1">
                    <div>
                      <div>
                        <h3 className="mb-1 text-[18px] font-[600] text-white">
                          {album?.name}
                        </h3>
                        <h3 className="flex flex-auto items-center text-[14px] font-[400] text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>

                          {dayjs.utc(album?.date || album.created_at).local().fromNow()}
                        </h3>
                      </div>
                    </div>

                    {album &&
                      album.traits &&
                      album.traits.length > 0 &&
                      album.traits.map((trait: any, index: any) => (
                        <div key={index} className="mt-[10px] mr-2 inline-flex gap-2.5">
                          {trait &&
                            trait.trait_values &&
                            trait.trait_values.map((value: any, index: any) => (
                              <p key={index} className={`${index === 0 ? '' : ''} rounded-full bg-[#2B2041] px-3 py-1.5 text-xs font-semibold tracking-wide`}>
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                              </p>
                            ))}
                        </div>
                      ))}
                  </div>
                  {
                    album.enabled && (
                      <Menu as="div" className="relative z-10 inline-block text-left">
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 mt-2 text-sm font-semibold text-gray-900 shadow-sm ">
                            <BsThreeDotsVertical className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                          </Menu.Button>
                        </div>
                        <Transition
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    href={`/ai-voice-generator/${album?.id}`}
                                    className={classNames(
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'block px-4 py-2 text-sm'
                                    )}
                                  >
                                    Use this voice
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => {
                                  return !shared ? (
                                    <>
                                      {album?.share_model?.length > 0 ? (
                                        <>
                                          <button
                                            className={classNames(
                                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                              'block w-full px-4 py-2 text-left text-sm'
                                            )}
                                            onClick={handleOpenModal}
                                          >
                                            Shared with: {album?.share_model.length}
                                          </button>

                                        </>
                                      ) : (
                                        <>
                                          <button
                                            className={classNames(
                                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                              'block w-full px-4 py-2 text-left text-sm'
                                            )}
                                            onClick={handleOpenModal}
                                          >
                                            Share
                                            <svg className="inline w-4 h-4 ml-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1004.1441"><path d="m946 383.144-279-250c-25-21-63-4-63 29v130c-366 4-533 345-562 520 196-225 321-291 562-295v141c0 34 38 50 63 29l279-245c17-17 17-42 0-59z" /></svg>
                                          </button>

                                        </>)
                                      }
                                    </>) : (<></>)
                                }}
                              </Menu.Item>

                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={classNames(
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'block w-full px-4 py-2 text-left text-sm ',
                                      userId !== album?.created_by ? 'cursor-not-allowed' : ''
                                    )}
                                    onClick={onEdit}
                                    disabled={userId !== album?.created_by}
                                  >
                                    <div className='flex gap-2 items-center' >
                                      Edit <PenBox scale={12} width={12} />
                                    </div>
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={classNames(
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'w-full px-4 py-2 text-left text-sm block',
                                      userId !== album?.created_by ? 'cursor-not-allowed' : ''
                                    )}
                                    onClick={onRemove}
                                    disabled={userId !== album?.created_by}
                                  >
                                    <div className='flex items-center gap-2'>
                                      Remove <TrashIcon width={12} />
                                    </div>
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>

                    )
                  }
                  <Modal isOpen={modalOpen} currentModel={album} onClose={handleCloseModal} currentUserId={currentUserId} modelName={album?.name} />

                </div>
                <div>
                  <div className="flex flex-row z-0">
                    {album.enabled && (
                      <p className="rounded-[5px] bg-green-600 px-[12px] py-[2px] text-sm text-white">
                        Ready
                      </p>
                    )}
                    {!album.enabled && album.job_id && (
                      <p className="rounded-[5px] bg-primary-600 px-[12px] py-[2px] text-sm text-white">
                        Training
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap">
                    {/* <div className="w-[100%] lg:w-1/2 flex-auto lg:pr-[7.5px]">
                      <p className="text-[12px] font-[500] uppercase text-[#ffffff80]">
                        Input Voice
                      </p>
                      {album.audio_demo_url && (
                        <WaveformAudioPlayer src={album.audio_demo_url} />
                      )}
                    </div> */}
                    <div className="w-[100%] lg:w-1/2 flex-auto lg:pl-[7.5px]">
                      {/* <p className="text-[12px] font-[500] uppercase text-[#ffffff80]">
                        Converted Voice
                      </p> */}
                      {album?.result?.map((i: any) => (
                        <WaveformAudioPlayer key={i} src={i} variant="quinary" hideLinkButton={true} />
                      ))}
                    </div>
                  </div>
                </div>
                {album.job_id && !album.enabled && (
                  <div className="animate-pulse">
                    <div className="flex items-center justify-between px-1 mt-2">
                      <p className="mb-2 text-sm font-semibold text-white">
                        Training in progress
                        {jobPlaceInQueue ?
                          ` – number ${jobPlaceInQueue} in queue (~${formatTimeRemaining(jobPlaceInQueue * 7)} left)`
                          : '...'}
                      </p>
                      {jobProgress !== null && (
                        <p className="mb-2 text-sm font-semibold text-white">
                          {jobProgress}%
                        </p>
                      )}
                    </div>
                    {/* <Progress value={jobProgress || 0} className="w-full h-3" /> */}
                  </div>
                )}

                {album.audio_demo_url && (
                  <div className="flex w-full flex-col z-0 justify-between rounded-[5px]">
                    <WaveformAudioPlayer
                      src={album.audio_demo_url || ''}
                      conversionId={album.id}
                      variant="quinary" hideLinkButton={true}
                    />
                  </div>
                )}
                {album.job_id && !album.enabled && (
                  <div className="flex flex-row justify-between mt-7">
                    <div className="flex flex-row items-center">
                      <Image
                        src={defaultImage}
                        className="rounded-full aspect-square "
                        alt={album?.name}
                        width={34}
                        height={34}
                      />
                      <div className="ml-[10px] flex flex-col">
                        <p className="text-[14px] font-[700]">
                          {album?.name}
                        </p>
                        <p className="text-[14px] text-[#9F9F9F]">
                          {dayjs.utc(album?.created_at || album?.date).local().fromNow()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      <button className="ml-5 rounded-lg border-[1px] bg-white px-3.5 py-2 font-[500] text-black-700 transition-all duration-200 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D]"
                        onClick={handleCancelTrain}
                      >
                        {canceling ? 'Canceling ...' : 'Cancel training'}
                      </button>
                    </div>
                  </div>
                )}
                {album.enabled && (
                  <div className="flex flex-row justify-between mt-7">
                    <div className="flex flex-row items-center">
                      <Image
                        src={defaultImage}
                        className="rounded-full aspect-square "
                        alt={album?.name}
                        width={34}
                        height={34}
                      />
                      <div className="ml-[10px] flex flex-col">
                        <p className="text-[14px] font-[700]">
                          {album?.name}
                        </p>
                        <p className="text-[14px] text-[#9F9F9F]">
                          {dayjs.utc(album?.created_at || album?.date).local().fromNow()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      {/* <button
                        className="ml-[9.6px] px-px py-2"
                        onClick={() => setIsShowingModal((prev) => !prev)}
                      >
                        <svg
                          width="15"
                          height="3"
                          viewBox="0 0 15 3"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.5 3C8.32843 3 9 2.32843 9 1.5C9 0.671573 8.32843 0 7.5 0C6.67157 0 6 0.671573 6 1.5C6 2.32843 6.67157 3 7.5 3Z"
                            fill="white"
                          />
                          <path
                            d="M1.5 3C2.32843 3 3 2.32843 3 1.5C3 0.671573 2.32843 0 1.5 0C0.671573 0 0 0.671573 0 1.5C0 2.32843 0.671573 3 1.5 3Z"
                            fill="white"
                          />
                          <path
                            d="M13.5 3C14.3284 3 15 2.32843 15 1.5C15 0.671573 14.3284 0 13.5 0C12.6716 0 12 0.671573 12 1.5C12 2.32843 12.6716 3 13.5 3Z"
                            fill="white"
                          />
                        </svg>
                      </button> */}


                    </div>
                    {/* <div className="flex flex-col items-end">
                      <button onClick={() => setShowModal(true)}>
                        <Image src={threeDots} alt="threeDots icon" />
                      </button>
                      <p className="mt-[5px] text-[14px] font-light text-[#606266]">
                        {format(new Date(album?.model?.created_at), 'dd.MM.yyyy')}
                      </p>
                    </div> */}
                  </div>
                )}
                {showDrawer && (
                  <div className="fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-black-700/50">
                    <div className="absolute right-0 h-full w-[380px] bg-[#170E27] p-[24px]">
                      <div className="flex flex-row items-end justify-between">
                        <div className="flex flex-col">
                          <p className="text-[18px] font-[400]">
                            Generation title
                          </p>
                          <p className="mt-[8px] text-[14px] font-light text-[#797A80]">
                            By Jacob Jones
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_917_10290)">
                              <path
                                d="M8.87423 7.51168L14.7149 1.6708C15.095 1.29087 15.095 0.676588 14.7149 0.296663C14.335 -0.0832625 13.7207 -0.0832625 13.3408 0.296663L7.49992 6.13754L1.65921 0.296663C1.27911 -0.0832625 0.665002 -0.0832625 0.285077 0.296663C-0.0950257 0.676588 -0.0950257 1.29087 0.285077 1.6708L6.12578 7.51168L0.285077 13.3526C-0.0950257 13.7325 -0.0950257 14.3468 0.285077 14.7267C0.474417 14.9162 0.72337 15.0114 0.972145 15.0114C1.22092 15.0114 1.4697 14.9162 1.65921 14.7267L7.49992 8.88582L13.3408 14.7267C13.5303 14.9162 13.7791 15.0114 14.0279 15.0114C14.2766 15.0114 14.5254 14.9162 14.7149 14.7267C15.095 14.3468 15.095 13.7325 14.7149 13.3526L8.87423 7.51168Z"
                                fill="#E0E1E6"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_917_10290">
                                <rect width="15" height="15" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <p className="mt-[12px] text-[14px] font-light text-[#797A80]">
                            a day ago
                          </p>
                        </div>
                      </div>
                      <p className="mt-[32px] text-[14px] font-semibold">
                        Input
                      </p>
                      <p className="mb-[8px] mt-[16px] text-[14px] text-[#797A80]">
                        Recording 123 - 12.05.2023
                      </p>
                      <WaveformAudioPlayer src="https://revocalize.s3.us-east-2.amazonaws.com/output/1112345/30_05_2023_11_00_07_None.wav" />
                      <div className="my-[32px] h-px w-full bg-[#251D35]" />
                      <p className="text-[14px] font-semibold">Result</p>
                      <p className="mb-[8px] mt-[16px] text-[14px] font-light text-[#797A80]">
                        Generation title
                      </p>
                      <WaveformAudioPlayer src="https://revocalize.s3.us-east-2.amazonaws.com/output/1112345/30_05_2023_11_00_07_None.wav" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {showModal && (
              <div className="absolute -bottom-[50px] right-[10px] w-[185px] rounded-[10px] bg-[#2B2041] p-[15px]">
                <button className="w-full px-[18px] py-[10px] text-[15px] font-normal">
                  Copy link
                </button>
                <button className="mt-[10px] w-full rounded-[5px] px-[18px] py-[10px] text-[15px] font-normal">
                  Download
                </button>
                <button
                  className="mt-[10px] w-full rounded-[5px] bg-[rgba(255,_255,_255,_0.08)] px-[18px] py-[10px] text-[15px] font-normal"
                  onClick={() => {
                    setShowModal(false);
                    setShowInviteModal(true);
                  }}
                >
                  Share
                </button>
              </div>
            )}

            {showInviteModal && (
              <div className="absolute -bottom-[50px] right-[10px] w-[350px] rounded-[10px] bg-[#2B2041] p-[15px]">
                <p className="mb-[16px] text-[#E0E1E6]">Share generation</p>
                <div className="flex flex-row z-0">
                  <input
                    value={email}
                    onChange={handleChange}
                    className="mr-[8px] w-full rounded-[5px] bg-[rgba(255,_255,_255,_0.19)] px-[8px] py-[6px]"
                    placeholder="Add collaborators emails"
                  />
                  <button
                    className="rounded-[5px] bg-[#30DAFF] px-[19px] py-[6px] font-medium text-[#0A0118]"
                    onClick={handleClick}
                  >
                    Invite
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
