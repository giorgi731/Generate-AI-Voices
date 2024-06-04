'use client';
import React, { useState, useEffect, useMemo } from 'react';
import AppContainer from '../components/AppContainer';
import Link from 'next/link';
import { AlbumArtwork } from '../tasks/components/album-artwork';
import useGetUserModels from '~/lib/models/hooks/use-get-user-models';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import useGetSharedModels from '~/lib/models/hooks/use-get-user-shared-models';
import RemoveModalDialog from './components/RemoveModelDialog';
import EditModelDialog from './components/EditModelDialog';
import { deleteModel } from '~/lib/models/database/mutations';
import { useRemoveModel, useUpdateModel } from '~/lib/models/hooks/use-model';
import useUserId from '~/core/hooks/use-user-id';

const categories = [
  'All Models',
  'Finished Training',
  // 'Payment Pending',
  'Training In Progress',
  'Shared with me'
] as const;

type Category = (typeof categories)[number];
type TabName = 'my-voice-models' | 'shared-with-me';

const page = () => {
  const router = useRouter();
  const organization = useCurrentOrganization();
  const userModelsData = useGetUserModels();
  const userSharedModelsData = useGetSharedModels();
  const userId = useUserId()
  const updateModelMutation = useUpdateModel(userId);
  const removeModelMutation = useRemoveModel(userId);

  const [userModels, setUserModels] = useState<{
    [x: string]: any;
  }[]>([]);
  const [userSharedModels, setSharedWithModels] = useState<{
    [x: string]: any;
  }[]>([]);

  useEffect(() => {
    if (userModelsData.data)
      setUserModels(userModelsData.data)
  }, [userModelsData.data]);

  useEffect(() => {
    if (userSharedModelsData.data)
      setSharedWithModels(userSharedModelsData.data)
  }, [userSharedModelsData.data]);

  const [selectedTab, setSelectedTab] = useState<TabName>('my-voice-models');
  const [selectedLayout, setSelectedLayout] = useState('row');
  const [selectedCategory, setSelectedCategory] =
    useState<Category>('All Models');

  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<Record<string, any>>();

  const handleRemoveModalConfirm = async () => {
    const modelId = selectedModel!.id;
    await removeModelMutation.trigger(modelId).then(res => {
      setUserModels(res as Record<string, any>[])

    }).catch(e => {
      console.log(e)
    });
    setShowRemoveModal(false)
    
  }

  const handleEdit = (model: Record<string, any>) => async () => {
    setSelectedModel(model);

    setShowEditModal(true);

  }

  const handleRemove = (model: Record<string, any>) => () => {
    setSelectedModel(model);
    setShowRemoveModal(true);
  }

  const handleSaveModel = async (model: Record<string, any>) => {
    if (model.hasOwnProperty('share_model')) {
      delete model.share_model;
    }
    await updateModelMutation.trigger(model).then(res => {
      setUserModels(res as Record<string, any>[]);
    }).catch(e => {
      console.log(e)
    })
    setShowEditModal(false)
  }

  const models = useMemo(() => {
    if (selectedCategory === 'Shared with me' && userSharedModels) {
      return userSharedModels.map(data => {
        return { ...data, shared: true }
      }) as {
        [x: string]: any;
      }[];
    }
    if (userModels) {
      if (selectedCategory === 'All Models') {

        return [...userModels, ...userSharedModels.map(data => ({ ...data, shared: true }))] as {
          [x: string]: any;
        }[];
      } else if (selectedCategory === 'Finished Training') {
        return userModels.filter((item) => {
          return item.job_id && item.enabled === true ? true : false;
        });
      } else if (selectedCategory === 'Training In Progress') {
        return userModels.filter((item) => {
          return item.job_id && item.enabled === true ? false : true;
        });
      }
    } else {
      return [];
    }
  }, [selectedCategory, userModels, userSharedModels]);


  const finishedModelCount = useMemo(() => {
    if (userModelsData.data) {
      return userModelsData.data.filter((item) => {
        return item.job_id && item.enabled === true ? true : false;
      }).length;
    } else {
      return 0
    }
  }, [selectedCategory, userModelsData.data]);

  const sharedModelsCount = useMemo(() => {
    if (userSharedModels) {
      return userSharedModels.length;
    }
    return 0;
  }, [selectedCategory, userSharedModels])

  const trainingCount = useMemo(() => {
    if (userModelsData.data) {

      return userModelsData.data.filter((item) => {
        return item.job_id && item.enabled === true ? false : true;
      }).length;

    } else {
      return 0
    }
  }, [selectedCategory, userModelsData.data]);
  useEffect(() => {
    if (userModelsData.data) {
      router.refresh();
    }
  }, [router, userModelsData.data]);

  const handleCancelTrain = (id: number) => async () => {
    const orgId = organization?.id;
    if (orgId && id) {
      const response = await fetch("/api/models/cancel", {
        method: "post",
        body: JSON.stringify({
          orgId, modelId: id
        }, null),
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await response.json();
      console.log(response);
      if (result.success === true) {
        const _models = userModels.filter(model => model.id !== id)
        setUserModels(_models)
      }
    }
  }

  return (
    <div>
      {/* <AppHeader>
        {' '}
        <input
          className="rounded-[5px] bg-[#2B2041] px-[16px] py-[3px] text-[13px]"
          placeholder="Search artist voices"
        />
      </AppHeader> */}
      <AppContainer>
        <div className="px-3 lg:px-0">
          <div
            className="mb-[13px] rounded-[12px] px-[29px] pb-10 pt-9"
            style={{
              background:
                'linear-gradient(-238.72deg, #0094ff 0%, #000066 100%), radial-gradient(100% 188.01% at 76.14% 0%, #43DDFF 0%, #FF0000 100%), linear-gradient(0deg, #DB00FF 0%, #14FF00 100%), radial-gradient(59.2% 100% at 50% 100%, #6A00D5 0%, #00E0FF 100%), radial-gradient(100% 148.07% at 0% 0%, #FF9900 0%, #001AFF 100%)',
            }}
          >
            <div className="flex flex-row justify-between w-full">
              <h1 className="mb-2 text-2xl font-black leading-[53px] dark:text-white md:text-3xl">
                My AI Voices
              </h1>
            </div>
            <p className="font-[400] text-white mb-3">
              Create and manage your AI voices. You can create as many voices as
              you want. You can also share your voices with other users.
            </p>
            <Link href="/create-ai-voice">
              <button className="text-md relative flex flex-row items-center rounded-lg bg-white px-5 py-2.5 text-black-700 transition-all duration-200 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D]">
                Create New Voice
              </button>
            </Link>
          </div>
        </div>

        <div className="px-3 lg:px-0">
          <div className="pb-6">
            <div className="relative w-full">
              {/* <button
              className="flex flex-col"
              onClick={() => setSelectedTab('my-voice-models')}
            >
              <h2
                className={`font-[500] text-white opacity-${selectedTab === 'my-voice-models' ? 100 : 50
                  }`}
              >
                My Voice Models
              </h2>
              <div
                className={`mt-[13px] h-[3px] w-full bg-${selectedTab === 'my-voice-models' ? 'white' : 'transparent'
                  }`}
              />
            </button> */}
              {/* <button
              className="absolute bottom-0 left-[145px] flex flex-col"
              onClick={() => setSelectedTab('shared-with-me')}
            >
              <h2
                className={`font-[500] text-white opacity-${
                  selectedTab === 'shared-with-me' ? 100 : 50
                }`}
              >
                Shared With Me
              </h2>
              <div
                className={`mt-[13px] h-[3px] w-full bg-${
                  selectedTab === 'shared-with-me' ? 'white' : 'transparent'
                }`}
              />
            </button> */}
            </div>
            <div className="flex flex-row justify-between mt-7">
              <div>
                {categories.map((i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedCategory(i)}
                    className={`inline-block mb-2 lg:mb-6 mr-[10px] rounded-[20px] border-[1px] border-[#954DFC] first:ml-0 bg-${selectedCategory === i ? '[#954DFC]' : '[#FFFFFF1A]'
                      } px-[14px] py-[5px] text-[14px] text-white`}
                  >
                    <span>
                      {i}
                    </span>
                    <span className='px-2 ml-3 bg-blue-700 rounded-full'>
                      {i === 'All Models' ? trainingCount + finishedModelCount + sharedModelsCount : i === 'Finished Training' ? finishedModelCount : i === 'Training In Progress' ? trainingCount : sharedModelsCount}
                    </span>
                  </button>
                ))}
              </div>

            </div>
            <div>
              <div className="flex flex-row items-center justify-between hidden my-6">
                {userModelsData &&
                  userModelsData?.data &&
                  userModelsData?.data?.length > 0 ? (
                  <p className="text-md">
                    {userModelsData?.data?.length === 1
                      ? `${userModelsData?.data?.length} voice model`
                      : `${userModelsData?.data?.length} voice models`}
                  </p>
                ) : (
                  <></>
                )}
                <div className="flex flex-row">
                  <div className="flex flex-row items-center">
                    <p className="text-[14px] text-white opacity-50">Sort by:</p>
                    <p className="ml-[5px] text-[14px]">Date created</p>
                    <ChevronDown className="h-5" />
                  </div>
                  <div className="ml-[16px] flex flex-row items-center">
                    <button
                      className="flex h-[32px] items-center justify-center rounded-l-[5px] border-[1px] border-[#4E4B59] px-[9px] py-[8px]"
                      onClick={() => setSelectedLayout('row')}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity={selectedLayout === 'row' ? 1 : 0.5}>
                          <path
                            d="M12.3562 7.03125H9.83125C8.575 7.03125 7.96875 6.475 7.96875 5.325V2.4875C7.96875 1.3375 8.58125 0.78125 9.83125 0.78125H12.3562C13.6125 0.78125 14.2187 1.3375 14.2187 2.4875V5.31875C14.2187 6.475 13.6062 7.03125 12.3562 7.03125ZM9.83125 1.71875C8.99375 1.71875 8.90625 1.95625 8.90625 2.4875V5.31875C8.90625 5.85625 8.99375 6.0875 9.83125 6.0875H12.3562C13.1937 6.0875 13.2812 5.85 13.2812 5.31875V2.4875C13.2812 1.95 13.1937 1.71875 12.3562 1.71875H9.83125Z"
                            fill="white"
                          />
                          <path
                            d="M12.3562 14.2187H9.83125C8.575 14.2187 7.96875 13.6062 7.96875 12.3562V9.83125C7.96875 8.575 8.58125 7.96875 9.83125 7.96875H12.3562C13.6125 7.96875 14.2187 8.58125 14.2187 9.83125V12.3562C14.2187 13.6062 13.6062 14.2187 12.3562 14.2187ZM9.83125 8.90625C9.09375 8.90625 8.90625 9.09375 8.90625 9.83125V12.3562C8.90625 13.0937 9.09375 13.2812 9.83125 13.2812H12.3562C13.0937 13.2812 13.2812 13.0937 13.2812 12.3562V9.83125C13.2812 9.09375 13.0937 8.90625 12.3562 8.90625H9.83125Z"
                            fill="white"
                          />
                          <path
                            d="M5.16875 7.03125H2.64375C1.3875 7.03125 0.78125 6.475 0.78125 5.325V2.4875C0.78125 1.3375 1.39375 0.78125 2.64375 0.78125H5.16875C6.425 0.78125 7.03125 1.3375 7.03125 2.4875V5.31875C7.03125 6.475 6.41875 7.03125 5.16875 7.03125ZM2.64375 1.71875C1.80625 1.71875 1.71875 1.95625 1.71875 2.4875V5.31875C1.71875 5.85625 1.80625 6.0875 2.64375 6.0875H5.16875C6.00625 6.0875 6.09375 5.85 6.09375 5.31875V2.4875C6.09375 1.95 6.00625 1.71875 5.16875 1.71875H2.64375Z"
                            fill="white"
                          />
                          <path
                            d="M5.16875 14.2187H2.64375C1.3875 14.2187 0.78125 13.6062 0.78125 12.3562V9.83125C0.78125 8.575 1.39375 7.96875 2.64375 7.96875H5.16875C6.425 7.96875 7.03125 8.58125 7.03125 9.83125V12.3562C7.03125 13.6062 6.41875 14.2187 5.16875 14.2187ZM2.64375 8.90625C1.90625 8.90625 1.71875 9.09375 1.71875 9.83125V12.3562C1.71875 13.0937 1.90625 13.2812 2.64375 13.2812H5.16875C5.90625 13.2812 6.09375 13.0937 6.09375 12.3562V9.83125C6.09375 9.09375 5.90625 8.90625 5.16875 8.90625H2.64375Z"
                            fill="white"
                          />
                        </g>
                      </svg>
                    </button>
                    <button
                      className="flex h-[32px] items-center justify-center rounded-r-[5px] border-[1px] border-l-0 border-[#4E4B59] px-[9px] py-[8px]"
                      onClick={() => setSelectedLayout('column')}
                    >
                      <svg
                        width="16"
                        height="13"
                        viewBox="0 0 16 13"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity={selectedLayout === 'column' ? 1 : 0.5}>
                          <path d="M15.2019 12.3306H4.50339C4.06246 12.3306 3.70508 11.9733 3.70508 11.5323C3.70508 11.0914 4.06246 10.734 4.50339 10.734H15.2016C15.6426 10.734 15.9999 11.0914 15.9999 11.5323C15.9999 11.9733 15.6428 12.3306 15.2019 12.3306Z" />
                          <path d="M15.2019 7.31978H4.50339C4.06246 7.31978 3.70508 6.9624 3.70508 6.52146C3.70508 6.08052 4.06246 5.72314 4.50339 5.72314H15.2016C15.6426 5.72314 15.9999 6.08052 15.9999 6.52146C16.0002 6.9624 15.6428 7.31978 15.2019 7.31978Z" />
                          <path d="M15.2019 2.30891H4.50339C4.06246 2.30891 3.70508 1.95153 3.70508 1.5106C3.70508 1.06966 4.06246 0.71228 4.50339 0.71228H15.2016C15.6426 0.71228 15.9999 1.06966 15.9999 1.5106C15.9999 1.95153 15.6428 2.30891 15.2019 2.30891Z" />
                          <path d="M1.07214 2.64428C1.66426 2.64428 2.14428 2.16427 2.14428 1.57214C2.14428 0.980013 1.66426 0.5 1.07214 0.5C0.480013 0.5 0 0.980013 0 1.57214C0 2.16427 0.480013 2.64428 1.07214 2.64428Z" />
                          <path d="M1.07214 7.5938C1.66426 7.5938 2.14428 7.11379 2.14428 6.52166C2.14428 5.92954 1.66426 5.44952 1.07214 5.44952C0.480013 5.44952 0 5.92954 0 6.52166C0 7.11379 0.480013 7.5938 1.07214 7.5938Z" />
                          <path d="M1.07214 12.5428C1.66426 12.5428 2.14428 12.0628 2.14428 11.4707C2.14428 10.8786 1.66426 10.3986 1.07214 10.3986C0.480013 10.3986 0 10.8786 0 11.4707C0 12.0628 0.480013 12.5428 1.07214 12.5428Z" />
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {selectedTab === 'my-voice-models' && (
              <div className="flex flex-wrap">
                {models?.sort((a, b) => { return a.created_at > b.created_at ? -1 : 1 }).map((item, index) => {
                  return (
                    <AlbumArtwork
                      key={index}
                      showModel
                      album={item}
                      className={`mt-[15px] ${selectedLayout === 'row' ? 'even:ml-[15px]' : 'even:ml-0'
                        }`}
                      onCancelTrain={handleCancelTrain(item.id!)}
                      aspectRatio="video"
                      width={selectedLayout === 'column' ? 100 : undefined}
                      height={100}
                      shared={selectedCategory === "Shared with me" || item.shared === true}
                      afterAudioUrl={[
                        'https://revocalize.s3.us-east-2.amazonaws.com/output/1112345/19_06_2023_22_07_23_None.wav',
                      ]}

                      onEdit={handleEdit(item)}
                      onRemove={handleRemove(item)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </AppContainer>

      <RemoveModalDialog
        open={showRemoveModal}
        model={selectedModel?.name}
        onConfirm={handleRemoveModalConfirm}
        onCancel={() => setShowRemoveModal(false)}
        onClose={setShowRemoveModal}
      />
      <EditModelDialog
        open={showEditModal}
        model={selectedModel}
        onConfirm={handleSaveModel}
        onCancel={() => setShowEditModal(false)}
        onClose={setShowEditModal}
      />
    </div>
  );
};

export default page;
