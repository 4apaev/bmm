var stylus = require('stylus')
  , path = require('path')
  , nodes = stylus.nodes
  , utils = stylus.utils
  , Canvas

exports = module.exports = plugin;
exports.path = __dirname;


var svine = function(a,b) {
  console.log(a,b);
}

var capybara = function(a) {
  console.log(a);
}

function plugin() {
  return function(style){
    style.include(__dirname);
    style.define('svine', svine)
    style.define('capybara', capybara)
  }
}
