import axios from 'axios';

const headers = {
    'Content-Type': 'application/json'
}

function post(url, data){
    axios.post(url, data, {headers})
    .then(res => console.log(res))
    .catch(err => {
        console.log('failed to post: ' + err)
    })
}

const API_URL = endPoint => `http://localhost:3001/${endPoint}`

export {
    post,
    API_URL
}