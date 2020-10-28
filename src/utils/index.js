export const utils = {
  defaultDownloadImage({ fileName = 'download', format = 'png', data }) {
    const link = document.createElement('a')
    link.download = `${fileName}.${format}`
    link.href = data
    link.click()
  }
}
