const fs = require("fs").promises;
const path = require("path")

module.exports = lsRescursive

async function lsRescursive(dirName){
  let daco = await ls(dirName)
  let dirs = dirsOnly(daco);
  dirs = dirs.map(({ name }) => name).map(name => path.resolve(dirName, name)).map(ls);
  let files = await Promise.all(dirs);
  files = [].concat(...files);  //files.flat(Infinity)
  let filOn = filesOnly(files);
  return filOn.map(({ name }) => name);
}

async function ls(dirName) {      //moze byt async, ale nemusi
  return fs.readdir(dirName, {
    withFileTypes: true
  });
}

function dirsOnly(files) {
  return files.filter((f) => f.isDirectory());
}

function filesOnly(files) {
  return files.filter((f) => f.isFile());
}
