define('modules/Bmm', ['modules/walk', 'modules/Search'], function (walk, Search) {

  function Bmm(dump, search) {
    this.search = new Search(dump);
    tms('dump');
    this.init(walk(dump, []).join(''));
    tme('dump');
  }

  Bmm.prototype = {

    init : function(tree) {

      var trg = $.doqi('bookmarks');
      trg.addhtml(tree);

      $.doqi('search').on('change', this.doFind.bind(this));
      $.doqc('find').on('click', this.doFind.bind(this));
      $.doqc('sort').on('click', this.sortNodeList.bind(this));

      // $.doqa('li[data-children] > label', trg).on('dblclick', function(e) {
      //   e.currentTarget.edit(!e.currentTarget.hasAttribute('contenteditable'));
      // });

      this.updateEventHandlers(trg);
    },

    updateEventHandlers: function(trg) {
      trg = trg || $.doqi('results');
      $.doqa('li:not([data-children]', trg).on('dblclick', this.toggleEditMode.bind(this));
    },

    showSearchResults: function(res) {
      $.doqi('results').html('<ul>' + walk(res, []).join('') + '</ul>');
      this.updateEventHandlers();
    },

    sortNodeList: function() {
      var
        filterBy = _.find($.doqn('filter'), 'checked').value
        trg  = $.dq("#results > ul"),
        frag = document.createDocumentFragment(),
        fn = frag.append.bind(frag);

      _.each($.tar(trg.children).reverse(), fn);

      trg.empty();
      trg.append(frag);
    },

    toggleEditMode: function(e) {

      var
        btnSave,
        btnCancel,
        trg = e.currentTarget,
        editMode = !trg.classList.contains('editNode');

      $.doqc('editNode').each(function(nod) {
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

      $.doqa("label, q", trg).each(function(el) { el.edit(true) })
      trg.before(btnSave);
      trg.after(btnCancel);

      btnSave.classList.add('ico', 'save');
      btnCancel.classList.add('ico', 'cancel');
      trg.classList.add('editNode');
    },

    doFind: function() {

      var val = $.doqi('search').value.trim();

      if(!val) return;
      var sort = _.find($.doqn('filter'), 'checked').value, rgx  = 'or';

      this.lastSearch = this.search.doSearch(val, sort, rgx);
      this.showSearchResults(this.lastSearch.reverse());
    }
  }
  return Bmm;
})