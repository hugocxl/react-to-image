import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useToPng } from '@hugocxl/react-to-image'

function App() {
  const [count, setCount] = useState(0)
  const [state, getSvg, ref] = useToPng<HTMLDivElement>({
    backgroundColor: 'black',
    onStart: () => console.log('onStart'),
    onError: () => console.log('onError'),
    onSuccess: data => {
      const link = document.createElement('a')
      link.download = `${'hola'}.${'png'}`
      link.href = data
      link.click()
    }
  })

  return (
    <div ref={ref}>
      <div>
        <div>
          <a href='https://vitejs.dev' target='_blank'>
            <img src={viteLogo} className='logo' alt='Vite logo' />
          </a>
          <a href='https://react.dev' target='_blank'>
            <img src={reactLogo} className='logo react' alt='React logo' />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className='card'>
          <button onClick={() => setCount(count => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p>{state.status}</p>
        <button onClick={getSvg}>donwload</button>
      </div>
    </div>
  )
}

export default App
