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
                + (node.children ? 'dad kids-' + node.children.length : 'kid') + '">'
                + '<b class="ico bEdit"></b><span>' + (node.title || node.url) + '</span><b class="ico bRemove"></b>';
        finish = '</li>';
      }
      res.push(start);
      walk(node, res);
      res.push(finish);
    });
    return res;
  }
})



  // var marko = function (child) {
  //   var btn = child.firstElementChild;
  //   if(btn && btn.classList.contains('toggle') && !btn.checked) {
  //     btn.click();
  //     return marko(child.parentElement.parentElement);
  //   } else {
  //     return;
  //   }
  // }

