import axios from 'axios';

const headers = {
    'Content-Type': 'application/json'
}

const MODE = process.env.NODE_ENV
const DEST = MODE == 'production' ? 'https://spicy-wishboard.appspot.com' : 'http://localhost:3001'

function post(url, data = {}){
    return axios.post(url, data, {headers})
    .then(res => res)
    .catch(err => err)
}

function get(url){
    return axios.get(url, {headers})
    .then(res => res)
    .catch(err => err)
}

const API_URL = endPoint => `${DEST}${endPoint}`

export {
    post,
    get,
    API_URL,
    MODE
}