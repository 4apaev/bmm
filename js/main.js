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
      dad    = !!obj.children ? 'class="dad"' : 'class="kid col"',
      url    = !!obj.url ? obj.url : '#',
      title  = !!obj.title ? obj.title : 'no title',
      date   = new Date(parseInt(obj.dateAdded)).toLocaleDateString(),
      begin  = '<li data-date="' + date + '" ' + dad + '><a href="' + url + '">' + title + '</a>',
      finish = '</li>';

    res.push(begin);
    this.walk(obj, res);
    res.push(finish);
  },

  handleArr: function(arr, res) {
    res.push('<ul data-children="' + arr.length + '">');
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
    $('.dad > a').on('click', function(e) {
      e.preventDefault();
      e.target.dad().classList.toggle('show');
    })

    $('.search').on('change', function(e) {
      if(!e.target.value.trim()) return;
      this.doSearch(e.target.value.trim(), _.find($('.search input'), 'checked'));
    }.bind(this))

  },


  showSearchResults: function(res) {
    $(".search .results").html(this.walk(res, []).join(''));
  },

  doSearch: function(inp, opt) {
    var
       rgx = new RegExp(inp, "gi")
      ,out = _.filter(this.dump, function(v,k) { return rgx.test(k)});

    console.log(inp, opt, out);

  }
}


bmm.init(db);

// console.time('dump');
// function walk(x, res) {
//   _.each(x, function(v, k) {
//     if(_.isObject(v)) {
//       res.push(v.length ? '<ul>' : '<li>');
//       walk(v, res);
//       res.push(v.length ? '</ul>' : '</li>');
//     } else {
//       res.push('<p>' + k + ': ' + v + '</p>');
//     }
//   });
//   return res;
// }
// $("#bookmarks").html(walk(db, []).join(''))
// console.timeEnd('dump');

// .replace(/^(\s+)(["\w]+):\s([^\{\[\}\]]+?),?$/gm, '$1<i>$2</i><b>$3</b>')
//               .replace(/^(\s+)?"(\w+)":\s\[$/gm, '$1<ul data-key="$2">')
//               .replace(/^(\s+)?\{/gm, '$1<li>')
//               .replace(/^(\s+)?\},?$/gm, '$1</li>')


// function rgxJson(tree) {
//   var
//     str = JSON.stringify(tree || db, null, 2),
//     html = str.replace(/^(\s+)?(.*?)(\b|"),?$/gm, '$1<p>$2</p>')
//               .replace(/^(\s+)?"(\w+)":\s\[$/gm, '$1<ul data-key="$2">')
//               .replace(/^(\s+)?"(\w+)":\s\{$/gm, '$1<ol data-key="$2">')
//               .replace(/^(\s+)?\{$/gm, '$1<li>')
//               .replace(/^(\s+)?\[$/gm, '$1<ul>')
//               .replace(/^(\s+)?\},?$/gm, '$1</ol>')
//               .replace(/^(\s+)?\],?$/gm, '$1</ul>');
//   $("#bookmarks").html(html);
// }

// rgxJson(tmp);