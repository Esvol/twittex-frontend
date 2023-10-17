import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001'
})

instance.interceptors.request.use(req => {
    if(JSON.parse(localStorage.getItem('token')))
    {
        req.headers.Authorization = JSON.parse(localStorage.getItem('token'));
    }
    return req;
})

export default instance;