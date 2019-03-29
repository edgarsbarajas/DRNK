import axios from 'axios';
import geolib from 'geolib';
import { getUserLocation } from './LocationActions';
import { SET_EVENTS, TOGGLE_SEARCH_BAR, TOGGLE_LOADING } from './types';
import { EVENTBRITE_API_KEY } from '../../keys';

export const getEventsByUserLocation = (data = {}) => dispatch => {
  const { startDateKeyword = '', filter = '' } = data;

  getUserLocation((pos) => {
    const { latitude, longitude } = pos.coords;
    const url = `https://www.eventbriteapi.com/v3/events/search/?token=${EVENTBRITE_API_KEY}&start_date.keyword=${startDateKeyword}&sort_by=${filter}&location.within=10mi&location.latitude=${latitude}&location.longitude=${longitude}&sort_by=${filter}&categories=110&subcategories=10001&expand=venue`;

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

        dispatch({ type: TOGGLE_LOADING });
        dispatch(setEvents(events));
      })
      .catch(error => console.log(error))
  }, (error) => {
    dispatch({ type: TOGGLE_LOADING });
    console.log('****error from action');
  })
}

export const getEventsBySearch = ({city, startDateKeyword, filter}) => dispatch => {
  dispatch({ type: TOGGLE_SEARCH_BAR });

  if(city === 'Current Location') {
    return dispatch(getEventsByUserLocation({startDateKeyword, filter}));
  }

  getUserLocation((pos) => {
    const { latitude, longitude } = pos.coords;
    const url = `https://www.eventbriteapi.com/v3/events/search/?token=${EVENTBRITE_API_KEY}&location.address=${city}&start_date.keyword=${startDateKeyword}&sort_by=${filter}&categories=110&subcategories=10001&expand=venue`;

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

        if(filter === 'distance') {
          events = sortEventsByDistance(events);
        }

        dispatch({ type: TOGGLE_LOADING });
        dispatch(setEvents(events));
      })
      .catch(error => console.log(error))
  }, (error) => {
    dispatch({ type: TOGGLE_LOADING });
    console.log('****error from action');
  })
}

const getDistanceToVenue = ({userCoords, venueCoords}) => {
  return (geolib.getDistance(userCoords, venueCoords) * 0.000621371).toFixed(1);
}

const sortEventsByDistance = (events) => {
  return events.sort((event1, event2) => {
    return event1.distanceFromUser - event2.distanceFromUser;
  });
}

const setEvents = events => ({
  type: SET_EVENTS, payload: events
})


// GETTING EVENTS
// get location
  // get events by location
  // if no location, set error => 'Turn on your location in settings...'
//
