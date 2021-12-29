import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch({ type: 'GOOGLE_LOGOUT' });

        navigate('/');
        setUser(null);
    };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, [location]);

    return (
        <div className='relative'>
            <div className='absolute top-0 right-0'>
                {user && (
                    <>
                        <div>{`${user.result.familyName} ${user.result.givenName}`}</div>
                        <img
                            src={user.result.imageUrl}
                            onClick={handleLogout}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
