define('modules/Flat', [], function() {

  function Flat(tree) {
    this.tree = tree[0].children;
  }

  Flat.prototype = {

    init: function(tree) {
      tree = tree || this.tree;
      this.index = this.dump(tree,{},'');
    },

    dump: function(x, obj, path) {
      _.each(x, function(val, key) {
        if(val instanceof Object) {
          this.dump(val, obj, path.concat('_').concat(key));
        } else{
          obj[path] ? obj[path][key] = val : obj[path] = _.object([key],[val]);
        }
      }, this);
      return obj;
    },

    reverse: function() {
      _.reduce(this.index, function(r,v,k) {

        r[k] =
      })
    },

    getDuplicates: function() {
      var
        arr = _.toArray(this.index),
        unq = _.uniq(arr, 'url')
        dif = _.difference(arr, unq)
        dups = _.filter(dif, function(v) { return !!v.url});

      return {
        unq  : unq,
        dif  : dif,
        dups : dups
      }
    },

    filterBy:function(what) {
      var fns = {
        path: function(node, key, obj) {
          return key.split('_').slice(0,-1).join('_');
        },
        parentId: function(node, key, obj) {
          return node.parentId;
        },
        url: function(node, key, obj) {
          if(!node.url) return;
          var match = node.url.match(/(\w+):\/\/([\w.]+)\/(\S*)/);
          return match ? match[2] : match;
        }
      }
      return _.groupBy(this.index, fns[what]);
    }


  }

  return Flat;
})

