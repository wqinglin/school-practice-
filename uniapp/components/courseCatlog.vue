 <template>
	<view>

		<uni-collapse>
		    <uni-collapse-item  :open="true" v-for="courseTitle in catlogs" :key="courseTitle.title"  :title="courseTitle.title">
		        <view @click="videoUrl(catlog.id)" v-for="catlog in courseTitle.catlog" class="course-title" :key="catlog.catlog_title" >
					<view class="video-icon"><uni-icons type="videocam" size="18"></uni-icons></view>
					<view class="">{{catlog.catlog_title}}</view>
					<view class="course-status">
						<image v-show="catlog.is_free==0" src="../static/icon/lock.png" mode=""></image>
						<text v-show="catlog.is_free==1">试看</text>
					</view>
					
		        </view>
		    </uni-collapse-item>
		
		</uni-collapse>
		
	</view>
</template>

<script>
	export default {
		props:['catlogs'],
		data() {
			
			return {
				
			};
			
			
		},
		methods:{
			videoUrl:function(id){
				//判断 是否登录  还要在判断  是否购买
				var that = this
				uni.getStorage({
					key:'userInfo',
					success:function(result){
						that.common.post('/api/getVideoUrl/'+id).then((res)=>{
							if(res.code==803){  // 没有购买视频
								uni.showToast({
									title:res.msg,
									icon:'none'
								})
							}else{
								that.$emit('getUrl',res.data.video_url)
							}
							
						})
						
					},
					fail:function(){
						uni.showModal({
							content:'还没登录?先去登录吧',
							success:function(res){
								if(res.confirm){
									uni.navigateTo({
										url:'../login/login'
									})
								}else if(res.cancel){
									return false
								}
							}
						})
					}
				})


				//this.$emit('getUrl',url)
			}
		}
	}
</script>

<style>
	.course-title{
		background-color: #FFFFFF;
		font-size: small;
		padding: 24rpx;
		height: 50rpx;
		line-height: 50rpx;
		display: flex;
	}
	.video-icon{
		/* #ifdef H5 */
		padding: 4rpx 6rpx;
		/* #endif */
		/* #ifdef APP-PLUS || MP-WEIXIN */
		padding-right:  6rpx;
		/* #endif */
	}
	.course-status{
		margin-left: auto;
	}
	.course-status text{
		font-size: smaller;
		color: #49AF4F;
	}
	.course-status image{
		width: 30rpx;
		height: 30rpx;
	}
 
</style>
