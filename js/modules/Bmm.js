define('modules/Bmm', ['modules/walk', 'modules/Search'], function (walk, Search) {

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

      $('=b', tree).on('click', function(e){
        var id = e.target.parentElement.id.split('-').pop();
        chrome.bookmarks.get(id, self.editNode.bind(self))
      });

      $('#editbox button.save').on('click', self.updateNode.bind(self));
      $('#editbox button.remove').on('click', self.removeNode.bind(self));
    },

    editNode: function(res) {
      var
         node = res[0]
        ,box = $('#editbox')
        ,inp = $('=input', box);

      inp[0].value = node.title;
      inp[1].value = node.url;
      box.dataset.id = node.id;
    },

    removeNode: function(e) {
      log(e)
    },

    updateNode: function() {
      var
         box = $('#editbox')
        ,inp = $('=input', box);


        chrome.bookmarks.update(box.dataset.id, {
          title:inp[0].value,
          url:inp[1].value
        }, log);
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
