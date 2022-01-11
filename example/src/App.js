import React, { useEffect, useState } from 'react'
import { useToImage } from '@hcorta/react-to-image'

export default function App() {
  const { ref, isLoading, getSvg, getPng, getJpeg, ...rest } = useToImage()
  const [buttons, setButtons] = useState([])

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
        <button onClick={getSvg}>Download SVG</button>
        <button onClick={getJpeg}>Download JPEG</button>
        <button onClick={getPng}>Download PNG</button>

        <h2>Buttons</h2>
        <button
          onClick={() => setButtons((prevState) => [...prevState, 'other'])}
        >
          Add buttons
        </button>

        {buttons.map((button) => (
          <span key={button}>{button}</span>
        ))}
      </div>
    </div>
  )
}
