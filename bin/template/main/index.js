const compile = require("../compile");

function table(config, viewName) {
  const template = eval(
    compile(`<ZTable page-name="${viewName}">
          <% for(let i = 0; i < config.length; i++){ %><el-table-column>
            type="<%= config[i].type %>"
            label="<%= config[i].label %>"
            prop="">
          </el-table-column><% } %>
    </ZTable>`)
  );
  return template(config);
}

module.exports = function main(data) {
  return `<el-main>
      ${data.tabsConfig ? '<ZTab :tabs="tabs" :active-name=""></ZTab>' : ""}
      ${table(data.tableConfig, data.viewName)}
      ${
        data.descriptions
          ? ` <ZDescriptions
        :column="3"
        :options="[
          { title: '', desc: xxx },
        ]"
      ></ZDescriptions>`
          : ""
      }
      ${
        data.pagination
          ? `<ZPagination
        page-name="${data.viewName}"
        @onChangePageSize="list.onChangePageSize"
        @onChangePage="list.onChangePage"
      ></ZPagination>`
          : ""
      }
  </el-main>`;
};
