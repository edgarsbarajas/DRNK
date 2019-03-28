import { SET_SEARCH_BAR_VALUE, TOGGLE_SEARCH_BAR } from '../actions/types';

const INITIAL_STATE = {
  city: 'Oakland',
  when: { value: 'all dates', index: 0 },
  filter: { value: 'Distance', index: 0 },
  searchBarVisible: true
};

export default (state = INITIAL_STATE, action) => {
  console.log('state obj in reducer', state);
  switch(action.type) {
    case SET_SEARCH_BAR_VALUE:
      return { ...state, [action.payload.prop]: action.payload.value};
    case TOGGLE_SEARCH_BAR:
      return { ...state, searchBarVisible: !state.searchBarVisible };
    default:
      return state;
  }
}
