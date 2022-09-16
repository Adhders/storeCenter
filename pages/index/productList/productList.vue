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
			<tui-loading v-if="loadding"></tui-loading>
            <block>
				<tui-no-data v-if="displayList.length===0" 
					imgUrl="https://system.chuangbiying.com/static/images/index/img_nodata.png">
						没有相关商品
				</tui-no-data>
				<view v-else>
					<view class="tui-product-list tui-padding">
						<view class="tui-product-container">
							<block v-for="(item, index) in displayList" :key="index">
								<tui-swipe-action :actions="item.isPutAway? actions1 : actions2" @click="itemClick($event, item)" >
									<template v-slot:content>
										<view class="tui-pro-item tui-flex-list" hover-class="tui-hover" :hover-start-time="150">
											<image :src="item.defaultImageUrl" class="tui-pro-img tui-proimg-list"  mode="aspectFill" />
											<view class="tui-pro-content">
												<view class="tui-pro-tit">{{ item.title }}</view>
												<view class="tui-pro-price">
													<text class="tui-sale-price">￥{{ item.price }}</text>
													<text class="tui-factory-price">￥{{ item.originalPrice }}</text>
												</view>
												<view class="tui-flex__center tui-gray">
													<view>销量 {{item.salesNum }}</view>
													<view>库存 {{item.stock}}</view>
													<tui-bubble-popup :show="showIndex===index" class="bubble-popup" backgroundColor="#656565"
														maskBgColor="transparent" position="absolute" direction="bottom" @close="onClose" width="130rpx"
														  translateY="-100%" triangleRight="30rpx" triangleBottom="-22rpx">
														<view class="tui-menu-item" @click="onCopy(item)">复制</view>
														<view class="tui-menu-item" @click="onEdit(item)">编辑</view>
													</tui-bubble-popup>
													<tui-icon name="more-fill" size="22" @click="showIndex=index" style="height: 34rpx"></tui-icon>
												</view>
											</view>
										</view>
									</template>
								</tui-swipe-action>
							</block>
						</view>
					</view>
				</view>
			</block>
		</view>
		<tui-modal :show="modal" color="#333"  :content="content" @click="handle"></tui-modal>
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
			targetIndex: '',
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
			displayList: []
		};
	},
	onLoad(options){
		this.user = uni.getStorageSync("pid")
		this.store_id = uni.getStorageSync("store_id")
		let url = '/queryGoods/' + this.user + '/' + this.store_id
		this.tui.request(url,'GET').then((res)=>{
			this.displayList = res.goodsList
			this.loadding = false
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
				if(this.targetIndex==0){
					this.targetItem.isPutAway=!this.targetItem.isPutAway
					let url = '/updateGoods/' + this.user + '/' + this.store_id + '/status'
					this.tui.request(url, 'PUT', {id: [this.targetItem.id], 'isPutAway': this.targetItem.isPutAway}).then(
						()=>{
							let index = this.goodsList.findIndex((val)=>{ return this.targetItem.id == val.id })
							this.goodsList[index].isPutAway=this.targetItem.isPutAway
							this.targetItem = ''
							this.targetIndex = ''
						})
				}else{
					let url =  '/deleteGoods/' + this.user + '/' + this.store_id
					this.tui.request(url, 'DELETE', [this.targetItem.id]).then(()=>{
						let index = this.goodsList.findIndex((val)=>{ return this.targetItem.id == val.id })
						this.goodsList.splice(index, 1)
						this.targetItem = ''
						this.targetIndex = ''
					})
				}
			}
			this.modal = false
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
			console.log('e', e)
			this.showIndex = ''
		},
        switchTab(v){
			console.log('switch', v)
			switch(v){
				case 0: {
					this.displayList = this.goodsList
					break;
				}
				case 1: {
					this.displayList = this.goodsList.filter((o)=>{
						return o.isPutAway
					})
					break;
				}
				case 2: {
					this.displayList = this.goodsList.filter((o)=>{
						return !o.isPutAway
					})
					break;
				}
				case 3: {
					this.displayList = this.goodsList.filter((o)=>{
						o.stock===0
					})
					break;
				}
			}
		},  
		rankingChangeTab(index) {
			this.rankingTab = index;
		},
		itemClick(e, item){
			console.log('click', e, item)
			this.modal = true
			this.targetIndex = e.index
			this.targetItem = item
			if(e.index==0){
				this.content = `确定要${item.isPutAway? '下架': '上架'}该商品吗？`
			}
			else{
				this.content = '确定删除该商品吗？'
			}
		
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
	overflow: hidden;
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
	width: 180rpx;
	height: 180rpx !important;
	flex-shrink: 0;
	border-radius: 8rpx;
}

.tui-pro-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 10rpx 16rpx;
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
	right: 135rpx;
	bottom: 50rpx;
}
.tui-menu-item {
	width: 100%;
    padding: 16rpx 0;
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
