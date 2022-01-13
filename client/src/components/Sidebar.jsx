import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaImage } from 'react-icons/fa';
import { MdVideoLibrary, MdAddCircle } from 'react-icons/md';
import { BsFillSunFill } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { useCookies } from 'react-cookie';
import { GoogleLogout } from 'react-google-login';
import logo from '../assets/images/logo.png';

const isNotActiveStyle =
    'flex flex-row md:flex-col p-3 mb-1 md:px-1.5 w-full md:w-[72px] md:h-[72px] items-center md:justify-center md:rounded-2xl z-10 text-blackColor dark:text-white hover:bg-[#f0f0f0] dark:hover:bg-gray-500';
const isActiveStyle =
    'flex flex-row md:flex-col p-3 mb-1 md:px-1.5 w-full md:w-[72px] md:h-[72px] items-center md:justify-center md:rounded-2xl z-10 text-blackColor dark:text-white bg-[#f0f0f0] dark:bg-gray-500';

function Sidebar({ user, closeToggle }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['cookie']);

    const handleCloseSidebar = () => {
        if (closeToggle) {
            closeToggle(false);
        }
    };

    const handleClickDarkMode = () => {
        const currentMode = document.documentElement.classList.value;
        if (currentMode === 'dark') {
            document.documentElement.setAttribute('class', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('class', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    const logout = () => {
        removeCookie('token');
        navigate('/login', {
            state: { from: location },
        });
    };

    return (
        <div className='flex flex-col md:items-center bg-white dark:bg-[#212121] fixed w-4/5 h-full min-w-[160px] md:w-[188px] no-scrollbar select-none'>
            {user ? (
                <div className='ml-6 my-6 w-20 h-20 md:hidden'>
                    <img
                        src={user?.avatar}
                        className='w-full h-full rounded-full'
                        alt='avatar'
                    />
                </div>
            ) : (
                <Link
                    to='/login'
                    className='text-center mx-auto w-1/2 mt-16 mb-6 md:hidden'
                    state={{ from: location }}
                >
                    <div className='px-2 py-2 cursor-pointer dark:bg-gray-500 dark:text-white'>
                        Đăng nhập
                    </div>
                </Link>
            )}

            <Link
                to='/'
                onClick={handleCloseSidebar}
                className='hidden md:flex items-center gap-2 h-10 mt-3 p-2'
            >
                <img
                    src={logo}
                    alt='logo'
                    className='w-8 h-8 inline-block rounded-lg'
                />
                <h3 className='inline-block font-semibold text-lg dark:text-white'>
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

            <div className={isNotActiveStyle} onClick={handleClickDarkMode}>
                <BsFillSunFill fontSize={25} />
                <div className='pl-3 md:pl-0 select-none md:text-sm'>
                    DarkMode
                </div>
            </div>

            {user && (
                <GoogleLogout
                    clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                    render={(renderProps) => (
                        <button
                            type='button'
                            className='flex items-center p-3 md:hidden border-none outline-none rounded-sm cursor-pointer gap-3 dark:text-white'
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <AiOutlineLogout fontSize={25} />
                            <span className='select-none'>Đăng xuất</span>
                        </button>
                    )}
                    onLogoutSuccess={logout}
                />
            )}
        </div>
    );
}

export default Sidebar;
