const { merge } = require('webpack-merge')
const base = require('./base.config')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-source-map'
})
