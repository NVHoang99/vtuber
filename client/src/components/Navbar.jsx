import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { GoogleLogout } from 'react-google-login';
import { IoMdSearch } from 'react-icons/io';
import { ImProfile } from 'react-icons/im';
import { AiOutlineLogout } from 'react-icons/ai';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
    const [showbox, setShowbox] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies(['cookie']);

    const logout = () => {
        removeCookie('token');
        navigate('/login', {
            state: { from: location },
        });
    };

    return (
        <div className='flex items-center gap-1 md:gap-5 w-full mt-3 mb-7 rounded-sm dark:bg-[#181818]'>
            <div className='flex justify-start items-center grow px-2 bg-white dark:bg-[#292929] border-none outline-none focus-within:shadow-sm select-none'>
                <IoMdSearch
                    fontSize={21}
                    className='ml-1 rounded-sm dark:text-gray-500'
                />
                <input
                    type='text'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search'
                    value={searchTerm}
                    onFocus={() => navigate('/search')}
                    className='p-2 w-full bg-white dark:bg-[#292929] outline-none caret-white text-white'
                />
            </div>
            {user ? (
                <div
                    className='hidden md:block cursor-pointer relative'
                    onClick={() => setShowbox(!showbox)}
                >
                    <img
                        src={user.avatar}
                        alt='avatar'
                        className='w-10 h-10 rounded-full '
                    />
                    {showbox && (
                        <div className='absolute top-[130%] right-0 z-50 bg-white dark:bg-gray-400 w-60 h-40 rounded-lg p-4'>
                            <div className='mb-6'>
                                <img
                                    src={user.avatar}
                                    alt='avatar'
                                    className='w-10 h-10 rounded-full inline-block mr-4'
                                />
                                <span className='font-semibold'>
                                    {user.fullName}
                                </span>
                            </div>
                            <Link
                                to={`user/profile/${user?._id}`}
                                className='flex items-center gap-3'
                            >
                                <ImProfile
                                    fontSize={20}
                                    className='inline-block'
                                />
                                <span>Profile</span>
                            </Link>
                            <GoogleLogout
                                clientId={
                                    process.env.REACT_APP_GOOGLE_API_TOKEN
                                }
                                render={(renderProps) => (
                                    <button
                                        type='button'
                                        className='flex items-center mt-2 border-none outline-none rounded-sm cursor-pointer gap-3'
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                    >
                                        <AiOutlineLogout fontSize={20} />
                                        <span className='select-none'>
                                            Đăng xuất
                                        </span>
                                    </button>
                                )}
                                onLogoutSuccess={logout}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <Link
                    to={'/login'}
                    className='hidden md:block px-4 py-2 bg-secondaryColor dark:hover:bg-gray-500 dark:hover:text-white'
                    state={{ from: location }}
                >
                    Đăng nhập
                </Link>
            )}
        </div>
    );
};

export default Navbar;
