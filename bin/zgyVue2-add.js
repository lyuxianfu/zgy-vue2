#!/usr/bin/env node

const program = require("commander");
const fs = require("fs");
const chalk = require("chalk");
const ora = require("ora");
const inquirer = require("inquirer");
const files = fs.readdirSync("./");
const getSearchConfig = require("./searchConfig");
const getTabsConfig = require("./tabsConfig");
const getTableConfig = require("./tableConfig");
const template = require("./template");

program.usage("<view-name> [view-name]");
program.parse(process.argv);

// 当没有输入参数的时候给个提示
if (program.args.length < 1) return program.help();

//检查名字是否重复
const viewName = program.args[0];
let isExist = false;
for (const file of files) {
  if (file === viewName + ".view") {
    isExist = true;
  }
}
if (isExist) {
  console.log(chalk.red(`${viewName} is already exist!!!`));
  return;
}

//开始创建一个view
console.log(chalk.green(`add ${viewName} starting`));

function createFast() {
  return inquirer.prompt({
    name: "required",
    type: "confirm",
    message: "是否快速创建？",
    default: true,
  });
}

function getPagination() {
  return inquirer.prompt({
    name: "required",
    type: "confirm",
    message: "是否需要分页",
    default: true,
  });
}

function getDescriptions() {
  return inquirer.prompt({
    name: "required",
    type: "confirm",
    message: "是否需要描述框",
    default: false,
  });
}

function writeFile(config = {}) {
  const spinner = ora("Create...");
  spinner.start();
  fs.writeFile(`./${viewName}.vue`, template(config, viewName), (err) => {
    if (err) console.log(err);
    console.log("\n");
    console.log(chalk.green("Add successfully! \n"));
    console.log("\n");
    spinner.succeed();
  });
}

async function create() {
  const config = {};
  const isCreateFast = await createFast();
  if (isCreateFast) {
    writeFile({
      searchConfig: {
        dateRange: { amount: 1, keys: ["date"] },
        date: { amount: 1, keys: ["startDate"] },
        select: { amount: 1, keys: ["select"] },
        input: { amount: 1, keys: ["input"] },
      },
      tabsConfig: [
        { title: "", value: "" },
        { title: "", value: "" },
      ],
      descriptions: true,
      tableConfig: [
        { type: "selection", label: "" },
        { type: "index", label: "序号" },
        { type: "", label: "" },
      ],
      pagination: true,
    });
  } else {
    config.searchConfig = await getSearchConfig();
    config.tabsConfig = await getTabsConfig();
    config.descriptions = await getDescriptions();
    config.tableConfig = await getTableConfig();
    config.pagination = await getPagination();
    writeFile(config);
  }
}

create();
// writeFile({
//   searchConfig: {
//     dateRange: { amount: 1, keys: ["date1"] },
//     date: { amount: 1, keys: ["date1"] },
//     select: { amount: 1, keys: ["date2"] },
//     input: { amount: 1, keys: ["date3"] },
//   },
//   tabsConfig: [
//     { title: "", value: "" },
//     { title: "", value: "" },
//   ],
//   tableConfig: [
//     { type: "selection", label: "" },
//     { type: "index", label: "序号" },
//     { type: "", label: "" },
//   ],
//   pagination: true,
// });
