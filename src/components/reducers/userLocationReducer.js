import { GET_USER_LOCATION } from '../actions/types'


const initialState = 
  {
    lat: 0,
    lng: 0
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