#! /usr/bin/env node
const yargs = require("yargs");

yargs
  .command(
    "current",
    "display current date/time",
    (yargs) => {
      yargs
        .option("year", {
          alias: "y",
          type: "boolean",
          description: "display current year",
        })
        .option("month", {
          alias: "m",
          type: "boolean",
          description: "display current month",
        })
        .option("date", {
          alias: "d",
          type: "boolean",
          description: "display current date in month",
        })
        .parse();
    },
    (argv) => {
      if (argv.year) date = new Date().getFullYear();
      else if (argv.month) date = new Date().getMonth() + 1;
      else if (argv.date) date = new Date().getDate();
      else date = new Date();
      console.log(date);
    }
  )
  .command(
    "add",
    "add date",
    (yargs) => {
      yargs
        .option("year", {
          alias: "y",
          type: "number",
          description: "add year",
        })
        .option("month", {
          alias: "m",
          type: "number",
          description: "add month",
        })
        .option("date", {
          alias: "d",
          type: "number",
          description: "add day",
        })
        .parse();
    },
    (argv) => {
      year = argv.year
        ? new Date().getFullYear() + argv.year
        : new Date().getFullYear();
      month = argv.month
        ? new Date().getMonth() + argv.month
        : new Date().getMonth();
      day = argv.date ? new Date().getDate() + argv.date : new Date().getDate();
      date = new Date();
      date.setFullYear(year, month, day);
      console.log(date);
    }
  )
  .command(
    "sub",
    "subtract date",
    (yargs) => {
      yargs
        .option("year", {
          alias: "y",
          type: "number",
          description: "subtract year",
        })
        .option("month", {
          alias: "m",
          type: "number",
          description: "subtract month",
        })
        .option("date", {
          alias: "d",
          type: "number",
          description: "subtract day",
        })
        .parse();
    },
    (argv) => {
      year = argv.year
        ? new Date().getFullYear() - argv.year
        : new Date().getFullYear();
      month = argv.month
        ? new Date().getMonth() - argv.month
        : new Date().getMonth();
      day = argv.date ? new Date().getDate() - argv.date : new Date().getDate();
      date = new Date();
      date.setFullYear(year, month, day);
      console.log(date);
    }
  )

  .parse();
