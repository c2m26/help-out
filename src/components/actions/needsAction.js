import { FETCH_NEEDS, NEW_NEED } from './types'

export function fetchNeeds() {
  return async function(dispatch){
    // fetching all needs from API
    console.log('passing here')
    let urlneeds = 'http://localhost:3001/api/v1/needs'

    await fetch(urlneeds, {
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
    }))
    .catch(error => {
      console.log("Log In error", error)
    });
        
  }
}

export function postNeed(needData) {
  return async function(dispatch){
    console.log('new need post')
    let urlneeds = 'http://localhost:3001/api/v1/needs'

      await fetch(urlneeds, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(needData)
      })
      
      .then((response)=>{
        return response.json()
      })
      .then((need) => dispatch({
        type: NEW_NEED,
        payload: need
      }))
      .catch(error => {
        console.log("Log In error", error)
      })    
  }
}