import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import FileBase64 from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

const CreatePin = ({ user }) => {
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [destination, setDestination] = useState('');
    const [category, setCategory] = useState('image');
    const [imageAsset, setImageAsset] = useState();
    const [tags, setTags] = useState([]);
    const [suggestions] = useState([
        { id: 'Duca', text: 'Duca' },
        { id: 'Banmai', text: 'Banmai' },
    ]);
    const [video, setVideo] = useState('');
    const [link, setLink] = useState('');
    const [fields, setFields] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = [...tags].slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
    };

    const savePin = () => {
        if (category === 'image') {
            if (title && imageAsset) {
                dispatch({
                    type: 'CREATE_POST_REQUEST',
                    payload: {
                        post: {
                            title,
                            content: about,
                            destination,
                            category,
                            attachments: imageAsset,
                            tag: tags,
                            author: user._id,
                        },
                        user,
                    },
                });
                navigate('/');
            } else {
                setFields(true);

                setTimeout(() => {
                    setFields(false);
                }, 2000);
            }
        } else {
            if (title && video.length === 11) {
                dispatch({
                    type: 'CREATE_POST_REQUEST',
                    payload: {
                        post: {
                            title,
                            content: about,
                            category,
                            attachments: video,
                            tag: tags,
                            author: user._id,
                        },
                        user,
                    },
                });
                navigate('/');
            } else {
                setFields(true);

                setTimeout(() => {
                    setFields(false);
                }, 2500);
            }
        }
    };

    const processLink = (e) => {
        const link = e.target.value;
        const videoId = link.slice(17);
        setLink(link);
        setVideo(videoId);
    };

    return (
        <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
            {fields && (
                <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>
                    {!title && <span className='block'>Title is required</span>}
                    {category === 'image'
                        ? !imageAsset && (
                              <span className='block'>Image is required</span>
                          )
                        : (!video || video.length !== 11) && (
                              <span className='block'> Video is required</span>
                          )}
                </p>
            )}
            <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full rounded-xl'>
                <div className='bg-secondaryColor p-3 flex flex-0.7 w-full rounded-lg'>
                    <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420 rounded-lg '>
                        {category === 'image' ? (
                            !imageAsset ? (
                                <label>
                                    <div className='flex flex-col items-center justify-center h-full'>
                                        <div className='flex flex-col justify-center items-center'>
                                            <p className='font-bold text-2xl'>
                                                <AiOutlineCloudUpload />
                                            </p>
                                            <p className='text-lg'>
                                                Click to upload
                                            </p>
                                        </div>

                                        <p className='mt-32 text-gray-400 break-words mx-14 md:mx-0'>
                                            Recommendation: Use high-quality
                                            JPG, JPEG, SVG, PNG, GIF or TIFF
                                            less than 20MB
                                        </p>
                                    </div>
                                    <div className='opacity-0'>
                                        <FileBase64
                                            accept='image/*'
                                            multiple={false}
                                            type='file'
                                            onDone={({ base64 }) =>
                                                setImageAsset(base64)
                                            }
                                        />
                                    </div>
                                </label>
                            ) : (
                                <div className='relative h-full select-none'>
                                    <img
                                        src={imageAsset}
                                        alt='uploaded-pic'
                                        className='h-full w-full'
                                    />
                                    <button
                                        type='button'
                                        className='absolute bottom-2 right-2 p-2 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                                        onClick={() => setImageAsset(null)}
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            )
                        ) : (
                            <div className=''>
                                <iframe
                                    width='w-full'
                                    height='h-full'
                                    src={`https://www.youtube.com/embed/${video}`}
                                    title='YouTube video player'
                                    frameBorder='0'
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex flex-1 flex-col gap-4 lg:pl-5 mt-5 w-full'>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Add your title'
                        className='outline-none text-xl sm:text-2xl font-semibold border-b-2 border-gray-200 p-2'
                    />

                    <input
                        type='text'
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder='Add your description'
                        className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
                    />

                    <div className='flex flex-col'>
                        <div>
                            <p className='my-2 font-semibold text-base pl-2'>
                                Choose Pin Category
                            </p>
                            <select
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                }}
                                className='outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer mb-3'
                            >
                                <option
                                    className='text-base border-0 outline-none bg-whit'
                                    value='image'
                                >
                                    Image
                                </option>

                                <option
                                    className='text-base border-0 outline-none bg-whit'
                                    value='video'
                                >
                                    Video youtube
                                </option>
                            </select>
                        </div>

                        {category === 'image' ? (
                            <input
                                type='url'
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder='Add a destination link'
                                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
                            />
                        ) : (
                            <input
                                type='url'
                                value={link}
                                onChange={processLink}
                                placeholder='Add link youtube, e.g: https://youtu.be/h9c04hXwqIg'
                                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
                            />
                        )}

                        {/* <input
                            type='text'
                            vlaue={tag}
                            onChange={(e) => setTag(e.target.value)}
                            placeholder='Add your tags '
                            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
                        /> */}

                        <ReactTags
                            tags={tags}
                            suggestions={suggestions}
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            handleDrag={handleDrag}
                            delimiters={delimiters}
                            classNames={{
                                tags: 'pt-3',
                                tagInput: 'mt-3',
                                tagInputField: 'border-none p-2',
                                selected: 'mt-3',
                                tag: 'mr-2 p-1 border-none bg-secondaryColor',
                                remove: 'pl-2',
                                suggestions: 'mt-1 p-2 cursor-pointer',
                                // activeSuggestion: 'activeSuggestionClass'
                            }}
                        />

                        <div className='flex justify-end items-end mt-5'>
                            <button
                                type='button'
                                onClick={savePin}
                                className='bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none'
                            >
                                Save Pin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePin;
