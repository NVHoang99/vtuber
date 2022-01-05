import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
    const navigate = useNavigate();

    if (user) {
        return (
            <div className='flex items-center gap-1 md:gap-5 w-full mt-3 pb-7 '>
                <div className='flex justify-start items-center grow px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm select-none'>
                    <IoMdSearch fontSize={21} className='ml-1' />
                    <input
                        type='text'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Search'
                        value={searchTerm}
                        onFocus={() => navigate('/search')}
                        className='p-2 w-full bg-white outline-none'
                    />
                </div>

                <Link
                    to={`user/profile/${user?._id}`}
                    className='hidden md:block'
                >
                    <img
                        src={user.avatar}
                        alt='avatar'
                        className='w-10 h-10 rounded-full '
                    />
                </Link>
            </div>
        );
    }

    return null;
};

export default Navbar;
