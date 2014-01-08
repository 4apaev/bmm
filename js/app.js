define('app', ['modules/Flat', 'modules/Search', 'modules/Bmm'], function (Flat, Search, Bmm) {



  var
    body = document.body,
    timer;

  window.addEventListener('scroll', function() {
    clearTimeout(timer);
    if(!body.classList.contains('disable-hover')) body.classList.add('disable-hover');
    timer = setTimeout(function() {
      body.classList.remove('disable-hover')
    },500);
  });

  chrome.bookmarks.getTree(function(tree) {

    var
      search = new Search(tree[0]),
      bmm = new Bmm(tree[0], search);
      bmm.init();
    window.bmm = bmm;
  });
})