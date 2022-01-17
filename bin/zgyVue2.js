#!/usr/bin/env node

const program = require("commander");

program
  .version(require("../package.json").version)
  .usage("<command>[options]")
  .command("add", "add a new view");

program.parse(process.argv);
