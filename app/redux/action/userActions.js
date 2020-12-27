import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from '../types/userTypes';

import axios from 'axios';

export const registerUserRequest = (UserObj) => {
  console.log('inside register user request');
  console.log(UserObj);
  return {
    type: REGISTER_USER_REQUEST,
    payload: UserObj,
  };
};
