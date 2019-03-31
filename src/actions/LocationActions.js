import { SET_USER_LOCATION } from './types';

export const getUserLocation = (success, fail) => {
  navigator.geolocation.getCurrentPosition(success, fail);
}
