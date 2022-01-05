import React from 'react';
import bannerImg from '../assets/images/banner.png';

function Banner() {
    return (
        <div className='py-2 md:py-3 select-none'>
            <img src={bannerImg} alt='banner' />
        </div>
    );
}

export default Banner;
