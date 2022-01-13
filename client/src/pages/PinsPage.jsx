import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute.jsx';
import {
    Navbar,
    Search,
    Feed,
    PinDetail,
    CreatePin,
    Banner,
} from '../components';

function PinsPage({ user }) {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className='px-2 md:px-5 dark:bg-[#181818] '>
            <div className='bg-gray-50 rounded-sm'>
                <Navbar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    user={user}
                />
            </div>
            <div className='h-full'>
                <Routes>
                    <Route path='/' element={<Banner />} />
                    <Route path='/images/' element={<Feed />} />
                    <Route path='/videos/' element={<Feed />} />
                    <Route
                        path='/pin-detail/:pinId'
                        element={<PinDetail user={user} />}
                    />
                    <Route
                        path='/create-pin'
                        element={
                            <PrivateRoute>
                                <CreatePin user={user} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/search'
                        element={
                            <Search
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                            />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default PinsPage;
