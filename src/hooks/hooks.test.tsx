import { renderHook } from '@testing-library/react'
import { createHook } from './hooks.factory'
import { coreLib } from '../shared'
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
    expect(result.current).toHaveLength(3)
  })
})
