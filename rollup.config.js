import banner from 'rollup-plugin-banner'
import {terser} from 'rollup-plugin-terser'
import license from './src/js/license'

const packageName = 'vanilla-smoothie'
const isProd = process.env.NODE_ENV === 'production'
const isMinify = process.env.MODE === 'minify'
const prodOutput = [
  {
    name: packageName,
    file: isMinify ? `dist/${packageName}.min.js` : `dist/${packageName}.js`,
    format: 'umd'
  }
]
const devOutput = [
  {
    name: packageName,
    file: `docs/js/${packageName}.js`,
    format: 'umd'
  }
]

export default {
  input: `./src/js/${packageName}.js`,
  output: isProd ? prodOutput : devOutput,
  plugins: [
    isProd && isMinify && terser(),
    banner(license)
  ]
}
