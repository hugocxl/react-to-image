import React, { useEffect, useRef } from 'react'
import { usePng } from 'react-to-image'
import { toPng, toJpeg, toBlob, toPixeldata, toSvg } from 'html-to-image'

export default function App() {
  // const ref = useRef()
  const { ref, isLoading, getPng, ...rest } = usePng({
    fileName: ''
  })

  return (
    <div>
      {isLoading && <span>loading...</span>}
      <div
        ref={ref}
        style={{
          display: 'flex',
          // height: 400,
          // width: 400,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <h1>This is a title</h1>
        <button onClick={getPng}>download</button>
      </div>
    </div>
  )
}
