<template>
	<view class="page">
		<view class="head-back">
			<view class="back" @click="onBack">
			</view>
			<view class="more-icon">
				<view class="icon-list">
					<text class="iconfont icon-fadajing"></text>
				</view>
			</view>
		</view>
		<!-- 订单tab -->
		<view class="order-tab">
			<view class="tab" :class="{'action':OrderType==0}" @click="onOrderTab(0)">
				<text>全部</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==1}" @click="onOrderTab(1)">
				<text>待付款</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==2}" @click="onOrderTab(2)">
				<text>待发货</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==3}" @click="onOrderTab(3)">
				<text>待收货</text>
				<text class="line"></text>
			</view>
			<view class="tab" :class="{'action':OrderType==4}" @click="onOrderTab(4)">
				<text>待评价</text>
				<text class="line"></text>
			</view>
		</view>
		<!-- 订单列表 -->
		<view class="order-list">
			<view class="list" v-for="(item,index) in orderList" :key="index">
				<view class="title-status">
					<view class="title">
						<text>下单时间：{{item.createdAt.toLocaleString()}}</text>
					</view>
					<view class="status">
						<text>{{status(item.is_comment)}}</text>
						<text class="iconfont icon-laji del"></text>
					</view>
				</view>
				<view class="goods-list">
					<view class="goods">
						<view class="thumb">
							<image :src="domainUpload+item.course.imgurl" mode=""></image>
						</view>
						<view class="item">
							<view class="goods-name">
								<text class="two-omit">{{item.course.title}}</text>
							</view>
							<view class="goods-price">
								<text class="min">￥</text>
								<text class="max">{{item.fee}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="status-btn">
					<view class="btn">
						<text v-if="item.is_comment==1">取消订单</text>
					</view>
					<view v-if="item.is_comment==1" class="btn action">
						<text>去支付</text>
					</view>
					<view  v-if="item.is_comment==3" class="btn action">
						<text>确认收货</text>
					</view>
					<view  v-if="item.is_comment==4" class="btn action" @click.stop="onEvaluate(item)">
						<text>评价</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapMutations,
		mapGetters,
		
	} from 'vuex'
	export default {
		data() {
			return {
				domainUpload:'',
				OrderType: 0,
				orderList: []
			};
		},
		computed: {
			...mapGetters(['hasLogin', 'userInfo']),


		},
		onLoad(params) {
			this.domainUpload = this.common.getConfig('domainUpload');
			this.OrderType = params.type;
			this.getOrders();
		},
		methods: {
			status(status) {
				if (status == 1) {
					return "待付款";
				} else if (status == 2) {
					return "待发货";
				} else if (status == 3) {
					return "待收货";
				} else if (status == 4) {
					return "待评论";
				}else if (status == 5) {
					return "完成";
				}

			},
			/**
			 * 返回点击
			 */
			onBack() {
				uni.navigateBack();
			},
			/**
			 * 订单tab点击
			 */
			onOrderTab(type) {
				this.OrderType = type;
				// #ifdef H5
				uni.redirectTo({
					url: '/pages/orderList/orderList?type=' + type,
				})
				//#endif
			},
			async getOrders() {
				if (this.hasLogin) {
					await this.common.post('/api/getOrders/' + this.OrderType).then(res => {

						if (res.code == 1) {
							this.orderList = res.data;
							console.log(this.orderList);
						}
					});
				} else {
					uni.showModal({
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
				}
			},

			/**
			 * 评价点击
			 */
			onEvaluate(item) {
				uni.navigateTo({
					url: '/pages/MyEvaluatePush/MyEvaluatePush?orderId='+item.id+'&courseId='+item.courseId+'&imgurl='+item.course.imgurl+'&title='+ item.course.title
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'orderList.scss';
</style>