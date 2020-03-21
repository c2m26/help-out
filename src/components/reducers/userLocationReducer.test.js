import { GET_USER_LOCATION } from '../actions/types'
import userLocationReducer from '../reducers/userLocationReducer'

describe('userLocation reducer', () => {

  it("should handle GET_USER_LOCATION", () => {
    expect(
      userLocationReducer([], {
        type: GET_USER_LOCATION,
        payload: {
          latitude: 5,
          longitude: 10
        }
      })
    ).toEqual(
        {
          lat: 5,
          lng: 10
        }
      )
  })

})