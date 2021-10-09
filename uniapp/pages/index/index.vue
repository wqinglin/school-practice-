<template>
	<view>
		<!-- 导航头部 -->
		<uni-nav-bar :class="isTop?'fixed':''" color="#fff" background-color="#3cc51f" right-icon="scan"
			@clickLeft="showCity" @clickRight="scan">
			<block slot="left">
				<view class="city">
					<view><text style="font-size: 14px">北京</text></view>
					<uni-icons type="arrowdown" color="#fff" size="22" />
				</view>
			</block>
			<view class="input-view">
				<uni-icons style="line-height: 30px;" type="search" size="22" color="#666666" />
				<input confirm-type="search" class="nav-bar-input" type="text" placeholder="1元好课" @click="toSearch">
			</view>
		</uni-nav-bar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="getCourseList"  @down="downCallback">

			<!-- 轮播图 -->
			<view class="swiper">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
					<swiper-item v-for="swiper in swipers" :key="swiper.id">
						<navigator :url="swiper.url">
							<view class="swiper-item">
								<image :src="domainUpload+swiper.imgurl" mode=""></image>
							</view>
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<!-- 二级导航 -->
			<scroll-view scroll-x style="width:100%">
				<view class="category-box">
					<view class="category-list" v-for="cate in cates" :key="cate.id">
						<view class="category-column">
							<image class="category-imgbox" :src="domainUpload+cate.imgurl"></image>
							<view class="category-title">{{cate.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 内容 -->
			<view class="con">
				<view class="course" v-for="course in courseList" :key="course.id">
					<navigator :url="'../detail/detail?courseId='+course.id">

						<view class="course-right">
							<image :src="domainUpload+course.imgurl"></image>
						</view>

						<view class="course-left">
							<view class="course-title">
								{{course.title}}
							</view>

							<view class="course-rate">
								<view>
									<uni-rate :size="10" allowHalf="true" readonly="true" :value="5" />
								</view>
								<text class="rate-tip"></text>
								<text class="study-p">{{course.readCount}}人学过</text>
							</view>

							<view class="course-price">
								<text class="pro-price"> &yen;{{course.price}}</text>
								<text class="ori-price">&yen;2000</text>
							</view>

						</view>

					</navigator>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				isTop: false,
				swipers: [],
				courseList: [],
				cates: [],
				domainUpload: ''
			}
		},
		onLoad() {
			this.domainUpload = this.common.getConfig('domainUpload');
			// 轮播图调用 
			this.getSwiper();
			
			// 二级导航
			this.getCates();
		},
		onShow() {

		},
		onPageScroll(e) {
			//console.log(e.scrollTop);
			if (e.scrollTop > 0) {
				this.isTop = true;
			} else {
				this.isTop = false;
			}
		},
		methods: {
			toSearch() {
				uni.navigateTo({
					url: '../HM-search/HM-search'
				})
			},
			// uni.request 请求接口（封装成promise对象）， 异步转同步 async... await 接口
			async getSwiper() {
				await this.common.get('/api/getswiper', []).then((res) => {
					console.log(res.data)
					this.swipers = res.data
				})

			},
			async getCourseList(page) {
				await this.common.get('/api/recommend?currentPage='+page.num, []).then((res) => {
					this.mescroll.endByPage(res.data.length, res.totalPage);
					if (page.num == 1) this.courseList = []; //如果是第一页需手动制空列表
					this.courseList = this.courseList.concat(res.data); //追加新数据
					console.log(page.num,page.size);

				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			async getCates() {
				await this.common.get('/api/cates', []).then((res) => {
					this.cates = res.data
				})
			}

		}
	}
</script>

<style>
	.fixed {
		position: fixed;
		width: 100%;
		top: 84rpx;
		/* #ifdef APP-PLUS || MP-WEIXIN */
		top: 0rpx;
		/* #endif */
		left: 0;
		z-index: 9999
	}

	

	.swiper-item image {
		width: 100%;
		/* #ifdef APP-PLUS || MP-WEIXIN */
		height: 260rpx;
		/* #endif */

		/* #ifdef H5 */
		height: 300rpx;
		/* #endif */

		/* border-radius: 20rpx; */
	}

	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 4px;
	}

	.input-view {
		display: flex;
		flex-direction: row;
		flex: 1;
		background-color: #f8f8f8;
		height: 30px;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}

	.nav-bar-input {
		height: 30px;
		line-height: 30px;
		width: 370rpx;
		padding: 0 5px;
		font-size: 14px;
		background-color: #f8f8f8;
	}

	.con {
		display: flex;
		flex-direction: column;
		padding: 20rpx 5rpx;
	}

	.course navigator {
		display: flex;
		border-bottom: 1px solid #F1F1F1;
	}

	.course-right image {
		width: 320rpx;
		height: 160rpx;
		border-radius: 20rpx;
	}

	.course-right {
		width: 60%;
		padding: 10rpx;
	}

	.course-left {
		width: 40%;
		padding: 10rpx;
	}

	.course-title {
		font-size: 26rpx;
		font-weight: bold;
		color: #313131;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical
	}

	.course-rate {
		display: flex;
		height: 50rpx;
	}

	.course-rate view {
		/* #ifdef H5 */
		padding-top: 8rpx;
		/* #endif */

		/* #ifdef MP-WEIXIN || APP-PLUS*/
		padding-top: 6rpx;
		/* #endif */
	}

	.rate-tip {
		font-size: 30rpx;
		/* #ifdef MP-WEIXIN || APP-PLUS */
		line-height: 58rpx;

		/* #endif */

		/* #ifdef H5 */
		line-height: 52rpx;

		/* #endif */
	}

	.study-p {
		margin-left: 10%;
		font-size: 20rpx;
		/* #ifdef MP-WEIXIN || APP-PLUS */
		line-height: 58rpx;

		/* #endif */
		/* #ifdef H5 */
		line-height: 52rpx;

		/* #endif */
		color: #959595;
	}

	.pro-price {
		font-weight: bold;
		color: #fe601a;
		font-size: 34rpx;
	}

	.ori-price {
		font-size: 28rpx;
		color: #959595;
		text-decoration: line-through;
		margin-left: 10%;
	}

	.category-box {
		width: 100%;
		/*子盒子要足够宽(重要)*/
		background-color: #fff;
		display: flex;
		/* flex-wrap: wrap; 去掉折行*/
	}

	.category-list {
		width: 33%;
		margin-top: 20rpx;

	}

	.category-column {
		width: 100%;
		margin-top: 20rpx;
		overflow: hidden;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.category-imgbox {
		width: 80rpx;
		height: 80rpx;
		margin: 0 auto; 
	}

	.category-title {
		font-size: 24rpx;
		margin-top: 10rpx;
		text-align: center;
	}
</style>
