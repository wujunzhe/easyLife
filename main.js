import App from './App'
import $http from 'utils/http.js'
import global from 'config/global.js'
import storage from 'utils/setStorage.js'
import {Toast} from 'wxcomponents/vant/toast/toast.js';

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false;
Vue.prototype.$http = $http;
Vue.prototype.$apiKey = global.apiKey;
Vue.prototype.$storage = storage;
Vue.prototype.$toast = Toast;
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif