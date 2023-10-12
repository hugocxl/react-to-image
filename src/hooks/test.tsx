import { renderHook } from '@testing-library/react'
import { createHook } from './factory'
import { coreLib } from '../lib'
import {
  useToBlob,
  useToCanvas,
  useToJpeg,
  useToPixelData,
  useToPng,
  useToSvg
} from './hooks'

const coreLibFns = [
  { name: 'toPng', value: coreLib.toPng },
  { name: 'toSvg', value: coreLib.toSvg },
  { name: 'toJpeg', value: coreLib.toJpeg },
  { name: 'toBlob', value: coreLib.toBlob },
  { name: 'toCanvas', value: coreLib.toCanvas },
  { name: 'toPixelData', value: coreLib.toPixelData }
]
const hooks = [
  { name: 'useToPng', hook: useToPng },
  { name: 'useToSvg', hook: useToSvg },
  { name: 'useToJpeg', hook: useToJpeg },
  { name: 'useToBlob', hook: useToBlob },
  { name: 'useToCanvas', hook: useToCanvas },
  { name: 'useToPixelData', hook: useToPixelData }
]

describe('createHook', () => {
  it.each(coreLibFns)(
    'should generate a hook from $name function',
    ({ value }) => {
      const hook = createHook(value)

      expect(hook).toBeDefined()
    }
  )
})

describe('hooks', () => {
  it.each(hooks)('$name hook runs correctly', ({ hook }) => {
    const { result } = renderHook(() => hook())

    expect(result.current).toBeDefined()
    expect(Array.isArray(result.current)).toBe(true)
    expect(result.current).toHaveLength(3)
  })

  it.each(hooks)('$name hook returns state with all properties', ({ hook }) => {
    const [state] = renderHook(() => hook()).result.current

    expect(state).toHaveProperty('status')
    expect(state).toHaveProperty('error')
    expect(state).toHaveProperty('data')
    expect(state).toHaveProperty('isError')
    expect(state).toHaveProperty('isLoading')
    expect(state).toHaveProperty('isSuccess')
    expect(state).toHaveProperty('isIdle')
  })
})
