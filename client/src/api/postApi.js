import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchPosts = async () =>
    await axios.get(`${url}/posts`).then((res) => res.data);
