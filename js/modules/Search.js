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
      return (key === 'date') ? function(node) {
        return this.parseDate(node.dateAdded);
      } : function(node) {
        return this.parseUrl(node.url)[key];
      }
    },

    getRegex: function(str) {
      var escaped = str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      return new RegExp(escaped, "gi");
    },

    filterByRgx: function(str) {
      var rgx = this.getRegex(str);
      return _.filter(this.index, function(node, path) {
        return rgx.test(path) || rgx.test(node.url);
      });
    },

    formatResults: function(group, key) {
      return {
        title:key,
        children: group
      }
    },

    format: function(key, group) {
      var res = group ? _.groupBy(this.index, this.getSerachMethod(key), this) : _.sortBy(this.index, this.getSerachMethod(key), this);
      return group ? _.sortBy(_.map(res, this.formatResults), function(node){
        return node.children.length;
      }) : res;

    },

    doSearch: function(str, sortKey, opt) {
      var results  = this.filterByRgx(str);
      var grouped  = _.groupBy(results, this.getSerachMethod(sortKey), this);
      var formated = _.map(grouped, this.formatResults);

      return formated;
    }
  }
  return Search;
});