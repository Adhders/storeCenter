<template>
	<view class="container">
		<tui-tab :tabs="tabs" :isFixed="scrollTop>=0" :current="currentTab" selectedColor="#E41F19" sliderBgColor="#E41F19"
		 @change="change"></tui-tab>
		<!--选项卡逻辑自己实现即可，此处未做处理-->
    	<tui-loading v-if="loadding"></tui-loading>
		<view :class="{'tui-order-list':scrollTop>=0}" v-else>
			<view class="tui-order-item" v-for="(order, orderIndex) in displayList" :key="orderIndex">
				<tui-list-cell :hover="false" :lineLeft="false" padding="10rpx 30rpx">
					<view class="tui-goods-title">
						<view style="display: flex; align-items: center">
							<image :src="order.avatarUrl" class="tui-avatar" @tap="userInfo(order.openid)"></image>
							<view class="tui-customer-name">{{order.nickName}}</view>
						</view>
						<view>
							<view class="tui-order-status">{{order.status}}</view>
						</view>
					</view>
				</tui-list-cell>
				<block v-for="(item,index) in order.goodsList" :key="index">
					<tui-list-cell padding="0" @tap="detail(order)">
						<view class="tui-goods-item">
							<image :src=item.defaultImageUrl class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name">{{item.title}}</view>
								<view class="tui-goods-attr">{{item.propertyList | getProperty}}</view>
							</view>
							<view class="tui-price-right">
								<view>￥{{item.price}}</view>
								<view>x{{item.buyNum}}</view>
							</view>
						</view>
					</tui-list-cell>
				</block>
				<tui-list-cell :hover="false" unlined>
					<view class="tui-goods-price">
						<view>共{{order.goodsList | getNum}}件商品 实付：</view>
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">{{order.netCost.toFixed(2).split('.')[0]}}</view>
						<view class="tui-size-24">.{{order.netCost.toFixed(2).split('.')[1]}}</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-btn">
					<!-- <view class="tui-btn-ml">
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @click="invoiceDetail">查看发票</tui-button>
					</view>  -->
					<view class="tui-btn-ml">
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @click="detail(order)">查看详情</tui-button>
					</view> 
					<view class="tui-btn-ml" v-if="order.status==='待发货'">
						<tui-button type="danger" plain width="152rpx" height="56rpx" :size="26" shape="circle" @click="delivery(order)">发货</tui-button>
					</view>
				</view>
			</view>
			<tui-no-data v-if="displayList.length===0" :fixed="false"
						 imgUrl="https://system.chuangbiying.com/static/images/index/img_noorder.png">
				您还没有相关的订单</tui-no-data>
		</view>
		<!--加载loadding-->
		<tui-loadmore v-if="loaddingMore" :index="3" type="red"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn" backgroundColor="#fafafa"></tui-nomore>
		<!--加载loadding-->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [ "全部", "待付款",  "待发货"],
       			loadding: true,
				displayList: [],
				selectedOrder: null,
				selectedImg: '',
				currentTab: 0,
				pageIndex: 1,
				isShow: false,
				isDelete: false,
				loaddingMore: false,
				pullUpOn: true,
				scrollTop: 0,
				
			}
		},
		onLoad(option){
			console.log('option', option)
			let url = '/getStoreOrder/' + this.$store.state.appid
			this.tui.request(url,'GET', undefined, true).then((res)=>{
                this.loadding = false
				this.$store.commit('setOrderList', res.orderList)
				this.currentTab= (option.currentTab)? parseInt(option.currentTab): 0
				console.log('currentTab', this.currentTab)
				this.switchTab(this.currentTab)
			})
		},
		computed: {
			orderList(){
				return this.$store.state.orderList
			}
		},
		filters: {
			getPrice(price) {
				price = price || 0;
				return price.toFixed(2)
			},
			getProperty(attr) {
				let str = ''
				attr.forEach(o=>{
					str = str + o.value + '，'
				})
				return str.slice(0,-1)
			},
			getNum(goodsList) {
				let res = 0
				goodsList.forEach((o)=>{
					res += o.buyNum
				})
				return res
			}
		},
		methods: {
			getTime(time){
				const expireTime = 24*60*60*1000 //一天后过期
				let t1 = Date.parse(new Date(time)) + expireTime
				let t2 = Date.parse(new Date())
				return (t1-t2)/1000
			},
			isVisible(state){
				return state.findIndex(o=>{return o.count===1}) !==-1
			},
			change(e) {
				this.currentTab = e.index
				this.switchTab(this.currentTab)
			},
			switchTab(v){
				switch(v){
					case 0: {
						this.displayList = this.orderList
						break;
					}
					case 1: {
						this.displayList = this.orderList.filter((o)=>{
							return o.status==="待支付"
						})
						break;
					}
					case 2: {
						this.displayList = this.orderList.filter((o)=>{
							return o.status==="待发货"
						})
						break;
					}
				}
			},
			delivery(order){
				thi.tui.totast("待开发")
			},
			detail(order) {
				console.log('order', order)
				this.$store.commit('setTargetOrder', order)
				uni.navigateTo({
					url: '/pages/my/orderDetail/orderDetail'
				})
			},
			userInfo(openid){
				console.log('openid', openid)

			},
			invoiceDetail(){
				this.tui.href('/pages/my/invoiceDetail/invoiceDetail')
			},
			onPullDownRefresh() {
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 200);
			},
			onReachBottom() {
				//只是测试效果，逻辑以实际数据为准
				this.loaddingMore = true
				this.pullUpOn = true
				setTimeout(() => {
					this.loaddingMore = false
					this.pullUpOn = false
				}, 1000)
			},
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			}
		}
	}
