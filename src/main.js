import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as firebase from "@/firebase";
import store from "./store";
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  firebase,
  store,
  render: h => h(App)
}).$mount("#app");
