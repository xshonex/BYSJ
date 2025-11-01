<template>
	<view class="">
		<!--
		设置搜索位置
		<view class="padding-lr padding-top-sm bg-white" @click.stop="goSearch">
			<u-search  placeholder="建筑设计公开课" v-model="keyword" shape="square" :show-action="false" :animation="true"></u-search>
		</view>
		-->
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper active-color="#5074FF" ref="tabs" :list="tabList" :current="current" @change="change"
					:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">

				<!-- 建筑设计 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view>
							<view class="padding-sm-1 bg-white">
								<u-swiper bg-color='#ffffff' :list="swiperList1" :effect3d="true" :height="800"></u-swiper>
							</view>
							<!--
							<u-grid :col="4" :border="false">
								<u-grid-item>
									<u-image width="90rpx" height="90rpx" src="@/static/images/index/热门课程@2x.png">
									</u-image>
									<view class="grid-text">热门课程</view>
								</u-grid-item>
								<u-grid-item>
									<u-image width="90rpx" height="90rpx" src="@/static/images/index/名师课堂@2x.png">
									</u-image>
									<view class="grid-text">名师课堂</view>
								</u-grid-item>
								
								<u-grid-item>
									<u-image width="90rpx" height="90rpx" src="@/static/images/index/特价优惠@2x.png">
									</u-image>
									<view class="grid-text">价格优惠</view>
								</u-grid-item>
								<u-grid-item>
									<u-image width="90rpx" height="90rpx" src="@/static/images/index/免费体验@2x.png">
									</u-image>
									<view class="grid-text">免费体验</view>
								
								</u-grid-item>
							</u-grid>
							
							<view class="flex margin-tb-sm margin-lr bg-white radius padding-lr-sm">
								<u-image width="54px" height="12px" src="../../static/images/index/最新公告@2x.png" class="margin-top-sm"></u-image>
								<u-notice-bar :volume-icon="false" class="flex-sub" type="none" mode="vertical" :list="noticeList"></u-notice-bar>
							</view>
							-->
							<view class="padding-lr">
								<!-- 
								<view class="flex justify-between margin-bottom-sm">
									<view class="text-black text-xl text-bold">推荐课程</view>
									<view class="text-gray">
										更多
										<u-icon name="arrow-right"></u-icon>
									</view>
								</view>
								-->
								<view class="flex justify-between flex-wrap">
									<view v-for="(item, index) in courseList1" :key="index" @click="goCourse1(item.id)" class="bg-white padding-sm radius margin-bottom-sm" style="width: 48%;">
										<u-image width="100%" mode="widthFix" :src="item.image"></u-image>
										<view class="text-bold text-black margin-top-sm u-line-1 text-xl">{{item.title}}</view>
										<u-tag class="margin-top-sm" :text="item.tag" mode="light" size="mini" bg-color="#FFEEE5" color="#FF5A00" border-color="#FF5A00" />
										<!--
										<view class="flex justify-between margin-top-sm">
											<view class="text-red text-bold text-lg">¥{{item.price}}</view>
											<view class="text-gray">{{item.munber}}人已学</view>
										</view>
										-->
									</view>
								</view>
							</view>
							
							
							
						</view>
					</scroll-view>
				</swiper-item>
				
				
				<!-- 结构设计 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view>
							<view class="padding-sm-2 bg-white">
								<u-swiper bg-color='#ffffff' :list="swiperList2" :effect3d="true" :height="800"></u-swiper>
							</view>
							
						
						<view class="padding-lr">
							<view class="flex justify-between flex-wrap">
								<view v-for="(item, index) in courseList2" :key="index" @click="goCourse2(item.id)" class="bg-white padding-sm radius margin-bottom-sm" style="width: 48%;">
									<u-image width="100%" mode="widthFix" :src="item.image"></u-image>
									<view class="text-bold text-black margin-top-sm u-line-1 text-xl">{{item.title}}</view>
									<u-tag class="margin-top-sm" :text="item.tag" mode="light" size="mini" bg-color="#FFEEE5" color="#FF5A00" border-color="#FF5A00" />

								</view>
							</view>
						</view>
						
						</view>
					</scroll-view>
				</swiper-item>
				
				
				
				<!-- 给排水设计 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view>
							<view class="padding-sm-3 bg-white">
								<u-swiper bg-color='#ffffff' :list="swiperList3" :effect3d="true" :height="800"></u-swiper>
							</view>

						<view class="padding-lr">
							<view class="flex justify-between flex-wrap">
								<view v-for="(item, index) in courseList3" :key="index" @click="goCourse3(item.id)" class="bg-white padding-sm radius margin-bottom-sm" style="width: 48%;">
									<u-image width="100%" mode="widthFix" :src="item.image"></u-image>
									<view class="text-bold text-black margin-top-sm u-line-1 text-xl">{{item.title}}</view>
									<u-tag class="margin-top-sm" :text="item.tag" mode="light" size="mini" bg-color="#FFEEE5" color="#FF5A00" border-color="#FF5A00" />

								</view>
							</view>
						</view>
						
						</view>
					</scroll-view>
				</swiper-item>
				
				
				<!-- 暖通设计 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view>
							<view class="padding-sm-4 bg-white">
								<u-swiper bg-color='#ffffff' :list="swiperList4" :effect3d="true" :height="800"></u-swiper>
							</view>
						
						<view class="padding-lr">
							<view class="flex justify-between flex-wrap">
								<view v-for="(item, index) in courseList4" :key="index" @click="goCourse4(item.id)" class="bg-white padding-sm radius margin-bottom-sm" style="width: 48%;">
									<u-image width="100%" mode="widthFix" :src="item.image"></u-image>
									<view class="text-bold text-black margin-top-sm u-line-1 text-xl">{{item.title}}</view>
									<u-tag class="margin-top-sm" :text="item.tag" mode="light" size="mini" bg-color="#FFEEE5" color="#FF5A00" border-color="#FF5A00" />

								</view>
							</view>
						</view>
						
						</view>
					</scroll-view>
				</swiper-item>
				
				
				
				<!-- 电气设计 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view>
							<view class="padding-sm-5 bg-white">
								<u-swiper bg-color='#ffffff' :list="swiperList5" :effect3d="true" :height="800"></u-swiper>
							</view>
						
						<view class="padding-lr">
							<view class="flex justify-between flex-wrap">
								<view v-for="(item, index) in courseList5" :key="index" @click="goCourse5(item.id)" class="bg-white padding-sm radius margin-bottom-sm" style="width: 48%;">
									<u-image width="100%" mode="widthFix" :src="item.image"></u-image>
									<view class="text-bold text-black margin-top-sm u-line-1 text-xl">{{item.title}}</view>
									<u-tag class="margin-top-sm" :text="item.tag" mode="light" size="mini" bg-color="#FFEEE5" color="#FF5A00" border-color="#FF5A00" />

								</view>
							</view>
						</view>
						
						</view>
					</scroll-view>
				</swiper-item>
				
				
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				tabList: [{
						name: '建筑设计'
					},
					{
						name: '结构设计'
					},
					{
						name: '给排水设计'
					},
					{
						name: '暖通设计'
					},
					{
						name: '电气设计'
					},
				],
				swiperList1: [{
						image: '/static/images/index/建筑设计推广1.jpg',
						title: '建筑设计推广1'
					},
					{
						image: '/static/images/index/建筑设计推广2.jpg',
						title: '建筑设计推广2'
					},
					{
						image: '/static/images/index/建筑设计推广3.jpg',
						title: '建筑设计推广3'
					}
				],
				swiperList2: [{
						image: '/static/images/index/结构设计推广1.jpg',
						title: '结构设计推广1'
					},
					{
						image: '/static/images/index/结构设计推广2.jpg',
						title: '结构设计推广2'
					},
					{
						image: '/static/images/index/结构设计推广3.jpg',
						title: '结构设计推广3'
					}
				],
				swiperList3: [{
						image: '/static/images/index/给排水设计推广1.jpg',
						title: '给排水设计推广1'
					},
					{
						image: '/static/images/index/给排水设计推广2.jpg',
						title: '给排水设计推广2'
					},
					{
						image: '/static/images/index/给排水设计推广3.jpg',
						title: '给排水设计推广3'
					}
				],
				swiperList4: [{
						image: '/static/images/index/暖通设计推广1.jpg',
						title: '暖通设计推广1'
					},
					{
						image: '/static/images/index/暖通设计推广2.jpg',
						title: '暖通设计推广2'
					},
					{
						image: '/static/images/index/暖通设计推广3.jpg',
						title: '暖通设计推广3'
					}
				],
				swiperList5: [{
						image: '/static/images/index/电气设计推广1.jpg',
						title: '电气设计推广1'
					},
					{
						image: '/static/images/index/电气设计推广2.jpg',
						title: '电气设计推广2'
					},
					{
						image: '/static/images/index/电气设计推广3.jpg',
						title: '电气设计推广3'
					}
				],
				
				// noticeList: ['各专业设计进阶第三期预约即将截止!'],
				
				// 从JSON文件导入课程数据
				...require('./courseData.json'),
				
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
				
			};
		},
		onLoad() {
			this.getOrderList(0);
		},
		methods: {
			goCourse1(e) {
				uni.navigateTo({
					url: '/pages/index/course/courseDet1?id=' + e
				});
			},
			goCourse2(e) {
				uni.navigateTo({
					url: '/pages/index/course/courseDet2?id=' + e
				});
			},
			goCourse3(e) {
				uni.navigateTo({
					url: '/pages/index/course/courseDet3?id=' + e
				});
			},
			goCourse4(e) {
				uni.navigateTo({
					url: '/pages/index/course/courseDet4?id=' + e
				});
			},
			goCourse5(e) {
				uni.navigateTo({
					url: '/pages/index/course/courseDet5?id=' + e
				});
			},
			
			/*
			跳转到搜索页面
			goSearch() {
				uni.navigateTo({
					url: '/pages/index/search/index'
				});
			},
			*/
			
			
			
			reachBottom() {
				// 此tab为空数据
				if (this.current != 2) {
					this.loadStatus.splice(this.current, 1, "loading")
					setTimeout(() => {
						this.getOrderList(this.current);
					}, 1200);
				}
			},
			// 页面数据
			getOrderList(idx) {

			},
			// 总价
			totalPrice(item) {
				let price = 0;
				item.map(val => {
					price += parseFloat(val.price);
				});
				return price.toFixed(2);
			},
			// 总件数
			totalNum(item) {
				let num = 0;
				item.map(val => {
					num += val.number;
				});
				return num;
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.getOrderList(index);
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		}
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	// .swiper-item {
	// 	height: 100%;
	// }
</style>
