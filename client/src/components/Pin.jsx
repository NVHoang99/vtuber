import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import { FaEllipsisH } from 'react-icons/fa';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

const Pin = ({ pin }) => {
    const user = useSelector((state) => state.authReducer);
    const [postHovered, setPostHovered] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { savedBy, attachments, _id, destination } = pin.post;

    let alreadySaved = !!savedBy?.filter((item) => item?._id === user?._id)
        ?.length;

    const savePin = (id) => {
        if (!alreadySaved) {
            if (user) {
                dispatch({
                    type: 'SAVE_POST_REQUEST',
                    payload: { post: id, user: user._id },
                });
            } else {
                navigate('/login');
            }
        }
    };

    return (
        <div className='m-2'>
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out select-none'
            >
                <img
                    className='rounded-lg w-full '
                    src={attachments}
                    alt='user-post'
                />
                {postHovered && (
                    <div className='absolute top-0 w-full h-full flex flex-col justify-between px-1 py-1 z-50'>
                        <div className='flex items-center justify-between'>
                            <a
                                href={attachments}
                                download
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                className='bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                            >
                                <MdDownloadForOffline />
                            </a>

                            {alreadySaved ? (
                                <button
                                    type='button'
                                    className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                                >
                                    {savedBy?.length} Saved
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        savePin(_id);
                                    }}
                                    type='button'
                                    className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                                >
                                    Save
                                </button>
                            )}
                        </div>
                        {/* <div className=' flex justify-between items-center gap-2 w-full'>
                            {destination?.slice(8).length > 0 ? (
                                <a
                                    href={destination}
                                    target='_blank'
                                    className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                                    rel='noreferrer'
                                >
                                    {' '}
                                    <BsFillArrowUpRightCircleFill />
                                    {destination?.slice(8, 17)}...
                                </a>
                            ) : undefined}
                            {postedBy?._id === user?.googleId && (
                                <button
                                    type='button'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        //show setting box
                                    }}
                                    className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none'
                                >
                                    <FaEllipsisH />
                                </button>
                            )}
                        </div> */}
                    </div>
                )}
            </div>
            <Link
                to={`/user-profile/${pin.authorInfo?._id}`}
                className='flex gap-2 mt-2 items-center'
            >
                <img
                    className='w-7 h-7 rounded-full object-cover'
                    src={pin.authorInfo?.avatar}
                    alt='user-profile'
                />
                <p className='font-semibold capitalize text-sm'>
                    {pin.authorInfo?.fullName}
                </p>
            </Link>
        </div>
    );
};

export default Pin;
