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
      dad    = !!obj.children ? 'class="dad"' : 'class="kid"',
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
       fullurl  = matches[0]
      ,protocol = matches[1]
      ,host     = matches[2]
      ,path     = matches[3]
    }
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

    $('#search input').on('change', function(e) {
      console.log(e.target.value);
      var rgx = new RegExp(e.target.value, "gi");
      var o = _.filter(this.dump, function(v,k) { return rgx.test(k)})
      $("#bookmarks").html(this.walk(o, []).join(''));
    }.bind(this))
    // $0.css({'position':'absolute',left:$0.offsetLeft+'px',top:$0.offsetTop+'px',height:$0.offsetHeight*2+'px',width:$0.offsetWidth*2+'px'})
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