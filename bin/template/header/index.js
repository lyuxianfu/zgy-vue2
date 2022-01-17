const compile = require("../compile");

function dateRanges(config) {
  const { amount, keys } = config;
  const template = eval(
    compile(`<% for(let i = 0; i < data.amount; i++){ %><el-form-item>
          <el-date-picker
            v-model="<%= data.keys[i] %>"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item><% } %>`)
  );
  return template({ amount, keys });
}

function dates(config) {
  const { amount, keys } = config;
  const template = eval(
    compile(`<% for(let i = 0; i < data.amount; i++){ %><el-form-item>
          <el-date-picker
            v-model="<%= data.keys[i] %>"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择日期">
          </el-date-picker>
        </el-form-item><% } %>`)
  );
  return template({ amount, keys });
}

module.exports = function header(config) {
  if (config) {
    return `<el-header>
      <el-form :inline="true">
        ${dateRanges(config.dateRange)}
        ${dates(config.date)}
        ${dateRanges(config.dateRange)}
        ${dateRanges(config.dateRange)}
      </el-form>
    </el-header>`;
  } else {
    return "";
  }
};
