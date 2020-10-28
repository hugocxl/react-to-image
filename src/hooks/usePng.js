'use strict'

import { toPng } from 'html-to-image'
import { useImage } from '../hooks'
import { utils } from '../utils'

export const usePng = useImage(
  'dataURL',
  toPng,
  utils.defaultDownloadImage,
  'png',
  'getPng'
)
