import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import elementUi from "element-ui";
import components from "@/components";
import "@/../lib/index.css";
// import components from "@/../lib/index.umd.js";
console.log(components);

Vue.use(elementUi);
Vue.use(components);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
