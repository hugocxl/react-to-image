import { createHook } from './hooks.factory'
import { coreLib } from '../shared'

export const useToSvg = createHook<typeof coreLib.toSvg>(coreLib.toSvg)

export const useToJpeg = createHook<typeof coreLib.toJpeg>(coreLib.toJpeg)

export const useToPng = createHook<typeof coreLib.toPng>(coreLib.toPng)

export const useToBlob = createHook<typeof coreLib.toBlob>(coreLib.toBlob)

export const useToCanvas = createHook<typeof coreLib.toCanvas>(coreLib.toCanvas)

export const useToPixelData = createHook<typeof coreLib.toPixelData>(
  coreLib.toPixelData
)

// export const useDownloadAsSvg = createHook<typeof coreLib.toSvg>(
//   coreLib.toSvg,
//   defaultDownloader({ format: 'svg' })
// )

// export const useDownloadAsBlob = createHook<typeof coreLib.toBlob>(
//   coreLib.toBlob,
//   data => {
//     const url = URL.createObjectURL(data)
//     const link = document.createElement('a')
//     link.href = url
//     link.download = `download.png`
//     link.click()
//     URL.revokeObjectURL(url)
//   }
// )
