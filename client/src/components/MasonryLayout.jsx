import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';
import PinOther from './PinOther';

const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
};

const MasonryLayout = ({ pins }) => {
    return (
        <>
            {pins && (
                <Masonry
                    className='flex animate-slide-fwd'
                    breakpointCols={breakpointColumnsObj}
                >
                    {pins?.map((pin, index) =>
                        pin.post ? (
                            <Pin key={index} pin={pin} className='w-max' />
                        ) : (
                            <PinOther key={index} pin={pin} className='w-max' />
                        )
                    )}
                </Masonry>
            )}
        </>
    );
};

export default MasonryLayout;
