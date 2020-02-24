import { GET_USER_LOCATION } from './types'

export function getUserLocation() {
  return async function (dispatch) {
    
    await navigator.geolocation.getCurrentPosition( position => { 
      dispatch(
        {
        type: GET_USER_LOCATION,
        payload: position.coords
        }
      )
    })
  }
}
