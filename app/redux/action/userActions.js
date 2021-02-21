import {
  REGISTER_USER_REQUEST,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
} from '../types/userTypes';

import axios from 'axios';

export const registerUserRequest = (UserObj, successCallback) => {
  console.log('inside register user request');
  console.log(UserObj);

  //simluate register user
  return (dispatch) => {
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
  };
};

//return a login action to reducer
const storeUserLogin = (UserObj) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: UserObj,
  };
};

const userLoginFailure = () => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: '',
  };
};

export const loginUserRequest = (UserObj, successCallback, FailureCallback) => {
  return (dispatch) => {
      console.log('inside return datement');
      axios
          .post('http://localhost:3001/api/User/GetUser', UserObj)
          .then((response) => {
                console.log(response.data)
              if (response.data.resCode === 1) {
                  if (typeof successCallback === 'function') {
                      successCallback();
                  }
                  dispatch(storeUserLogin(response.data.payload));
              } else if (response.data.resCode === 0) {
                  if (typeof FailureCallback === 'function') {
                      FailureCallback(response.data.payload);
                  }
                  dispatch(userLoginFailure());
              }
          })
          .catch((error) => {
              //cannot connect to database error
              if (typeof FailureCallback === 'function') {
                  FailureCallback("Database Connection Error");
              }
              dispatch(userLoginFailure());
          })
  }

};

export const logoutUserRequest = (successCallback) => {
    if (typeof successCallback === 'function') {
      successCallback();
    }
    return {
      type: LOGOUT_USER_REQUEST,
    };


};
