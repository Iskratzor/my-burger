import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-react-1b412.firebaseio.com/'
});

export default instance;