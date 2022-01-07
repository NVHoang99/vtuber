import React from 'react';
import Video from './Video';

function VideoList({ pins }) {
    return (
        <div className='flex md:flex-row flex-wrap gap-3'>
            {pins?.map((pin, index) => (
                <Video key={index} pin={pin} />
            ))}
        </div>
    );
}

export default VideoList;
