const assert = require("assert");
const crypto = require("crypto");
const {parallel} = require("async");

const fs = require("fs");

describe("uloha01", function() {

  const server = require("../src/zip-server");
  const client = require("../src/zip-client");

  describe("01-Invalid parameters", function() {

    it("File does not exist", function() {
      assert(client("abcdefghijklmnopqrstuvwxyz"), "Error");
    });

    it("Directory does not exist", function() {
      assert(server("abcdefghijklmnopqrstuvwxyz"), "Error");
    });

    it("Send file as directory", function(){
      assert(server(".uloha01/test/sourceDir/barrel.bmp", "Error"));
    });
  });


  describe("02-Valid parameters", function() {
    const files = ["test.txt", "willko.bmp", "barrel.bmp"];
    const path1 = "uloha01/test/outputDir";
    const path2 = "uloha01/test/sourceDir";

    it("Files are correctly saved on server side", function() {
      files.forEach((fileName) => {
        let f1 = fs.readFileSync(`${path1}/${fileName}`);
        let f2 = fs.readFileSync(`${path2}/${fileName}`);

        let h1 = crypto.createHash('sha1').update(f1).digest().toString();
        let h2 = crypto.createHash('sha1').update(f2).digest().toString();

        assert(h1 == h2);
      })
    });
  });
});

/*
    let files = ["barrel.bmp", "test.txt", "willko.bmp"];
    let last;
    const srv = server("uloha01/test/outputDir");
    /*
    for(let i of files){
      last = client(`uloha01/test/sourceDir/${i}`);
    }
    last.on("finish", () => {
      srv.close();
    })
    async function send(filename, cb){
      client(`uloha01/test/sourceDir/${filename}`).on("finish", () => {
          return cb;
      })
    }
    parallel(
      (cb) => send("barrel.bmp"),
      (cb) => send("test.txt"),
      (cb) => send("willko.bmp"),
      () => {
        srv.close();
        let h1, h2;
        it("barrel.bmp sent correctly", function(){
          h1 = crypto.createHash('sha1').update("uloha01/test/outputDir/barrel.bmp").digest().toString();
          h2 = crypto.createHash('sha1').update("uloha01/test/sourceDir/barrel.bmp").digest().toString();
          assert(h1 == h2);
          fs.unlinkSync("uloha01/test/outputDir/barrel.bmp");
        });
        it("willko.bmp sent correctly", function(){
          h1 = crypto.createHash('sha1').update("uloha01/test/outputDir/willko.bmp").digest().toString();
          h2 = crypto.createHash('sha1').update("uloha01/test/sourceDir/willko.bmp").digest().toString();
          assert(h1 == h2);
          fs.unlinkSync("uloha01/test/outputDir/willko.bmp");
        });
        it("test.txt sent correctly", function(){
          h1 = crypto.createHash('sha1').update("uloha01/test/outputDir/test.txt").digest().toString();
          h2 = crypto.createHash('sha1').update("uloha01/test/sourceDir/test.txt").digest().toString();
          assert(h1 == h2);
          fs.unlinkSync("uloha01/test/outputDir/test.txt");
        });
      }
    )*/
