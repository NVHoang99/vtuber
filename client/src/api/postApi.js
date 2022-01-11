import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchPosts = (payload) =>
    axios.get(`${url}/posts/${payload}`).then((res) => res.data);

export const savePost = (payload) =>
    axios.post(`${url}/posts/save`, payload).then((res) => res.data);

export const unSavePost = (payload) =>
    axios.post(`${url}/posts/unsave`, payload).then((res) => res.data);

export const createPost = (payload) =>
    axios.post(`${url}/posts`, payload).then((res) => res.data);

export const getPostDetail = (payload) =>
    axios.get(`${url}/posts/detail/${payload}`).then((res) => res.data);

export const addComment = (payload) =>
    axios.post(`${url}/posts/comment`, payload).then((res) => res.data);

export const fetchCreatedPost = (payload) =>
    axios.get(`${url}/posts/created/${payload}`).then((res) => res.data);

export const fetchSavedPost = (payload) =>
    axios.get(`${url}/posts/saved/${payload}`).then((res) => res.data);
