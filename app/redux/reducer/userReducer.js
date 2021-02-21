import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST,
} from '../types/userTypes';

const initialsState = {
  //for the loading spinner -- default : false
  loading: false,
  //for saving user info after user login
  user: null,
  //for error message
  errorMsg: 'this is default error msg',
  token: '',
};

//define user reducer
const userReducer = (state = initialsState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        //set loading spinner state to true
        loading: false,
        user: '',
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_USER_FAILURE:
      return state;
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
