import { SUBMIT_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_LOGIN:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
