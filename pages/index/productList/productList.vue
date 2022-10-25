<template>
	<view class="container">
		<!-- <tui-navigation-bar isCustom :isOpacity="false" @init="initHeader">
			<view class="tui-header" :style="{ height: height - top + 'px' }">
				<view class="tui-back__box" @tap.stop="back"><tui-icon name="arrowleft" color="#000"></tui-icon></view>
				<view class="tui-title">商品列表</view>
			</view>
		</tui-navigation-bar> -->
        <!-- <view :style="{ marginTop: height+'px', position: 'relative' }"> -->
		<view>
			<tui-tabs
				@change="change"
				:currentTab="current"
				:tabs="tabs"
				itemWidth="25%"
				selectedColor="#E41F19" 
				sliderBgColor="#E41F19"
				bottom="8rpx"
				unlined
				class="tui-goods-tabs"
				:size="30"
				:sliderWidth="60"
			></tui-tabs>
			<tui-no-data v-if="!loadding&& displayList.length===0" 
				imgUrl="https://system.chuangbiying.com/static/images/index/img_nodata.png">
					没有相关商品
			</tui-no-data>
			<view v-else>
				<view class="tui-product-list tui-padding">
					<view class="tui-product-container">
						<block v-for="(item, index) in displayList" :key="index">
							<view class="tui-pro-item tui-flex-list" hover-class="tui-hover" :hover-start-time="150" @click="onEdit(item)">
								<image :src="item.defaultImageUrl" class="tui-pro-img tui-proimg-list"  mode="aspectFill" />
								<view class="tui-pro-content">
									<view class="tui-pro-tit">{{ item.title }}</view>
									<view class="tui-pro-price">
										<text class="tui-sale-price">￥{{ item.price }}</text>
										<text class="tui-factory-price" v-if="item.originalPrice">￥{{ item.originalPrice }}</text>
									</view>
									<view class="tui-flex__center tui-gray">
										<view>销量 {{item.salesNum }}</view>
										<view>总库存 {{item.stock}}</view>
										<tui-bubble-popup :show="showIndex===index" class="bubble-popup" backgroundColor="#656565"
											maskBgColor="transparent" position="absolute" direction="bottom" @close="onClose" width="130rpx"
												translateY="-100%" triangleRight="30rpx" triangleBottom="-22rpx">
											<view class="tui-menu-item" @tap.stop="onCopy(item)">复制</view>
											<view class="tui-menu-item" @tap.stop="itemClick('putaway', item)">{{item.isPutAway? '下架': '上架'}}</view>
											<view class="tui-menu-item" @tap.stop="itemClick('delete', item)">删除</view>
										</tui-bubble-popup>
										<tui-icon name="more-fill" size="22" @tap.stop="onChoice(index)" style="height: 34rpx"></tui-icon>
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<tui-modal :show="modal" color="#333"  :content="content" @click="handle"></tui-modal>
		<!--加载loadding-->
		<tui-loadmore v-if="loaddingMore" :index="3" type="red"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn" backgroundColor="#fafafa"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>

