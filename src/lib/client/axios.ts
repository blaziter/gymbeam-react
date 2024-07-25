import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MOCKAPI_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});
