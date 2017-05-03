/**
 * Module dependencies.
 */

var concat = require('lineup-stream')


/**
 * Tagged template transforming string into
 * stream.
 *
 * @param {TemplateStringsArray} arr
 * @api public
 */

module.exports = function(arr, ...args) {
  var cp = []
  arr.map((item, idx) => {
    var value = args[idx]
    cp.push(item)
    if(value != null) cp.push(value instanceof Array ? concat(...value) : value)
  })
  return concat(...cp)
}
