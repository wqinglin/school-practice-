const key = 'secret';
const domain = 'http://localhost:3000'; // https://www.xiaoxiao.com
const domainUpload = 'http://localhost:3000/upload/';
export default {
	// 数据传输: get  post  put(修改)  delete(删除)
	get: function(url, params = []) {
		return new Promise(function(resolve, reject) {
			var data = {};
			for (var i in params) {
				data[i] = params[i]
			}
			uni.request({ // 请求接口
				url: domain + url,
				data: data,
				success: (res) => {
					if (res.data.code == 1) {
						resolve(res.data)
					}
				},
				fail: function(err) {
					reject(err)
				}
			})
		})
	},
	post: function(url, params = []) {
		return new Promise(function(resolve, reject) {
			var data = {};
			for (var i in params) {
				data[i] = params[i]
			}
			let header = {  // 没token 的编码
				'content-type': 'application/x-www-form-urlencoded'
			}
			let userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				header = {
					'authorization': userInfo.token,  // Authorization 向服务传递token 
					'content-type': 'application/x-www-form-urlencoded'
				}
			}
			uni.request({
				url: domain + url,
				data: data,
				method: 'POST',
				header,
				success: (res) => {
					if (res.data.code == 1) {
						resolve(res.data)
					} else if(res.data.code == 801){
						console.log('没token');
					}else if (res.data.code == 802) { // 没 token 返回 801 ， token 过期  返回 802
					    uni.showModal({ // 重新登录
					    	content: '还没登录?先去登录吧',
					    	success: function(res) {
					    		if (res.confirm) {
					    			uni.navigateTo({
					    				url: '../login/login'
					    			})
					    		} else if (res.cancel) {
					    			return false
					    		}
					    	}
					    })
					} else {
						resolve(res.data)
					}
				},
				fail: function(err) {
					reject(err)
				}

			})
		})
	},
	getConfig: function(configName) {
		if (configName == 'domain') {
			return domain
		} else if (configName == 'domainUpload') {
			return domainUpload
		}
	}
}

/*
  CORS policy: No 'Access-Control-Allow-Origin'  不允许跨越(不符合同源策略)
  后台:  http://localhost:3000
  前端H5 ： http://localhost:8080
  同源策略： 协议（http,https） 域名，端口 都必须相同。
  
  解决方法:  (1)服务器 Cors 配置（重要），（2）jsonp （3）框架中配置 服务代理
  
  koa2 ：app.js中 
     安装 : npm install koa-cors --save 模块
	 
	 // 1. 导入模块
	 const cors = require("koa-cors");
	 // 2. 
	 app.use(async (ctx, next) => {
	   ctx.set("Access-Control-Allow-Origin"); // 跨域访问
	   ctx.set("Access-control-Allow-Methods", "*");
	   ctx.set("Access-Control-Max-Age", 1728000);
	   ctx.set(
	     "Access-control-Allow-Headers",
	     "X-Requested-With,content-type,Authorization"
	   ); // 设置接收携带Authorization的请求
	   await next();
	 }); 
	 app.use(cors());

*/
