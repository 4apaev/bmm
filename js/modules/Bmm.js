define('modules/Bmm', ['modules/walk', 'modules/Search'], function (walk, Search) {

  var
     getTree    = function(id) { return $('#' + id + ' > ol.tree')[0] }
    ,getStage   = function() { return $('#stage') }
    ,getDump    = function(dump) { return walk(dump, []).join('') }
    ,getSearch  = function() { return $('#search input[type="text"]')[0]; };


  function Bmm(dump, search) {
    this.dump = dump[0].children;
    this.init()
  }

  Bmm.prototype = {

    init: function() {
      getTree('root').html(getDump(this.dump));
      getSearch().on('change', this.doFind.bind(this));
    },

    showSearchResults: function(res) {
      getTree('stage').html(getDump(res));
    },

    doFind: function() {
      var val = getSearch().value.trim();
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
