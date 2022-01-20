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

function selects(config) {
  const { amount, keys } = config;
  const template = eval(
    compile(`<% for(let i = 0; i < data.amount; i++){ %><el-form-item>
          <el-select v-model="<%= data.keys[i] %>">
            <el-option 
              v-for="(item, index) in options" 
              :key="index" 
              :label="item" 
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item><% } %>`)
  );
  return template({ amount, keys });
}
function inputs(config) {
  const { amount, keys } = config;
  const template = eval(
    compile(`<% for(let i = 0; i < data.amount; i++){ %><el-form-item>
          <el-input v-model="<%= data.keys[i] %>"></el-input>
        </el-form-item><% } %>`)
  );
  return template({ amount, keys });
}

module.exports = function header(config) {
  if (config) {
    return `<el-header>
      <el-form :inline="true">
        ${config.dateRange ? dateRanges(config.dateRange) : ""}
        ${config.dates ? dates(config.date) : ""}
        ${config.select ? selects(config.select) : ""}
        ${config.input ? inputs(config.input) : ""}
        <el-form-item>
          <el-button type="primary" @click="list.onSearch()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="list.onReset()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-header>`;
  } else {
    return "";
  }
};
