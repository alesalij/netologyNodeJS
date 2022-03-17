#! /usr/bin/env node
const { Console } = require("console");
const readline = require("readline");
const input = readline.createInterface(process.stdin, process.stdout);
const path = require("path");
const http = require("http");
const myAPIKey = process.env.myAPIKey;
const url = process.env.url;

const quest = function (q) {
  return new Promise((resolve, reject) => {
    input.question(q, (ans) => {
      resolve(ans);
    });
  });
};

async function q() {
  ans = await quest("Введите название города: ");
  http
    .get(`${url}?access_key=${myAPIKey}&query=${ans}`, (res) => {
      res.on("data", function (chunk) {
        json = JSON.parse(chunk);
        console.log(
          "На улице: " + JSON.stringify(json.current.weather_descriptions)
        );
        console.log("Температура: " + JSON.stringify(json.current.temperature));
        console.log(
          "Скорость ветра: " + JSON.stringify(json.current.wind_speed)
        );
        console.log("Давление: " + JSON.stringify(json.current.pressure));
      });
    })
    .on("error", (e) => {
      console.log(e);
    });
  input.close();
}
q();
