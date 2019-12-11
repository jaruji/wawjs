const server = require("../src/zip-server");
const client = require("../src/zip-client");

const fs = require("fs");
const http = require("http");
const {pipeline} = require("stream");
const path = require("path");
const zlib = require("zlib");


server("./outputDir");

client("./sourceDir/test.txt");

client("./sourceDir/barrel.bmp");

client("./sourceDir/barrel.obj");

client("./sourceDir/willko.bmp");
