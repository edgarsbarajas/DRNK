import { SET_USER_LOCATION } from './types';

export const getUserLocation = (success, fail) => {
  console.log('**** inside the getUserLocation method');
  navigator.geolocation.getCurrentPosition(success, fail);
}

const setUserLocation = (pos) => {
  return { type: SET_USER_LOCATION, payload: pos};
}
