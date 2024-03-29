
import createReducer from '../lib/create-reducer'
import { deepEqual, strictEqual } from 'assert'
import I from 'Immutable'

describe('## create-reducer', () => {
  const GET_ITEMS = 'GET_ITEMS'
  const ADD_ITEM = 'ADD_ITEM'

  describe('# basic', () => {
    const defaultState = {
      title: 'hello',
      items: [{
        name: 'one'
      }]
    }

    const reducer = createReducer(defaultState, {
      [GET_ITEMS]: (payload, state, action) => {
        return payload
      },

      [ADD_ITEM]: (payload, state, action) => {
        return payload
      }
    })

    it('defaultState, payload', () => {
      const result = reducer(undefined, {
        type: GET_ITEMS,
        payload: {
          items: [{
            name: 'two'
          }]
        }
      })

      deepEqual(result, { title: 'hello', items: [{ name: 'two' }] })
    })

    it('state, payload', () => {
      const result = reducer({
        title: 'world',
        items: [{
          name: 'three'
        }]
      }, {
        type: GET_ITEMS,
        payload: {
          items: [{
            name: 'two'
          }]
        }
      })

      deepEqual(result, { title: 'world', items: [{ name: 'two' }] })
    })

    it('defaultState, no payload', () => {
      const result = reducer(undefined, {
        type: ADD_ITEM,
        title: 'new'
      })

      deepEqual(result, { title: 'new', items: [{ name: 'one' }] })
    })

    it('state, payload', () => {
      const result = reducer({
        title: 'old',
        items: [{
          name: 'hello'
        }]
      }, {
        type: ADD_ITEM,
        title: 'new'
      })

      deepEqual(result, { title: 'new', items: [{ name: 'hello' }] })
    })
  })

  describe('# edge cases', () => {
    const defaultState = {
      title: 'hello',
      items: [{
        name: 'one'
      }]
    }

    const reducer = createReducer(defaultState, {
      [GET_ITEMS]: (payload, state, action) => {
        return payload
      },

      [ADD_ITEM]: (payload, state, action) => {
        return payload
      }
    })

    it('defaultState, payload = null', () => {
      const result = reducer(undefined, {
        type: GET_ITEMS,
        payload: null
      })

      deepEqual(result, { title: 'hello', items: [{ name: 'one' }] })
    })
  })

  describe('# with immutable payload property', () => {
    const defaultState = {
      title: 'hello',
      items: [{
        name: 'one'
      }]
    }

    const reducer = createReducer(defaultState, {
      [GET_ITEMS]: (payload, state, action) => {
        return {
          items: I.fromJS(payload.items)
        }
      }
    })

    it('defaultState, payload', () => {
      const result = reducer(undefined, {
        type: GET_ITEMS,
        payload: {
          items: I.fromJS([{
            name: 'two'
          }])
        }
      })

      result.items = result.items.toJS()

      deepEqual(result, { title: 'hello', items: [{ name: 'two' }] })
    })

    it('state, payload', () => {
      const result = reducer({
        title: 'world',
        items: [{
          name: 'three'
        }]
      }, {
        type: GET_ITEMS,
        payload: {
          items: [{
            name: 'two'
          }]
        }
      })

      result.items = result.items.toJS()

      deepEqual(result, { title: 'world', items: [{ name: 'two' }] })
    })
  })

  describe('# with immutable payload', () => {
    console.warn('TODO')
  })

  describe('# with immutable state', () => {
    console.warn('TODO')
  })
})
