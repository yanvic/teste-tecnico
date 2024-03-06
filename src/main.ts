import { createApp } from "vue";
import App from "./App.vue";

import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "@iconify/iconify";
import "vue-bootstrap-datalist/lib/index.css";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "@vueform/multiselect/themes/default.css";
import { createPinia } from "pinia";
import Multiselect from "@vueform/multiselect";
import "@/assets/css/global.css"
import { Money3Component } from "v-money3";
import { maska } from "maska";
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import {mask} from "vue-the-mask";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.min.css' // MDI icons


const vuetify = createVuetify({
  components,
  directives,
})


DataTable.use(DataTablesLib);

const appInstance = createApp(App);
appInstance.component("money3", Money3Component);
appInstance.directive("maska", maska);
// @ts-ignore
appInstance.directive("mask", mask);

appInstance.component("Datepicker", Datepicker);
appInstance.use(BootstrapVue3);
appInstance.use(createPinia());
appInstance.component("Multiselect", Multiselect);

appInstance.use(vuetify)
appInstance.mount("#app");


// createApp(App).component("money3", Money3Component).directive('maska', maska).component('Datepicker', Datepicker).use(BootstrapVue3).use(createPinia()).component('Multiselect', Multiselect).use(router).mount('#app')