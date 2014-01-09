define('app', ['modules/Bmm', 'modules/Flat'], function (Bmm, Flat) {

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
    window.bmm = new Bmm(tree[0]);
    // window.flt = new Flat(tree);
  });
})