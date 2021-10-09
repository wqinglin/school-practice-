<template>
	<view class="cat">
		<!-- 分类标题 -->
		<view class="cat-left">
			<view :class="{'active':cat_id==cat.id}" @click="getCourse(cat.id)" v-for="cat in cats" :key="cat.id">
				{{cat.name}}
			</view>
		</view>
        <!-- 通过分类编号拿对应的内容 -->
		<view class="cat-right">
			<view class="course" v-for="course in courseList" :key="course.id">
				<navigator :url="'../detail/detail?courseId='+course.id">
					<view>
						<image :src="domainUpload+course.imgurl"></image>
					</view>
					<view>
						<view class="course-title">{{course.title}}</view>
						<view class="course-price">
							&yen;{{course.price}}
							<text class="study-p">{{course.readCount}} 人学过</text>
						</view>
					</view>
				</navigator>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				cats: [],
				courseList: [],
				cat_id: '',  // 分类的编号索引
				domainUpload: ''
			}
		},
		onShow: function() {
			this.domainUpload = this.common.getConfig('domainUpload')
			// 获得分类标题
			this.getCategory();
		},
		methods: {
			async getCategory(){
				await this.common.get('/api/cates', []).then((res) => {
					console.log(res.data);
					this.cats = res.data;
					// 通过分类编号查找 对应的商品， 第一次 cate_id 拿 第一个分类编号 res.data[0].id
					this.getCourse(res.data[0].id);
				})	
			},
			async getCourse(id) {
				this.cat_id = id; // 动态分类编号赋值
				// 通过分类编号查找 对应的商品接口
				await this.common.get('/api/goodsbycateId/'+id).then((res) => {
					if (res.code == 1) {
						console.log(res.data);
						this.courseList = res.data
					}

				})



			}
		}
	}
</script>

<style scoped>
	page {
		height: 100%;
	}

	.cat {
		display: flex;
		height: 100%;
	}

	.cat-left {
		background-color: #F5F5F5;
		width: 25%;
		height: 100%;
		position: fixed;
	}

	.cat-left view {
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: small;
	}

	.active {
		background-color: #fff;
		border-left: 4rpx solid #4CD964;
		color: #4CD964;
	}

	.cat-right {
		margin-left: 25%;

	}

	.course navigator {
		display: flex;
		padding: 20rpx;
		border-bottom: 2rpx solid #F5F5F5;
	}

	.course image {
		width: 226rpx;
		height: 120rpx;
		border-radius: 10rpx;
	}

	.course-title {
		font-size: small;
		padding-left: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical
	}

	.course-price {
		padding-left: 10rpx;
		color: #FE601A;
		font-weight: bold;
		/* #ifdef APP-PLUS || MP-WEIXIN */
		padding-top: 20rpx;
		/* #endif */
	}

	.study-p {
		color: #959595;
		font-size: 20rpx;
		margin-left: 20rpx;
	}
</style>
