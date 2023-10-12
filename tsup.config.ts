import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src'],
  format: ['esm', 'cjs'],
  minify: true,
  shims: true,
  sourcemap: true,
  splitting: true
})
