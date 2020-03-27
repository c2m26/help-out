import { GET_USER_LOCATION } from '../actions/types'


const initialState = {
  userCoords: {}
  
}

export default function(state = initialState, action){
  switch(action.type){
    case GET_USER_LOCATION:
      return {
        lat: action.payload.latitude,
        lng: action.payload.longitude
      }
    default:
      return state;
  }
} 