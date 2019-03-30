import { SET_EVENTS, SET_LOADING } from '../actions/types';

const INITIAL_STATE = {
  events: [],
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch(action.type) {
    case SET_EVENTS:
      return { ...state, events: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
