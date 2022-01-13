import React from 'react';
import bannerImg from '../assets/images/banner.png';

function Banner() {
    return (
        <div className='select-none'>
            <img
                src={bannerImg}
                alt='banner'
                className='max-h-[500px] m-auto'
            />
        </div>
    );
}

export default Banner;
