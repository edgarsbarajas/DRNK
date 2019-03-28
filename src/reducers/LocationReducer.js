import { SET_USER_LOCATION } from '../actions/types';

const INITIAL_STATE = {
  position: {}
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch(action.type) {
    case SET_USER_LOCATION:
      return { ...state, position: action.payload };
    default:
      return state;
  }
}
