import { FETCH_NEEDS, NEW_NEED } from './types'

export function fetchNeeds() {
  return function(dispatch){
    // fetching all needs from API
    console.log('passing here')
    let urlneeds = 'http://localhost:3001/api/v1/needs'

    fetch(urlneeds, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      return response.json()
    })
    .then((needs) => dispatch({
      type: FETCH_NEEDS,
      payload: needs
    }));
        
  }
}