</script>

<style lang="less">
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-order-list {
		margin-top: 80rpx;
	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-avatar {
		flex-shrink: 0;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		display: block;
	}

	.tui-countdown__box {
		width: 228rpx;
		display: flex;
		align-items: center;

		color: #fff;
		background-color: #fff;
		font-weight: 400;
		border: 1rpx solid #eb0909;
		height: 40rpx;
		border-radius: 30px;
		overflow: hidden;
		margin-left: 25rpx;
	}
	.tui-countdown__title {
		width: 100rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #eb0909;
		flex-shrink: 0;
		font-size: 24rpx;
		line-height: 24rpx;
	}
	.tui-flex__center {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tui-title-cell{
		padding: 10rpx 30 rpx

	}
	
	.tui-customer-name{
		font-size: 26rpx;
		margin-left: 5px;
	}
    
	.tui-order-status {
		color: rgb(228, 31, 25);
		font-size: 26rpx;
		margin-left: 5px;
	}

	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx 0;
		box-sizing: border-box;
	}

	.tui-goods-name {
		width: 90%;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}
	.tui-color-red {
		color: #E41F19;
		padding-right: 30rpx;
	}
	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 24rpx;
	}
	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}
	.tui-price-large {
		font-size: 32rpx;
		line-height: 30rpx;
		font-weight: 500;
	}
	.tui-order-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #fff;
		padding: 0 30rpx 20rpx;
		box-sizing: border-box;
	}
	.tui-btn-ml {
		margin-left: 20rpx;
	}
	.tui-tips-img{
		width: 300rpx;
		height: 300rpx;
		margin: 0 auto;
		display: block;
	}
	.tips-title{
		display: block;
		text-align: center;
		padding: 20px 0;
		.subTitle{
			margin-top: 5px;
			font-size: 14px;
			color: #999;
		}
	}
	.btn-block {
		display: flex;
		justify-content: space-between;
		.btn{
			width: 46% !important;
		}
		.btn.cancel{
			background: #ededed !important;
    		color: #999 !important;
		}
	}
</style>

