<img src="public/header.png" width="100%" align="center">

<div align="center" style="margin: 30px 0px">

  [![NPM](https://img.shields.io/npm/v/react-to-image.svg)](https://www.npmjs.com/package/react-to-image)
  [![Build Status](https://travis-ci.com/hcorta/react-to-image.svg?branch=master)](https://travis-ci.com/hcorta/react-to-image)
  [![dependencies Status](https://david-dm.org/hcorta/react-to-image/status.svg)](https://david-dm.org/hcorta/react-to-image)
  [![Bundle Size](https://badgen.net/bundlephobia/minzip/react-to-image@latest)](https://bundlephobia.com/result?p=react-to-image@latest)
  [![Github Stars](https://img.shields.io/github/stars/hcorta/react-to-image.svg?style=social&label=Star)](https://www.npmjs.com/package/react-to-image)
  [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
  [![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Hook for converting any React component into image format

</div>

## Quick Features

- Transport/protocol/backend agnostic data fetching (REST, GraphQL, promises, whatever!)
- Auto Caching + Refetching (stale-while-revalidate, Window Refocus, Polling/Realtime)
- Parallel + Dependent Queries
- Mutations + Reactive Query Refetching
- Multi-layer Cache + Automatic Garbage Collection
- Paginated + Cursor-based Queries
- Load-More + Infinite Scroll Queries w/ Scroll Recovery
- Request Cancellation

## Install

```bash
yarn add react-to-image
```

## Usage

```jsx
import { useToImage } from 'react-to-image'

export function MyComponent() {
  const { ref, isLoading, getSvg } = useToImage()

  return (
      <div ref={ref}>
        <h1>My title</h1>
        <button onClick={getSvg}>Download SVG</button>
        {isLoading && 'loading..'}
    </div>
  )
}
```

## Contributing

No one’s perfect. If you’ve found any errors, want to suggest enhancements, or expand on a topic, please feel free to open an Issue or collaborate by PR.

**Working on your first Pull Request?** You can learn how from this *free* series:
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Code of Conduct

[Contributor Code of Conduct](public/docs/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

**react-to-image** is open source software licensed as MIT © [Hugo Corta](https://github.com/hcorta).
