const header = require("./header");
const main = require("./main");
const compile = require("./compile");

function writeData(config, viewName) {
  const template = eval(
    compile(`<% if(config.searchConfig){ %><% if(config.searchConfig.dateRange){ %><% for(let i = 0; i < config.searchConfig.dateRange.keys.length; i++){ %><%=  config.searchConfig.dateRange.keys[i] %>: "",
        <% } %><% } %>formData: {
          viewName: "${viewName}",
          <% if(config.searchConfig.date){ %><% for(let i = 0; i < config.searchConfig.date.keys.length; i++){ %><%=  config.searchConfig.date.keys[i] %>: "",
          <% } %><% } %><% if(config.searchConfig.select){ %><% for(let i = 0; i < config.searchConfig.select.keys.length; i++){ %><%=  config.searchConfig.select.keys[i] %>: "",
          <% } %><% } %><% if(config.searchConfig.input){ %><% for(let i = 0; i < config.searchConfig.input.keys.length; i++){ %><%=  config.searchConfig.input.keys[i] %>: "",<% } %><% } %>
        },<% } %><% if(config.tabsConfig){ %>tabs: [
        <% for(let i = 0; i < config.tabsConfig.length; i++){ %>  {title: "<%= config.tabsConfig[i].title %>", value: "<%= config.tabsConfig[i].value %>",},
        <% } %>],<% } %>`)
  );
  return template(config);
}

module.exports = function template(config, viewName) {
  console.log(config);
  const data = { formData: {} };
  if (config.tabsConfig) {
    data.tabs = config.tabsConfig;
  }
  return `<template>
  <el-container>
    ${config.searchConfig ? header(config.searchConfig) : ""}
    ${main({
      tabsConfig: config.tabsConfig,
      tableConfig: config.tableConfig,
      pagination: config.pagination,
      viewName,
    })}
  </el-container>
</template>
<script>
  import zgyVue2 from 'zgy-vue2'
  export default{
    name: '${viewName}',
    data() {
      return {
        ${writeData(config, viewName)}
        list: null
      }
    },
    created() {
      this.list = new zgyVue2.List(this.formData, )
    }
  }
</script>
`;
};
