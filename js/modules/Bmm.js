define('modules/Bmm', [], function () {

  function Bmm(dump, search) {
    this.dump = dump;
    this.search = search;
  }

  Bmm.prototype = {
    getNodeHtml: function(node) {
      var  url   = node.url || '#'
          ,klass = 'ico'
          ,title = node.title || "no title"
          ,data  = 'data-dir="' + node.parentId + '-' + node.id + '"';
      if(node.children) {
        klass += ' toggle';
        title += " - " + node.children.length;
        data  += ' data-children="' + node.children.length + '"';
      }
      return '<li ' + data + '><a class="' + klass + '" href="' + url + '">' + title + '</a>';
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
      $("#bookmarks").html(this.walk(tree || this.dump, []).join(''));
      $('li[data-children] > a').on('click', this.toggleize);
      $('.find').on('click', this.doFind.bind(this));
    },

    showSearchResults: function(res) {
      $("#results").html('<ul>' + this.walk(res, []).join('') + '</ul>');
      $('#results li[data-children] > a').on('click', this.toggleize);
      $('#results li:not([data-children])').on('dblclick', this.editNode);
    },

    toggleize: function(e) {
      e.preventDefault();
      e.target.dad().classList.toggle('show');
    },

    editNode: function(e) {
      var tools = $('#tools');
      tools.style.top = e.x + 'px';
      tools.style.left = e.y + 'px';
    },



    doFind: function() {
      var val = $('#search').value.trim();
      if(!val) return;
      var sort = _.find($('.sort input[name="sort"]'), 'checked').value,
          rgx  = _.find($('.search input[name="rgx"]'), 'checked').value;
      this.showSearchResults(this.search.doSearch(val, sort, rgx));
    }
  }
  return Bmm;
})