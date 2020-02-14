import { GET_USER_LOCATION } from '../actions/types'


const initialState = {
  userCoords: {}
  
}

export default function(state = initialState, action){
  console.log("passing in reducer ")
  console.log(action)
  switch(action.type){
    
    case GET_USER_LOCATION:
      console.log('passing inside case')
      console.log(action.payload)
      return {
        lat: action.payload.latitude,
        lng: action.payload.longitude
      }
    default:
      return state;
  }
} 