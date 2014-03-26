// github-delete-cache

'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

function run() {
  var dir = path.resolve(process.env.LocalAppData, 'GitHub');
  var end = false;
  scanDir(dir);

  function scanDir(dir) {
    if (end) return;
    //console.log(dir);

    var dirs = fs.readdirSync(dir);
    dirs.forEach(function (name) {
      if (end) return;

      var file = path.resolve(dir, name);
      var stat = fs.statSync(file);
      //if (stat.isDirectory()) {
      //  scanDir(file);
      //} else 
      if (stat.isFile()) {
        if (name.match(/^GitHub\.appref-ms/i)) {
          end = true;
          console.log(file);
          var proc = spawn('cmd', ['/c', file, '--delete-cache']);
        }
      }
    }); // dirs.forEach
  } // scanDir
} // run

exports = module.exports = run;
