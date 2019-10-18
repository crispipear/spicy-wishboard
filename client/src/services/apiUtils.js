import axios from 'axios';

const headers = {
    'Content-Type': 'application/json'
}

function post(url, data){
    return axios.post(url, data, {headers})
    .then(res => res)
    .catch(err => err)
}

const API_URL = endPoint => `http://localhost:3001${endPoint}`

export {
    post,
    API_URL
}