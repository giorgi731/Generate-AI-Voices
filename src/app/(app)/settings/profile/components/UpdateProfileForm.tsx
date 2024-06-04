import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import toaster from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import useMutation from 'swr/mutation';

import type { SupabaseClient } from '@supabase/supabase-js';
import type { User } from '@supabase/gotrue-js';

import configuration from '~/configuration';
import useUpdateProfileMutation from '~/lib/user/hooks/use-update-profile';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import ImageUploadInput from '~/core/ui/ImageUploadInput';
import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import Modal from '~/core/ui/Modal';
import useSupabase from '~/core/hooks/use-supabase';

import type UserSession from '~/core/session/types/user-session';
import type UserData from '~/core/session/types/user-data';
import AuthErrorMessage from '~/app/(auth)/components/AuthErrorMessage';
import useGetUserIdByEmail from '~/lib/user/hooks/use-get-userId-by-email';

function UpdateProfileForm({
  session,
  onUpdateProfileData,
  onUpdateAuthData,
}: {
  session: UserSession;
  onUpdateProfileData: (user: Partial<UserData>) => void;
  onUpdateAuthData: (data: Partial<User>) => void;
}) {
  const updateProfileMutation = useUpdateProfileMutation();
  // const [usedUserName, setUsedUserName] = useState(false);
  // const { mutate: getUserIdByEmail } = useGetUserIdByEmail();

  const client = useSupabase();
  const { t } = useTranslation();

  const currentPhotoURL = session.data?.photoUrl ?? '';
  const currentDisplayName = session?.data?.displayName ?? '';
  // const currentUserName = session?.data?.userName ?? '';


  // const getUserID = async (userName: string) => {
  //   try {
  //     const getUserByIdData = await getUserIdByEmail(userName);
  //     const userId = getUserByIdData?.data?.id;
  //     return userId;
  //   } catch (error) {
  //     console.error("Error in getUserID:", error);
  //     return null;
  //   }
  // };

  const user = session.auth?.user;
  const provider = user?.app_metadata.provider;

  const currentPhoneNumber = user?.phone ?? '';
  const email = user?.email ?? '';

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      displayName: currentDisplayName,
      photoURL: '',
      // userName: currentUserName
    },
  });

  const [avatarIsDirty, setAvatarIsDirty] = useState(false);

  const onAvatarCleared = useCallback(() => {
    setAvatarIsDirty(true);
    setValue('photoURL', '');
  }, [setValue]);

  const onSubmit = async (
    displayName: string
    // , userName: string
    , photoFile: Maybe<File>
  ) => {
    const photoName = photoFile?.name;

    if (!user?.id) {
      return;
    }

    const photoUrl = photoName
      ? await uploadUserProfilePhoto(client, photoFile, user.id)
      : currentPhotoURL;

    const isAvatarRemoved = avatarIsDirty && !photoName;

    const info = {
      id: user.id,
      displayName,
      // userName,
      photoUrl: isAvatarRemoved ? '' : photoUrl,
    };

    // if (currentUserName != '' && currentUserName != null) {
    //   const targetUserIND = await getUserID(userName);
    //   if (targetUserIND != null && targetUserIND != '') {
    //     setUsedUserName(true);
    //     return;
    //   }
    //   else {
    //     setUsedUserName(false);
    //   }
    // }
    // setUsedUserName(false);
    // delete existing photo if different
    if (isAvatarRemoved) {
      try {
        await deleteProfilePhoto(client, currentPhotoURL);
      } catch (e) {
        // old photo not found
      }
    }

    const promise = updateProfileMutation.trigger(info).then(() => {
      onUpdateProfileData(info);
    });

    return toaster.promise(promise, {
      success: t<string>(`profile:updateProfileSuccess`),
      error: t<string>(`profile:updateProfileError`),
      loading: t<string>(`profile:updateProfileLoading`),
    });
  };

  const displayNameControl = register('displayName', {
    value: currentDisplayName,
  });

  // const userNameControl = register('userName', {
  //   value: currentUserName,
  // });

  const photoURLControl = register('photoURL');

  useEffect(() => {
    reset({
      displayName: currentDisplayName ?? '',
      photoURL: currentPhotoURL ?? '',
      // userName: currentUserName ?? '',
    });
  }, [
    currentDisplayName
    , currentPhotoURL
    // , currentUserName
    , reset
  ]);

  return (
    <>
      <form
        data-cy={'update-profile-form'}
        onSubmit={handleSubmit((value) => {
          return onSubmit(
            value.displayName
            // , value.userName
            , getPhotoFile(value.photoURL)
          );
        })}
      >
        <div className={'flex flex-col space-y-4'}>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'profile:displayNameLabel'} />

              <TextField.Input
                {...displayNameControl}
                data-cy={'profile-display-name'}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>
          {/* {usedUserName == true && (<p className='text-red-500 text-lg'> The User Name is already used, please choose another User Name</p>)
          } */}

          <TextField>
            <TextField.Label>
              <Trans i18nKey={'common:userName'} />
              <TextField.Input
                // {...userNameControl}
                data-cy={'profile-display-name'}
                minLength={2}
                placeholder={''}
              />
            </TextField.Label>
          </TextField>

          <TextField>
            <TextField.Label>
              <Trans i18nKey={'profile:profilePictureLabel'} />

              <ImageUploadInput
                {...photoURLControl}
                multiple={false}
                onClear={onAvatarCleared}
                image={currentPhotoURL}
              >
                <Trans i18nKey={'common:imageInputLabel'} />
              </ImageUploadInput>
            </TextField.Label>
          </TextField>

          <TextField>
            <TextField.Label>
              <Trans i18nKey={'profile:emailLabel'} />

              <TextField.Input disabled value={email} />
            </TextField.Label>

            <If condition={email && provider !== "google"}>
              <div>
                <Button
                  type={'button'}
                  color={'transparent'}
                  size={'small'}
                  href={configuration.paths.settings.email}
                  className='mt-3 mb-2 mr-0 lg:mb-4 lg:mr-3 rounded-lg border-[1px] border-gray-300 font-normal text-xs uppercase'
                >
                  <Trans i18nKey={'profile:updateEmailSubmitLabel'} />
                </Button>
              </div>
            </If>

            <If condition={!email}>
              <div>
                <Button
                  type={'button'}
                  color={'transparent'}
                  size={'small'}
                  href={configuration.paths.settings.authentication}
                >
                  <span className={'text-md font-normal'}>
                    <Trans i18nKey={'profile:addEmailAddress'} />
                  </span>
                </Button>
              </div>
            </If>
          </TextField>

          <div>
            <Button
              className={'w-full md:w-auto'}
              loading={updateProfileMutation.isMutating}
            >
              <Trans i18nKey={'profile:updateProfileSubmitLabel'} />
            </Button>
          </div>
        </div>
      </form >
    </>
  );
}

