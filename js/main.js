require.config({
  baseUrl: "js/",
  paths: {
    'min': 'lib/min',
    'lodash': 'lib/lodash'
  },
  shim: {
    'min': {
      exports: '$'
    },
    'lodash': {
      exports: '_'
    }
  }
});

var
   log    = console.log.bind(console)
  ,tms    = console.time.bind(console)
  ,tme    = console.timeEnd.bind(console)
  ,toType = function(x) { return {}['toString'].call(x).match(/\s(\w+)/)[1] }
  ,is     = function(what, x) { return new RegExp(what, "i").test(toType(x)) };

require(['lodash', 'min', 'app']);