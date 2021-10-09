<template>
	<view>
		<view class="upload">
			<block v-for="(upload,index) in uploads" :key="index">
				<view class="uplode-file">
					<image v-if="types == 'image'" class="uploade-img" :src="upload" :data-src="upload" @tap="previewImage"></image>
					<image v-if="types == 'image'" class="clear-one-icon" :src="clearIcon" @tap="delImage(index)"></image>
					<video v-if="types == 'video'" class="uploade-img" :src="upload" controls>
						<cover-image v-if="types == 'video'" class="clear-one-icon" :src="clearIcon" @tap="delImage(index)"></cover-image>
					</video>
				</view>
			</block>
			<view v-if="uploads.length < uploadCount" :class="uploadIcon ? 'uploader-icon' : 'uploader-input-box'">
				<view v-if="!uploadIcon" class="uploader-input" @tap="chooseUploads"></view>
				<image v-else class="image-cion" :src="uploadIcon" @tap="chooseUploads"></image>
			</view>
		</view>	
		
	</view>
</template>

<script>
	export default{
		props: {
			types: { // 视频还是图像
				type: String,
				default: 'image'
			},
			clearIcon: {
				type: String,
				default: 'https://mmcfile.hiroop.com/miniprogram/delete.png'
			},
			uploadIcon: {
				type: String,
				default: ''
			},
			uploadUrl: {
				type: String,
				default: 'http://localhost:3000/api/upload'
			},
			deleteUrl: {
				type: String,
				default: 'http://localhost:3000/api/delupload'
			},
			uploadCount: {
				type: Number,
				default: 1
			},
			//上传图片大小 默认3M
			upload_max: {
				type: Number,
				default: 3
			}
		},
		data(){
			return {
				myDataList:[],
				//展示的图片地址
				uploads: [],
				// 超出限制数组
				exceeded_list: [],
			}
		},
		methods:{
			previewImage (e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.uploads
				})
			},
			chooseUploads(){
				switch (this.types){
					case 'image': 
						uni.chooseImage({
							count: this.uploadCount - this.uploads.length, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album', 'camera'], //从相册选择
							success: (res) => {
								for(let i = 0; i< res.tempFiles.length; i++){
									if(Math.ceil(res.tempFiles[i].size / 1024) < this.upload_max * 1024*2){
										// 1.本地循环显示图或视频
										this.uploads.push(res.tempFiles[i].path)
										//2  图像上传
										this.uploadFile(res.tempFiles[i].path)
										
									}else {
										this.exceeded_list.push(i === 0 ? 1 : i + 1);
										uni.showModal({
											title: '提示',
											content: `第${[...new Set(this.exceeded_list)].join(',')}张图片超出限制${this.upload_max}MB,已过滤`
										});
									}
								}
							},
							fail: (err) => {
								uni.showModal({
									content: JSON.stringify(err)
								});
							}
						});
					break;
					case 'video' :
						uni.chooseVideo({
							sourceType: ['camera', 'album'],
							success: (res) => {
								if(Math.ceil(res.size / 1024) < this.upload_max * 1024*2){
									this.uploads.push(res.tempFilePath)
									uni.uploadFile({
										method:'post',
										url: this.uploadUrl, //仅为示例，非真实的接口地址
										filePath: res.tempFilePath,
										name: 'myfile',
										//请求参数
										formData: {
											'user': 'test'
										},
										success: (uploadFileRes) => {
											this.myDataList.push(uploadFileRes.data);
											this.$emit('successVideo',uploadFileRes.data)
										}
									});
								}else {
									uni.showModal({
										title: '提示',
										content: `第${[...new Set(this.exceeded_list)].join(',')}张视频超出限制${this.upload_max}MB,已过滤`
									});
								}
							},
							fail: (err) => {
								uni.showModal({
									content: JSON.stringify(err)
								});
							}
						});
					break;
				}
			},
			delImage(index){
				if(!this.deleteUrl) {
					uni.showModal({
						content: '请填写删除接口'
					});
					return;
				};
				uni.request({
					url: this.deleteUrl,
					method: 'post',
					data: {
						image:this.myDataList[index]
					},
					success: res => {
						console.log(res);
						if(res.data.code == 1) {
							uni.showToast({
								title: '删除成功'
							})
							//第一个是判断app或者h5的 第二个是判断小程序的
							if(this.uploads[index].substring(0,4) !== 'http' || this.uploads[index].substring(0,11) == 'http://tmp/'){
								this.uploads.splice(index,1)
								return;
							};
						}
					},
				});
			},
			uploadFile(path){
				uni.uploadFile({
					method:'post',
					url: this.uploadUrl, //仅为示例，非真实的接口地址
					filePath: path,
					name: 'myfile',
					//自定义请求参数
					formData: {
						'user': 'test'
					},
					success: (uploadFileRes) => {
						this.myDataList.push(uploadFileRes.data);
						this.$emit('successImage',uploadFileRes.data)
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.upload {
		display: flex;
		felx-wrap:wrap;
	}
	.uplode-file {
		margin: 10upx;
		width: 160upx;
		height:160upx;
		position: relative;
	}
	.uploade-img {
		display: inline-block;
		width: 160upx;
		height: 160upx;
	}
	.clear-one{
		position: absolute;
		top: -10rpx;
		right: 0;
	}
	.clear-one-icon{
		position: absolute;
		width: 16px;
		height: 16px;
		top: 0;
		right: 0;
		z-index: 9;
	}
	.uploader-input-box {
		position: relative;
		margin:10upx;
		width: 160upx;
		height: 160upx;
		border: 2upx solid #D9D9D9;
	}
	.uploader-input-box:before,
	.uploader-input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #D9D9D9;
	}
	.uploader-input-box:before {
		width: 4upx;
		height: 79upx;
	}
	.uploader-input-box:after {
		width: 79upx;
		height: 4upx;
	}
	.uploader-input-box:active {
		border-color: #999999;
	}
	.uploader-input-box:active:before,
	.uploader-input-box:active:after {
		background-color: #999999;
	}
	.uploader-input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.uploader-icon{
		position: relative;
		margin:10upx;
		width: 160upx;
		height: 160upx;
	}
	.uploader-icon .image-cion{
		width: 100%;
		height: 100%;
	}
</style>
