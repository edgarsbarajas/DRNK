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
    const url = `https://www.eventbriteapi.com/v3/events/search/?token=${EVENTBRITE_API_KEY}&location.within=10mi&location.latitude=${latitude}&location.longitude=${longitude}&sort_by=best&categories=110&subcategories=10001&expand=venue`;

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

export const getEventsBySearch = ({city, startDateKeyword, filter}) => dispatch => {
  dispatch({ type: TOGGLE_SEARCH_BAR });

  console.log('events by search', {city, startDateKeyword, filter})

  getUserLocation((pos) => {
    const { latitude, longitude } = pos.coords;
    const url = `https://www.eventbriteapi.com/v3/events/search/?token=${EVENTBRITE_API_KEY}&location.address=${city}&start_date.keyword=${startDateKeyword}&sort_by=${filter}&categories=110&subcategories=10001&expand=venue`;
    console.log('updated user location');
    console.log('events by search url: ', url);

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

        if(filter === 'distance') {
          console.log('reorder the events by distance', events);
          events.sort((event1, event2) => {
            return event1.distanceFromUser - event2.distanceFromUser;
          });
        }

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
