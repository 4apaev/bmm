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
    this.dump = dump[0].children;
    tms('dump')
    this.init();
    tme('dump')
  }

  Bmm.prototype = {

    init : function(tree) {

      var
        trg    = $.doqi('bookmarks'),
        search = $.doqi('search'),
        htm = walk(tree || this.dump, []);


      trg.html('<ol class="tree">' + htm.join('') + '</ol>');

      search.on('change', this.doFind.bind(this));

      // $('.bmm button').on('click', function(e) {
      //   var id = e.currentTarget.parentElement.id.split('-').pop();
      //   chrome.bookmarks.get(id, function(node) {
      //       var popup = document.getElementById('editPopup');
      //       popup.querySelector('.title').value = node[0].title;
      //       popup.querySelector('.url').value = node[0].url;
      //   })
      // });

    },

    // updateEventHandlers: function(trg) {
    //   trg = trg || $.doqi('results');
    //   $.doqa('li:not([data-children]', trg).on('dblclick', this.toggleEditMode.bind(this));
    // },

    showSearchResults: function(res) {
      log(res)
      $.doqi('stage').html('<ol class="tree">' + walk(res, []).join('') + '</ol>');
      // this.updateEventHandlers();
    },

    sortNodeList: function() {
      var
        filterBy = _.find($.doqn('filter'), 'checked').value
        trg  = $.dq("#stage .tree"),
        frag = document.createDocumentFragment(),
        fn = frag.append.bind(frag);

      _.each($.tar(trg.children).reverse(), fn);

      trg.empty();
      trg.append(frag);
    },

    // toggleEditMode: function(e) {

    //   var
    //     btnSave,
    //     btnCancel,
    //     trg = e.currentTarget,
    //     editMode = !trg.classList.contains('editNode');

    //   $.doqc('editNode').each(function(nod) {
    //     nod.firstChild.remove();
    //     nod.lastChild.remove();
    //     nod.firstChild.edit(false);
    //     nod.lastChild.edit(false);
    //     nod.classList.remove('editNode');
    //   });

    //   if(!editMode) {
    //     return;
    //   }

    //   trg.classList.toggle('editNode');

    //   btnSave   = $.do('button'),
    //   btnCancel = $.do('button');

    //   $.doqa("label, q", trg).each(function(el) { el.edit(true) })

    //   trg.before(btnSave);
    //   trg.after(btnCancel);

    //   btnSave.classList.add('ico', 'save');
    //   btnCancel.classList.add('ico', 'cancel');
    //   trg.classList.add('editNode');

    //   btnCancel.on('click', this.onRemoveBtnClick.bind(this));
    // },

    // onRemoveBtnClick: function(e) {

    //   var
    //       btn = e.currentTarget,
    //       dad = e.currentTarget.dad(),
    //       ids = dad.dataset.dir.split('-'),
    //       del = btn.classList.contains('remove')
    //       self = this;

    //   if(del) {

    //     chrome.bookmarks.remove(ids[1], function() {
    //       $('.bmm li[data-dir="' + dad.dataset.dir + '"]').each(function(li) {
    //         log(li);
    //         li.remove();
    //       });
    //     });

    //   } else {

    //     chrome.bookmarks.get(ids[1], function(bmmNode) {
    //       var twin = $('#bookmarks li[data-dir="' + dad.dataset.dir + '"]')[0];
    //       twin.scrollIntoView();
    //       twin.style.backgroundColor = "crimson";
    //       dad.style.backgroundColor = "crimson";
    //       btn.style.width = "auto";
    //       btn.txt("are you shure?");
    //       btn.classList.add('remove');
    //       marko(twin.parentElement.parentElement);
    //     });
    //   }
    // },

    doFind: function() {
      var
        sort,
        val = $.doqi('search').value.trim();
      if(!val) return;

      chrome.bookmarks.search(val, this.showSearchResults.bind(this));
    }
  }
  return Bmm;
});