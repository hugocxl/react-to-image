'use client'

import { useRef, useState } from 'react'
import { Options } from 'html-to-image/lib/options'
import {
  toPng,
  toJpeg,
  toBlob,
  toPixelData,
  toSvg,
  toCanvas
} from 'html-to-image'

type LibFn = (
  node: HTMLElement,
  options?: Options | undefined
) => Promise<unknown>

type LibFnReturn<F extends LibFn> = Awaited<ReturnType<F>>

type HookOptions<F extends LibFn> = Parameters<F>[1] & {
  onStart?: () => unknown
  onError?: (error: any) => unknown
  onSuccess?: (args: LibFnReturn<F>) => unknown
}

type HookReturn<F extends LibFn, E> = [
  (domNode: E) => void,
  () => Promise<LibFnReturn<F> | null>,
  HookState<F>
]

type HookState<F extends LibFn> = {
  isSuccess: boolean
  isError: boolean
  isIdle: boolean
  isLoading: boolean
  error: any
  data: LibFnReturn<F> | null
}

function generateHook<F extends LibFn>(
  fn: F,
  downloadFn?: (data: LibFnReturn<F>) => void
) {
  return function useHook<E = unknown>(
    options?: HookOptions<F>
  ): HookReturn<F, E> {
    const nodeRef = useRef<E>()
    const [state, setState] = useState<HookState<F>>({
      isSuccess: false,
      isError: false,
      isIdle: true,
      isLoading: false,
      error: null,
      data: null
    })

    function setNodeRef(node: E): void {
      if (!nodeRef.current && node) nodeRef.current = node
    }

    async function getImage(): Promise<LibFnReturn<F> | null> {
      setState(prevState => ({
        ...prevState,
        error: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
        isIdle: false
      }))

      if (options?.onStart) options.onStart()

      if (!nodeRef.current) {
        console.error('No ref was provided')
        return null
      }

      try {
        const data = (await fn(nodeRef?.current, options)) as LibFnReturn<F>

        setState({
          data,
          error: null,
          isSuccess: true,
          isLoading: false,
          isError: false,
          isIdle: false
        })

        if (options?.onSuccess) options.onSuccess(data)

        if (downloadFn) downloadFn(data)

        return data
      } catch (e: any) {
        console.error('Error generating image from component', e)
        setState(prevState => ({
          ...prevState,
          error: e,
          isLoading: false,
          isSuccess: false,
          isError: true,
          isIdle: false
        }))

        if (options?.onError) options.onError(e)

        return null
      }
    }

    return [setNodeRef, getImage, state]
  }
}

const defaultDownloader =
  ({ fileName = 'download', format = 'png' }) =>
  data => {
    const link = document.createElement('a')
    link.download = `${fileName}.${format}`
    link.href = data
    link.click()
  }

export const useToSvg = generateHook<typeof toSvg>(toSvg)

export const useToJpeg = generateHook<typeof toJpeg>(toJpeg)

export const useToPng = generateHook<typeof toPng>(toPng)

export const useToBlob = generateHook<typeof toBlob>(toBlob)

export const useToCanvas = generateHook<typeof toCanvas>(toCanvas)

export const useToPixelData = generateHook<typeof toPixelData>(toPixelData)

export const useDownloadAsSvg = generateHook<typeof toSvg>(
  toSvg,
  defaultDownloader({ format: 'svg' })
)

export const useDownloadAsJpeg = generateHook<typeof toJpeg>(
  toJpeg,
  defaultDownloader({ format: 'jpeg' })
)

export const useDownloadAsPng = generateHook<typeof toPng>(
  toPng,
  defaultDownloader({ format: 'png' })
)

export const useDownloadAsCanvas = generateHook<typeof toCanvas>(
  toCanvas,
  defaultDownloader({ format: 'canvas' })
)

export const useDownloadAsBlob = generateHook<typeof toBlob>(toBlob, data => {
  const url = URL.createObjectURL(data)
  const link = document.createElement('a')
  link.href = url
  link.download = `download.png`
  link.click()
  URL.revokeObjectURL(url)
})
