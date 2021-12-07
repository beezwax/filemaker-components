const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = merge(base, {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './specs/specs.js',
  devServer: {
    port: 8000
  },
})

config.plugins = [
  new HtmlWebpackPlugin({
    template: './specs/specs.html',
    inject: false
  })
]

config.output = {
  path: path.resolve(__dirname, '../specs')
}

module.exports = config
