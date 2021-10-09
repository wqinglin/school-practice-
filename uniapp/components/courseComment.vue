<template>
	<view>
		<view class="rate">
			<view class="">综合评分</view>
			<view class="z-rate">
				<uni-rate size="20" value="4" readonly="true" allowHalf="true"></uni-rate>
			</view>
		</view>
		<view>
			<view class="comment-tip">全部评价</view>
			
			<view v-for="comment in comments" :key="comment.id" class="course-comment">
				
				<view class="comment-left">
					<image :src="comment.user.avatar"></image>
				</view>
				
				<view class="comment-right">
					<view class="comment-info">
						<view class="mobile" v-if="comment.anonymous==0">{{doMobile(comment.user.mobile)}}</view>
						<view class="mobile" v-if="comment.anonymous==1">{{comment.user.username}}</view>
						<view class="rate-time">
							<view class="comment-rate"><uni-rate size="10" :value="comment.rate"></uni-rate></view>
							<view class="time">{{comment.createdAt}}</view>
						</view>
					</view>
					
					<view class="comment-content">
						{{comment.content}}
					</view>
					
				</view>
				
				
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		props:['comments'],
		data() {
			return {
			};
			
		},
		methods:{
			doMobile:function(mobile){
				var str = mobile.slice(3,7)
				return mobile.replace(str,'****')
			}
		}
		
	}
</script>

<style>
.rate{
	background-color: #F5F5F5;
	height: 100rpx;
	width: 96%;
	margin: 0 auto;
	border-radius: 20rpx;
	margin-top: 10rpx;
	padding: 10rpx;
	display: flex;
	line-height: 100rpx;
}
.z-rate{
	padding-top: 30rpx;
	padding-left: 30rpx;
}
.comment-tip{
	padding: 20rpx;
	font-size: small;

}
.course-comment{
	display: flex;
	border-top: 2rpx solid #F5F5F5;
}
.comment-left image{
	width: 80rpx;
	height: 80rpx;
	padding: 20rpx;
}
.comment-info{
	display: flex;
	padding:20rpx;
} 
.mobile{
	font-size: 20rpx;
	padding-top: 20rpx;
	margin-left: -20rpx !important;
}
.comment-rate{
	padding-top:18rpx;
}
.time{
	font-size: 18rpx;
	color: #959595;
}
.rate-time{
	margin-left: auto;
}
.comment-content{
	font-size: 20rpx;
	width: 640rpx;
	padding-bottom: 24rpx;
}
</style>
