const header = require("./header");

module.exports = function template(config, viewName) {
  return `<template>
  <el-container>
    ${header(config.searchConfig)}
  </el-container>
</template>
<script>
  export default{
    name: '${viewName}',
    data() {
      return{
        
      }
    }
  }
</script>
`;
};
