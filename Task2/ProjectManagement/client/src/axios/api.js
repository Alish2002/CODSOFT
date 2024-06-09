import axios from 'axios';

const axiosApi= axios.create({
    baseURL:'http://127.0.0.1:5000/api/',
    headers:{
        'Content-type':'application/json',
    },
});

export default axiosApi;
