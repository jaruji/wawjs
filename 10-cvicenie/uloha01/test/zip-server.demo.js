const server = require("../src/zip-server");
const client = require("../src/zip-client");

const srv = server("./outputDir");

//demo zipping sample files....

client("./sourceDir/test.txt");

client("./sourceDir/barrel.bmp");

client("./sourceDir/barrel.obj");

client("./sourceDir/willko.bmp").on("finish", () =>{
  srv.close();
})
