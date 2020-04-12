import { FETCH_NEEDS, NEW_NEED } from './types'
import { backendURL } from '../APIendpoints'

export function fetchNeeds() {
  return async function(dispatch){
    await fetch(`${backendURL}/api/v1/needs`, 
    {
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
      console.log("Error fetching existing help needs", error)
    });
        
  }
}

export function postNeed(needData) {
  return function(dispatch){
    let urlneeds = `${backendURL}/api/v1/needs`

      fetch(urlneeds, 
        {
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
      .then(
        (need) => dispatch({
          type: NEW_NEED,
          payload: need
        })
      )
      .catch(error => {
        console.log("Error creating new help need", error)
      })    
  }
}