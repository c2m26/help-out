import { FETCH_NEEDS, NEW_NEED } from '../actions/types'

const initialState = {
  items: [],
  item: {}
}

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_NEEDS:
      console.log('reducer')
      console.log(action.payload)
      return{
        ...state,
        items: action.payload
      }
    
    default:
      return state;
  }
}