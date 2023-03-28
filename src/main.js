/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-28 12:50:11
 * @FilePath: /MaaS_Integration_Hub/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";

import Cookies from "js-cookie";
import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import "./components/FlowDesign/ant.js";
import "ant-design-vue/dist/antd.css";
import "@/components/FlowDesign/assets/style/index.less";
import Element from "element-ui";
import "./styles/element-variables.scss";
import enLang from "element-ui/lib/locale/lang/en"; // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import "@/styles/index.scss"; // global css
import ElFilter from "@/components/Search";

import App from "./App";
import store from "./store";
import router from "./router";

import VueContextMenu from "vue-contextmenu";
import vcolorpicker from "vcolorpicker";
import Storage from "vue-lsp";

import "./icons"; // icon
import "./permission"; // permission control
import "./utils/error-log"; // error log

import * as filters from "./filters"; // global filters
import i18n from "./lang";

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
});
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
const { mockXHR } = require("../mock");
mockXHR();
// }
const options = {
  namespace: "flow__", // key prefix
  name: "ls", // name variable Vue.[ls] or this.[$ls],
  storage: "local", // storage name session, local, memory
};

Vue.use(Element, {
  size: Cookies.get("size") || "medium", // set element-ui default size
  locale: enLang, // 如果使用中文，无需设置，请删除
});
Vue.use(ElFilter);
Vue.use(VueContextMenu);
Vue.use(vcolorpicker);
Vue.use(Storage, options);

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: (h) => h(App),
});
