import { GET_USER_LOCATION } from './types'

export function getUserLocation() {
  return dispatch => {
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition( (position) => {
        console.log(position.coords);
        dispatch({
            type: GET_USER_LOCATION,
            payload: position
        });
    });
}
}

