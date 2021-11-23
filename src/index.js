'use strict'

import { useCallback, useRef, useState } from 'react'
import {
  toPng,
  toJpeg,
  toBlob,
  toPixelData,
  toSvg,
  toCanvas
} from 'html-to-image'

import { utils } from './utils'

export function useToImage(
  { pixelRatio = 1, backgroundColor = 'transparent', ...restOptions } = {},
  callbackFunc = utils.defaultDownloadImage
) {
  const baseRef = useRef()
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    dataURL: null
  })

  const setRef = useCallback((node) => {
    if (baseRef.current || !node) {
      return null
    } else if (node) {
      baseRef.current = node
    }
  }, [])

  const defaultGetter = (func, key, format) => async () => {
    setState((prevState) => ({ ...state, isLoading: true }))

    try {
      const output = await func(baseRef?.current, {
        pixelRatio,
        backgroundColor,
        ...restOptions
      })

      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: false,
        [key]: output
      }))

      callbackFunc({
        format,
        data: output,
        ...state,
        ...restOptions
      })
    } catch (e) {
      setState((prevState) => ({
        ...state,
        isLoading: false,
        error: e
      }))
    }
  }

  const getSvg = useCallback(defaultGetter(toSvg, 'dataURL', 'svg'), [])
  const getJpeg = useCallback(defaultGetter(toJpeg, 'dataURL', 'jpeg'), [])
  const getPng = useCallback(defaultGetter(toPng, 'dataURL', 'png'), [])
  const getBlob = useCallback(defaultGetter(toBlob, 'dataURL', 'png'), [])
  const getCanvas = useCallback(defaultGetter(toCanvas, 'dataURL', 'svg'), [])
  const getPixelData = useCallback(
    defaultGetter(toPixelData, 'dataURL', 'svg'),
    []
  )

  return {
    ...state,
    ref: setRef,
    getSvg,
    getJpeg,
    getPng,
    getBlob,
    getPixelData,
    getCanvas
  }
}
