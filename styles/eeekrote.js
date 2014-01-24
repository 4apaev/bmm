
  // var hash = {
  //   t: top,
  //   l: left,
  //   r: right,
  //   b: bottom
  // }




var stylus = require('stylus')
    , nodes = stylus.nodes
    , utils = stylus.utils;


var krote = function(a,b) {
  console.log(a,b);
}

var capybara = function(a) {
  console.log(a);
}


// var plugin = function() {
//   return function(style) {
//     style.define('krote', krote);
//     style.define('capybara', capybara);
//   };
// };

// module.exports = plugin;


// style.define('krote', krote);
// style.define('capybara', capybara);

// var mylib = function(style){

//   style.define('krote', krote);
//   style.define('capybara', capybara);
// };

stylus(str)
  .set('filename', 'krote.styl')
  .render(function(err, css) {
      if (err) throw err;
      console.log(css);
    });