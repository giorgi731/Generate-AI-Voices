'use client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import useUserId from '~/core/hooks/use-user-id';
import useUserSession from '~/core/hooks/use-user-session';
import useGetAllModels from '~/lib/models/hooks/use-get-all-models';
import useCreatePermision from '~/lib/permisions/hooks/use-create-permision';
import useGetUserIdByEmail from '~/lib/user/hooks/use-get-userId-by-email';
import AppHeader from '../components/AppHeader';
import AppContainer from '../components/AppContainer';

function page() {
  const allModels = useGetAllModels();
  const router = useRouter();
  const createPermisions = useCreatePermision();
  const { mutate: getUserIdByEmail } = useGetUserIdByEmail();
  const userSession = useUserSession();
  const [successMessage, setSuccessMessage] = useState<any>(false);
  const [email, setEmail] = useState<any>('');
  const [error, setError] = useState<any>(null);
  const [password, setPassword] = useState<any>('');
  const [isShowingContent, setIsShowingContent] = useState<boolean>(false);
  const userId = useUserId();
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const publicModels = allModels?.data?.filter((item) => item.public) as any;

  useEffect(() => {
    if (!allModels.isLoading) {
      setSelectedOptions(publicModels);
    }
  }, [allModels.isLoading]);

  const handleOptionClick = (option: any) => {
    setSuccessMessage(null);
    if (selectedOptions?.includes(option)) {
      setSelectedOptions(
        selectedOptions?.filter((item: any) => item !== option)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleClick = useCallback(async () => {
    const getUserByIdData = await getUserIdByEmail(email);

    const userById = getUserByIdData?.data?.id;

    selectedOptions.map(async (item: any) => {
      await createPermisions.trigger({
        user_id: userById,
        granted_at: new Date().toISOString(),
        granted_by: userId,
        permission_type: 'user',
        model_id: item.id,
        updated_at: new Date().toISOString(),
      });
    });
    setSuccessMessage(
      `Congrats, permissions succesfully set for the following models ${selectedOptions.map(
        (item: any) => item.name
      )}`
    );
  }, [email, selectedOptions]);

  useEffect(() => {
    if (userSession?.data?.role !== 'admin') {
      router.push('/');
    }
  }, [userSession]);

  if (userSession?.data?.role !== 'admin') {
    return;
  }

  const handleAccessPage = useCallback(() => {
    // if (password === 'Revo2023revo!') {
      setError(null);
      setIsShowingContent(true);
    // } else setError('incorrect password');
  }, [password]);

  return (
    <>
      <AppHeader>
        <input
          className="rounded-[5px] bg-[#2B2041] px-[16px] py-[3px] text-[13px]"
          placeholder="Search artist voices"
        />
      </AppHeader>

      <AppContainer></AppContainer>
      {!isShowingContent && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col">
            <input
              className="px-4 py-2 bg-white rounded-sm"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="mt-[10px] rounded-sm bg-blue-400 px-4 py-2"
              onClick={handleAccessPage}
            >
              Access page
            </button>
            {error && (
              <p className="mt-[10px] text-center text-[14px] font-[900] text-[red]">
                {error}
              </p>
            )}
          </div>
        </div>
      )}
      {isShowingContent && (
        <div className="m-[20px] flex flex-row">
          <div className="flex w-[500px] flex-col rounded-md bg-gradient-radial-transparent p-[20px]">
            {allModels?.data?.map((item) => (
              <div className="flex flex-row">
                <input
                  type="checkbox"
                  checked={selectedOptions?.includes(item)}
                  onChange={() => handleOptionClick(item)}
                />
                <p className="ml-[10px] text-[20px] font-[600]">{item.name}</p>
              </div>
            ))}
          </div>
          <div className="ml-[10px] flex flex-col">
            <input
              className="h-8 w-[300px] rounded-lg bg-white p-[10px] text-black-700"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="mt-[10px] rounded-md bg-gradient-radial px-3 py-2 text-white"
              onClick={handleClick}
            >
              add permissions
            </button>
            {successMessage && (
              <p className="w-[300px] font-[600] text-blue-400 mt-[10px]">
                {successMessage}
              </p>
            )}
            {createPermisions.error && (
              <p className="font-[600] text-red-700 w-[300px]">
                {createPermisions.error}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default page;
