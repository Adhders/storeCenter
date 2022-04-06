<template>
	<view class="container">
		<tui-navigation-bar isCustom :isOpacity="false" backgroundColor="#e41f19" @init="initHeader">
			<view class="tui-header" :style="{ height: height - top + 'px' }">
				<view :style="{ width: width + 'px' }" class="tui-flex__center">
					<view class="tui-back__box" @tap="back"><tui-icon name="arrowleft" color="#fff"></tui-icon></view>
					<view class="tui-searchbox tui-search-mr" @tap="search">
						<icon type="search" :size="13" color="#fff"></icon>
						<text class="tui-search-text">搜索本店</text>
					</view>
				</view>
			</view>
		</tui-navigation-bar>
        <view :style="{ marginTop: height+'px', position: 'relative' }">
			<tui-tabs
				@change="change"
				:currentTab="current"
				:tabs="tabs"
				itemWidth="25%"
				backgroundColor="#e41f19"
				color="rgba(255,255,255,.7)"
				selectedColor="#fff"
				sliderBgColor="#fff"
				bottom="8rpx"
				unlined
				class="tui-goods-tabs"
				:size="30"
				:sliderWidth="60"
			></tui-tabs>

			<tui-loading v-if="loadding"></tui-loading>
	
            <block>
				<tui-no-data v-if="displayList.length===0" 
					imgUrl="https://system.chuangbiying.com/static/images/index/img_nodata.png">
						您还没有添加商品
				</tui-no-data>
				<view v-else>
					<!--=======商品=======-->
					<view>
						<view class="tui-header__screen" v-if="current == 0">
							<view class="tui-screen__item" :class="{ 'tui-screen__active': screenType == 1 }" @tap="screen(1)">综合</view>
							<view class="tui-screen__item" :class="{ 'tui-screen__active': screenType == 2 }" @tap="screen(2)">销量</view>
							<view class="tui-screen__item" :class="{ 'tui-screen__active': screenType == 3 }" @tap="screen(3)">
								<text>价格</text>
								<view class="tui-screen__price">
									<view class="tui-price__asc">
										<tui-icon name="turningup" :color="screenType == 3 && sortWay == 'asc' ? '#E32424' : '#000'" :size="24" unit="rpx"></tui-icon>
									</view>
									<view class="tui-price__desc">
										<tui-icon name="turningdown" :color="screenType == 3 && sortWay == 'desc' ? '#E32424' : '#000'" :size="24" unit="rpx"></tui-icon>
									</view>
								</view>
							</view>
							<view class="tui-screen__item" @tap="screen(4)">
								<tui-icon :name="isList ? 'manage' : 'listview'" :size="isList ? 44 : 34" unit="rpx" :bold="isList ? false : true" color="#333"></tui-icon>
							</view>
						</view>

						<!--list-->
						<view class="tui-product-list tui-padding" :class="{'tui-goods-list': current == 0 }">
							<view class="tui-product-container">
								<block v-for="(item, index) in displayList" :key="index">
									<!-- <template is="productItem" data="{{item,index:index,isList:isList}}" /> -->
									<!--商品列表-->
									<view class="tui-pro-item" :class="[isList ? 'tui-flex-list' : '']" hover-class="tui-hover" :hover-start-time="150" @tap="detail" v-if="(index + 1) % 2 !== 0 || isList">
										<image :src="item.defaultImageUrl" class="tui-pro-img" :class="[isList ? 'tui-proimg-list' : '']" mode="widthFix" />
										<view class="tui-pro-content">
											<view class="tui-pro-tit">{{ item.title }}</view>
											<view>
												<view class="tui-pro-price">
													<text class="tui-sale-price">￥{{ item.price }}</text>
													<text class="tui-factory-price">￥{{ item.costPrice }}</text>
												</view>
												<view class="tui-pro-pay" v-if="current!==3">{{ item.salesNum }}人付款</view>
											</view>
										</view>
									</view>
									<!--商品列表-->
								</block>
							</view>
							<view class="tui-product-container" v-if="!isList">
								<block v-for="(item, index) in displayList" :key="index">
									<view class="tui-pro-item" :class="[isList ? 'tui-flex-list' : '']" hover-class="tui-hover" :hover-start-time="150" @tap="detail" v-if="(index + 1) % 2 == 0">
										<image :src="item.defaultImageUrl" class="tui-pro-img" :class="[isList ? 'tui-proimg-list' : '']" mode="widthFix" />
										<view class="tui-pro-content">
											<view class="tui-pro-tit">{{ item.title }}</view>
											<view>
												<view class="tui-pro-price">
													<text class="tui-sale-price">￥{{ item.price }}</text>
													<text class="tui-factory-price">￥{{ item.costPrice }}</text>
												</view>
												<view class="tui-pro-pay" v-if="current!==3">{{ item.salesNum }}人付款</view>
											</view>
										</view>
									</view>
								</block>
							</view>
						</view>

						<!--list-->
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import tRtPopup from '@/components/views/t-rt-popup/t-rt-popup';
export default {
	components: {
		tRtPopup
	},
	data() {
		return {
			width: 350,
			height: 64,
			top: 20,
			tabs: [
				{
					name: '销售中'
				},
				{
					name: '待上架'
				},
				{
					name: '已售罄'
				},
				{
					name: '上新'
				}
			],
			current: 0,
			loadding: true,
			isList: false,
			screenType: 1,
			sortWay: '', 
			displayList: [],
			goodsList: [],
		};
	},
	onLoad(options){
		let url = '/getStoreGoods/' + this.$store.state.appid
		this.tui.request(url,'GET', undefined, true).then((res)=>{
			console.log('res', res)
			this.displayList = res.goodsList
			this.loadding = false
			this.goodsList = res.goodsList
			this.current = (options.currentTab)? parseInt(options.currentTab): 0
			this.isList = this.current!==0
			this.switchTab(this.current)
		})
	}, 
	methods: {
		back() {
			uni.navigateBack();
		},
		initHeader(e) {
			console.log('e', e)
			this.width = Number(e.left);
			this.height = Number(e.height);
			this.top = Number(e.top);
		},
		search() {
			this.tui.href('../../news/search/search');
		},
		change(e) {
			this.current = e.index;
			console.log('current', this.current)
			this.isList = this.current!==0
			this.switchTab(this.current)
		},
        switchTab(v){
			switch(v){
				case 0: {
					this.displayList = this.goodsList.filter((o)=>{
						return o.isPutAway
					})
					break;
				}
				case 1: {
					this.displayList = this.goodsList.filter((o)=>{
						return !o.isPutAway
					})
					break;
				}
				case 2: {
					this.displayList = this.goodsList.filter((o)=>{
						return o.stock===0
					})
					break;
				}
				case 3: {
					this.displayList = this.goodsList.filter((o)=>{
					let new_date = new Date() //新建一个日期对象，默认现在的时间
					let old_date = new Date(o.putAwayDate) //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期

					let difftime = (new_date - old_date)/1000
					let days = parseInt(difftime/86400)
						return days < 3
					})
					break;
				}
			}
		},  
		rankingChangeTab(index) {
			this.rankingTab = index;
		},
		screen(index) {
			if (index === 4) {
				this.isList = !this.isList;
			} else {
				this.screenType = index;
				if(index ===2 ){
					this.displayList.sort((a,b)=>{ return b.salesNum - a.salesNum })
				}
				if(index === 3 ){
					this.sortWay = (this.sortWay==='desc')? 'asc' : 'desc'
					if(this.sortWay==='desc'){
						this.displayList.sort((a,b)=>{ return b.price - a.price})
					}else{
						this.displayList.sort((a,b)=>{ return a.price - b.price})
					}
				}
			}
		},
		detail() {
			this.tui.href('../productDetail/productDetail');
		},
		shop() {
			this.tui.href('../shopDetail/shopDetail');
		},
		product() {
			this.tui.href('../productList/productList');
		}
	}
};
</script>

