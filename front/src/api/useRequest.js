import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const useRequest = async (url = '/', method = 'get', body = {}, headers = { 'Content-Type': 'application/json' }) => {
    try {
        const data = await axios[method](API_URL + url, body, headers);
        return data
    } catch (err) {
        console.log(`Error with request to ${API_URL + url}: `, err);
        throw err;
    }
}
