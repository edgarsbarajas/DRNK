import axios from 'axios';
import geolib from 'geolib';
import { getUserLocation } from './LocationActions';
import {
  SET_EVENTS,
  TOGGLE_SEARCH_BAR,
  SET_LOADING,
  SET_USER_LOCATION,
  SET_USER_LOCATION_ERROR_CODE ,
  SET_SEARCHED_CITY
} from './types';
import { EVENTBRITE_API_KEY } from '../../keys';

export const getEventsByUserLocation = (data = {}) => dispatch => {
  dispatch({ type: SET_EVENTS, payload: [] });
  dispatch({ type: SET_LOADING, payload: true });
  dispatch({ type: SET_SEARCHED_CITY, payload: 'Current Location'});


  const { startDateKeyword = '', filter = 'best' } = data;

  getUserLocation((pos) => {
    const { latitude, longitude } = pos.coords;
    const url = `https://www.eventbriteapi.com/v3/events/search/?token=${EVENTBRITE_API_KEY}&start_date.keyword=${startDateKeyword}&sort_by=${filter}&location.within=10mi&location.latitude=${latitude}&location.longitude=${longitude}&sort_by=${filter}&categories=110&subcategories=10001&expand=venue`;

    dispatch({ type: SET_USER_LOCATION, payload: pos});

    axios
      .get(url)
      .then(response => {

        let { events } = response.data;
        // add distance to the venue to the event object
        events.forEach(event => {
          event.distanceFromUser = getDistanceToVenue({
            userCoords: { latitude, longitude },
            venueCoords: { latitude: event.venue.latitude, longitude: event.venue.longitude }
          })
        })

        dispatch({ type: SET_LOADING, payload: false });
        dispatch({ type: SET_EVENTS, payload: events });
      })
      .catch(error => console.log('axios call error', error))
  }, (error) => {
    dispatch({ type: SET_USER_LOCATION_ERROR_CODE, payload: error.code });
    dispatch({ type: SET_LOADING, payload: false });
    console.log('****error from action', error);
  })
}

export const getEventsBySearch = ({city, startDateKeyword, filter}) => dispatch => {
  dispatch({ type: SET_SEARCHED_CITY, payload: city});
  dispatch({ type: TOGGLE_SEARCH_BAR });

  if(city === 'Current Location') {
    return dispatch(getEventsByUserLocation({startDateKeyword, filter}));
  }

  let userCoords = null;
  const url = `https://www.eventbriteapi.com/v3/events/search/?token=${EVENTBRITE_API_KEY}&location.address=${city}&start_date.keyword=${startDateKeyword}&sort_by=${filter}&categories=110&subcategories=10001&expand=venue`;

  getUserLocation((pos) => {
    const { latitude, longitude } = pos.coords;
    userCoords = pos.coords; // this will help determine whether we should call the getDistanceToVenue function in the axios call below

    dispatch({ type: SET_LOADING, payload: true });
    dispatch({ type: SET_USER_LOCATION, payload: pos});
  }, (error) => {
    dispatch({ type: SET_LOADING, payload: true });
    dispatch({ type: SET_USER_LOCATION_ERROR_CODE, payload: error.code });
    console.log('****error from action', error);
  })

  axios
    .get(url)
    .then(response => {
      let { events } = response.data;
      // add distance to the venue to the event object if we have the userCoords from above
      if(userCoords !== null) {
        const { latitude, longitude } = userCoords;

        events.forEach(event => {
          event.distanceFromUser = getDistanceToVenue({
            userCoords: { latitude, longitude },
            venueCoords: { latitude: event.venue.latitude, longitude: event.venue.longitude }
          })
        })

        if(filter === 'distance') {
          events = sortEventsByDistance(events);
        }
      }

      dispatch({ type: SET_EVENTS, payload: events });
      dispatch({ type: SET_LOADING, payload: false });
    })
    .catch(error => console.log('axios call error', error))
}

const getDistanceToVenue = ({userCoords, venueCoords}) => {
  return (geolib.getDistance(userCoords, venueCoords) * 0.000621371).toFixed(1);
}

const sortEventsByDistance = (events) => {
  return events.sort((event1, event2) => {
    return event1.distanceFromUser - event2.distanceFromUser;
  });
}
