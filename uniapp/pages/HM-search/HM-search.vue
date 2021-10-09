<template>
	<view class="content">
		<!-- 1.搜索框 start-->
		<view class="search-box">
			<view class="input-box">
				<view class="input-view">
					<uni-icons style="line-height: 30px;" type="search" size="22" color="#666666" />
					<!-- （重要）关键字keyword  1. v-model="keyword" 2.@input="inputChange" 3. @confirm="doSearch(false) -->
					<input type="text" focus placeholder="请输入搜索内容"
						v-model="keyword" @confirm="doSearch(false)" 
						confirm-type="search" class="nav-bar-input">
				</view>
			</view>
			
		</view>
		<!-- 搜索框 end -->
		<view class="search-keyword">
			<!-- 2.搜索的内容显示 有高亮-->
			<!-- <scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
				<block v-for="(row,index) in keywordList" :key="index">
					<view  hover-class="keyword-entry-tap">
						<view  @tap.stop="doSearch(keywordList[index].keyword)">
							<view class="con">
								<navigator :url="'../detail/detail?courseId='+row.row.id">

									<view class="course-right">
										<image :src="domainUpload+row.row.imgurl"></image>
									</view>

									<view class="course-left">
										<view class="course-title">
											<rich-text :nodes="row.htmlStr"></rich-text>
										</view>

										<view class="course-rate">
											<view>
												<uni-rate :size="10" allowHalf="true" readonly="true" :value="5" />
											</view>
											<text class="rate-tip">5分</text>
											<text class="study-p">{{row.row.readCount}}人学过</text>
										</view>

										<view class="course-price">
											<text class="pro-price"> &yen;{{row.row.price}}</text>
											<text class="ori-price">&yen;2000</text>
										</view>

									</view>

								</navigator>
							</view>
						</view>
					</view>
				</block>

			</scroll-view> -->
			<!-- 2.搜索的内容有高亮end -->
			<scroll-view class="keyword-box"  scroll-y>
				<!-- 3. 历史搜索 -->
				<view class="keyword-block" v-if="oldKeywordList.length>0">
					<view class="keyword-list-header">
						<view>历史搜索</view>
						<view>
							<image @tap="oldDelete" src="/static/HM-search/delete.png"></image>
						</view>
					</view>
					<view class="keyword">
						<view v-for="(keyword,index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">
							{{keyword}}
						</view>
					</view>
				</view>
				<!-- 4. 热门搜索 -->
				<view class="keyword-block">
					<view class="keyword-list-header">
						<view>热门搜索</view>
						<view>
							<image @tap="hotToggle" :src="'/static/HM-search/attention'+forbid+'.png'"></image>
						</view>
					</view>
					<view class="keyword" v-if="forbid==''">
						<view v-for="(keyword,index) in hotKeywordList" @tap="doSearch(keyword)" :key="index">
							{{keyword}}
						</view>
					</view>
					<view class="hide-hot-tis" v-else>
						<view>当前搜热门搜索已隐藏</view>
					</view>
				</view>
				<!-- 2.搜索的内容显示 没高亮-->
				<scroll-view   scroll-y>
					<block v-for="(row,index) in keywordList" :key="index">
						<view  hover-class="keyword-entry-tap">
							<view  @tap.stop="doSearch(row.title)">
								<view class="con">
									<navigator :url="'../detail/detail?courseId='+row.id">
										<view class="course-right">
											<image :src="domainUpload+row.imgurl"></image>
										</view>
				
										<view class="course-left">
											<view class="course-title">
												<!-- <rich-text :nodes="row.htmlStr"></rich-text> -->
												<text>{{row.title}}</text>
											</view>
				
											<view class="course-rate">
												<view>
													<uni-rate :size="10" allowHalf="true" readonly="true" :value="5" />
												</view>
												<text class="rate-tip">5分</text>
												<text class="study-p">{{row.readCount}}人学过</text>
											</view>
				
											<view class="course-price">
												<text class="pro-price"> &yen;{{row.price}}</text>
												<text class="ori-price">&yen;2000</text>
											</view>
				
										</view>
				
									</navigator>
								</view>
							</view>
						</view>
					</block>
				
				</scroll-view>
				<!-- 2.搜索的内容end -->
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	/*
	1. 调用搜索接口 
	   a. 通过 input 文本框 v-model="keyword"
	   b. @input 事件  调用 搜索接口 fn方法
	      或
	   c. watch 监听 keyword 变化重复调用搜索接口fn方法
	   
	2. 历史搜索记录:
	   (1)封装 saveStorage方法本地存储 搜索的内容:在哪调用
	   a. input 文本框   @confirm="saveStorage"
	   b. 点击历史搜索的标题 调用saveStorage方法，修改keyword值实现新的搜索接口调用
	   c. 点击热门搜索的标题 调用saveStorage方法，修改keyword值实现新的搜索接口调用
	   d. 点击搜素详情内容 调用saveStorage方法，修改keyword值实现新的搜索接口调用
	   小功能: 重复的标题  filter 查询到删除然后 unshift添加到最前面
	   (2) 删除本地存储
	   
	3. 热门搜索（选做）
	
	*/
	export default {
		data() {
			return {
				keyword: "", // 关键
				oldKeywordList: [], //历史搜索
				hotKeywordList: [],//热门搜索
				keywordList: [],
				forbid: '',  // 显示隐藏热门搜索变量
				domainUpload: this.common.getConfig('domainUpload')
			}
		},
		onLoad() {
			this.loadOldKeyword();  //初始化历史搜索
			this.loadHotKeyword();  //初始化热门搜索
			
		},
		watch: {
		    keyword() {  // 监听keyword
		      this.inputChange(); //调用搜索接口
		    },
		},
		methods: {
			blur() {
				uni.hideKeyboard()
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			loadHotKeyword() {
				//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
				this.hotKeywordList = ['vue3框架', 'express', 'koa2', 'Mongodb', 'Mysql'];
			},
			//监听输入
			async inputChange(event) {
				let keyword = this.keyword || '';
				await this.common.get('/api/search/' + keyword, []).then((res) => {
					//this.keywordList = [];
					console.log(res.data)
					//调用高亮关键字算法（可以不要）
					//this.keywordList = this.drawCorrelativeKeyword(res.data, keyword);
					//console.log(this.keywordList);
					this.keywordList = res.data;
				})
			},
			//高亮关键字
			drawCorrelativeKeyword(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row['title'].replace(keyword, "<span style='color: #f60;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row['title'],
						htmlStr: html,
						row: row
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//清除历史搜索
			oldDelete() {
				// uni.showModel  确认面板
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			//执行搜索
			doSearch(keyword) {
				keyword = keyword === false ? this.keyword : keyword;
				this.keyword = keyword;
				this.saveKeyword(keyword); //本地存储保存为历史 
				// uni.showToast({
				// 	title: keyword,
				// 	icon: 'none',
				// 	duration: 2000
				// });
				
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				//小功能: 重复的标题  filter 查询到删除然后 unshift添加到最前面
				uni.getStorage({  // 获得本地存储
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data); //转对象
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({  // 存储 OldKeys 键, 存的都是字符串(注意注意)
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			}
		}
	}
</script>
<style>
	view {
		display: block;
	}

	.search-box {
		width: 95%;
		background-color: rgb(242, 242, 242);
		padding: 15upx 2.5%;
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0;
	}

	.search-box .mSearch-input-box {
		width: 100%;
	}

	.search-box .input-box {
		width: 100%;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search-box .search-btn {
		width: 15%;
		margin: 0 0 0 2%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		font-size: 28upx;
		color: #fff;
		background: linear-gradient(to right, #3cc51f, #3cc000);
		border-radius: 10upx;
	}

	.search-box .input-box>input {
		width: 100%;
		height: 60upx;
		font-size: 32upx;
		border: 0;
		border-radius: 10upx;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		padding: 0 3%;
		margin: 0;
		background-color: #ffffff;
	}

	.placeholder-class {
		color: #9e9e9e;
	}

	.search-keyword {
		width: 100%;
		background-color: rgb(242, 242, 242);
	}

	.keyword-list-box {
		height: calc(100vh - 110upx);
		padding-top: 10upx;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
	}

	.keyword-entry-tap {
		background-color: #eee;
	}

	.keyword-entry {
		width: 100%;
		height: 250upx;
		margin: 0 0 0 3%;
		font-size: 30upx;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1upx #e7e7e7;
	}
	.keyword-box {
		height: calc(100vh - 110upx);
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
	}

	.keyword-box .keyword-block {
		padding: 10upx 0;
	}

	.keyword-box .keyword-block .keyword-list-header {
		width: 94%;
		padding: 10upx 3%;
		font-size: 27upx;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.keyword-box .keyword-block .keyword-list-header image {
		width: 40upx;
		height: 40upx;
	}

	.keyword-box .keyword-block .keyword {
		width: 94%;
		padding: 3px 3%;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}

	.keyword-box .keyword-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		font-size: 28upx;
		color: #6b6b6b;
	}

	.keyword-box .keyword-block .keyword>view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 60upx;
		padding: 0 20upx;
		margin: 10upx 20upx 10upx 0;
		height: 60upx;
		font-size: 28upx;
		background-color: rgb(242, 242, 242);
		color: #6b6b6b;
	}

	.con {
		display: flex;
		flex-direction: column;
		padding: 20rpx 5rpx;
	}

	.con navigator {
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
</style>
