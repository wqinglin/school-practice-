<template>
	<view>
		<view>订单号:{{courseNoInfo.order_no}}</view>
		<view class="course">
			<view class="course-left">
				<image :src="domainUpload+courseNoInfo.imgurl"></image>
			</view>
			<view class="course-right">
				<view class="course-title">{{courseNoInfo.title}}</view>
				<view class="course-tip">永久可看</view>
				<view class="course-price">&yen;{{courseNoInfo.price}}</view>
			</view>
		</view>
		
		<view class="coupon">
			<view class="">优惠券</view>
			<text v-if="courseNoInfo.coupon_fee">&yen;{{courseNoInfo.coupon_fee}}</text>
			<text v-else >&yen;0</text>
		</view>
		
		<view class="pay-type">
			<view class="pay-tip">支付方式</view>
			
			<radio-group name="">
				<view class="wx-pay">
					<image src="../../static/icon/wx.png" ></image>
					<view class="">微信支付</view>
					<radio value="wx" color="#49AF4F" />
				</view>
				
				<view class="zfb-pay">
					<image src="../../static/icon/zfb.png" ></image>
					<view class="">支付宝支付</view>
					<radio value="zfb" color="#49AF4F" checked  />
				</view>
			</radio-group>
		</view>
		
		<view class="pay-footer">
			<view class="">
				实付金额:
				<text v-if="courseNoInfo.act_price">&yen;{{courseNoInfo.act_price}}</text>
			</view>
			<button @click="pay" type="default">立即支付</button>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				courseNoInfo:[],
				domainUpload:''
			}
		},
		onLoad(){
			this.domainUpload = this.common.getConfig('domainUpload');
			this.courseNoInfo = uni.getStorageSync('courseNoInfo');
		},
		methods: {
			pay:function(){
				uni.removeStorageSync('courseNoInfo');
				uni.switchTab({
					url:'/pages/my/my'
				})
			}
		}
	}
</script>

<style>
page{
	background-color: #F6F6F6;
}
.course{
	display: flex;
	padding: 20rpx;
	background-color: #FFFFFF;
}
.course-left image{
	width: 300rpx;
	height: 180rpx;
	border-radius: 20rpx;
}
.course-left{
	width:50%;
}
.course-right{
	width: 30%;
	padding: 10rpx;
}
.course-title{
	font-size: 26rpx;
	font-weight: 340;
	color: #313131;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp:2;
	-webkit-box-orient:vertical
}
.course-tip{
	font-size: 20rpx;
	color: #808080;
	padding-top: 20rpx;
}

.course-price{
	color: #FE601A;
	margin-left:85% ;
	padding-top: 10%;
}

.coupon{
	display: flex;
	height: 64rpx;
	line-height: 64rpx;
	background-color: #FFFFFF;
	margin-top: 20rpx;
	padding: 20rpx;
}
.coupon view{
	font-size: medium;
	font-weight: 380;
}
.coupon text{
	margin-left: auto;
	color: #FE601A;
	font-size: small;
	font-weight: bold;
}
.pay-type{
	background-color: #FFFFFF;
	margin-top: 20rpx;
}

.pay-tip{
	font-size: medium;
	height: 60rpx;
	line-height: 60rpx;
	padding: 20rpx;
}

.wx-pay,.zfb-pay{
	display: flex;
	border-top: 2rpx solid #F5F5F5;
	line-height: 84rpx;
	height: 84rpx;
	font-size: small;
}

.wx-pay image,.zfb-pay image{
	width: 50rpx;
	height: 50rpx;
	padding: 20rpx;
}
.pay-type radio{
	margin-left: auto;
}

.pay-footer{
	display: flex;
	background-color: #FFFFFF;
	height: 84rpx;
	line-height: 84rpx;
	padding: 20rpx;
	position: fixed;
	bottom: 0;
	width: 100%;
}
.pay-footer view{
	width: 40%;
	text-align: center;
	font-size: medium;
	font-weight: bold;
}

.pay-footer text{
	color: #FE601A;
	font-size: large;
	padding-left: 20rpx;
}
.pay-footer button{
	width: 50%;
	border-radius: 50rpx;
	background-color: #FE601A;
	color: #FFFFFF;
	font-size: medium;
} 
</style>
