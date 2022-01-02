import React, { useState, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Sidebar, UserProfile } from '../components';
import PinsPage from './PinsPage';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

function HomePage() {
    const user = useSelector((state) => state.authReducer);
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['cookie']);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user && cookies.token) {
            dispatch({ type: 'FETCH_USER_BY_TOKEN' });
        }
    }, [dispatch]);

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
                {user ? (
                    <Link to={`user/profile/${user?._id}`}>
                        <img
                            src={user?.avatar}
                            alt='avatar'
                            className='w-8 h-8'
                        />
                    </Link>
                ) : (
                    <Link to='/login'>Đăng nhập</Link>
                )}
            </div>
        </div>
    );
}

export default HomePage;
