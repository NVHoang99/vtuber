import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MasonryLayout from './MasonryLayout';

const Search = ({ searchTerm }) => {
    const [pins, setPins] = useState();
    const listpins = useSelector((state) => state.postsReducers);

    useEffect(() => {
        if (searchTerm !== '') {
            setPins(
                listpins.filter((item) => {
                    return (
                        item.post.title.includes(searchTerm) ||
                        item.post.content.includes(searchTerm) ||
                        item.post.tag.some((t) => t?.text?.includes(searchTerm))
                    );
                })
            );
        } else {
            setPins(listpins);
        }
    }, [searchTerm, listpins]);

    return (
        <div>
            {pins?.length !== 0 && <MasonryLayout pins={pins} />}
            {pins?.length === 0 && searchTerm !== '' && (
                <div className='mt-10 text-center text-xl '>No Pins Found!</div>
            )}
        </div>
    );
};

export default Search;
