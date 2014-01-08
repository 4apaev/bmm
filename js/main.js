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

window.log = console.log.bind(console);
window.tms = console.time.bind(console);
window.tme = console.timeEnd.bind(console);

require(['lodash', 'min', 'app']);