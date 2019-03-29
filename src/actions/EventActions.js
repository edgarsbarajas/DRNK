import axios from 'axios';
import geolib from 'geolib';
import { getUserLocation } from './LocationActions';
import { SET_EVENTS, TOGGLE_SEARCH_BAR, TOGGLE_LOADING } from './types';
import { EVENTBRITE_API_KEY } from '../../keys';

export const getEventsByUserLocation = () => dispatch => {
  console.log('******** finding events from location');

  getUserLocation((pos) => {
    const { latitude, longitude } = pos.coords;
    console.log(latitude, longitude);
    const url = `https://www.eventbriteapi.com/v3/events/search/?token=${EVENTBRITE_API_KEY}&location.within=10mi&location.latitude=${latitude}&location.longitude=${longitude}&sort_by=date&categories=110&subcategories=10001&expand=venue`;

    console.log('updated user location');

    axios
      .get(url)
      .then(response => {

        console.log('got new events response');
        const { events } = response.data;
        // add distance to the venue to the event object
        events.forEach(event => {
          console.log('***for each event call***');
          event.distanceFromUser = getDistanceToVenue({
            userCoords: { latitude, longitude },
            venueCoords: { latitude: event.venue.latitude, longitude: event.venue.longitude }
          })
        })

        console.log(events);
        dispatch({ type: TOGGLE_LOADING });
        dispatch(setEvents(events));
      })
      .catch(error => console.log(error))
  }, (error) => {
    dispatch({ type: TOGGLE_LOADING });
    console.log('****error from action');
  })
}

export const getEventsBySearch = ({city, startDateKeyword}) => dispatch => {
  dispatch({ type: TOGGLE_SEARCH_BAR });

  getUserLocation((pos) => {
    const { latitude, longitude } = pos.coords;
    console.log('process.env', process.env);
    console.log('process.env[]', process.env['EVENTBRITE_API_KEY']);
    const url = `https://www.eventbriteapi.com/v3/events/search/?token=${EVENTBRITE_API_KEY}&location.address=${city}&start_date.keyword=${startDateKeyword}&sort_by=date&categories=110&subcategories=10001&expand=venue`;
    console.log('updated user location');

    axios
      .get(url)
      .then(response => {

        console.log('got new events response');
        const { events } = response.data;
        // add distance to the venue to the event object
        events.forEach(event => {
          console.log('***for each event call***');
          event.distanceFromUser = getDistanceToVenue({
            userCoords: { latitude, longitude },
            venueCoords: { latitude: event.venue.latitude, longitude: event.venue.longitude }
          })
        })

        console.log(events);
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

const setEvents = events => ({
  type: SET_EVENTS, payload: events
})


// GETTING EVENTS
// get location
  // get events by location
  // if no location, set error => 'Turn on your location in settings...'
//
