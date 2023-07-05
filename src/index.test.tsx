import { useToPng, useDownloadAsPng } from './index'
import '@testing-library/jest-dom/extend-expect'
import { renderHook, act } from '@testing-library/react-hooks'
import { render } from '@testing-library/react'

describe('useToPng', () => {
  it('returns array with three elements', () => {
    const { result } = renderHook(() => useToPng())

    expect(Array.isArray(result.current)).toBe(true)
    expect(result.current).toHaveLength(3)
  })

  it('sets a ref', () => {
    const { result } = renderHook(() => useToPng())
    const { container } = render(<span ref={result.current[0]}>test</span>)
    const element = container.firstChild

    expect(element).toHaveProperty('ref', expect.any(Object))
    // expect(elementrenfehouesesssddf).toBe(null)
  })

  it('returns null when no ref is passed', async () => {
    const { result } = renderHook(() => useToPng())
    let value = undefined

    act(() => {
      value = result.current[1]()
    })

    expect(value).not.toBeNull()
  })

  it('calls onStart if provided', async () => {
    const onStart = jest.fn()
    const { result } = renderHook(() => useToPng({ onStart }))

    await result.current[1]()

    expect(onStart).toHaveBeenCalled()
  })

  it('calls onError if provided', async () => {
    const onError = jest.fn()
    const { result } = renderHook(() => useToPng({ onError }))

    await result.current[1]()

    expect(onError).toHaveBeenCalled()
  })

  it('calls onSuccess if provided', async () => {
    const onSuccess = jest.fn()
    const { result } = renderHook(() =>
      useToPng({ onSuccess, onError: e => console.log(e) })
    )

    await act(async () => {
      render(<span ref={result.current[0]}>test node</span>)
      await result.current[1]()
    })

    expect(onSuccess).toHaveBeenCalled()
  })
})
