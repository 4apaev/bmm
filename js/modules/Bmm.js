define('modules/Bmm', ['modules/walk'], function (walk) {

  var
     getTree  = function(n) { return $('.tree')[n] }
    ,getDump  = function(dump) { return walk(dump, []).join('') }
    ,getFind  = function() { return $('#find'); };


  function Bmm(dump, search) {
    this.dump = dump[0].children;
    this.init()
  }

  Bmm.prototype = {

    init: function() {
      var
        self = this,
        tree = getTree(0);

      tree.html(getDump(this.dump));

      getFind().on('change', this.doFind.bind(this));

      $('.bEdit', tree).on('click', function(e){
        var id = e.target.parentElement.id.split('-').pop();
        chrome.bookmarks.get(id, self.editNode.bind(self))
      });

      $('.bRemove', tree).on('click', this.removeNode);
    },

    removeNode: function(e) {
        var
          node = e.target.parentElement,
          id = node.id.split('-').pop(),
          fn = node.classList.contains('dad') ? 'removeTree' : 'remove';

        if(!window.confirm("sure?")) return;

        chrome.bookmarks[fn](id, function(done) {
          this.previousSibling.txt("REMOVED");
        }.bind(e.target));
    },

    editNode: function(res) {
      var
        update = {},
        node = res[0],
        ttl = window.prompt("edit title",node.title),
        url = window.prompt("edit url",node.url);

      update.title = ttl ? ttl : node.title;
      update.url = url ? url : node.url;

      chrome.bookmarks.update(node.id, update, function(done) {
        var el = $('#node-' + done.id + ' > span')[0];
        el.txt(done.title);
        el.classList.add('modified');
      });
    },

    showSearchResults: function(res) {
      getTree(1).html(getDump(res));
    },

    doFind: function(e) {
      var val = e.target.value.trim();
      if(!val) return;
      chrome.bookmarks.search(val, this.showSearchResults.bind(this));
    },

    doFind: function(e) {
      var val = e.target.value.trim();
      if(!val) return;
      chrome.bookmarks.search(val, this.showSearchResults.bind(this));
    }
  }

  return Bmm;
});


















































// $('#bookmarks input[type="checkbox"]').each(function(box){ box.checked = true;})
    // sortNodeList: function() {
    //   var
    //     filterBy = _.find($.doqn('filter'), 'checked').value
    //     trg  = $.dq("#stage .tree"),
    //     frag = document.createDocumentFragment(),
    //     fn = frag.append.bind(frag);

    //   _.each($.tar(trg.children).reverse(), fn);
    //   trg.empty();
    //   trg.append(frag);

    // },
