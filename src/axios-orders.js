import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burger-f7b2e.firebaseio.com/'
});

export default instance;