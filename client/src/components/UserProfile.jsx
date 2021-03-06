import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { fetchUserById } from '../api/userApi';
import { fetchCreatedPost, fetchSavedPost } from '../api/postApi';
import VideoList from '../components/VideoList';

const activeBtnStyles =
    'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none dark:text-white';
const notActiveBtnStyles =
    'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none dark:text-white';

const UserProfile = () => {
    const [user, setUser] = useState();
    const [pins, setPins] = useState(null);
    const [text, setText] = useState('Created');
    const [activeBtn, setActiveBtn] = useState('created');
    const { userId } = useParams();

    useEffect(() => {
        fetchUserById(userId).then((data) => setUser(data));
    }, [userId]);

    useEffect(() => {
        if (text === 'Created') {
            fetchCreatedPost(userId).then((data) => setPins(data));
        } else {
            fetchSavedPost(userId).then((data) => setPins(data));
        }
    }, [text, userId]);

    if (!user) return <Spinner message='Loading profile' />;

    return (
        <div className='h-full justify-center items-center '>
            <div className='flex flex-col'>
                <div className='flex flex-col mb-7'>
                    <div className='flex flex-col justify-center items-center'>
                        <img
                            className=' w-2/3 shadow-lg object-cover rounded-lg'
                            src='https://source.unsplash.com/1600x900/?nature,photography,technology'
                            alt='user-pic'
                        />
                        <img
                            className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
                            src={user.avatar}
                            alt='user-pic'
                        />
                    </div>
                    <h1 className='font-bold text-2xl text-center mt-3 dark:text-white'>
                        {user.fullName}
                    </h1>
                </div>
                <div className='text-center mb-7'>
                    <button
                        type='button'
                        onClick={(e) => {
                            setText(e.target.textContent);
                            setActiveBtn('created');
                        }}
                        className={`${
                            activeBtn === 'created'
                                ? activeBtnStyles
                                : notActiveBtnStyles
                        }`}
                    >
                        Created
                    </button>
                    <button
                        type='button'
                        onClick={(e) => {
                            setText(e.target.textContent);
                            setActiveBtn('saved');
                        }}
                        className={`${
                            activeBtn === 'saved'
                                ? activeBtnStyles
                                : notActiveBtnStyles
                        }`}
                    >
                        Saved
                    </button>
                </div>

                <div className='px-2 dark:bg-[#181818] mt-6'>
                    {pins?.length !== 0 && (
                        <div className='px-4 text-lg font-bold dark:text-white pt-2'>
                            Image
                        </div>
                    )}

                    <MasonryLayout
                        pins={pins?.filter((item) => item.category === 'image')}
                    />
                </div>

                <div className='px-2 dark:bg-[#181818] pb-2'>
                    {pins?.length !== 0 && (
                        <div className='px-4 text-lg font-bold dark:text-white py-2'>
                            Video
                        </div>
                    )}
                    {pins?.length !== 0 && (
                        <VideoList
                            pins={pins?.filter(
                                (item) => item.category === 'video'
                            )}
                        />
                    )}
                </div>

                {pins?.length === 0 && (
                    <div className='flex justify-center dark:bg-[#181818] dark:text-white font-bold items-center w-full text-1xl pb-4'>
                        No Pins Found!
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
