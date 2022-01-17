const inquirer = require("inquirer");

function getAmount() {
  return inquirer.prompt({
    name: "amount",
    type: "input",
    message: "表格有几个列?",
    default: 3,
  });
}
function getIsSelection(i) {
  return inquirer.prompt({
    name: "isSelection",
    type: "confirm",
    message: `第${i}列是复选框么？`,
    default: false,
  });
}
function getIsIndex(i) {
  return inquirer.prompt({
    name: "isIndex",
    type: "confirm",
    message: `第${i}列是序号么？`,
    default: false,
  });
}
function getLabel(i) {
  return inquirer.prompt({
    name: "label",
    type: "input",
    message: `第${i}列是标题是？`,
  });
}

module.exports = async () => {
  const { amount } = await getAmount();
  const config = [];
  for (let i = 0; i < amount; i++) {
    if (i === 0) {
      const { isSelection } = await getIsSelection(i);
      if (!isSelection) {
        const { isIndex } = await getIsIndex(i);
        if (isIndex) {
          config.push({
            type: "index",
            label: "序号",
          });
        } else {
          const { label } = await getLabel(i);
          config.push({
            type: "",
            label,
          });
        }
      } else {
        config.push({
          type: "selection",
          label: "",
        });
      }
    } else if (i === 1 && config[0].type === "selection") {
      const { isIndex } = await getIsIndex(i);
      if (isIndex) {
        config.push({
          type: "index",
          label: "序号",
        });
      } else {
        const { label } = await getLabel(i);
        config.push({
          type: "",
          label,
        });
      }
    } else {
      const { label } = await getLabel(i);
      config.push({
        type: "",
        label,
      });
    }
  }
  return config;
};
