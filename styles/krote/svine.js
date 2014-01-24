
/**
 * Module dependencies.
 */

var stylus = require('stylus')
  , nodes = stylus.nodes
  , utils = stylus.utils;

/**
 * Expose `Svine`.
 */

exports = module.exports = Svine;
Literal
exports.create = function(size, start){
  utils.assertType(size, 'unit', 'size');
  utils.assertString(start, 'start');
  return new Svine(size.val, start.string);
};

exports.dataURL = function(grad){
  utils.assertType(grad, 'gradient');
  return new nodes.String(grad.toDataURL());
};

/**
 * Initialize a new `Gradient` node with the given `size`
 * and `start` position.
 *
 * @param {Number} size
 * @param {String} start
 * @api private
 */

function Svine(size, start) {
  this.size = size;
  this.start = start;
};


Svine.prototype.toDataURL = function(){
  var canvas = this.canvas
    , ctx = this.ctx;
  ctx.fillStyle = this.grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return canvas.toDataURL();
};

/**
 * Inherit from `nodes.Node.prototype`.
 */

Svine.prototype.__proto__ = nodes.Node.prototype;
