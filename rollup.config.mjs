import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import packageJson from './package.json' assert { type: 'json' }

const name = packageJson.main.replace(/\.js$/, '')

const bundle = config => ({
  ...config,
  input: 'src/index.ts',
  external: id => !/^[./]/.test(id)
})

const bundles = [
  bundle({
    plugins: [
      esbuild({
        minify: process.env.NODE_ENV === 'production'
      })
    ],
    output: [
      {
        file: `${name}.js`,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: `${name}.mjs`,
        format: 'es',
        sourcemap: true
      }
    ]
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: 'es'
    }
  })
]

export default bundles
