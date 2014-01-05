define('app', ['modules/Search', 'modules/Bmm'], function (Search, Bmm) {

  chrome.bookmarks.getTree(function(tree) {
    window.app = {};
    var
      dump = tree[0],
      search = new Search(dump),
      bmm = new Bmm(dump, search);
      bmm.init();

    app.tree = tree;
    app.dump = dump;
    app.bmm  = bmm;
  });
})