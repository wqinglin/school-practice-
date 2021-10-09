<template>
	<view>
		<view>
			<view class="course-title">{{intr.title}}</view>
			<view class="study-p">{{intr.readCount}} 学过</view>
		</view>
		
		<view>
			<view class="course-price">
				<view class="pro-price">&yen;{{intr.price}}</view>
				<view class="ori-price">{{intr.ori_price}}</view>
			</view>
			<view v-if="intr.coupon" class="coupon">
				<view>满{{intr.coupon[0].total_fee}}立减:{{intr.coupon[0].coupon_fee}}...</view>
				<button size="mini" type="default"  @tap="showService">领取</button>
			</view>
		</view>
		
		<view class="course-intro">
			<view class="intro-tip">
				课程介绍
			</view>
			<view class="rich-text">
				<rich-text :nodes="intr.content"></rich-text>
			</view> 
		</view>
		
	</view>
</template>

<script>
	export default {
		props:['intr'],
		created:function(){
		},
		data() {
			return {
				isGet:false,
				msg:'领取'
			};
		},
		methods:{
			showService(){
				this.$emit('coupon','show');
			},
		}
		
	}
</script>

<style>
	.course-title{
		font-size: medium;
		padding: 20rpx;
		font-weight: 450;
	}
	.study-p{
		font-size: 24rpx;
		color: #959595;
		padding: 20rpx;
		border-bottom: 2rpx solid #F5F5F5;
	}
	.course-price{
		display: flex;
		height: 60rpx;
		line-height: 60rpx;
	}
	.pro-price{
		padding: 20rpx;
	}
	.ori-price{
		text-decoration: line-through;
		color: #959595;
		font-size: medium;
		padding: 20rpx;
	}
	.coupon{
		display: flex;
		padding: 20rpx;
		border-bottom: 24rpx  solid #F5F5F5;
		height: 84rpx;
		line-height: 84rpx;
	}
	.coupon view{
		font-size: 30rpx;
		font-weight: bold;
		color: #FE601A;
		width: 50%;
	}
	.coupon button{
		height: 40rpx;
		line-height: 40rpx;
		font-size: 20rpx;
		background-color: #FE601A;
		color: #FFFFFF;
		margin-top: 26rpx;
		margin-left: 30%;
	}
	.isGet{
		background-color: #FFFFFF !important;
		color: #FE601A !important;
	}
	
	.intro-tip{
		border-bottom: 2rpx solid #F5F5F5;
	}
	
	.course-intro view{
		padding: 20rpx;
	}
	.rich-text{
		height: 1800rpx;
	}

</style>
