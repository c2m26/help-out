import { FETCH_NEEDS, NEW_NEED } from './types'
import APIendpoints from '../APIendpoints'

export function fetchNeeds() {
  return async function(dispatch){
    // fetching all needs from API
    // console.log('passing here')
    // let urlneeds = 'http://localhost:3001/api/v1/needs'
    let backendURL
    
    await fetch(`${backendURL}v1/needs`, {
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
    console.log('new need post')
    let urlneeds = 'http://localhost:3001/api/v1/needs'

      fetch(urlneeds, {
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
        },
        console.log(need)
        )
        
      )
      .catch(error => {
        console.log("Error creating new help need", error)
      })    
  }
}