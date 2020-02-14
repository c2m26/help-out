import { GET_USER_LOCATION } from './types'

export function getUserLocation() {
  return function (dispatch) {
    
    navigator.geolocation.getCurrentPosition( position => { 
      dispatch(
        {
        type: GET_USER_LOCATION,
        payload: position.coords
        }
      )
    })
  }
}
