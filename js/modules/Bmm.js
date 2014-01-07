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
      console.time('dump');
      $("#bookmarks").addhtml(this.walk(tree || this.dump, []).join(''));
      console.timeEnd('dump');
      this.updateEventHandlers('all');
      this.lastSearch = this.search.format(0, 'host', 1);
      this.showSearchResults()
    },

    showSearchResults: function(res) {
      res = res || this.lastSearch
      $("#results").html('<ul>' + this.walk(res, []).join('') + '</ul>');
      this.updateEventHandlers();
    },

    updateEventHandlers: function(all) {
      var selector = all ? '.bmm ' : '#results ';
      $(selector + 'li[data-children] > b').on('click', function(e) {e.target.dad().classList.toggle('show')});
      $(selector + 'li').on('dblclick', this.editNode.bind(this));
      if(!all) return
      $('.find').on('change', this.doFind.bind(this));
      $('.find').on('click', this.doFind.bind(this));
      $('.sort').on('click', this.reverseList.bind(this));
    },

    editNode: function(e) {
      e.target.contentEditable = true
      var btn = $.do('button');
      btn.classList.add('ico', 'save');
      e.target.appendChild(btn);
    },

    reverseList: function(e) {
      this.showSearchResults(this.lastSearch.reverse());
    },

    getFilterKey: function(type) {
      return _.find($('.' + type + ' input'), 'checked').value
    },

    doFind: function() {
      console.log('obj');
      var val = $('#search').value.trim();
      if(!val) return;
      var sort = this.getFilterKey('filter'),
          rgx  = 'or';

      this.lastSearch = this.search.doSearch(val, sort, rgx);
      this.showSearchResults(this.lastSearch.reverse());
    }
  }
  return Bmm;
})