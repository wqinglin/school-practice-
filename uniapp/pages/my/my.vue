<template>
	<view class="page">
		<view @click="toLogin" class="user-info">
			<image v-if="hasLogin" src="../../static/login/login.png" mode=""></image>
			<image v-else src="../../static/login/unlogin.png" mode=""></image>

			<text v-if="hasLogin">{{userInfo.user[0].mobile}}</text>
			<text v-else>登录/注册</text>
			<view class="">
				<uni-icons type="arrowright"></uni-icons>
			</view>
		</view>

		<!-- 订单信息 -->
		<view class="order-info">
			<view v-for="(item,index) in tabs" :key="item.type" class="list" @click="onSkipOrder(item.type)">
				<view class="icon">
					<text class="iconfont" :class="item.icon"></text>
					<text class="num" v-if="orderNum && orderNum[index] != 0">
					{{orderNum[index]}}</text>
				</view>
				<view class="title">
					<text>{{item.title}}</text>
				</view>
			</view>
			<!-- <view class="list" @click="onSkipOrder(2)">
	    		<view class="icon">
	    			<text class="iconfont icon-daifahuo"></text>
	    			<text class="num">22</text>
	    		</view>
	    		<view class="title">
	    			<text>待发货</text>
	    		</view>
	    	</view>
	    	<view class="list" @click="onSkipOrder(3)">
	    		<view class="icon">
	    			<text class="iconfont icon-daishouhuo"></text>
	    			<text class="num">22</text>
	    		</view>
	    		<view class="title">
	    			<text>待收货</text>
	    		</view>
	    	</view>
	    	<view class="list" @click="onSkipOrder(4)">
	    		<view class="icon">
	    			<text class="iconfont icon-daipingjia"></text>
	    			<text class="num">22</text>
	    		</view>
	    		<view class="title">
	    			<text>待评价</text>
	    		</view>
	    	</view> -->

		</view>
		<!-- 钱包 -->
		<view class="wallet-info">
			<view class="list" @click="onWallet('integral')">
				<view class="icon">
					<text class="number">140</text>
				</view>
				<view class="title">
					<text>积分</text>
				</view>
			</view>
			<view class="list" @click="onWallet('coupon')">
				<view class="icon">
					<text class="number">2</text>
				</view>
				<view class="title">
					<text>优惠券</text>
				</view>
			</view>
			<view class="list" @click="onWallet('wallet')">
				<view class="icon">
					<text class="number">200.00</text>
				</view>
				<view class="title">
					<text>余额</text>
				</view>
			</view>
			<view class="list">
				<view class="icon">
					<text class="iconfont icon-qianbao"></text>
				</view>
				<view class="title">
					<text class="action">我的钱包</text>
				</view>
			</view>
		</view>

		<view v-show="hasLogin" class="logout">
			<button @click="mylogout" type="default">退出登录</button>
		</view>

	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				mobile: '',
				orderNum: [],
				tabs: [{
						type: 1,
						icon: "icon-daifukuan",
						title: "待付款"
					},
					{
						type: 2,
						icon: "icon-daifahuo",
						title: "待发货"
					},
					{
						type: 3,
						icon: "icon-daishouhuo",
						title: "待收货"
					},
					{
						type: 4,
						icon: "icon-daipingjia",
						title: "待评价"
					}
				]
			}
		},
		computed: {
			...mapGetters(['hasLogin', 'userInfo'])
		},
		async onLoad() {
			if (this.hasLogin) {
				await this.common.post('/api/getOrderNum').then(res => {
					if (res.code == 1) {
						console.log(res.data);
						this.orderNum = [res.data.count_nopay,res.data.count_notransfer,res.data.count_noconfirm,res.data.count_nocomment];
						console.log(this.orderNum);
					}
				});
			}
		},
		methods: {
			...mapMutations(['logout']),
			toLogin() {
				if (this.hasLogin) { // 已经登录，就结束，否则去登录
					return false
				}
				uni.navigateTo({
					url: '../login/login'
				})
			},
			mylogout() {
				uni.showModal({
					content: '确定要退出登录么',
					success: (e) => {
						if (e.confirm) {
							this.logout();
							this.common.post('/api/logout').then((res) => {});
							setTimeout(() => {
								uni.navigateBack(); // 返回到上一页
							}, 200)
						}
					}
				});
			},
			toOrder: function() {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					// uni.navigateTo({
					// 	url:'../toOrder/toOrder'
					// })
					uni.showToast({
						icon: 'none',
						title: '订单管理'
					})
				}


			},
			onSkipOrder(type) {
				
					uni.navigateTo({
						url: '/pages/orderList/orderList?type=' + type
					})

				

			},
			toCoupon: function() {
				if (!this.hasLogin) {
					// uni.navigateTo({
					// 	url:'../login/login'
					// })
				} else {
					// uni.navigateTo({
					// 	url:'../coupon/coupon'
					// })
					uni.showToast({
						icon: 'none',
						title: '优惠卷'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	@import '@/static/css/FontStyle.css';
	page {
		background-color: #F6F6F6;
	}

	.user-info {
		display: flex;
		height: 170rpx;
		line-height: 170rpx;
		width: 96%;
		margin: 20rpx auto;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.user-info image {
		width: 100rpx;
		height: 100rpx;
		padding: 20rpx;
		margin-top: 10rpx;
	}

	.user-info text {
		font-size: small;
		font-weight: bold;
	}

	.user-info view {
		margin-left: auto;
	}

	.user-settting,
	.logout {
		background-color: #FFFFFF;
		width: 96%;
		margin: 20rpx auto;
		border-radius: 20rpx;
		font-size: small;
	}

	.user-order,
	.user-coupon {
		display: flex;
		height: 60rpx;
		line-height: 60rpx;
		padding: 20rpx;
		border-bottom: 2rpx solid #F5F5F5;
	}

	.user-order view,
	.user-coupon view {
		margin-left: auto;
	}

	.logout {
		margin-top: 30%;
	}

	.logout button {
		background-color: #49AF4F;
		color: #FFFFFF;
		font-size: medium;
	}

	/* 订单信息 */
	.order-info {
		display: flex;
		width: 94%;
		height: 200rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		margin: 20rpx auto;

		.list {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 20%;
			height: 100%;

			.icon {
				position: relative;
				display: flex;
				align-items: center;

				.iconfont {
					font-size: 38rpx;
					color: #333333;
				}

				.num {
					position: absolute;
					right: -20rpx;
					top: -20rpx;
					padding: 0rpx 6rpx;
					font-size: 18rpx;
					color: $base;
					border: 2rpx solid $base;
					border-radius: 100%;
					background-color: #FFFFFF;
				}
			}

			.title {
				display: flex;
				align-items: center;
				margin-top: 10rpx;

				text {
					color: #333333;
					font-size: 24rpx;
				}
			}
		}
	}

	/* 钱包 */
	.wallet-info {
		display: flex;
		width: 94%;
		height: 200rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		margin: 20rpx auto;

		.list {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 25%;
			height: 100%;

			.icon {
				position: relative;
				display: flex;
				align-items: center;

				.iconfont {
					font-size: 38rpx;
					color: $base;
				}

				.number {
					font-size: 28rpx;
					color: #212121;
					font-weight: bold;
				}
			}

			.title {
				display: flex;
				align-items: center;
				margin-top: 10rpx;

				text {
					color: #333333;
					font-size: 24rpx;
				}
			}
		}
	}

	/* 签到，付款码 */
	.integral-payment {
		display: flex;
		justify-content: space-between;
		width: 94%;
		height: 180rpx;
		margin: 20rpx auto;

		.list {
			width: 48%;
			height: 100%;
			background-color: #FFFFFF;
			border-radius: 20rpx;

			.title {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 120rpx;

				.iconfont {
					font-size: 48rpx;
					margin-right: 10rpx;
					font-weight: normal;
				}

				text {
					color: #212121;
					font-size: 28rpx;
					font-weight: bold;
				}
			}

			.mess {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;

				text {
					color: #C0C0C0;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
