<template>
	<view class="course-order">
		<view v-for="order in orders" :key="order.course_id" class="order">
			<view class="order-tip">
				<view class="">
					{{formatDate(order.create_time)}} &nbsp;&nbsp;&nbsp;&nbsp;订单号:{{order.order_no}}
				</view>
			</view>
			<view class="order-info">
				<view class="order-left">
					<image :src="domain+order.course_img" mode=""></image>
				</view>
				<view class="order-right">
					<view class="course-title">
						{{order.course_title}}
					</view>
					<view class="course-price">
						&yen;{{order.pro_price}} <text>{{order.ori_price}}</text>
					</view>
				</view>
			</view>
			<view v-if="order.is_pay==0" class="deal-order">
				<view class="true-price">实付:<text>&yen;{{order.fee}}</text></view>
				<view class="cancel-order">取消订单</view>
				<view @click="toPay" class="pay-order">立即支付</view>
			</view>
			<view v-if="order.is_pay==1 && order.is_comment==0" class="deal-order">
				<view class="true-price">实付:<text>&yen;{{order.fee}}</text></view>
				<view class="cancel-order">已付款</view>
				<view @click="toComment" class="pay-order">去评价</view>
			</view>
			<view v-if="order.is_comment==1" class="deal-order">
				<view class="true-price">实付:<text>&yen;{{order.fee}}</text></view>
				<view class="cancel-order">已完成</view>
				
			</view>
			

		</view>
	
		
	</view>
</template>

<script>
	export default {

		
		props:['orders','domain'],
		data() {
			return {
				domain:''
			};
		},
		methods:{
			toPay:function(){
				uni.navigateTo({
					url:'../pay/pay'
				})
			},
			toComment:function(){
				uni.navigateTo({
					url:'../comment/comment'
				})
			},
			formatDate:function(timestamp) {
			  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			          var Y = date.getFullYear() + '-';
			          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
			          var D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
			          var h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
			          var m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
			          var s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
			          return Y+M+D+h+m+s;
			}
		}
		
	}
</script>

<style>
.course-order{
	margin-top: 80rpx;
}
.order-tip{
	font-size: 20rpx;
	color: #808080;
	padding: 20rpx;
}
.order{
	border-bottom: 20rpx solid #F5F5F5;
}
.order-info{
	display: flex;
	padding: 20rpx;
	border-bottom: 2rpx solid #F5F5F5;
}
.order-left image{
	width: 250rpx;
	height: 140rpx;
	border-radius: 20rpx;
}
.order-right view{
	padding:10rpx;
}
.course-title{
		font-size: 26rpx;
		
		color: #808080;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical
}
.course-price{
	font-size: medium;
	color: #808080;
}
.course-price text{
	padding-left: 20rpx;
	text-decoration: line-through;
	font-size: small;
}
.deal-order{
	display: flex;
	height: 84rpx;
	line-height: 84rpx;
	font-size: small;
}

.true-price{
	padding-left: 20rpx;
	color: #808080;
}
.true-price text{
	font-size: medium;
	color: #FE601A;
}
.cancel-order{
	margin-left: auto;
	border: 4rpx solid #c5cbdb;
	height: 40rpx;
	line-height: 40rpx;
	padding: 0 20rpx;
	margin-top: 3%;
	color:#c5cbdb;
}
.pay-order{
	margin-left: auto;
	border: 4rpx solid #FE601A;
	height: 40rpx;
	line-height: 40rpx;
	padding: 0 20rpx;
	margin: 3%;
	color:#FE601A;
}
</style>
