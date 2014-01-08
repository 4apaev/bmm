define('modules/Bmm', [], function () {


  var
    toType = function(x) {
      return {}['toString'].call(x).match(/\s(\w+)/)[1];
    }
    is = function(what, x) {
      return new RegExp(what, "i").test(toType(x))
    };

  function Bmm(dump, search) {
    this.dump = dump;
    this.search = search;
  }

  Bmm.prototype = {
    getNodeHtml: function(node) {
      var  klass = 'ico'
          ,title = node.title || "no title"
          ,data  = 'data-dir="' + node.parentId + '-' + node.id + '"';
      if(node.children) {
        klass += ' toggle';
        title += " - " + node.children.length;
        data  += ' data-children="' + node.children.length + '"';
      }
      return '<li ' + data + '><b class="' + klass + '" >' + title + '</b>' + (node.url ? '<q class="ico link">' + node.url + '</q>' : '' );
    },

    walk : function(x, res) {

      _.each(x, function(node) {
        if(typeof node !== 'object' || node.length && node.length < 1) {
          return;
        }
        var htm = node.length ? ['<ul>', '</ul>'] : [this.getNodeHtml(node), '</li>'];
        res.push(htm[0]);
        this.walk(node, res);
        res.push(htm[1]);
      }, this);
      return res;
    },

    init : function(tree) {
      tms('dump');
      var trg = $('#bookmarks');
      trg.addhtml(this.walk(tree || this.dump, []).join(''));

      $('#search').on('change', this.doFind.bind(this));
      $('.find').on('click', this.doFind.bind(this));
      $('.sort').on('click', this.sortNodeList.bind(this));

      this.updateEventHandlers(trg);
      tme('dump');
      // this.showSearchResults(this.search.index);
    },

    showSearchResults: function(res) {
      $("#results").html('<ul>' + this.walk(res, []).join('') + '</ul>');
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