import { combineReducers } from 'redux';
import EventsReducer from './EventsReducer';
import LocationReducer from './LocationReducer';
import SearchBarReducer from './SearchBarReducer';

export default combineReducers({
  events: EventsReducer,
  userLocation: LocationReducer,
  searchBar: SearchBarReducer
});
