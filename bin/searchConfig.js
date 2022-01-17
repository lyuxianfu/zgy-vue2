const inquirer = require("inquirer");

function validate(val) {
  if (Number.isNaN(val)) {
    return "必须是数字";
  }
  return true;
}

function getAnswer() {
  return inquirer.prompt({
    name: "required",
    type: "confirm",
    message: "是否需要搜索表单",
    default: true,
  });
}

function getConfig() {
  return inquirer.prompt({
    name: "search",
    type: "checkbox",
    message: "请选择需要用到的组件",
    choices: ["dateRange", "date", "select", "input"],
  });
}

function getDateRangAmount() {
  return inquirer.prompt({
    name: "amount",
    type: "input",
    message: "需要几个dateRange组件",
    default: 1,
    validate,
  });
}
function getDataRangeKey() {
  return inquirer.prompt({
    name: "key",
    type: "input",
    message: "dateRange组件的key",
    default: "date",
    validate,
  });
}

function getDateAmount() {
  return inquirer.prompt({
    name: "amount",
    type: "input",
    message: "需要几个date组件",
    default: 1,
    validate,
  });
}
function getDateKey() {
  return inquirer.prompt({
    name: "key",
    type: "input",
    message: "date组件的key",
    default: "date",
    validate,
  });
}

function getSelectAmount() {
  return inquirer.prompt({
    name: "amount",
    type: "input",
    message: "需要几个select组件",
    default: 1,
    validate,
  });
}
function getSelectKey() {
  return inquirer.prompt({
    name: "key",
    type: "input",
    message: "select组件的key",
    default: "select",
    validate,
  });
}

function getInputAmount() {
  return inquirer.prompt({
    name: "amount",
    type: "input",
    message: "需要几个input组件",
    default: 1,
    validate,
  });
}
function getInputKey() {
  return inquirer.prompt({
    name: "key",
    type: "input",
    message: "input组件的key",
    default: "input",
    validate,
  });
}

module.exports = async () => {
  const answer = await getAnswer();
  const config = {};
  if (answer.required) {
    const { search } = await getConfig();
    if (search.includes("dateRange")) {
      const { amount } = await getDateRangAmount();
      const keys = [];
      for (let i = 0; i < amount; i++) {
        const { key } = await getDataRangeKey();
        keys.push(key);
      }
      config.dateRange = {
        amount,
        keys,
      };
    }

    if (search.includes("date")) {
      const { amount } = await getDateAmount();
      const keys = [];
      for (let i = 0; i < amount; i++) {
        const { key } = await getDateKey();
        keys.push(key);
      }
      config.date = {
        amount,
        keys,
      };
    }

    if (search.includes("select")) {
      const { amount } = await getSelectAmount();
      const keys = [];
      for (let i = 0; i < amount; i++) {
        const { key } = await getSelectKey();
        keys.push(key);
      }
      config.select = {
        amount,
        keys,
      };
    }

    if (search.includes("input")) {
      const { amount } = await getInputAmount();
      const keys = [];
      for (let i = 0; i < amount; i++) {
        const { key } = await getInputKey();
        keys.push(key);
      }
      config.input = {
        amount,
        keys,
      };
    }
    return config;
  } else {
    return false;
  }
};
