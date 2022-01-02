import axios from 'axios';

const URL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export const login = (payload) =>
    axios.post(`${URL}/auth/googlelogin`, payload).then((res) => res.data);

export const logout = () => {};

export const fetchUserByToken = () =>
    axios.get(`${URL}/auth/`).then((res) => res.data);
