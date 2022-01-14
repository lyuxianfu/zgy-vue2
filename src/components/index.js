import ZTable from "./ZTable";
import ZPagination from "@/components/ZPagination";
import ZTab from "@/components/ZTab";
import ZDialog from "@/components/ZDialog";

export default {
  install: (Vue) => {
    Vue.component(ZTable.name, ZTable);
    Vue.component(ZPagination.name, ZPagination);
    Vue.component(ZTab.name, ZTab);
    Vue.component(ZDialog.name, ZDialog);
  },
};
