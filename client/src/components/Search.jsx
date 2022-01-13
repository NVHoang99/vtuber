import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import VideoList from './VideoList';
import { searchPost } from '../api/postApi';

const Search = ({ searchTerm }) => {
    const [pins, setPins] = useState();
    useEffect(() => {
        if (searchTerm !== '') {
            searchPost(searchTerm).then((data) => setPins(data));
        } else {
            setPins([]);
        }
    }, [searchTerm]);

    return (
        <div>
            {pins?.length !== 0 && (
                <div className='px-4 text-lg font-bold dark:text-white'>
                    Image
                </div>
            )}

            {pins?.length !== 0 && (
                <div className='px-2'>
                    <MasonryLayout
                        pins={pins?.filter((item) => item.category === 'image')}
                    />
                </div>
            )}

            {pins?.length !== 0 && (
                <div className='px-4 text-lg font-bold dark:text-white'>
                    Video
                </div>
            )}

            <div className='px-2'>
                {pins?.length !== 0 && (
                    <VideoList
                        pins={pins?.filter((item) => item.category === 'video')}
                    />
                )}
            </div>

            {pins?.length === 0 && searchTerm !== '' && (
                <div className='mt-10 text-center text-xl '>No Pins Found!</div>
            )}
        </div>
    );
};

export default Search;
