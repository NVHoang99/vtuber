import axios from 'axios';

const URL = 'http://localhost:5000';

export const login = async (payload) => {
    try {
        await axios.post(`${URL}/googlelogin`, payload).then((res) => res.data);
    } catch (error) {
        console.log(error.response.data);
    }
};

export const logout = () => {};
