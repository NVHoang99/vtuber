import React, { useState, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Sidebar, UserProfile } from '../components';
import PinsPage from './PinsPage';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

function HomePage() {
    const [toggleSidebar, setToggleSidebar] = useState(false);

    useEffect(() => {
        const userInfo =
            localStorage.getItem('user') !== 'undefined'
                ? JSON.parse(localStorage.getItem('user'))
                : localStorage.clear();
    }, []);

    return (
        <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
            <div className='hidden md:flex h-screen flex-initial'>
                <Sidebar />
            </div>
            <div className='flex md:hidden flex-row select-none'>
                <HiMenu
                    fontSize={40}
                    className='cursor-pointer'
                    onClick={() => setToggleSidebar(false)}
                />
                <Link to='/'>
                    <img src={logo} alt='logo' className='w-8 h-8' />
                </Link>
                {/* <Link to={`user-profile/${user?._id}`}>
                    <img src={logo} alt='logo' className='w-8 h-8' />
                </Link> */}
            </div>
        </div>
    );
}

export default HomePage;
