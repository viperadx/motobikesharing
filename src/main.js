import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as firebase from "@/firebase";
import store from "./store";
import VueSimpleAlert from "vue-simple-alert";
import VModal from 'vue-js-modal';
import VueGoogleCharts from 'vue-google-charts';

Vue.use(VueGoogleCharts);

Vue.use(VueSimpleAlert);
Vue.use(VModal, { dialog: true });

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  firebase,
  store,
  render: h => h(App)
}).$mount("#app");
