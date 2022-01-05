import React from 'react';
import { useSelector } from 'react-redux';

function Pin({ pin }) {
    const user = useSelector((state) => state.authReducer);
    return (
        <div className='w-full rounded-lg select-none'>
            <img
                src={pin.attachments}
                alt='pin'
                className='w-full rounded-lg '
            />
        </div>
    );
}

export default Pin;
