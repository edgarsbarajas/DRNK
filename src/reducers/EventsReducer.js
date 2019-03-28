import { SET_EVENTS, TOGGLE_LOADING } from '../actions/types';

const INITIAL_STATE = {
  events: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch(action.type) {
    case SET_EVENTS:
      return { ...state, events: action.payload };
    case TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
}
