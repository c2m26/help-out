import { FETCH_NEEDS, NEW_NEED } from '../actions/types'
// import { bindActionCreators } from 'redux'

const initialState = {
  items: [],
  item: {}
}

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_NEEDS:
      state.items = action.payload  
    return state
      
    case NEW_NEED:
      return{
        ...state,
        item: action.payload,
      }
    default:
      return state;
  }
} 