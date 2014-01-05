define('modules/Bmm', [], function () {

  function Bmm(dump, search) {
    this.dump = dump;
    this.search = search;
  }

  Bmm.prototype = {

    handleObj: function(obj, res) {
      var
        kids   = !!obj.children ? obj.children.length : 0
        mark   = !!kids ? 'class="bmdir" data-children="' + kids + '"' : 'class="bmark"',
        url    = !!obj.url ? obj.url : '#',
        title  = !!obj.title ? obj.title : 'no title';

      res.push('<li ' + mark  + '><a class="ico" href="' + url + '">' + title + (!!kids ? ' - ' + kids : '') + '</a>');
      this.walk(obj, res);
      res.push('</li>');
    },

    handleArr: function(arr, res) {
      if(arr.length === 0) return;
      res.push('<ul>');
      this.walk(arr, res);
      res.push('</ul>');
    },

    walk : function(x, res) {
      _.each(x, function(v, k) {
        if(_.isObject(v)) {
          this[_.isPlainObject(v) ? 'handleObj' : 'handleArr'](v, res);
        }
      }, this);
      return res;
    },

    init : function() {
      $("#bookmarks").html(this.walk(this.dump, []).join(''));
      $('.bmdir > a').on('click', this.toggleize);
      $('.find').on('click', this.doFind.bind(this));
    },

    showSearchResults: function(res) {
      $(".results").html('<ul>' + this.walk(res, []).join('') + '</ul>');
      $('.results .bmdir > a').on('click', this.toggleize);
    },

    toggleize: function(e) {
      e.preventDefault();
      e.target.dad().classList.toggle('show');
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