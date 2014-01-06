define('modules/Bmm', [], function () {

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

    isBadNode: function(node) {
      return (typeof node !== 'object' || (node.length && node.length < 1))
    },

    walk : function(x, res) {
      _.each(x, function(node) {
        if(this.isBadNode(node)) return;
        var htm = node.length ? ['<ul>', '</ul>'] : [this.getNodeHtml(node), '</li>'];
        res.push(htm[0]);
        this.walk(node, res);
        res.push(htm[1]);
      }, this);
      return res;
    },

    init : function(tree) {
      $("#bookmarks").addhtml(this.walk(tree || this.dump, []).join(''));

      $('li[data-children] > b').on('click', this.toggleize);
      $('.find').on('click', this.doFind.bind(this));
      $('.find').on('change', this.doFind.bind(this));
      this.showSearchResults(this.search.format(0, 'host', 1))
    },

    showSearchResults: function(res) {
      this.lastSearch = res;
      $("#results").html('<ul>' + this.walk(res, []).join('') + '</ul>');
      $('#results li[data-children] > b').on('click', this.toggleize);
      $('#results li').on('dblclick', this.editNode);
    },

    toggleize: function(e) {
      e.preventDefault();
      e.target.dad().classList.toggle('show');
    },

    editNode: function(e) {
      e.target.contentEditable = true
      var btn = $.do('button');
      btn.classList.add('ico', 'save');
      e.target.appendChild(btn);
    },

    doFind: function() {
      console.log('obj');
      var val = $('#search').value.trim();
      if(!val) return;
      var sort = _.find($('.filter input[name="filter"]'), 'checked').value,
          rgx  = _.find($('.search input[name="rgx"]'), 'checked').value;
      this.showSearchResults(this.search.doSearch(val, sort, rgx));
    }
  }
  return Bmm;
})