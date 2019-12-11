const http = require("http");
const zlib = require("zlib");
const fs = require("fs");
const {pipeline} = require("stream");
const path = require("path");

let dir = process.argv[2];
let filename;
if (!fs.existsSync(dir) || !fs.lstatSync(dir).isDirectory()){
  console.log("Invalid parameter (should be valid dirpath)")
  return;
}   //if no directory chosen, store to current directory...

let server = http.createServer();

server.listen(9999, "localhost")
.on("request", (req, res) => {

  filename = req.headers["name"];           //get name of received file

  pipeline(                                 //store initial file to specified directory
    req,
    fs.createWriteStream(`${dir}/${filename}`),
    (err) => {
      if(err){
        console.log("Error");
      }
      else{
        console.log(`File stored to ${dir}/${filename}`)
      }
    }
  )

  pipeline(                                //zip received file and send it back to client
    req,
    zlib.createGzip(),
    res,
    (err) =>{
      if(err){
        console.log("Error");
      }
      else{
        console.log(`${filename}.gz sent...`);
      }
    }
  )
})
