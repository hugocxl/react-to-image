'use strict'

import React, { useCallback, useRef, useState, useEffect } from 'react'
import {
  toPng,
  toJpeg,
  toBlob,
  toPixelData,
  toSvg,
  toCanvas
} from 'html-to-image'

import { utils } from '../utils'

export function useToImage(
  { ref, pixelRatio = 1, backgroundColor = 'transparent', ...restOptions } = {},
  callback
) {
  const baseRef = ref || useRef()
  const [state, setState] = useState({
    isLoading: false,
    error: null
  })

  const setRef = useCallback((node) => {
    if (baseRef.current || !node) {
      return null
    } else if (node) {
      baseRef.current = node
    }
  }, [])

  const defaultGetter = (
    libFunc,
    stateKey,
    defaultFormat,
    defaultCallback = utils.defaultDownloadImage
  ) => async () => {
    setState({ ...state, isLoading: true })

    try {
      const output = await libFunc(ref || baseRef?.current, {
        pixelRatio,
        backgroundColor,
        ...restOptions
      })

      const newState = {
        ...state,
        isLoading: false,
        [stateKey]: output
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
    ref: ref || setRef,
    getSvg: defaultGetter(toSvg, 'dataURL', 'svg'),
    getJpeg: defaultGetter(toJpeg, 'dataURL', 'jpeg'),
    getPng: defaultGetter(toPng, 'dataURL', 'png'),
    getBlob: defaultGetter(toBlob, 'dataURL', 'png'),
    getPixelData: defaultGetter(toPixelData, 'dataURL', 'svg'),
    getCanvas: defaultGetter(toCanvas, 'dataURL', 'svg')
  }
}
