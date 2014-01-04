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
      kids   = !!obj.children ? obj.children.length : 0
      mark   = !!kids ? 'class="bmdir" data-children="' + kids + '"' : 'class="bmark"',
      url    = !!obj.url ? obj.url : '#',
      title  = !!obj.title ? obj.title : 'no title';

    res.push('<li ' + mark  + '><a class="ico" href="' + url + '">' + title + (!!kids ? ' - ' + kids : '') + '</a>');
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

  parseDate : function(dateStr) {
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

    var fn = this.doFind.bind(this);
    $('#search').on('change', fn);
    $('.find').on('click', fn);
  },

  showSearchResults: function(res) {
    $(".results").html('<ul>' + this.walk(res, []).join('') + '</ul>');
    $('.results .bmdir > a').on('click', function(e) {
      e.preventDefault();
      e.target.dad().classList.toggle('show');
    })
  },

  doFind: function() {
    var val = $('#search').value.trim();
    if(!val) return;
    var
      sort = _.find($('.sort input[name="sort"]'), 'checked').value,
      rgx  = _.find($('.search input[name="rgx"]'), 'checked').value;
    this.doSearch(val, sort, rgx);
  },


  getSerachMethod: function(key) {
    return (key === 'date') ? function(node) {
      return this.parseDate(node.dateAdded);
    } : function(node) {
      return this.parseUrl(node.url)[key];
    }
  },

  doSearch: function(inp, sortKey, opt) {
    console.log(sortKey, opt);
    var
       rgx = new RegExp(inp, "gi")
      ,res = _.chain(this.dump)
              .filter(function(node, path) { return rgx.test(path)})
              .groupBy(this.getSerachMethod(sortKey), this)
              .map(function( group, key ) { return group.length > 1 ? { title:key, children: group } : group[0] })


    console.log(res);
    this.showSearchResults(res);
  }
}

bmm.init(db);