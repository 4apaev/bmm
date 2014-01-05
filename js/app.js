define('app', ['modules/Search', 'modules/Bmm'], function (Search, Bmm) {

  chrome.bookmarks.getTree(function(tree){
    var
      dump = tree[0],
      search = new Search(dump)
      bmm = new Bmm(dump, search);

      bmm.init();
  });

})