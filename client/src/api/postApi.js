import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchPosts = (payload) =>
    axios.get(`${url}/posts${payload}`).then((res) => res.data);
