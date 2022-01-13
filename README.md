# react-to-image

<div align="center">
  <img src="public/cover.png" width="100%" align="center" />

[![Version](https://img.shields.io/npm/v/@hcorta/react-to-image.svg?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/@hcorta/react-to-image)
[![Size](https://img.shields.io/bundlephobia/minzip/@hcorta/react-to-image?style=flat-square)](https://bundlephobia.com/result?p=@hcorta/react-to-image)
[![NPM](https://img.shields.io/npm/dm/@hcorta/react-to-image.svg?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/@hcorta/react-to-image)

A React hook for converting any component to image

</div>

---

## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)
- [Props](#Props)
- [Contributing](#Contributing)
- [Code of Conduct](#code-of-conduct)
- [License](#License)

## Installation

In order to use **`react-to-image`**, all you need to do is install the npm package:

```sh
yarn add @hcorta/react-to-image
```

### Deprecation warning ⚠️

```sh
react-to-image is deprecated => use @hcorta/react-to-image instead
```

## Usage

To start using `@hcorta/react-to-image`, you just need to import the **`useToImage`** hook from the root folder. Check the [options](#Options) section out for more info:

```jsx
import { useToImage } from '@hcorta/react-to-image'

export function MyComponent() {
  const { ref, isLoading, getSvg } = useToImage()

  return (
    <div ref={ref}>
      <h1>My title</h1>
      <button onClick={getSvg}>Download SVG</button>
      {isLoading && 'loading...'}
    </div>
  )
}
```

## Props

```jsx
const {
  ref,
  isLoading,
  error,
  dataURL,
  getSvg,
  getPng,
  getJpeg,
  getBlob,
  getPixelData,
  getCanvas
} = useToImage(options, callback)
```

### Options

| name               |     type     |    default     | description                                                                                                                                                                                   |
| ------------------ | :----------: | :------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `width`            |  **number**  |      null      | Width in pixels to be applied to node before rendering.                                                                                                                                       |
| `height`           |  **number**  |      null      | Height in pixels to be applied to node before rendering.                                                                                                                                      |
| `backgroundColor`  |  **string**  |      ''        |  A string value for the background color, any valid CSS color value.                                                                                                                          |
| `style`            |  **object**  |       {}       | Styles object to be merged with node's style before rendering.                                                                                                                                |
| `quality`          |  **number**  | `1.0` (`100%`) | A number between `0` and `1` indicating image quality (e.g. `0.92` => `92%`) of the JPEG image.                                                                                               |
| `cacheBust`        |  **boolen**  |     false      | Set to true to append the current time as a query string to URL requests to enable cache busting.                                                                                             |
| `imagePlaceholder` | **dataURL**  |       ''       | A data URL for a placeholder image that will be used when fetching an image fails. Defaults to an empty string and will render empty areas for failed images.                                 |
| `pixelRatio`       |  **number**  |       1        | The pixel ratio of the captured image. Defalut use the actual pixel ratio of the device. Set `1` to use as initial-scale `1` for the image.                                                   |
| `filter`           | **function** |      null      | A function taking DOM node as argument. Should return true if passed node should be included in the output. Excluding node means excluding it's children as well.Not called on the root node. |

### Callback

Function to be called when any of the getters (getPng, getSvg,...) has finished converting the passed ref. Default to donwload as link.

## Contributing

No one’s perfect. If you’ve found any errors, want to suggest enhancements, or expand on a topic, please feel free to open an Issue or collaborate by PR.

**Working on your first Pull Request?** You can learn how from this _free_ series:
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Code of Conduct

[Contributor Code of Conduct](public/docs/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

**react-to-image** is open source software licensed as MIT © [Hugo Corta](https://github.com/hcorta).
