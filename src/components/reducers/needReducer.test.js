import { NEW_NEED, FETCH_NEEDS } from '../actions/types'
import needReducer from './needReducer'

describe('need reducer', () => {

  it("should handle FETCH_NEEDS", () => {
    
    expect(
      needReducer({}, {
        type: FETCH_NEEDS,
        payload: 
          [ 
            {id: 1},
            {id: 2}
          ]       
      })
    ).toEqual(
        {
          items: [
            {id: 1},
            {id: 2}
          ]
        }
      )

  })

  it("should handle NEW_NEED", () => {
    expect(
      needReducer([], {
        type: NEW_NEED,
        payload: {
          need: {id:1}
        }
      })
    ).toEqual(
        {
          item: {
            need: {id:1}
          }
        }
      )
  })

})