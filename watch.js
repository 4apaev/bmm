#!/usr/bin/env node
var
   fs     = require('fs')
  ,path   = require('path')
  ,exec   = require('child_process').exec
  ,colors = require('colors');

(function(dirs) {
  var watcher = {
    jade: function () {
      return 'jade -P views/index.jade -o .';
    },

    styl: function() {
      return 'stylus -c styles/main.styl -o css/';
    },

    cpDone: function (err, stdout, stderr) {
      // if (err) throw err

      var date = new Date().toTimeString().split(' ').shift();

      if (err) {
        console.log(date.red);
        console.log(String(err).grey);
        return;
      }

      console.log(new Date().toTimeString().split(' ').shift().green, stdout);
    },

    doCompile: function(evnt, file, dir) {
      var ext = path.extname(file).slice(1);
      if(typeof this[ext] === "function") {
        exec(this[ext](path.join(dir, file)), this.cpDone);
      }
    },

    doWatch: function(dirs) {
      var fn = this.doCompile.bind(this);
      dirs.forEach(function(dir) {
        fs.watch(dir, function(evnt, file) { fn(evnt, file,dir) })
      });
    }

  }["doWatch"](dirs);

}(process.argv.slice(2)));