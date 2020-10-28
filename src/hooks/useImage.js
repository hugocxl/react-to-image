'use strict'

import React, { useCallback, useRef, useState, useEffect } from 'react'

export const useImage = (
  stateId,
  libFunc,
  defaultCallback,
  defaultFormat,
  getterName
) => ({ ref, pixelRatio = 1, ...restOptions }, callback) => {
  const baseRef = useRef(ref)
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    [stateId]: null
  })

  const setRef = useCallback((node) => {
    if (baseRef.current || !node) {
    } else if (node) {
      baseRef.current = node
    }
  }, [])

  async function defaultGetter() {
    setState({ ...state, isLoading: true })

    try {
      const output = await libFunc(baseRef?.current, {
        ...restOptions,
        pixelRatio
      })

      const newState = {
        ...state,
        isLoading: false,
        [stateId]: output
      }

      setState(newState)

      if (callback && typeof callback === 'function') {
        callback({
          ...newState,
          ...restOptions
        })
      } else {
        defaultCallback({
          format: defaultFormat,
          data: output,
          ...newState,
          ...restOptions
        })
      }
    } catch (e) {
      const newState = {
        ...state,
        isLoading: false,
        error: e
      }

      setState(newState)
    }
  }

  return {
    ...state,
    ref: setRef,
    [getterName]: defaultGetter
  }
}
