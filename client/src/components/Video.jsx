import React from 'react';

function Video({ pin }) {
    return (
        <div className='w-full md:w-[calc(25%-0.5625rem)] h-auto'>
            <iframe
                width='100%'
                height='100%'
                src={`https://www.youtube.com/embed/${
                    pin?.post?.attachments || pin?.attachments
                }`}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default Video;
