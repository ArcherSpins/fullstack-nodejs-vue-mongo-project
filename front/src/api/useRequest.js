import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const useRequest = async (url = '/', method = 'get', body = {}, headers = { 'Content-Type': 'application/json' }) => {
    try {
        const token = localStorage.getItem('token');
        const currentHeader = { ...headers }

        if (token) {
            currentHeader['Authorization'] = `Bearer ${token}`
        }

        if (method === 'post') {
            const data = await axios[method](API_URL + url, body, currentHeader);
            return data
        }

        if (method === 'put') {
            body.append('token', token)
            const data = await axios[method](API_URL + url, body, currentHeader);
            return data
        }
        
        const data = await axios[method](API_URL + url, { headers: currentHeader });
        return data
    } catch (err) {
        console.log(`Error with request to ${API_URL + url}: `, err);
        throw err;
    }
}
