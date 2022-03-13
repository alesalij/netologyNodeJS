#! /usr/bin/env node
const { Console } = require("console");
const path = require("path");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const fs = require("fs");

function q() {
  fileName = argv._[0] ? argv._[0].toString() : "default";
  fileName = fileName.includes(".txt") ? fileName : fileName + ".txt";

  fileName = path.join(__dirname, "logs", fileName);

  fs.stat(fileName, (err, stats) => {
    if (err) {
      console.log("Файл не найден");
    } else {
      fs.readFile(fileName, "utf-8", (err, data) => {
        if (err) throw new Error(err);
        data = JSON.parse("[" + data + "]");
        console.log(`Количество партий: ${data.length}`);
        win = data.reduce((a, v) => (v > 0 ? a + v : a), 0);
        winP = Math.round((win / data.length) * 10000) / 100;

        console.log(`Выигранных партий: ${win}, ${winP}%`);
        console.log(`Проигранных партий: ${data.length - win}, ${100 - winP}%`);
      });
    }
  });
}
q();
