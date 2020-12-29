import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from '../types/userTypes';

import axios from 'axios';

export const registerUserRequest = (UserObj, successCallback) => {
  console.log('inside register user request');
  console.log(UserObj);

  //simluate register user
  axios
    .post('http://localhost:3001/api/User/UserRegister', UserObj)
    .then((response) => {
      console.log(response.data);
      if (typeof successCallback === 'function') {
        successCallback();
      }
    })
    .catch((error) => {
      console.log(error.message);
    });

  return {
    type: REGISTER_USER_REQUEST,
    payload: '',
  };
};
