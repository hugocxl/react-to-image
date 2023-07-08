import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useToSvg } from '@hugocxl/react-to-image'

function App() {
  const [count, setCount] = useState(0)
  const [ref, getSvg, state] = useToSvg<HTMLDivElement>({
    backgroundColor: 'white',
    onStart: () => console.log('onStart'),
    onError: () => console.log('onError'),
    onSuccess: () => console.log('onSuccess')
  })

  return (
    <div>
      <div ref={ref}>
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
        <p className='read-the-docs'>{JSON.stringify(state)}</p>
        <button onClick={getSvg}>donwload</button>
      </div>
      {/* <ComponentA />
      <ComponentB /> */}
    </div>
  )
}

// function ComponentA() {
//   const [ref] = useToSvgContext()

//   return (
//     <div ref={ref}>
//       <h1>Component A</h1>
//       <p>Edit and save to test HMR</p>
//     </div>
//   )
// }

// function ComponentB() {
//   const [_, getSvg] = useToSvgContext()

//   return (
//     <div>
//       <h1>Component B</h1>
//       <button onClick={getSvg}>donwload</button>
//     </div>
//   )
// }

export default App
