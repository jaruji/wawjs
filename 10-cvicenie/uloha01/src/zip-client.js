const fs = require("fs");
const http = require("http");
const {pipeline} = require("stream");
const path = require("path");

let filepath = process.argv[2];
filepath === undefined ? process.exit(1) : console.log(`Sending ${filepath} to server...`)  //if no file selected, exit process...

let filename = path.basename(filepath)
let url = "http://localhost:9999"
let request = http.request(url, {
  method: "POST"
});

request.setHeader("name", filename);

pipeline(
  fs.createReadStream(filepath),
  request,
  (err) => {
    if(err){
      console.log("Error during reading file...");
    }
    else{
      console.log("File successfuly sent");
    }
  }
)

request.on("response", (res) => {
  let dir = path.dirname(filepath)
  pipeline(
    res,
    fs.createWriteStream(`${dir}/${filename}.gz`),       //store zipped file to the same directory as initial file...
    err => {
      if(err){
        console.log("Error");
      }
      else{
        console.log(`Zipped file stored to ${dir}/${filename}.gz :-)`);
      }
    }
  )
});
