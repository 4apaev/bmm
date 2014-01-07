define('app', ['modules/Flat', 'modules/Search', 'modules/Bmm'], function (Flat, Search, Bmm) {

  chrome.bookmarks.getTree(function(tree) {
    window.app = {};
    var
      dump = tree[0],
      flt = new Flat(tree);
      search = new Search(dump),
      bmm = new Bmm(dump, search);
      bmm.init();

    app.bmm  = bmm;
    app.flt  = flt;

  });
})