const fs = require("fs");
const http = require("http");
const {pipeline} = require("stream");
const path = require("path");

module.exports = client;

function client(pathh){

  let filepath;
  if(!pathh)
    filepath = process.argv[2];
  else
    filepath = pathh;

  //console.log(filepath);
                                                  //check if file exists and is valid...
  if (!fs.existsSync(filepath) || !fs.lstatSync(filepath).isFile()){
    //console.log("'Client error': Invalid parameter (should be valid filepath)")
    return "Error";
  }

  //filepath === undefined ? process.exit(1) : console.log(`Sending ${filepath} to server...`)  //if no file selected, exit process...
  let filename = path.basename(filepath)
  console.log(`Sending ${filename} to server...`)
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
        console.log("Error...");
      }
      else{
        console.log("File successfuly sent");
      }
    }
  )

  request.on("response", (res) => {
    pipeline(
      res,
      fs.createWriteStream(`${filepath}.gz`),       //store zipped file to the same directory as initial file...
      err => {
        if(err){
          console.log("Error");
          fs.unlinkSync(`${filepath}.gz`);         //delete file if error occured
          return;
        }
        else{
          console.log(`Zipped file stored to ${filepath}.gz :-)`);
        }
      }
    )
  });
  return request;
}

client(); //for cmd functionality
