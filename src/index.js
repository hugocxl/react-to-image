'use strict'

import React, { useCallback, useRef } from 'react'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'

// Default width, height,
export function useImage({ onSuccess, onError, onLoading }) {
  const ref = useRef(null)
  const setRef = useCallback((node) => {
    if (ref.current) {
      return
    }

    if (node) {
      ref.current = node
    }
  }, [])

  return {
    ref: setRef,
    toPng: () => {
      return toPng(ref?.current, options)
    },
    toJpeg,
    toBlob,
    toPixelData,
    toSvg
  }
}
