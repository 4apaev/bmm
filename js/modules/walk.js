define('modules/walk', [], function () {

  return function walk(x, res) {

    _.each(x, function(node, key, curr) {

      if(typeof node !== 'object') {
        return;
      }

      var start, finish;

      if(node.constructor.name == 'Array') {
        start = '<input class="ico dir" type="checkbox"><ol class="kids-' + node.length + ' parent-' + curr.id + '">';
        finish = '</ol>';
      } else {
        start  = '<li id="node-' + node.id + '"><button class="ico edit"></button><label>' + (node.title || 'no name') + '</label>';
        finish = '</li>';
      }

      res.push(start);
      walk(node, res);
      res.push(finish);

    });
    return res;
  }

})




