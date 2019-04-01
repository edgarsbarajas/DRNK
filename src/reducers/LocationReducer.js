import { SET_USER_LOCATION, SET_USER_LOCATION_ERROR_CODE } from '../actions/types';

const INITIAL_STATE = {
  position: {},
  errorCode: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_USER_LOCATION:
      return { ...state, position: action.payload, errorCode: null };
    case SET_USER_LOCATION_ERROR_CODE:
      return { ...state, errorCode: action.payload, position: {} };
    default:
      return state;
  }
}
