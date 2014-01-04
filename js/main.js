var log = console.log.bind(console);
var  bmm = {

  flattenTree : function(x, res, path) {
    if(x.children) {
      _.each(x.children, function(v, k) {
        this.flattenTree(v, res, path ? path + ' > ' + v.title : v.title)
      }, this);
    } else {
      res[path] = x;
    }
    return res;
  },

  handleObj: function(obj, res) {
    var
      mark   = !!obj.children ? 'class="bmdir" data-children="' + obj.children.length + '"' : 'class="bmark"',
      url    = !!obj.url ? obj.url : '#',
      title  = !!obj.title ? obj.title : 'no title';

    res.push('<li ' + mark  + '><a class="ico" href="' + url + '">' + title + '</a>');
    this.walk(obj, res);
    res.push('</li>');
  },

  handleArr: function(arr, res) {
    if(arr.length < 1) return;
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

  parseUrl : function(dateStr) {
    return new Date(parseInt(dateStr, 10)).toLocaleDateString();
  },

  parseUrl : function(url) {
    var matches = url.match(/(\w+):\/\/([\w.]+)\/(\S*)/);
    return !!matches ? {
       fullurl  : matches[0]
      ,protocol : matches[1]
      ,host     : matches[2]
      ,path     : matches[3]
    } : 'no matches';
  },

  init : function(tree) {
    console.time('dump');
    this.origin = db;
    this.dump = this.flattenTree(this.origin, {});
    $("#bookmarks").html(this.walk(this.origin, []).join(''));
    this.doSome();
    console.timeEnd('dump');
  },

  doSome: function() {
    $('.bmdir > a').on('click', function(e) {
      e.preventDefault();
      e.target.dad().classList.toggle('show');
    })

    $('#search').on('change', function(e) {
      if(!e.target.value.trim()) return;
      this.doSearch(e.target.value.trim(), _.find($('.search .btn-group input'), 'checked'));
    }.bind(this))

  },

  // showSearchResults: function(res) {
  //   $(".search .results").html(this.walk(res, []).join(''));
  // },

  doSearch: function(inp, opt) {
    var
       rgx = new RegExp(inp, "gi")
      ,out = _.filter(this.dump, function(v,k) { return rgx.test(k)});

    console.log(inp, opt, out);

  }
}

bmm.init(db);