define('app', ['modules/Bmm', 'modules/colors'], function (Bmm, colors) {

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
    window.app = {
      bmm: new Bmm(tree),
      colors: colors
    }

    app.colors.handleHsl();

  });
})