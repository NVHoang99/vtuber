import React, { useEffect, useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { Link, Route, Routes } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { Sidebar, UserProfile } from '../components';
import PinsPage from './PinsPage';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

function HomePage() {
    const user = useSelector((state) => state.authReducer);
    const [cookies] = useCookies(['cookie']);
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const scrollRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user && cookies.token) {
            dispatch({ type: 'FETCH_USER_BY_TOKEN' });
        }
    }, [dispatch, user, cookies.token]);

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0);
    }, []);

    return (
        <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
            {/* sidebar for desktop... */}
            <div className='hidden md:flex h-screen flex-initial'>
                <Sidebar user={user} closeToggle={setToggleSidebar} />
            </div>

            {/* sidebar for mobile */}
            <div className='flex md:hidden flex-row'>
                <div className='p-2 w-full flex flex-row justify-between items-center shadow-md select-none'>
                    <HiMenu
                        fontSize={40}
                        className='cursor-pointer'
                        onClick={() => setToggleSidebar(true)}
                    />
                    <Link to='/'>
                        <img src={logo} alt='logo' className='w-8 h-8' />
                    </Link>
                    {user ? (
                        <Link to={`user/profile/${user?._id}`}>
                            <img
                                src={user?.avatar}
                                alt='avatar'
                                className='w-8 h-8'
                            />
                        </Link>
                    ) : (
                        <Link to='/login'>
                            <div className='px-2 py-1 bg-slate-400 cursor-pointer'>
                                Đăng nhập
                            </div>
                        </Link>
                    )}
                </div>

                {toggleSidebar && (
                    <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                        <div className='absolute w-full flex justify-end items-center p-2'>
                            <AiFillCloseCircle
                                fontSize={30}
                                className='cursor-pointer'
                                onClick={() => setToggleSidebar(false)}
                            />
                        </div>
                        <Sidebar user={user} closeToggle={setToggleSidebar} />
                    </div>
                )}
            </div>

            <div
                className='pb-2 flex-1 h-screen overflow-y-scoll'
                ref={scrollRef}
            >
                <Routes>
                    <Route
                        path='/user/profile/:userId'
                        element={<UserProfile />}
                    />
                    <Route path='/*' element={<PinsPage user={user} />} />
                </Routes>
            </div>
        </div>
    );
}

export default HomePage;
