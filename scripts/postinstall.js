const path = require('path');
const cp = require('child_process');
const fs = require('fs');

const target = path.resolve(__dirname, '../');
const link = path.resolve(__dirname, '../', 'node_modules', '_');
fs.stat(link, function(err, stat) {
  if (err && err.code == 'ENOENT') {
    if (/^win/.test(process.platform)) {
      console.log(`MKLINK /J "${link}" "${target}"`);
      cp.exec(`MKLINK /J "${link}" "${target}"`);
    } else {
      console.log(`ln -s ${target} ${link}`);
      cp.exec(`ln -s ${target} ${link}`);
    }
  }
});