/**
 * @name getPhotoFile
 * @param value
 * @description Returns the file of the photo when submitted
 * It returns undefined when the user hasn't selected a file
 */
function getPhotoFile(value: string | null | FileList) {
  if (!value || typeof value === 'string') {
    return;
  }

  return value.item(0) ?? undefined;
}

async function uploadUserProfilePhoto(
  client: SupabaseClient,
  photoFile: File,
  userId: string
) {
  const bytes = await photoFile.arrayBuffer();
  const bucket = client.storage.from('avatars');
  const extension = photoFile.name.split('.').pop();
  const fileName = `${userId}.${extension}`;

  const result = await bucket.upload(fileName, bytes, {
    upsert: true,
  });

  if (!result.error) {
    return bucket.getPublicUrl(fileName).data.publicUrl;
  }

  throw result.error;
}

function deleteProfilePhoto(client: SupabaseClient, url: string) {
  const bucket = client.storage.from('logos');
  return bucket.remove([url]);
}

function RemovePhoneNumberButton({
  onSuccess,
}: React.PropsWithChildren<{
  onSuccess: () => void;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const unlinkProfileNumberMutation = useUnlinkProfilePhone();

  const onUnlinkPhoneNumber = useCallback(() => {
    const promise = unlinkProfileNumberMutation.trigger().then(() => {
      setIsModalOpen(false);
      onSuccess();
    });

    return toaster.promise(promise, {
      loading: t<string>(`profile:unlinkActionLoading`),
      success: t<string>(`profile:unlinkActionSuccess`),
      error: t<string>(`profile:unlinkActionError`),
    });
  }, [unlinkProfileNumberMutation, t, onSuccess]);

  return (
    <>
      <Button
        type={'button'}
        color={'transparent'}
        size={'small'}
        onClick={() => setIsModalOpen(true)}
      >
        <span className={'text-md font-normal'}>
          <Trans i18nKey={'profile:removePhoneNumber'} />
        </span>
      </Button>

      <Modal
        heading={<Trans i18nKey={'profile:removePhoneNumber'} />}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <div className={'flex flex-col space-y-3'}>
          <div>
            <Trans i18nKey={'profile:confirmRemovePhoneNumberDescription'} />
          </div>

          <div>
            <Trans i18nKey={'common:modalConfirmationQuestion'} />
          </div>

          <AuthErrorMessage error={unlinkProfileNumberMutation.error} />

          <Button
            block
            loading={unlinkProfileNumberMutation.isMutating}
            color={'danger'}
            onClick={onUnlinkPhoneNumber}
          >
            <Trans i18nKey={'profile:confirmRemovePhoneNumber'} />
          </Button>
        </div>
      </Modal>
    </>
  );
}

function useUnlinkProfilePhone() {
  const client = useSupabase();
  const key = 'unlinkProfilePhone';

  return useMutation(key, async () => {
    return client.auth
      .updateUser({
        phone: undefined,
      })
      .then((response) => {
        if (response.error) {
          throw response.error;
        }

        return response.data;
      });
  });
}

export default UpdateProfileForm;
