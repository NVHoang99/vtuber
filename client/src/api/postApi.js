import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchPosts = (payload) =>
    axios.get(`${url}/posts/${payload}`).then((res) => res.data);

export const savePost = (payload) =>
    axios.post(`${url}/posts/save`, payload).then((res) => res.data);

export const unSavePost = (payload) =>
    axios.post(`${url}/posts/unsave`, payload).then((res) => res.data);
