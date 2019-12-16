import Vue from "vue";
import App from "./app/App.vue";
import store from "./store";
import compositionApi from "@vue/composition-api";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/scss/bootstrap.scss";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(compositionApi);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
