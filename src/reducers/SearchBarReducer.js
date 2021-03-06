import { SET_SEARCH_BAR_VALUE, TOGGLE_SEARCH_BAR, SET_SEARCHED_CITY } from '../actions/types';

const INITIAL_STATE = {
  city: 'Current Location',
  searchedCity: 'Current Location',
  when: { value: '', index: 0 },
  filter: { value: 'best', index: 0 },
  searchBarVisible: false
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_SEARCH_BAR_VALUE:
      return { ...state, [action.payload.prop]: action.payload.value};
    case TOGGLE_SEARCH_BAR:
      return { ...state, searchBarVisible: !state.searchBarVisible };
    case SET_SEARCHED_CITY:
      return { ...state, searchedCity: action.payload };
    default:
      return state;
  }
}
