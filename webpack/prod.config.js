const { merge } = require('webpack-merge')
const base = require('./base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('./plugins/inline-chunk-html-plugin')

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/\.(js|css)$/])
  ]
})