<style>
.tui-header {
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0 8rpx;
	box-sizing: border-box;
}

.tui-searchbox {
	flex: 1;
	height: 64rpx;
	margin-right: 30rpx;
	border-radius: 15px;
	font-size: 12px;
	background: rgba(255, 255, 255, 0.5);
	padding: 3px 10px;
	box-sizing: border-box;
	color: #ffffff;
	display: flex;
	align-items: center;
}

.tui-search-text {
	padding-left: 16rpx;
}

.tui-back__box {
	padding-right: 12rpx;
	padding-left: 4rpx;
	flex-shrink: 0;
}

.tui-menu__box {
	padding-right: 26rpx;
	padding-left: 24rpx;
	flex-shrink: 0;
}

.tui-flex__center {
	display: flex;
	align-items: center;
}

.tui-btn__follow {
	margin-left: auto;
}

.tui-follow__text {
	padding-left: 6rpx;
}

.tui-padding {
	width: 100%;
	padding: 80rpx 25rpx 30rpx;
	box-sizing: border-box;
}
.tui-flex {
	display: flex;
	align-items: center;
}
.tui-goods-tabs {
    position: fixed;
    background: #e41f19;
    z-index: 1000 !important;
}

/*========推荐 start=========*/
/* .tui-ranking__header {
	width: 100%;
	padding: 30rpx 4rpx 24rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
}

.tui-ranking__title {
	font-size: 30rpx;
}

.tui-ranking__tabs {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 26rpx;
	color: #999;
}

.tui-ranking__tabs view {
	margin-left: 40rpx;
}

.tui-ranking__active {
	color: #000;
	position: relative;
	transition: all 0.1s;
}

.tui-ranking__active::after {
	content: ' ';
	width: 60%;
	position: absolute;
	border-bottom: 2px solid #eb0909;
	border-radius: 4px;
	left: 20%;
	bottom: -10rpx;
}

.tui-ranking__list {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.tui-justify__start {
	justify-content: flex-start !important;
}

.tui-item-mr__16 {
	margin-right: 16rpx;
}

.tui-ranking__item {
	width: 224rpx;
	border-radius: 12rpx;
	overflow: hidden;
	background-color: #fff;
	padding-bottom: 20rpx;
	box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
}

.tui-ranking__item image {
	width: 224rpx;
	height: 224rpx;
	display: block;
}

.tui-ranking__gtitle {
	font-size: 24rpx;
	line-height: 24rpx;
	padding: 24rpx 12rpx 8rpx;
	box-sizing: border-box;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.tui-ranking__sub {
	font-size: 25rpx;
	line-height: 25rpx;
	padding: 8rpx 18rpx 8rpx;
	transform: scale(0.8);
	transform-origin: 0 center;
	color: #999;
}  */

