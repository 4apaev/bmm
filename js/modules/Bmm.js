define('modules/Bmm', ['modules/walk', 'modules/Search'], function (walk, Search) {


  var marko = function (child) {
    var btn = child.firstElementChild;
    if(btn && btn.classList.contains('toggle') && !btn.checked) {
      btn.click();
      return marko(child.parentElement.parentElement);
    } else {
      return;
    }
  }

  function Bmm(dump, search) {
    this.search = new Search(dump);
    this.init(walk(dump, []).join(''));
  }

  Bmm.prototype = {

    init : function(tree) {

      var
        trg    = $.doqi('bookmarks'),
        search = $.doqi('search'),
        find   = $.doqc('find');

      trg.addhtml(tree);

      search.on('change', this.doFind.bind(this));
      find.on('click', this.doFind.bind(this));
      $.doqc('sort').on('click', this.sortNodeList.bind(this));
      $.doqc('find').on('click', this.doFind.bind(this));

      this.updateEventHandlers(trg);

      // var emptyDirs = $('#bookmarks li[data-children="0"]');
      // emptyDirs.each(function(node) {
      //   node.style.backgroundColor = "crimson";
      //   marko(node);
      // });
      // log(emptyDirs);

      // $.doqi('results').html('<ul>' + walk(res, []).join('') + '</ul>');
      // this.updateEventHandlers();

      // search.value = "flash";
      // find[0].click();
    },

    showEmpty: function(trg) {

      $.dq("#results").html('<ul class="empty"></ul>');

      var
        trg  = $.dq("#results > ul"),
        frag = document.createDocumentFragment();

      $('#bookmarks li[data-children="0"]').each(frag.append.bind(frag));
      trg.append(frag);
    },

    updateEventHandlers: function(trg) {
      trg = trg || $.doqi('results');
      $.doqa('li:not([data-children]', trg).on('dblclick', this.toggleEditMode.bind(this));
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

      btnCancel.on('click', this.onRemoveBtnClick.bind(this));
    },

    onRemoveBtnClick: function(e) {

      var
          btn = e.currentTarget,
          dad = e.currentTarget.dad(),
          ids = dad.dataset.dir.split('-'),
          del = btn.classList.contains('remove')
          self = this;

      if(del) {

        chrome.bookmarks.remove(ids[1], function() {
          $('.bmm li[data-dir="' + dad.dataset.dir + '"]').each(function(li) {
            log(li);
            li.remove();
          });
        });

      } else {

        chrome.bookmarks.get(ids[1], function(bmmNode) {

          var twin = $('#bookmarks li[data-dir="' + dad.dataset.dir + '"]')[0];
          twin.scrollIntoView();
          twin.style.backgroundColor = "crimson";
          dad.style.backgroundColor = "crimson";
          btn.style.width = "auto";

          btn.txt("are you shure?");
          btn.classList.add('remove');

          marko(twin.parentElement.parentElement);

        });
      }
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


// var path = [];

// var el = document.getElementById('myNode');




// do {
//     path.unshift(el.nodeName + (el.dataset.dir ? ' data-dir="' + el.dataset.dir + '"' : ''));

// } while ((el.nodeName.toLowerCase() != 'html') && (el = el.parentNode));

// function nodePath(x, res) {


//     return res;
//   }


