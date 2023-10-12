import { createHook } from './factory'
import { coreLib } from '../lib'

export const useToSvg = createHook<typeof coreLib.toSvg>(coreLib.toSvg)

export const useToJpeg = createHook<typeof coreLib.toJpeg>(coreLib.toJpeg)

export const useToPng = createHook<typeof coreLib.toPng>(coreLib.toPng)

export const useToBlob = createHook<typeof coreLib.toBlob>(coreLib.toBlob)

export const useToCanvas = createHook<typeof coreLib.toCanvas>(coreLib.toCanvas)

export const useToPixelData = createHook<typeof coreLib.toPixelData>(
  coreLib.toPixelData
)
