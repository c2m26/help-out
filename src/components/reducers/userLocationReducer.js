import { GET_USER_LOCATION } from '../actions/types'
import { bindActionCreators } from 'redux'

const initialState = {
  lat: '',
  lng: ''
}

export default function(state = initialState, action){
  console.log("passing here")
  switch(action.type){
    
    case GET_USER_LOCATION:
      console.log('passing inside case')
      console.log(action.payload)
      return{
        ...state,
        lat: 5.121312,
        lng: action.payload.longitude
      }
    default:
      return state;
  }
} 