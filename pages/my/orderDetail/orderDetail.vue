<template>
	<view class="container">
		<tui-list-cell unlined :hover="false" style="margin-top: 20rpx">
			<view class="tui-flex-box">
				<image :src="webURL+'img_order_address3x.png'" class="tui-icon-img"></image>
				<view class="tui-addr">
					<view class="tui-addr-userinfo">{{order.address.userName}}
						<text class="tui-addr-tel">{{order.address.telNumber}}</text>
						<tui-icon name="voipphone" :size="16" color="#ff0000" margin="0 10rpx" @tap="onCall"></tui-icon>
					</view>
					<view class="tui-addr-text">{{ order.address.location + order.address.detailInfo  }}</view>
				</view>
			</view>
		</tui-list-cell>
		<view class="tui-order-item">
			<tui-list-cell :hover="false" :lineLeft="false">
				<view class="tui-goods-title">
					商品信息
				</view>
			</tui-list-cell>
			<t-order-item :order="order" type="detail"></t-order-item>
			<view class="tui-goods-info">
				<view class="tui-price-flex tui-size24">
					<view>商品总额</view>
					<view>￥{{order.totalCost}}</view>
				</view>
				<view class="tui-price-flex  tui-size24">
					<view>优惠券</view>
					<view style="display: inline-flex">
						<view class="tui-symbol">-</view>
						<view>￥{{order.discount}}</view>
					</view>
				</view>
				<view class="tui-price-flex  tui-size24">
					<view>配送费</view>
					<view style="display: inline-flex">
						<view class="tui-symbol">+</view>
						<view>￥{{order.shipping_fee}}</view>
					</view>
				</view>
				<view class="tui-size32">
					<view class="tui-goods-price tui-primary-color">
						<view class="tui-black">实付款<text class="tui-colon">:</text></view>
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">{{order.netCost.split('.')[0]}}</view>
						<view class="tui-size-24">.{{order.netCost.split('.')[1]}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="tui-order-info">
			<tui-list-cell :hover="false" :lineLeft="false">
				<view class="tui-order-title">
					订单信息
				</view>
			</tui-list-cell>
			<view class="tui-order-content">
				<view class="tui-order-flex">
					<view class="tui-item-title">订单号:</view>
					<view class="tui-item-content">{{order.orderNum}}</view>
				</view>
<!--				<view class="tui-order-flex">-->
<!--					<view class="tui-item-title">物流单号:</view>-->
<!--					<view class="tui-item-content">33655511251265578556</view>-->
<!--				</view>-->
				<view class="tui-order-flex">
					<view class="tui-item-title">创建时间:</view>
					<view class="tui-item-content">{{order.create_time}}</view>
				</view>
				<view class="tui-order-flex" v-if="order.payment_time">
					<view class="tui-item-title">付款时间:</view>
					<view class="tui-item-content">{{order.payment_time}}</view>
				</view>
				<view class="tui-order-flex" v-if="order.note">
					<view class="tui-item-title">订单备注:</view>
					<view class="tui-item-content">{{order.note}}</view>
				</view>
			</view>
		</view>
		<view class="tui-safe-area"></view>
		<view class="tui-tabbar tui-order-btn" v-if="order.status==='待发货'">
			<view class="tui-btn-mr">
				<tui-button type="danger" plain width="152rpx" height="56rpx" :size="26" shape="circle" @click="delivery(order)">发货</tui-button>
			</view>
		</view>
	</view>
</template>

<script>
	import tOrderItem from '@/components/views/t-order-item/t-order-item'
	export default {
		components: {
			tOrderItem
		},
		data() {
			return {
				webURL: "https://system.chuangbiying.com/static/images/mall/order/",
				//1-待付款 2-付款成功 3-待收货 4-订单已完成 5-交易关闭
				status: -1,
				show: false,
				address: {
					userName: '',
					cityName: '',
					telNumber: '',
					countyName: '',
					provinceName: '',
					detailInfo: ''
				},
				order: {
					note: '',
					discount: '0.00',
					totalCost: '0.00',
					netCost:  '0.00',
					shipping_fee: '0.00',
					goodsList: [],
					address: {'telNumber': ''}
				},
			}
		},
		onLoad(options){
			this.order = JSON.parse(decodeURIComponent(options.order))
			this.address = this.order.address
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

		},
		methods: {
			onCall: function() {
				// #ifdef MP-WEIXIN
				wx.makePhoneCall({
					phoneNumber: this.order.address.telNumber
				})
				// #endif
			},
			logistics() {
				this.tui.href("/pages/my/logistics/logistics")
			},
			delivery(order){
				
			}
		}
	}
</script>

<style>
	.container {
		padding-bottom: 118rpx;
	}

	.tui-order-header {
		width: 100%;
		height: 160rpx;
		position: relative;
		background-color: #EB0909;
	}

	.tui-img-bg {
		width: 100%;
		height: 160rpx;
	}

	.tui-header-content {
		width: 100%;
		height: 160rpx;
		position: absolute;
		z-index: 10;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 70rpx;
		box-sizing: border-box;
	}

	.tui-status-text {
		font-size: 34rpx;
		line-height: 34rpx;
		color: #FEFEFE;
	}

	.tui-reason {
		font-size: 24rpx;
		line-height: 24rpx;
		color: rgba(254, 254, 254, 0.75);
		padding-top: 15rpx;
		display: flex;
		align-items: center;
	}

	.tui-reason-text {
		padding-right: 12rpx;
	}

	.tui-status-img {
		width: 80rpx;
		height: 80rpx;
		display: block;
	}

	.tui-flex-box {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-icon-img {
		width: 44rpx;
		height: 44rpx;
		flex-shrink: 0;
	}

	.tui-logistics {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 24rpx 0 20rpx;
		box-sizing: border-box;
	}

	.tui-logistics-text {
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-logistics-time {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 16rpx;
		color: #666
	}

	.tui-addr {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.tui-addr-userinfo {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: bold;
	}

	.tui-addr-text {
		font-size: 24rpx;
		line-height: 32rpx;
		padding-top: 16rpx;
	}

	.tui-addr-tel {
		padding-left: 40rpx;
	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		line-height: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
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
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}
	.tui-black {
		color: #222;
	}
	.tui-colon{
		font-weight: 700;
		margin-right: 3px;
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
	}

	.tui-goods-info {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
	}

	.tui-price-flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-size24 {
		padding-bottom: 20rpx;
		font-size: 24rpx;
		line-height: 32rpx;
		color: #888;
	}
	.tui-symbol{
		margin-right: 3px;
		font-size: 30rpx
	}
	.tui-size32 {
		font-size: 32rpx;
		line-height: 32rpx;
		font-weight: 500;
	}

	.tui-primary-color {
		color: #EB0909;
	}

	.tui-order-info {
		margin-top: 20rpx;
	}

	.tui-order-title {
		position: relative;
		font-size: 28rpx;
		line-height: 28rpx;
		box-sizing: border-box;
	}
	.tui-order-content {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		background: #fff;
		font-size: 24rpx;
		line-height: 30rpx;
	}

	.tui-order-flex {
		display: flex;
		padding-top: 18rpx;
	}

	.tui-order-flex:first-child {
		padding-top: 0
	}

	.tui-item-title {
		width: 132rpx;
		color: #888888;
		flex-shrink: 0;
	}
	.tui-item-content {
		color: #222;
		line-height: 32rpx;
	}
	.tui-safe-area {
		height: 1rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-tabbar {
		width: 100%;
		height: 98rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 26rpx;
		box-shadow: 0 0 1px rgba(0, 0, 0, .3);
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 996;
	}

	.tui-btn-mr {
		margin-right: 30rpx;
	}
	.tui-contact{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
	}
	.tui-contact image{
		width: 36rpx;
		height: 36rpx;
		margin-right: 16rpx;
	}
</style>
