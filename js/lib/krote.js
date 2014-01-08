(function(win) {
  var
    toType = function(x) {
      return {}['toString'].call(x).match(/\s(\w+)/)[1];
    },
    is = function(what, x) {
      return new RegExp(what, "i").test(toType(x))
    },
    extend = function(target) {
      var k, l, i, trg;
      []['splice'].call(arguments, 1)['forEach'](function(obj) {
        if (!obj) return;
        k = Object.keys(obj);
        l = k.length;
        i = 0;
        trg = target;
        for (; i < l; i++) trg[k[i]] = obj[k[i]];
      });
      return target;
    },

    doq = function(query, scope) {

      var fn = /\s\S/.test(query) ? 'querySelectorAll' : {
             '#': 'getElementById'
            ,'.': 'getElementsByClassName'
            ,'@': 'getElementsByName'
            ,'=': 'getElementsByTagName'
            ,'*': 'querySelectorAll'
          }[query[0]];

      return (scope ? scope : document)[fn](query.replace(/^[@\=\*]/,''));
    };

  var qRot = function(x, data) {
    return new qRot.fn.init(x, data)
  };

  qRot.fn = qRot.prototype = {

    init: function(x) {

      if (is("str", x)) {

      }

      if (is("arr", x)) {

      }

      if (is("func", x)) return x();
      if (x instanceof qRot) return x;
      return this;
    },
  };

  qRot.fn.constructor = qRot;
  qRot.fn.init.prototype = qRot.fn;

}(window));
