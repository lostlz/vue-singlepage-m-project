'use strict'
const path = require('path')


module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@':path.resolve("src"),
    }
  },
}
