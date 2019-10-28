module.exports = writeTempFile;

const fs = require("fs");
const os = require("os");
const path = require("path");
const async = require("async");

function writeTempFile(fileName, ...args /* data, options, callback*/ ) {
  let cb = args.pop();

  async.waterfall([
    () => {
      let tempDir = path.join(os.tmpdir(), `${process.pid}-`);
      fs.mkdtemp(tempDir, (err, folder) => {
    },
    () => {
      // task 2
    }
  ], cb);
}
