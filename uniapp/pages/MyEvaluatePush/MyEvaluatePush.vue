<template>
	<view class="page">
		<view class="evaluate-goods">
			<view class="list">
				<view class="picture">
					<image :src="domainUpload+cImgurl"></image>
					<view style="display: block; width: 500px;">
						{{title}}
					</view>
				</view>

				<view class="item">
					<view class="star-list">
						<view class="star">
							课程评分:<uni-rate value="5" allowHalf="true" size="20" @change="ratechange"></uni-rate>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--填写-->
		<view class="input-info">
			<view class="input-text">
				<textarea placeholder="感觉怎么？跟大家分享一下吧~" v-model="content"></textarea>
				<view class="record-text">
					<text>已写</text>
					<text class="ac">12</text>
					<text>个字</text>
				</view>
			</view>
			<view class="anonymous">
				<radio-group @change="getCheck">
					<radio class="radio" color="green" style="transform:scale(0.7)" value="1" :checked="isChecked==1">
					</radio>
				</radio-group>
				<text>匿名评价</text>
			</view>
		</view>
		<!--上传图片-->
		<view class="upload-img">
            <!-- 视频 -->
			<easy-upload :uploadCount="1" types="video" @successVideo="successvideo"
				uploadIcon="https://mmcfile.hiroop.com/miniprogram/takeCamera.png" style="display: inline-block;" />
			<!-- 图像 -->
			<easy-upload :uploadCount="3" types="image" @successImage="successImage" style="display: inline-block;" />
		</view>
		<!--提交-->
		<view class="submit-btn" @click="comment">
			<view class="btn">
				<text>提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	import easyUpload from '@/components/easy-upload/easy-upload.vue'
	export default {
		components: {
			easyUpload
		},
		data() {
			return {
				isChecked: 0,
				rate: 5,
				content: '',

				imgurls: [],
				videourl: [],
				title: '',
				course_id: null,
				cImgurl: '',
				orderId: null,
				domainUpload: ''
			}
		},
		async onLoad(params) {
			this.domainUpload = this.common.getConfig('domainUpload');
			this.course_id = params.courseId;
			this.cImgurl = params.imgurl;
			this.title = params.title;
			this.orderId = params.orderId;
			console.log(params)
		},
		methods: {
			getCheck(e) {
				console.log(e);
				this.isChecked = e.detail.value;
			},
			ratechange(e) {
				console.log(e)
				this.rate = e.value;
			},
			successImage(e) {
				console.log(e) // 图的路径
				this.imgurls.push(e);
			},
			successvideo(e) {
				console.log(e) // 视频的路径
				this.videourl.push(e);
			},
			async comment() {
				let datas = {};
				datas = {
					orderId: this.orderId,
					course_id: this.course_id,
					anonymous: this.isChecked,
					rate: this.rate,
					content: this.content,
					imgurls: this.imgurls,
					video_url: this.videourl
				}
				console.log(datas)
				await this.common.post("/api/comment", datas).then((res) => {
					uni.switchTab({
						url: '/pages/my/my'
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "MyEvaluatePush.scss";
</style>
