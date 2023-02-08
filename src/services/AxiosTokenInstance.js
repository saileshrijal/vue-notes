import axios from 'axios'
import router from '@/router'

const axiosTokenInstance = axios.create()

axiosTokenInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `bearer ${token}`
    return config
})

axiosTokenInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem('token')
        router.push('/login')
    }
});
export default axiosTokenInstance