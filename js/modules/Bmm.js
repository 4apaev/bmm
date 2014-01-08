define('modules/Bmm', ['modules/walk', 'modules/Search'], function (walk, Search) {

  function Bmm(dump, search) {
    this.search = new Search(dump);
    tms('dump');
    this.init(walk(dump, []).join(''));
    tme('dump');
  }

  Bmm.prototype = {

    init : function(tree) {

      var trg = $('#bookmarks');
      trg.addhtml(tree);

      $('#search').on('change', this.doFind.bind(this));
      $('.find').on('click', this.doFind.bind(this));
      $('.sort').on('click', this.sortNodeList.bind(this));

      this.updateEventHandlers(trg);
    },

    showSearchResults: function(res) {
      $("#results").html('<ul>' + walk(res, []).join('') + '</ul>');
      this.updateEventHandlers();
    },

    sortNodeList: function() {
      var
        filterBy = _.find($('@filter'), 'checked').value
        trg  = $("#results > ul")[0],
        frag = document.createDocumentFragment(),
        fn = frag.append.bind(frag);

      _.each($.tar(trg.children).reverse(), fn);

      trg.empty();
      trg.append(frag);
    },

    updateEventHandlers: function(trg) {
      trg = trg || $('#results');
      $('.toggle', trg).on('click', function(e) { this.dad().show() });
      $('li:not([data-children])', trg).on('dblclick', this.toggleEditMode.bind(this));
    },

    toggleEditMode: function(e) {

      var
        btnSave,
        btnCancel,
        trg = e.currentTarget,
        editMode = !trg.classList.contains('editNode');

      $('.editNode').each(function(nod) {
        nod.firstChild.remove();
        nod.lastChild.remove();
        nod.firstChild.edit(false);
        nod.lastChild.edit(false);
        nod.classList.remove('editNode');
      });

      if(!editMode) {
        return;
      }

      trg.classList.toggle('editNode');

      btnSave   = $.do('button'),
      btnCancel = $.do('button');

      $(".ico", trg).each(function(el) { el.edit(true) })
      trg.before(btnSave);
      trg.after(btnCancel);

      btnSave.classList.add('ico', 'save');
      btnCancel.classList.add('ico', 'cancel');
      trg.classList.add('editNode');
    },

    doFind: function() {

      var val = $('#search').value.trim();

      if(!val) return;
      var sort = _.find($('@filter'), 'checked').value, rgx  = 'or';

      this.lastSearch = this.search.doSearch(val, sort, rgx);
      this.showSearchResults(this.lastSearch.reverse());
    }
  }
  return Bmm;
})