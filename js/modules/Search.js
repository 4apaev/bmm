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
      var matches = url.match(/(\w+):\/\/([\w.]+)\/(\S*)/);
      return !!matches ? {
         fullurl  : matches[0]
        ,protocol : matches[1]
        ,host     : matches[2]
        ,path     : matches[3]
      } : 'no matches';
    },

    getSerachMethod: function(key) {
      // /(date|parentId)/.test(key)


      // var self = this;

      // actions = {
      //   date: function(node) {
      //     return self.parseDate(node.dateAdded);
      //   },
      //   parentId: function(node) {
      //     return self.parseDate(node.parentId);
      //   }
      //   fullurl : function(node) {return self.parseUrl(node.url)[key]}
      //   protocol : function(node) {return self.parseUrl(node.url)[key]}
      //   host : function(node) {return self.parseUrl(node.url)[key]}
      //   path : function(node) {return self.parseUrl(node.url)[key]}
      // }


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
        return rgx.test(path) || rgx.test(node.url);
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