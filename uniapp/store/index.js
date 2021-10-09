import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false, // hasLogin 判断是否登录 ， true 登录，false 没登陆
		userInfo: {},   //  本地存储   token  和 user 用户信息
	},
	getters: {  //  computed  计算属性
		hasLogin(state) {
			let userInfo = uni.getStorageSync('userInfo'); // 拿本地存储的 用户信息 给个 userInfo 标示true或false
			if(userInfo){state.hasLogin = true;}
			return state.hasLogin;
		},
		userInfo(state) {
			let userInfo = uni.getStorageSync('userInfo');
			if(userInfo){state.userInfo = userInfo;}
			return state.userInfo;
		}
	},
	mutations: {  // methods,  状态树对象  在组件中不能直接修改，所有必须用 mutations 方法修改 usreInfo 的值
		login(state, provider) {  // 设置 userInfo 本地存储并且登录的方法
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({ //缓存用户登陆状态
				key: 'userInfo',
				data: provider
			})
		},
		logout(state) {   // 删除 userInfo 本地存储并且退出的方法
			//console.log('aaa');
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({key:'userInfo'})
		}
	},
	actions: {  // 异步方法

	}
})

export default store
