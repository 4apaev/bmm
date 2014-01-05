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

require(['lodash', 'min', 'app']);