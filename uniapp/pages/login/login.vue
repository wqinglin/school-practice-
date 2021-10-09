<template>
	<view class="register">
		<!-- 主体表单 -->

		<view class="main1">
			<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>

			<view class="item">
				<image class="login_image" src="../../static/login/userName.png"></image>
				<input v-model="mobile" class="main-input" placeholder="请输入账号" />
			</view>
			<view style="margin-top: 8px"></view>
			<view class="item">
				<image class="login_image" src="../../static/login/password.png"></image>
				<input v-model="password" class="main-input" type="password" placeholder="请输入密码" />
			</view>
		</view>
		<view class="btn_login" @click="toLogin">登录</view>
		<!-- 底部信息 -->
		<view class="footer" style="margin-top: 16px">

			<view style="margin-left: 20%;">
				<navigator url="" open-type="navigate">忘记密码</navigator>
			</view>
		</view>
		<view class="weixinLogin">
			<view
				style="border: 1upx inset;width:30%;float: left;margin-top: 2%;margin-left: 3%;border-color: #F8F8F8;">
			</view>
			第三方账号登录
			<view
				style="border: 1upx inset;width:30%;float: right;margin-top: 2%;margin-right: 3%;border-color: #F8F8F8;">
			</view>
		</view>
		<!-- 其他登录 -->
		<view class="other_login cuIcon">
			<view class="login_icon_wx">
				<image style="width: 50px;height: 50px;" src="../../static/login/wx.png" @tap="login_weixin"></image>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	//  mixins 合并(优化可以将 所有 mapGetters,mapMutations写到 mixins组件,然后配置访问是公共的组件)
	import {
	    mapMutations  // 找 mutations 中的方法
	} from 'vuex';
	export default {
		data() {
			return {
				mobile: '',
				password:''
			}
		},
		methods: {
			...mapMutations(['login']),
			async toLogin(e) {
				if (this.mobile == '' || this.password == '') {
					uni.showToast({
						icon: 'none',
						title: '手机号或密码不能为空'
					})
					return false
				}
				await this.common.post('/api/login', {mobile:this.mobile,password:this.password}).then((res) => {
					if (res.code == 1) {
						// uni.setStorage({
						// 	key: 'userInfo',
						// 	data: res.data
						// })
						this.login(res.data); // vuex 的本地存储
						uni.showToast({
							icon: 'success',
							title: res.msg,
							success: function() {
								setTimeout(function() {
									// uni.switchTab({
									// 	url: '../my/my'
									// })
									uni.navigateBack();  // 返回到上一页
								}, 2000)
							}
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			},
			navBack(){
				uni.navigateBack();
			},
			
		}
	}
</script>

<style>
	.main1 {
		display: flex;
		flex-direction: column;
		padding-top: 200upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}

	.type {
		display: flex;
		margin-left: 16px;
		border-bottom: 1px solid #eeeeee;
		width: 100%;
	}

	.title_des {
		font-weight: bold;
		color: #3cc51f;
		font-size: 22px;
		margin-bottom: 32px;
	}

	.login_icon_wx {
		color: #999999;
		border: none;
	}

	.weixinLogin {
		color: #999999;
		text-align: center;
		font-size: 12px;
		margin-top: 60px;
		left: auto;
		right: auto;
	}

	.footer_des {
		color: #666666;
		text-align: center;
		font-size: 14px;
		margin-top: 40px;
	}

	.getCode {
		font-size: 14px;
		margin-left: 40px;
		color: #0055b8;
	}

	.item {
		line-height: 40px;
		display: flex;
	}

	.login_image {
		margin-top: 8px;
		width: 20px;
		height: 25px;
	}

	.main-input {
		font-size: 14px;
		margin-left: 16px;
		border-bottom: 1px solid #eeeeee;
		height: 40px;
		line-height: 40px;
	}

	.main-input-code {
		width: 70%;
		font-size: 14px;
		height: 40px;
		line-height: 40px;
	}

	.btn_login {
		color: #ffffff;
		font-size: 16px;
		width: 260px;
		height: 40px;
		background: #3cc51f;
		border-radius: 8px;
		line-height: 40px;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 45px;
	}

	.main-input {
		flex: 1;
		text-align: left;
		font-size: 28 upx;
		padding-right: 10 upx;
		margin-left: 20 upx;
	}

	/* 其他登录方式 */
	.other_login {
		z-index: 88;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 60upx;
		text-align: center;
	}

	.login_icon {
		border: none;
		font-size: 64upx;
		margin: 0 64upx 0 64upx;
		color: rgba(0, 0, 0, 0.7)
	}

	.wechat_color {
		color: #83DC42;
	}
</style>
