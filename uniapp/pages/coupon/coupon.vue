<template>
	<view class="box">
		我的中查看 优惠卷领取的情况
	</view>
</template>

<script>
	export default {
		data() {
			return {
				couponInfo: [],
				theme: '#f60',
				types: false,
				color:'#fff',
				solid:'#f60'
			}
		},
		onLoad(options) {
			let couponInfo = uni.getStorageSync('coupon');
			this.couponInfo = couponInfo;
		},
		methods: {

		}
	}
</script>

<style lang='scss'>
	.box{
		width:85%;
		margin:0 20rpx;
	}
	.coupon-item {
		width: 100%;
		height: auto;
		display: table;
		border-radius: 10upx;
		padding: 0 20upx;
		margin-top: 22upx;
		border: 1px solid #eeeeee;
		position: relative;

		.coupon-money {
			width: 465upx;
			height: auto;
			display: table;
			float: left;
			padding: 26upx 0;
			border-style: none dotted none none;
			border-color: #eeeeee;

			.nick {
				width: 100%;
				height: 50upx;
				line-height: 30upx;
				font-size: 24rpx;
				color: #999999;
			}

			.tit {
				width: 100%;
				height: 50upx;
				line-height: 50upx;
				font-size: 24rpx;
				color: #999999;
			}

			.demand {
				width: 100%;
				height: 30upx;
				line-height: 30upx;
				font-size: 24rpx;
				color: #999999;
			}

			.layof {
				width: 100%;
				height: 48upx;
				line-height: 30upx;
				font-size: 44upx;
				color: #ff9000;
				font-weight: bold;
			}

			.end_time {
				width: 100%;
				height: 30upx;
				line-height: 30upx;
				font-size: 24rpx;
				color: #999999;
			}
		}

		.get-btn {
			width: 146upx;
			height: 52upx;
			line-height: 50upx;
			position: absolute;
			top: 50%;
			right: 26upx;
			margin-top: -26upx;
			text-align: center;
			border-radius: 60upx;
			color: #ff9000;
			border: 1px solid #ff9000;
			font-size: 24rpx;
			float: right;
		}
	}

	.coupon-item:after {
		width: 40upx;
		height: 20upx;
		position: absolute;
		left: 460upx;
		top: -1px;
		border-radius: 0 0 40upx 40upx;
		content: "";
		display: block;
		background: #ffffff;
		border: 1px solid #eeeeee;
		border-top: 0px;
	}

	.coupon-item:before {
		width: 40upx;
		height: 20upx;
		position: absolute;
		left: 460upx;
		bottom: -1px;
		border-radius: 40upx 40upx 0 0;
		content: "";
		display: block;
		background: #ffffff;
		border: 1px solid #eeeeee;
		border-bottom: 0px;
	}
</style>
