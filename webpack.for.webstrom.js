'use strict'
const path = require('path')
/*
* 给webstrom识别路径别名 '@'
* settings->webpack 指向这个文件
* */

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@':path.resolve("src"),
    }
  },
}