/* .tui-rg__title {
	width: 98%;
	font-size: 26rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.tui-rg__attr {
	font-size: 24rpx;
	color: #999;
	background-color: #f5f5f5;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 6rpx 16rpx;
	border-radius: 20px;
	transform: scale(0.8);
	transform-origin: 0 center;
	margin-top: 12rpx;
}

.tui-rg__interested {
	font-size: 24rpx;
	margin-top: 12rpx;
}

.tui-interested__num {
	padding-left: 8rpx;
	color: #999;
} */

/*=======推荐 end=======*/

/*========商品 start======*/

.tui-header__screen {
	width: 100%;
	height: 80rpx;
	display: flex;
    position: fixed;
    z-index: 1000;
	align-items: center;
	background-color: #ffffff;
	box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
}
.tui-screen__item {
	flex: 1;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
}
.tui-screen__active {
	color: #eb0909;
}
.tui-screen__price {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	position: relative;
}
.tui-screen__price view {
	position: absolute;
	left: 0;
}
.tui-price__asc {
	bottom: -14rpx;
}
.tui-price__desc {
	top: -14rpx;
}

.tui-product-list {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	flex-wrap: wrap;
	box-sizing: border-box;
	padding-top: 90rpx;
}

.tui-goods-list {
	margin-top: 80rpx
}

.tui-product-container {
	flex: 1;
	margin-right: 10rpx;
}

.tui-product-container:last-child {
	margin-right: 0;
}

.tui-pro-item {
	width: 100%;
	margin-bottom: 10rpx;
	background: #fff;
	box-sizing: border-box;
	border-radius: 12rpx;
	overflow: hidden;
	transition: all 0.15s ease-in-out;
}

.tui-flex-list {
	display: flex;
	/* margin-bottom: 1rpx !important; */
}

.tui-pro-img {
	width: 100%;
	display: block;
	flex-shrink: 0;
}

.tui-proimg-list {
	width: 260rpx;
	height: 260rpx !important;
	flex-shrink: 0;
	border-radius: 12rpx;
}

.tui-pro-content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 20rpx;
}

.tui-pro-tit {
	color: #2e2e2e;
	font-size: 26rpx;
	word-break: break-all;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}

.tui-pro-price {
	padding-top: 18rpx;
}

.tui-sale-price {
	font-size: 34rpx;
	font-weight: 500;
	color: #eb0909;
}

.tui-factory-price {
	font-size: 24rpx;
	color: #a0a0a0;
	text-decoration: line-through;
	padding-left: 12rpx;
}

.tui-pro-pay {
	padding-top: 10rpx;
	font-size: 24rpx;
	color: #656565;
}
/*======商品======= end*/
</style>
