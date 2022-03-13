#! /usr/bin/env node
const { Console } = require("console");
const readline = require("readline");
const input = readline.createInterface(process.stdin, process.stdout);
const path = require("path");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const fs = require("fs");

const quest = function (q) {
  return new Promise((resolve, reject) => {
    input.question(q, (ans) => {
      resolve(ans);
    });
  });
};

async function q() {
  let makeUpNumber = Math.round(Math.random());

  console.log(`Загадано число в 0 или 1`);
  result = "0";
  ans1 = await quest("Введите ваш ответ: ");
  if (ans1 == makeUpNumber) {
    console.log("Вы выиграли");
    result = "1";
  } else {
    console.log("Вы проиграли");
  }

  input.close();

  fileName = argv._[0] ? argv._[0].toString() : "default";
  fileName = fileName.includes(".txt") ? fileName : fileName + ".txt";
  fs.stat(path.join(__dirname, "logs"), (err, stat) => {
    if (err) {
      fs.mkdir(path.join(__dirname, "logs"), () => {});
    }
  });

  fileName = path.join(__dirname, "logs", fileName);

  fs.stat(fileName, (err, stats) => {
    if (err) {
      fs.writeFile(fileName, result, () => {});
    } else {
      fs.appendFile(fileName, "," + result, () => {});
    }
  });
}
q();
