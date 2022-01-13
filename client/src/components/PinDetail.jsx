import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { getPostDetail } from '../api/postApi';

const PinDetail = ({ user }) => {
    const { pinId } = useParams();
    const [pinDetail, setPinDetail] = useState(false);
    const [comment, setComment] = useState('');
    const [addingComment, setAddingComment] = useState(false);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postsReducers);

    useEffect(() => {
        const fetchPinDetails = () => {
            if (posts.length > 0) {
                const postDetail = posts.find(
                    (post) => post.post._id === pinId
                );

                setPinDetail(postDetail);
            } else {
                getPostDetail(pinId).then((data) => setPinDetail(data));
            }
        };

        fetchPinDetails();
    }, [pinId, posts]);

    useEffect(() => {
        setAddingComment(false);
        setComment('');
    }, [posts]);

    const addComment = () => {
        if (comment) {
            setAddingComment(true);
            dispatch({
                type: 'ADD_COMMENT_REQUEST',
                payload: { comment, user, pinId },
            });
        }
    };

    if (!pinDetail) {
        return <Spinner message='Showing pin' />;
    }

    return (
        <>
            {pinDetail && (
                <div className='flex xl:flex-row flex-col m-auto bg-white dark:bg-[#212121] dark:text-white max-w-[1500px] rounded-[32px]'>
                    <div className='flex justify-center items-center md:items-start flex-initial select-none md:w-1/2'>
                        <img
                            className='rounded-t-3xl rounded-b-lg w-full'
                            src={pinDetail.post.attachments}
                            alt='user-post'
                        />
                    </div>
                    <div className='w-full p-5 flex-1 md:w-1/2'>
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-2 items-center'>
                                <a
                                    href={pinDetail.post.attachments}
                                    download
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    className='bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                                >
                                    <MdDownloadForOffline className='dark:text-[#181818]' />
                                </a>
                            </div>
                            {pinDetail.post.destination?.slice(8).length > 0 ? (
                                <a
                                    href={pinDetail?.post?.destination}
                                    target='_blank'
                                    className='bg-white flex items-center gap-2 text-black font-bold p-1 px-2 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                                    rel='noreferrer'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <BsFillArrowUpRightCircleFill />
                                    {pinDetail.post.destination?.slice(8, 17)}
                                    ...
                                </a>
                            ) : undefined}
                        </div>
                        <div>
                            <h1 className='text-4xl font-bold break-words mt-3'>
                                {pinDetail.post.title}
                            </h1>
                            {pinDetail.post.content && (
                                <p className='mt-3'>{pinDetail.post.content}</p>
                            )}
                        </div>
                        <Link
                            to={`/user/profile/${pinDetail.authorInfo._id}`}
                            className='flex gap-2 mt-5 items-center bg-white dark:bg-[#212121] rounded-lg '
                        >
                            <img
                                src={pinDetail.authorInfo.avatar}
                                className='w-10 h-10 rounded-full'
                                alt='user-profile'
                            />
                            <p className='font-bold'>
                                {pinDetail.authorInfo.fullName}
                            </p>
                        </Link>

                        <h2 className='mt-8 text-xl'>Comments</h2>
                        <div className='max-h-370 overflow-y-auto'>
                            {pinDetail.post?.comments?.map((item, index) => (
                                <div
                                    className='flex gap-2 mt-5 items-center bg-white rounded-lg'
                                    key={index}
                                >
                                    <img
                                        src={item.postedBy?.avatar}
                                        className='w-10 h-10 rounded-full cursor-pointer'
                                        alt='user-profile'
                                    />
                                    <div className='flex flex-col'>
                                        <p className='font-bold'>
                                            {item.postedBy?.fullName}
                                        </p>
                                        <p>{item.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {user && (
                            <div className='flex flex-wrap items-center mt-3 gap-3'>
                                <Link to={`/user/profile/${user._id}`}>
                                    <img
                                        src={user.avatar}
                                        className='w-10 h-10 rounded-full cursor-pointer'
                                        alt='user-profile'
                                    />
                                </Link>
                                <input
                                    className=' flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300 dark:text-black'
                                    type='text'
                                    placeholder='Add a comment'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button
                                    type='button'
                                    className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
                                    onClick={addComment}
                                >
                                    {addingComment ? 'Doing...' : 'Done'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default PinDetail;
