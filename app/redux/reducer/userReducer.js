import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from '../types/userTypes';

const initialsState = {
  //for the loading spinner -- default : false
  loading: false,
  //for saving user info after user login
  user: {},
  //for error message
  errorMsg: 'this is default error msg',
  token: '',
};

//define user reducer
const userReducer = (state = initialsState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      console.log('inside userReducer');
      return {
        ...state,
        //set loading spinner state to true
        loading: false,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
