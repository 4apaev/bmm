define('modules/Search', [], function () {

  function Search(tree) {
    this.index = this.flattenTree(tree, {});
    return this;
  }

  Search.prototype = {

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

    parseDate : function(dateStr) {
      return new Date(parseInt(dateStr, 10)).toLocaleDateString();
    },

    parseUrl : function(url) {
      // _.object('url,protocol,host,path'.split(','), $0.lastChild.txt().match(/(\w+):\/\/([\w.]+)\/(\S*)/))
      var matches = url.match(/(\w+):\/\/([\w.]+)\/(\S*)/);
      return !!matches ? {
         fullurl  : matches[0]
        ,protocol : matches[1]
        ,host     : matches[2]
        ,path     : matches[3]
      } : 'no matches';
    },
    getSerachMethod: function(key) {
      return (key === 'date') ? function(node) {
        return this.parseDate(node.dateAdded);
      } : function(node) {
        return this.parseUrl(node.url)[key];
      }
    },

    getRegex: function(str, flag) {
      var escaped = str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      return new RegExp(escaped.split(' ').join(flag === 'or' ? '|' : '.*'), "gi");
    },

    filterByRgx: function(rgx) {
      return _.filter(this.index, function(node, path) {
        return rgx.test(node.title) || rgx.test(node.url);
      });
    },

    formatResults: function(group, key) {
      return (group.length !== 1) ? { title:key, children: group } : group[0];
    },

    format: function(arr, key, group) {
      var
        index = arr || this.index,
        method = this.getSerachMethod(key);

      if(!group) return _.sortBy(index, method, this);

      return _.chain(index)
              .groupBy(method, this)
              .map(this.formatResults)
              .sortBy(function(node){
                return node.children ? node.children.length : 0;
              }).__wrapped__;
    },

    doSearch: function(str, sortKey, flag) {
      var
        rgx = this.getRegex(str, flag),
        results  = this.filterByRgx(rgx);
      return this.format(results, sortKey, 1);
    }
  }
  return Search;
});