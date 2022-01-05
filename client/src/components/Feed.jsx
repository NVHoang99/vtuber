import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

function Feed() {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const pins = useSelector((state) => state.postsReducers);

    useEffect(() => {
        setLoading(true);
        if (location.pathname) {
            dispatch({ type: 'GET_POST_REQUEST', payload: location.pathname });
        }
    }, [dispatch, location.pathname]);

    useEffect(() => {
        if (pins) {
            setLoading(false);
        }
    }, [pins]);

    if (loading) {
        return <Spinner message={`We are adding new ideas to your feed!`} />;
    }
    return <>{pins && <MasonryLayout pins={pins} />}</>;
}

export default Feed;
