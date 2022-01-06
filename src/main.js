import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import elementUi from "element-ui";
import zgy from "../index";

Vue.use(elementUi);
Vue.use(zgy.components);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
