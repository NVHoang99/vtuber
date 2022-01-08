import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import bg_login from '../assets/images/bg_login.jpg';
import logo from '../assets/images/logo.png';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state;

    const responseGoogle = (response) => {
        //const result = response.profileObj;
        const token = response.tokenId;

        dispatch({ type: 'LOGIN_USER', payload: { token, navigate, from } });
    };

    return (
        <div className='flex items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <img
                    src={bg_login}
                    className='w-full h-full object-cover'
                    alt='bg_login'
                />
                <div className='absolute flex flex-col justify-center items-center inset-0 bg-blackOverlay'>
                    <div className='absolute top-6 bottom-6 pt-10 px-60 bg-white select-none'>
                        <img
                            src={logo}
                            className='w-12 h-12 rounded-md m-auto'
                            alt='logo'
                        />
                        <h1 className='text-xl font-semibold mt-5 select-none'>
                            Đăng nhập vào Vtuber Fandom
                        </h1>
                        <div className='mt-10 rounded-[44px]'>
                            <GoogleLogin
                                clientId={
                                    process.env.REACT_APP_GOOGLE_API_TOKEN
                                }
                                render={(renderProps) => (
                                    <button
                                        type='button'
                                        className='bg-mainColor flex justify-center items-center p-2 border-2 rounded-[44px] cursor-pointer w-full h-full'
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                    >
                                        <FcGoogle className='mr-6 text-2xl font-semibold' />
                                        <span className='select-none'>
                                            Đăng nhập với Google
                                        </span>
                                    </button>
                                )}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy='single_host_origin'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
