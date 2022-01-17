const inquirer = require("inquirer");

function getAnswer() {
  return inquirer.prompt({
    name: "required",
    type: "confirm",
    message: "是否需要tabs",
    default: true,
  });
}

function getAmount() {
  return inquirer.prompt({
    name: "amount",
    type: "input",
    message: "有几个tab?",
    default: 2,
  });
}

function getTitle(i) {
  return inquirer.prompt({
    name: "title",
    type: "input",
    message: `tab[${i}]的title?`,
  });
}
function getValue(i) {
  return inquirer.prompt({
    name: "value",
    type: "input",
    message: `tab[${i}]的value?`,
  });
}

module.exports = async () => {
  const { required } = await getAnswer();
  if (required) {
    const { amount } = await getAmount();
    const tabs = [];
    for (let i = 0; i < amount; i++) {
      const { title } = await getTitle(i);
      const { value } = await getValue(i);
      tabs.push({ title, value });
    }
    return tabs;
  } else {
    return false;
  }
};
