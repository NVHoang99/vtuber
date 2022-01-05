import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaImage } from 'react-icons/fa';
import { MdVideoLibrary, MdAddCircle } from 'react-icons/md';
import { BsFillSunFill } from 'react-icons/bs';
import logo from '../assets/images/logo.png';

const isNotActiveStyle =
    'flex flex-row md:flex-col p-3 mb-1 md:px-1.5 w-full md:w-[72px] md:h-[72px] items-center md:justify-center md:rounded-2xl z-10 text-blackClor hover:bg-[#f0f0f0]';
const isActiveStyle =
    'flex flex-row md:flex-col p-3 mb-1 md:px-1.5 w-full md:w-[72px] md:h-[72px] items-center md:justify-center md:rounded-2xl z-10 text-blackColor bg-[#f0f0f0]';

function Sidebar({ user, closeToggle }) {
    const handleCloseSidebar = () => {
        if (closeToggle) {
            closeToggle(false);
        }
    };

    return (
        <div className='flex flex-col md:items-center bg-white h-full overflow-y-scroll min-w-[160px] no-scrollbar select-none'>
            <div className='ml-6 my-6 w-20 h-20 md:hidden'>
                <img
                    src={user?.avatar}
                    className='w-full h-full rounded-full'
                    alt='avatar'
                />
            </div>

            <Link
                to='/'
                onClick={handleCloseSidebar}
                className='hidden md:flex items-center gap-2 h-10 mt-3 p-2'
            >
                <img src={logo} alt='logo' className='w-8 h-8 inline-block' />
                <h3 className='inline-block font-semibold text-lg'>
                    Vtuber Fandom
                </h3>
            </Link>

            <NavLink
                to='/create-pin'
                className={({ isActive }) =>
                    isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSidebar}
            >
                <MdAddCircle fontSize={25} />
                <div className='pl-3 md:pl-0 select-none md:hidden'>
                    Add post
                </div>
            </NavLink>

            <NavLink
                end
                to='/'
                className={({ isActive }) =>
                    isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSidebar}
            >
                <FaHome fontSize={25} />
                <div className='pl-3 md:pl-0 select-none md:text-sm'>Home</div>
            </NavLink>

            <NavLink
                to='/images'
                className={({ isActive }) =>
                    isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSidebar}
            >
                <FaImage fontSize={25} />
                <div className='pl-3 md:pl-0 select-none md:text-sm'>
                    Images
                </div>
            </NavLink>

            <NavLink
                to='/videos'
                className={({ isActive }) =>
                    isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSidebar}
            >
                <MdVideoLibrary fontSize={25} />
                <div className='pl-3 md:pl-0 select-none md:text-sm'>
                    Videos
                </div>
            </NavLink>

            <div className={isNotActiveStyle}>
                <BsFillSunFill fontSize={25} />
                <div className='pl-3 md:pl-0 select-none md:text-sm'>
                    DarkMode
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
