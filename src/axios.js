import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001'
})

instance.interceptors.request.use(req => {
    if(JSON.parse(localStorage.getItem('token')))
    {
        req.headers.Authorization = JSON.parse(localStorage.getItem('token'));
    }
    return req;
})

export default instance;