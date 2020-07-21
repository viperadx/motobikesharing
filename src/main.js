import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as firebase from "@/firebase";
import store from "./store";
import VueSimpleAlert from "vue-simple-alert";
import VModal from 'vue-js-modal';
import VueGoogleCharts from 'vue-google-charts';
import vueNumeralFilterInstaller from 'vue-numeral-filter';
import ExpandableImage from './ExpandableImage.vue'
let vueExpandableImage = {}

vueExpandableImage.install = function (Vue) {
  Vue.component('expandable-image', ExpandableImage)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueExpandableImage)
}

export default vueExpandableImage

Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' });

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
