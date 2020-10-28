'use strict'

import { toJpeg } from 'html-to-image'
import { useImage } from '../hooks'
import { utils } from '../utils'

export const useJpeg = useImage(
  'dataURL',
  toJpeg,
  utils.defaultDownloadImage,
  'jpeg',
  'getJpeg'
)
