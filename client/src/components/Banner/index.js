import React from 'react';
import bannerImg from '../../assets/images/banner.png';
import './Banner.css';

function Banner() {
    return (
        <div class='banner'>
            <img src={bannerImg} alt='banner' />
        </div>
    );
}

export default Banner;
