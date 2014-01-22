define('modules/walk', [], function () {

  return function walk(x, res) {

    _.each(x, function(node, key, curr) {

      if(typeof node !== 'object') {
        return;
      }

      var start, finish;

      if(node.constructor.name == 'Array') {

        start = '<input class="ico dir" type="checkbox"><ol>';
        finish = '</ol>';

      } else {
        start  = '<li id="node-' + node.id
                + '" class="'
                + (node.children ? 'kids-' + node.children.length : 'kid') + '">'
                + '<span>' + (node.title || node.url) + '</span>';
        finish = '</li>';
      }

      res.push(start);
      walk(node, res);
      res.push(finish);

    });
    return res;
  }

})




