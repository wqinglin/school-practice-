<template>
	<view>
		<!-- 1.  视频-->
		<view class="course-img">
			<video :autoplay="isPlay" id="myVideo" :poster="poster" :src="videoSrc" controls></video>
		</view>

		<view class="course-content">
			<!-- 2.1 tab 滚动标题 -->
			<view class="tab" :class="{'is-fix':isFix}">
				<view @click="chaTab(0)" :class="{active:tab_index==0}">介绍</view>
				<view @click="chaTab(1)" :class="{active:tab_index==1}">目录</view>
				<view @click="chaTab(2)" :class="{active:tab_index==2}">评价</view>
			</view>
			<!-- 2.2 tab 滚动切换内容 swiper -->
			<swiper @change="chaSwiper" :current="cur" :style="{height:swiperHeight+'px'}">
				<swiper-item>
					<view class="intro">
						<courseIntro :intr="courseIntr" @coupon="showCoupon">
						</courseIntro>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="catalog">
						<courseCatalog :catlogs="catlogs" @getUrl="videoUrl"></courseCatalog>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="comment">
						<courseComment :comments="courseIntr.comment"></courseComment>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 3.购物车 -->
		<view class="course-footer">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="toIndex"
				@buttonClick="toBuy" />
		</view>

		<!-- 领卷层 -->
		<view class="popup service" :class="serviceClass">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer">
				<view class="content">
					<view class="box">
						<view ref="mycoupon" class="coupon-item" v-for="item in courseIntr.coupon">

							<view class="coupon-money">
								<view class="nick">{{item.coupon_name}}使用</view>
								<view class="layof" :style="{color:theme}">￥{{item.coupon_fee}}</view>
								<view class="end_time">
									{{new Date(item.from_time).toLocaleDateString()}}-{{new Date(item.to_time).toLocaleDateString()}}前使用
								</view>
								<view>
									<view class="demand">{{item.total_fee}}</view>
								</view>
							</view>
							<button v-if="item.isFlag" class="get-btn" :disabled="true"
								style="background:#f60;color:#fff">已领取</button>
							<button v-if="!item.isFlag" @click="getCoupon(item.id)" class="get-btn isGet"
								style="background:#f60;color:#fff">未领取</button>
						</view>

					</view>
				</view>
				<view class="btn">
					<view class="button" @tap="hideCoupon">完成</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import courseIntro from '../../components/courseIntro.vue'
	import courseComment from '../../components/courseComment.vue'
	import courseCatalog from '../../components/courseCatlog.vue'
	export default {
		data() {
			return {
				isSelectCoupon: [],
				theme: '#f60',
				msg: '领取优惠卷',
				serviceClass: '', //show  , hide    none弹窗css类，控制开关动画
				courseId: null,
				courseIntr: '',
				catlogs: [],
				isPlay: false, // 自动播放
				videoSrc: '', // 视频路径
				poster: '', // 视频海报
				tab_index: 0, // 标题索引
				cur: 0, //  内容索引
				swiperHeight: '', // 每隔页面的高度值
				isFix: false, //菜单的固定定位
				id: '',
				scrollTop: '',
				videoContext: '',

				options: [{
					icon: 'shop',
					text: '课程',
				}],
				buttonGroup: [{
					text: '立即购买',
					backgroundColor: '#3cc51f',
					color: '#fff'
				}]
			}
		},
		onLoad: function(options) {
			this.courseId = options.courseId; // 接收课程编号

			// 获得已取优惠劵接口,  couponId  存在，修改  (已领取，未领取，变量的状态)
			this.common.post('/api/getCoupon/').then((res) => {
				this.isSelectCoupon = res.data;

			})
			// 获得课程接口
			uni.showLoading();
			this.common.get('/api/getCourseDetail/' + this.courseId).then((res) => {
				uni.hideLoading();
				this.courseIntr = res.data;
				this.poster = this.common.getConfig('domainUpload') + res.data.imgurl
				this.videoSrc = this.common.getConfig('domainUpload') + res.data.video_src
				if (this.isSelectCoupon) {
					this.courseIntr.coupon.filter((item, index, self) => {
						let n = this.isSelectCoupon.some((item2) => {
							return item2.couponId == item.id
						})
						if (n) {
							return item.isFlag = true

						} else {
							return item.isFlag = false
						}
					})
				}
				//console.log(this.courseIntr.coupon);
			})
			// 第一次调用目录接口
			this.getCatlog();



		},

		onPageScroll: function(e) {
			// 菜单固定定位
			this.scrollTop = e.scrollTop

			this.getTabTop('tab')
		},

		onReady: function() {
			this.getSwiperHeight('intro');
		},
		components: {
			courseIntro,
			courseComment,
			courseCatalog
		},

		watch: {
			tab_index(val) { // tab 卡的 索引 tab_index 
				// 调用目录接口
				// if(val== 1){
				// 	this.getCatlog();
				// }
				this.selCal(val);

			}
		},
		methods: {
			getCoupon: function(id) {
				var that = this
				uni.getStorage({
					key: 'userInfo',
					success: function(result) {
						that.common.post('/api/storeCoupon/' + id).then((res) => {
							if (res.code == 1) {
								that.courseIntr.coupon.forEach((item, index, self) => {
									if (item.id == id) {
										item.isFlag = true
									}
								})
								console.log(that.courseIntr.coupon);
							}
							that.$forceUpdate(); // 渲染重新劵的循环
						
						})
					},
					fail: function() {
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
				})

			},
			//服务弹窗
			showCoupon(x) {
				console.log(x);
				this.serviceClass = x; // show
			},
			//关闭服务弹窗
			hideCoupon() {
				this.serviceClass = 'hide';
				setTimeout(() => {
					this.serviceClass = 'none';
				}, 200);
			},
			async getCatlog(val) { // 获得目录的接口
				uni.showLoading({
					title: '加载中'
				})
				await this.common.get('/api/getCourseCatlog/' + this.courseId).then((res) => {
					uni.hideLoading();
					console.log(res.data)
					this.catlogs = res.data;
					this.selCal(val);
				})
			},
			videoUrl: function(url) {
				this.videoSrc = this.common.getConfig('domainUpload') + url
				this.videoContext = uni.createVideoContext('myVideo')
				this.videoContext.play()
				this.isPlay = true
			},

			toIndex: function() {
				uni.switchTab({
					url: '../index/index'
				})
			},

			toBuy: function() {
				var that = this
				uni.getStorage({
					key: 'userInfo',
					success: function(res) {
						that.common.post('/api/getPayCourse/' + that.courseId).then((res) => {
							if (res.code == 1) {
								//生成订单，获得订单号
								uni.setStorage({ //缓存用户登陆状态
									key: 'courseNoInfo',
									data: res.data
								})
								uni.navigateTo({
									url: '/pages/pay/pay'
								})
							}

						})
					},
					fail: function() {
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
				})
			},

			chaTab(index) {
				this.tab_index = index
				this.cur = index
				//this.getCatlog();
				//this.selCal(index) // 获得每页的高度
			},
			chaSwiper(e) {
				this.tab_index = e.detail.current // 当前滚动 内容索引
				//this.getCatlog();
				//this.selCal(e.detail.current) // 重新计算高度

			},

			selCal: function(index) {
				if (index == 0) {
					this.getSwiperHeight('intro'); //  intro,catalog,comment 类名称，目的拿DOM
				}
				if (index == 1) {
					this.getSwiperHeight('catalog');
				}
				if (index == 2) {
					this.getSwiperHeight('comment');
				}

			},

			getTabTop: function(cal) {
				const query = uni.createSelectorQuery().in(this);
				query.select('.' + cal).boundingClientRect(data => {
					//console.log(data.top);
					if (data.top <= 0) {
						this.isFix = true
					}

					if (this.scrollTop <= 205) {
						this.isFix = false
					}

				}).exec();
			},


			getSwiperHeight: function(cal) {
				const query = uni.createSelectorQuery().in(this);
				query.select('.' + cal).boundingClientRect(data => { // 获得盒子的坐标  等同于 offsetTop,offsetLeft, 
					// top left right bottom widheightth,height
					this.swiperHeight = data.height + 50

				}).exec();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.isGet {
		background-color: #FFFFFF !important;
		color: #F60 !important;
	}

	.course-img video {
		height: 400rpx;
		width: 750rpx;
	}

	.tab {
		display: flex;
		height: 84rpx;
		width: 100%;
		border-bottom: 2rpx solid #F5F5F5;
		background-color: #FFFFFF;
	}

	.tab view {
		width: 33.3%;
		text-align: center;
		height: 84rpx;
		line-height: 84rpx;
		font-size: medium;
	}

	.active {
		color: #4CD964;
		border-bottom: 2rpx solid #4CD964;
	}

	.is-fix {
		position: fixed;
		top: 0;
		z-index: 999;
	}

	.course-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		border-top: 2rpx solid #F5F5F5;
	}

	@keyframes showPopup {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes hidePopup {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-100%);
		}
	}

	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}

		100% {
			transform: translateY(0);
		}
	}

	.icon {
		font-size: 26upx;
	}


	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		display: none;

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}

		.layer {
			position: fixed;
			z-index: 22;
			bottom: -70%;
			width: 92%;
			padding: 0 4%;
			height: 70%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;

			.content {
				width: 100%;
				padding: 20upx 0;
			}

			.btn {
				width: 100%;
				height: 100upx;

				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f47952;
					font-size: 28upx;
				}
			}
		}

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		&.service {
			.row {
				margin: 30upx 0;

				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}
			}
		}


	}


	.box {
		width: 85%;
		margin: 0 20rpx;
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
