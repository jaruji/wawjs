 const async = require("async");
 const fs = require("fs");
 module.exports = saveSomewhere;

 function saveSomewhere(paths, data, cb) {
   const tasks = gg.split();
   async.tryEach([
     () => {
       fs.write(paths, data, (err, path) => {

       })
     }
     () => {

     }
   ], cb);
 }
