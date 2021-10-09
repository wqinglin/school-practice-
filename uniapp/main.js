import Vue from 'vue'
import store from './store'
import App from './App'

import common from './common/common.js'
Vue.prototype.common = common

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
