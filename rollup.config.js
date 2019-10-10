import { eslint } from 'rollup-plugin-eslint'
import typescript from 'rollup-plugin-typescript2'
import {terser} from 'rollup-plugin-terser'
import banner from 'rollup-plugin-banner'
import filesize from 'rollup-plugin-filesize'
import license from './src/js/license'

const packageName = 'vanilla-smoothie'
const isProd = process.env.NODE_ENV === 'production'
const isMinify = process.env.MINIFY === 'true'
let outputFile = ''

if (isProd) {
  if (isMinify) {
    outputFile = `dist/${packageName}.min.js`
  } else {
    outputFile = `dist/${packageName}.js`
  }
} else {
  outputFile = `docs/js/${packageName}.min.js`
}

export default {
  input: `./src/ts/${packageName}.ts`,
  output: {
    name: packageName,
    file: outputFile,
    format: 'umd'
  },
  plugins: [
    !isProd && eslint(),
    typescript(),
    isMinify && terser(),
    banner(license),
    filesize()
  ]
}
