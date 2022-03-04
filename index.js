#! /usr/bin/env node
const { Console } = require("console");
const readline = require("readline");
const input = readline.createInterface(process.stdin, process.stdout);

const quest = function (q) {
  return new Promise((resolve, reject) => {
    input.question(q, (ans) => {
      resolve(ans);
    });
  });
};

async function q() {
  let min = Math.floor(Math.random() * 100);
  let max = Math.floor(Math.random() * 100);
  if (max < min) {
    max += min;
    min = max - min;
    max = max - min;
  }
  let makeUpNumber = Math.floor(Math.random() * (max - min)) + min;
  console.log(`Загадано число в диапазоне от ${min} до ${max}`);
  do {
    ans1 = await quest("");
    if (ans1 < makeUpNumber) console.log("Больше");
    else if (ans1 > makeUpNumber) console.log("Меньше");
  } while (ans1 != makeUpNumber);
  console.log(`Вы выиграли, загаданное число ${makeUpNumber}`);
  input.close();
}
q();
