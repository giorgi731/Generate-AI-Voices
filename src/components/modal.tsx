import React, { KeyboardEvent, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import useGetUserIdByEmail from '~/lib/user/hooks/use-get-userId-by-email';
import useCreatePermision from '~/lib/permisions/hooks/use-create-permision';
import useSetShareModel from '~/lib/user/hooks/use-set-share-model';
import useGetSharedUsers from '~/lib/user/hooks/use-get-shared-users';
import useDeleteSharedUsers from '~/lib/user/hooks/use-delete-shared-user';
import { event } from 'cypress/types/jquery';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentModel: any;
    currentUserId: any;
    modelName: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, currentModel, currentUserId, modelName }) => {
    const [showModelContent, setShowNewModalContent] = useState(false);
    const [shareEmailName, setShareEmailName] = useState("");
    const { mutate: getUserIdByEmail } = useGetUserIdByEmail();
    const { mutate: setShareModel } = useSetShareModel();
    const { mutate: getShared } = useGetSharedUsers();
    const { mutate: deleteShared } = useDeleteSharedUsers();
    const createPermisions = useCreatePermision();
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [sharedUsers, setSharedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSharedUserLoading, setIsSharedUserLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);


    const getUserID = async () => {
        try {
            const getUserByIdData = await getUserIdByEmail(shareEmailName);
            const userId = getUserByIdData?.data?.id;
            return userId;
        } catch (error) {
            console.error("Error in getUserID:", error);
            return null;
        }
    };
    const handleShare = async () => {
        try {
            if (shareEmailName == "") {
                setEmailIsValid(false);
                return
            }
            setIsLoading(true)
            const shareUserID = await getUserID();
            if (shareUserID !== null) {
                await setShareModel(currentUserId, shareUserID, currentModel.id);
                setIsLoading(false)
                setEmailIsValid(true);
                getSharedList()
                setShowNewModalContent(prev => !prev);
            } else {
                setIsLoading(false)
                setEmailIsValid(false);
            }
        } catch (error) {
            console.error("handleShare error:", error);
        }
    };

    const eraseSharedUser = (eraseID: any) => async () => {
        try {
            await deleteShared(eraseID)
            getSharedList()
        } catch (error) {
            console.error("eraseSharedUser error:", error);
        }
    }
    const getSharedList = useCallback(async () => {
        if (currentModel.id && isOpen) {
            try {
                setIsSharedUserLoading(true)
                const { data, error } = await getShared(currentModel.id);
                setIsSharedUserLoading(false)
                if (data) {
                    setSharedUsers(data);
                } else {
                    setSharedUsers([]);
                }
            } catch (error) {
                console.error("getSharedList error", error);
            }
        }

    }, [currentModel.id, isOpen]);

    useEffect(() => {
        getSharedList()
    }, [getSharedList])

    const closeHandle = () => {
        setShowNewModalContent(false)
        setShareEmailName("")
        setEmailIsValid(true)
        onClose()
    }

    const eraseInput = () => {
        setShareEmailName("")
    }
    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target == e.currentTarget) {
            closeHandle && closeHandle()
        }
    }

    const handleEmailChange = (e: { target: { value: string; }; }) => {
        const lowerCaseEmail = e.target.value.toLowerCase();
        setShareEmailName(lowerCaseEmail);
      };

    useEffect(() => {
        const handleEscKey = (e: any) => {
            if (e.key === 'Escape') {
                closeHandle();
            }
        };

        window.addEventListener('keydown', handleEscKey);

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] overflow-y-auto h-full w-full flex justify-center items-center z-50" ref={modalRef} onClick={handleClose} >
            <div className="relative rounded-xl shadow bg-[#282137] w-full max-w-5xl mx-4 md:w-5/12">
                <button
                    type="button"
                    className="absolute top-3 right-2.5 text-white bg-transparent rounded-lg text-sm p-1.5"
                    onClick={closeHandle}
                >
                    <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_529_155)">
                            <path d="M6 18L17.94 6M18 18L6.05998 6.00001" stroke="#FFFDFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>

                </button>
                {!showModelContent ? (
                    <div className=" px-8 py-14 block">
                        <img
                            src="/_next/static/media/default.561d6ad3.png"
                            alt='logo'
                            width={60}
                            height={60}
                            className='rounded-lg overflow-hidden'
                        >
                        </img>
                        <p className="py-8 text-white-500 text-3xl font-bold">Who do you want to share <span className='text- -500'>{modelName}</span> model with?</p>
                        <p className="text-white-500 text-xl">The user with the email address you enter below will get access to your model.</p>
                        <p className="text-white-500 text-xl">Your model won't disappear from your models. You can change your sharing permissions anytime.</p>
                        {emailIsValid == false && (<p className='text-red-500 text-lg'> The email address is not registered, please insert a valid email address </p>)
                        }
                        <div className="relative mt-8 mb-3 md:flex  xs:flex-col items-center gap-3 ">
                            <div className="relative xs:w-full max-w-5xl md:w-1/2 mb-3 ">
                                <input
                                    placeholder="Email address"
                                    className="pr-10 pl-5 py-4 inline-flex bg-[#FFFFFF0D] rounded-xl w-full "
                                    value={shareEmailName}
                                    onChange={handleEmailChange}
                                />
                                {shareEmailName && (
                                    <button className='absolute right-5 top-5 '>
                                        <svg
                                            viewBox="0 0 24 27"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className=" w-4 h-5 text-[#FFFDFD]"
                                            onClick={eraseInput}
                                        >
                                            <g filter="url(#filter0_d_529_155)">
                                                <path
                                                    d="M6 18L17.94 6M18 18L6.05998 6.00001"
                                                    stroke="#FFFDFD"
                                                />
                                            </g>
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <button
                                className="py-3 mb-3 d:ml-4 rounded-lg border-[1px]  text-white border-[#954DFC] bg-[#954DFC] px-3.5 font-[500] text-white-700 transition-all  w-full max-w-5xl md:w-auto duration-200 disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D]"
                                onClick={handleShare}
                                disabled={isLoading}
                            >
                                {isLoading &&
                                    <div
                                        className="animate-spin mr-2.5 inline-flex align-middle mb-[2px]"
                                    >
                                        <svg fill="none" height="16" stroke="currentColor" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"
                                            onClick={eraseInput}
                                        >
                                            <path d="M14 8C14 11.3137 11.3137 14 8 14 4.68629 14 2 11.3137 2 8 2 4.68629 4.68629 2 8 2 11.3137 2 14 4.68629 14 8Z" opacity=".15" />
                                            <path d="M14 8C14 11.3137 11.3137 14 8 14 4.68629 14 2 11.3137 2 8 2 4.68629 4.68629 2 8 2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                }
                                Share
                                <svg className="ml-2 inline w-4 h-4 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1004.1441"><path d="m946 383.144-279-250c-25-21-63-4-63 29v130c-366 4-533 345-562 520 196-225 321-291 562-295v141c0 34 38 50 63 29l279-245c17-17 17-42 0-59z" /></svg>
                            </button>
                        </div>
                        {isSharedUserLoading == true ? (
                            <div className='flex justify-center'>

                                <div
                                    className="animate-spin mr-2.5 inline-flex align-middle mb-[2px]"
                                >
                                    <svg fill="none" height="30" stroke="currentColor" viewBox="0 0 16 16" width="30" xmlns="http://www.w3.org/2000/svg"

                                    >
                                        <path d="M14 8C14 11.3137 11.3137 14 8 14 4.68629 14 2 11.3137 2 8 2 4.68629 4.68629 2 8 2 11.3137 2 14 4.68629 14 8Z" opacity=".15" />
                                        <path d="M14 8C14 11.3137 11.3137 14 8 14 4.68629 14 2 11.3137 2 8 2 4.68629 4.68629 2 8 2" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <>
                                {sharedUsers && sharedUsers.length > 0 && (
                                    <p className='pt-2 pb-1 text-white-500 text-3xl font-bold'>
                                        Your model is shared with {sharedUsers.length} users
                                    </p>
                                )
                                }
                                {
                                    sharedUsers.map((user: any, index: number) => (
                                        <>
                                            <div className="relative  inline-flex mt-2 mb-2 px-3 py-1 bg-[#FFFFFF0D] border-[1px] border-[#eae4f3] rounded-xl w-full max-w-5xl  md:w-1/2">
                                                {user.users?.email}
                                            </div>
                                            <button key={index}
                                                className="py-1 md:ml-4 rounded-lg border-[1px] w-full max-w-5xl md:w-auto text-white border-[#954DFC] bg-[#954DFC] px-3.5 font-[500] text-white-700 transition-all duration-200 disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D]"
                                                onClick={eraseSharedUser(user.id)}
                                            >
                                                Cancel Sharing
                                            </button>
                                        </>
                                    ))
                                }
                            </>
                        )}
                    </div>) : (
                    <div className=" px-8 py-14">
                        <img
                            src="/Eo_circle_green_checkmark.png"
                            alt='logo'
                            width={60}
                            height={60}
                            className='rounded-full overflow-hidden border-[#33852c] border-[1px]'
                        >
                        </img>
                        <p className="py-8 text-white-500 text-3xl font-bold">Your model has been shared!</p>
                        <p className="text-white-500 text-xl">You can change sharing permissions anytime.</p>
                        <Link href="/my-models">
                            <button
                                className=" mt-8 text-md relative flex flex-row items-center rounded-lg bg-white px-5 py-2.5 text-black-700 transition-all duration-200 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D]"
                                onClick={closeHandle}
                            >
                                Go to My Models
                            </button>
                        </Link>
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default Modal; 