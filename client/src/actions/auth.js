import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  SET_LOADING
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const loggedIn = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('localhost:3000/api/auth');

    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data
    });
  } catch (err) {
      console.log(err)
    dispatch({
      type: AUTH_FAIL
    });
  }
};

// export const createPost = (postData) => dispatch => {
//     console.log('action called...')
//     fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(postData)
//     })
//     .then(res => res.json())
//     .then(post => dispatch({
//         type: NEW_POST,
//         payload: post
//     }))
// }
