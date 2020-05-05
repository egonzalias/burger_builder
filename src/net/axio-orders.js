import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api-burger-builder.firebaseio.com/'
})

export default instance;