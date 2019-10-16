import { useReducer } from "react"

// Action types
const actionPrefix = "mail/"
export const PENDING = `${actionPrefix}PENDING`
export const SUCCESS = `${actionPrefix}SUCCESS`
export const ERROR = `${actionPrefix}ERROR`

// Action creators
const pending = () => ({ type: PENDING })
const success = response => ({ type: SUCCESS, response })
const error = response => ({ type: ERROR, response })

// Reducer
const initialState = {
    status: null,
    response: null
}
  
const reducer = (state = initialState, { type, response, exception } = {}) => {
    switch (type) {
      case PENDING:
        return { ...initialState, status: PENDING }
      case SUCCESS:
        return { ...state, status: SUCCESS, response }
      case ERROR:
        return { ...state, status: ERROR, response }
      default:
        return state
    }
}
    
// Hook
export const useApiRequest = (url, options) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const makeRequest = async () => {
    dispatch(pending())
    try {
      const response = await fetch(url, options)
      dispatch(success(response))
    } catch (e) {
      dispatch(error(e))
    }
  }

  return [state, makeRequest]
}
