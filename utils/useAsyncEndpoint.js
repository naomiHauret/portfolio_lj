import React, { useState, useEffect } from "react"

//
// Reusable function for fetch request

export function useAsyncEndpoint(fn) {
  // state that holds our request result
  const [result, setResult] = useState({
    data: null, // request data
    success: false, // is request completed ?
    pending: false, // is request pending ?
    error: false, // has our request encountered any errors ?
  })

  // state that holds the request we want to send
  const [request, setRequest] = useState()
  useEffect(() => {
    if (!request) return // exit if request is empty
    setResult({
      data: null,
      pending: true, // for our loading indicator (request ongoing)
      error: false,
      success: false,
    })
    fetch(request.url, request.params) // start our async request
      .then((
        result, // no error
      ) =>
        setResult({
          data: result.data, // set result state data with our request success data object
          pending: false, // stop loading indicator
          error: false,
          success: true, // UI success indicator
        }),
      )
      .catch(() =>
        // error
        setResult({
          data: null,
          pending: false, // stop loading indicator
          error: true, // UI failure indicator
          success: false,
        }),
      )
  }, [request])

  return [result, (...args) => setRequest(fn(...args))]
}