<script>
export default {
	components: {
	},
	data() {
		return {
			showIndex: '',
			modal: false,
			targetItem: '',
			width: 350,
			height: 64,
			top: 20,
			tabs: [
				{
					name: '全部'
				},
				{
					name: '上架中'
				},
				{
					name: '已下架'
				},
				{
					name: '已售罄'
				}
			],
			mode: '',
			content: '确定删除该商品吗？',
			actions1: [
				{
					name: '下架',
					width: 64,
					color: '#fff',
					fontsize: 28,
					background: '#FFC600'
				},
				{
					name: '删除',
					color: '#fff',
					fontsize: 28,
					width: 64,
					background: '#F82400'
				}
			],
			actions2: [
				{
					name: '上架',
					width: 64,
					color: '#fff',
					fontsize: 28,
					background: '#FFC600'
				},
				{
					name: '删除',
					color: '#fff',
					fontsize: 28,
					width: 64,
					background: '#F82400'
				}
			],
			itemList: [
				{
					//不建议超过6个字，请自行控制
					text: '打赏作者',
					//自定义参数，类型自定义
					parameter: null
				},
				{
					text: '联系我们',
					//自定义参数，类型自定义
					parameter: null
				},
				{
					text: 'ThorUI文档',
					//自定义参数，类型自定义
					parameter: null
				}
			],
			current: 0,
			loadding: true,
			isList: false,
			screenType: 1,
			sortWay: '', 
			pageSize: 10,
			loaddingMore: false,
			pullUpOn: true,
			pageNum: 1,
			displayList: []
		};
	},
	onLoad(options){
		this.user = uni.getStorageSync("pid")
		this.store_id = uni.getStorageSync("store_id")
		let url = '/queryGoods/' + this.user + '/' + this.store_id
		this.tui.request(url).then((res)=>{
			this.displayList = res.goodsList
			this.loadding = false
			res.goodsList.forEach((goods)=>{
				let stock = 0
				goods.skuList.forEach((sku)=>{stock += parseInt(sku.stock)})
				goods.stock = stock
			})
			this.$store.commit('updateGoodsList', res.goodsList)
			this.current = (options.currentTab!=='undefined')? parseInt(options.currentTab): 0
			this.isList = this.current!==0
			this.switchTab(this.current)
		})
	}, 
	computed: {
		goodsList(v){
			return this.$store.state.goodsList
		}
	},
	watch:{
		goodsList:{
			deep: true,
			handler(v){
				this.switchTab(this.current)
				this.$forceUpdate()
			}
		}
	},
	methods: {
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		initHeader(e) {
			this.width = Number(e.left);
			this.height = Number(e.height);
			this.top = Number(e.top);
		},
		onChoice(e){
			this.showIndex=e
		},
		onEdit(e){
			this.showIndex = ''
			this.tui.href( '/pages/index/product/product?edit=true&product=' + encodeURIComponent(JSON.stringify(e)))
		},
		onCopy(e){
			this.showIndex = ''
			this.tui.href( '/pages/index/product/product?product=' + encodeURIComponent(JSON.stringify(e))) 
		},
		search() {
			this.tui.href('../../news/search/search');
		},
		handle(e){
			if(e.index==1){
				if(this.mode=='putaway'){
					this.targetItem.isPutAway=!this.targetItem.isPutAway
					let url = '/updateGoods/' + this.user + '/' + this.store_id + '/status'
					this.tui.request(url, 'PUT', {id: [this.targetItem.id], 'isPutAway': this.targetItem.isPutAway}).then(
						()=>{
							let index = this.goodsList.findIndex((val)=>{ return this.targetItem.id == val.id })
							this.goodsList[index].isPutAway=this.targetItem.isPutAway
							this.targetItem = ''
						})
				}else{
					let url =  '/deleteGoods/' + this.user + '/' + this.store_id
					this.tui.request(url, 'DELETE', [this.targetItem.id]).then(()=>{
						let index = this.goodsList.findIndex((val)=>{ return this.targetItem.id == val.id })
						this.goodsList.splice(index, 1)
						this.targetItem = ''
					})
				}
			}
			this.modal = false
			this.showIndex = ''
		},
		change(e) {
			this.current = e.index;
			this.isList = this.current!==0
			this.switchTab(this.current)
		},
		stop(){
			return false
		},
		onClose(e){
			this.showIndex = ''
		},
        switchTab(v){
			switch(v){
				case 0: {
					this.currentList = this.goodsList
					break;
				}
				case 1: {
					this.currentList = this.goodsList.filter((o)=>{
						return o.isPutAway
					})
					break;
				}
				case 2: {
					this.currentList = this.goodsList.filter((o)=>{
						return !o.isPutAway
					})
					break;
				}
				case 3: {
					this.currentList = this.goodsList.filter((o)=>{
						let index = o.skuList.findIndex((sku)=>{ return parseInt(sku.stock)<=0})
						return index!==-1
					})
					break;
				}
			}
			this.displayList = this.currentList.slice(0, this.pageSize)
			this.pageNum = 1
			this.pullUpOn = true
			this.loaddingMore = false
		},  
		rankingChangeTab(index) {
			this.rankingTab = index;
		},
		itemClick(mode, item){
			console.log('click', mode, item)
			this.modal = true
			this.targetItem = item
			if(mode=='putaway'){
				this.content = `确定要${item.isPutAway? '下架': '上架'}该商品吗？`
			}
			else{
				this.content = '确定删除该商品吗？'
			}
		
		}
	},
	onReachBottom() {
		if(!this.pullUpOn) return
		if(this.pageNum >= this.currentList.length/this.pageSize){
			setTimeout(() => {
				this.loaddingMore = false
				this.pullUpOn = false
			}, 300)
		}else{
			this.loaddingMore = true
			setTimeout(() => {
				this.pageNum = this.pageNum+1
				this.displayList = this.currentList.slice(0, this.pageSize*this.pageNum)
			}, 300)
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

.tui-back__box {
	padding-right: 12rpx;
	padding-left: 4rpx;
	flex-shrink: 0;
}
.tui-title {
	position: absolute;
    width: 100%;
    text-align: center;
}
.tui-flex__center {
	display: flex;
	align-items: center;
	display: flex;
    align-items: center;
    font-size: 24rpx;
    /* margin-top: 20rpx; */
    justify-content: space-between;
}
.tui-gray {
	color: #656565;
}

.tui-padding {
	width: 100%;
	padding: 80rpx 20rpx 20rpx;
	box-sizing: border-box;
}

.tui-goods-tabs {
    position: fixed;
    background: #e41f19;
    z-index: 1000 !important;
}

.tui-product-list {
	margin-top: 20rpx
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
	padding: 8rpx;
	background: #fff;
	box-sizing: border-box;
	transition: all 0.15s ease-in-out;
}

.tui-flex-list {
	display: flex;
}

.tui-pro-img {
	width: 100%;
	display: block;
	flex-shrink: 0;
}

.tui-proimg-list {
	width: 200rpx;
	height: 200rpx !important;
	flex-shrink: 0;
	border-radius: 8rpx;
}

.tui-pro-content {
	flex: 1;
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: space-between;
	padding: 0rpx 16rpx;
}

.tui-pro-tit {
	color: #2e2e2e;
	font-size: 28rpx;
	word-wrap: break-word;
    white-space:normal;
	word-break: break-all;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
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

/*======商品======= end*/
.bubble-popup {
	position: absolute;
	right: 124rpx;
	bottom: 34rpx;
}
.tui-menu-item {
	width: 100%;
    padding: 14rpx 0;
    text-align: center;
    position: relative;
}
.tui-menu-item:not(:last-child):after{
	content: "";
    position: absolute;
    border-bottom: 1px solid #eaeef1;
    transform: scaleY(.5);
    bottom: 0;
    right: 12px;
    left: 12px;
}
</style>
