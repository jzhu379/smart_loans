import axios from 'axios';

const instance = axios.create({baseURL: 'https://hackprinceton-9b98d.firebaseio.com/'});

export default instance;