define('modules/walk', [], function () {

  var template = function(node) {
    var
       klass = 'ico'
      ,title = node.title || "no title"
      ,data  = 'data-dir="' + node.parentId + '-' + node.id + '"';

    if (node.children) {
      klass += ' toggle';
      title += " - " + node.children.length;
      data  += ' data-children="' + node.children.length + '"';
    };
    return '<li ' + data + '><b class="' + klass + '" >' + title + '</b>' + (node.url ? '<q class="ico link">' + node.url + '</q>' : '' );
  }

  return function walk(x, res) {
    _.each(x, function(node) {
      if(typeof node !== 'object' || node.length && node.length < 1) {
        return;
      }
      var htm = node.length ? ['<ul>', '</ul>'] : [template(node), '</li>'];
      res.push(htm[0]);
      walk(node, res);
      res.push(htm[1]);
    });
    return res;
  }

})