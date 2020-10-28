import React, { useRef } from 'react'
import { useImage } from 'react-to-image'

export default function App() {
  const titleRef = useRef()
  const bodyRef = useRef()
  const { ref, isLoading, data, error } = useImage({
    onSuccess,
    onError,
    onLoading,
    height: 200,
    width: 400
  })

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <h1 ref={ref}>This is a title</h1>
      <span>this is body</span>
      <button
        onClick={() => {
          toPng().then((dataUrl) => {
            var link = document.createElement('a')
            link.download = 'my-image-name.jpeg'
            link.href = dataUrl
            link.click()
          })
        }}
      >
        download
      </button>
    </div>
  )
}
