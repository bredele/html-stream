/**
 * Module dependencies.
 */

var concat = require('lineup-stream')
var through = require('through')


/**
 * Tagged template transforming string into
 * stream.
 *
 * @param {TemplateStringsArray} arr
 * @api public
 */

module.exports = function(arr, ...args) {
  if (typeof arr === 'function') {
    return through(function (data) {
      concat(arr(data)).on('data', (chunk) => this.emit('data', chunk))
    })
  }
  var cp = []
  arr.map((item, idx) => {
    var value = args[idx]
    cp.push(item)
    if(value != null) cp.push(value instanceof Array ? concat(...value) : value)
  })
  return concat(...cp)
}
