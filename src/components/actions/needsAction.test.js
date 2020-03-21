import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './needsAction'
import * as types from './types'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_NEEDS when fetching needs has been done', () => {
    fetchMock.getOnce('http://localhost:3001/api/v1/needs', {
      body: { needs: ['random help need'] },
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: types.FETCH_NEEDS, payload: { needs: ['random help need'] } }
    ]
    const store = mockStore({ needs: [] })

    return store.dispatch(actions.fetchNeeds()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

