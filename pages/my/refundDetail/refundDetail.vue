<template>
	<view class="container">
		<view class="tui-order-header">
			<view class="tui-header-content">
				<view>
					<view class="tui-status-text">{{order.status}}</view>
					<view class="tui-reason" v-if="order.status==='退款成功'"><text class="tui-reason-text">退款原路退回 {{order.refund_time | formatDate}}</text></view>
				</view>
				<image :src="getImageUrl(order.status)" class="tui-status-img" mode="widthFix"></image>
			</view>
		</view>
		<tui-list-cell :hover="false" unlined v-if="order.refundType==='退货退款'">
			<view class="tui-title">
				<text>退款金额</text>
				<text>￥{{order.refund_fee}}</text>
			</view>
		</tui-list-cell>
		<view class="tui-order-item">
			<tui-list-cell :hover="false" :lineLeft="false"><view class="tui-order-title">售后信息</view></tui-list-cell>
			<t-order-item :order="order" type="detail"></t-order-item>
		</view>
		<view class="tui-order-info">
			<view class="tui-order-content">
       			 <view class="tui-order-flex">
					<view class="tui-item-title">服务单号：</view>
					<view class="tui-item-content">{{order.refundNum}}</view>
				</view>
        		<view class="tui-order-flex">
					<view class="tui-item-title">申请时间：</view>
					<view class="tui-item-content">{{order.create_time | formatDate}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">服务类型：</view>
					<view class="tui-item-content">{{order.refundType}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">申请说明:</view>
					<view class="tui-item-content">{{order.reason}}</view>
				</view>
        		<view class="tui-order-flex">
					<view class="tui-item-title">退款方式:</view>
					<view class="tui-item-content">原支付返还</view>
				</view>
			</view>
			<tui-list-cell :hover="false" :lineLeft="false"><view class="tui-order-title">售后描述</view></tui-list-cell>
			<view class="tui-content__box">
				<view class="tui-desc">
					{{order.description}}
				</view>
				<view class="tui-img__box">
					<block v-for="(img, index) in order.imgs" :key="index">
						<image :src="img" mode="widthFill"></image>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import utils from "@/utils/util.js"
import tOrderItem from '@/components/views/t-order-item/t-order-item'
export default {
	components: {
		tOrderItem
	},
	data() {
		return {
			webURL: 'https://system.chuangbiying.com/static/images/mall/order/',
			//1-退款中 2-退款成功 3-退款失败
			status: 1,
      		order: {goodsList:[]},
			show: false
		};
	},
	onLoad(options){
		this.order = JSON.parse(decodeURIComponent(options.order))
	},
   	filters: {
		getPrice(price) {
			price = price || 0;
			return price.toFixed(2)
		},
      	formatDate(v){
			return utils.formatDate("y-m-d h:i:s", v)
		},
		getProperty(attr) {
			let str = ''
			attr.forEach(o=>{
				str = str + o.value + '，'
			})
			return str.slice(0,-1)
		}
 	},
	methods: {
		getImageUrl(status){
			let fileName = (status==='退款成功')? 'img_success3x.png' : (status==='申请已撤销' )? 'img_refundfailure.png' : 'img_waiting.png'
			return this.webURL + fileName
			
		}
	}
};
</script>

<style>
.container {
	padding-bottom: 80rpx;
}
.tui-order-header {
	width: 100%;
	height: 160rpx;
	position: relative;
	background: linear-gradient(90deg, rgb(255, 89, 38), rgb(240, 14, 44));
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
	color: #fefefe;
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
.tui-order-item {
	margin-top: 20rpx;
	border-radius: 10rpx;
	overflow: hidden;
}

.tui-title {
	width: 100%;
	font-size: 28rpx;
	line-height: 28rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
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
	padding-top: 0;
}

.tui-item-title {
	width: 132rpx;
	flex-shrink: 0;
	white-space: nowrap;
}

.tui-item-content {
	color: #666;
	line-height: 32rpx;
}


.tui-content__box {
	width: 100%;
	background: #fff;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
}

.tui-rate__box {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 24rpx;
	color: #999;
	padding: 12rpx 0 20rpx;
}

.tui-desc {
	font-size: 24rpx;
	color: #666;
	text-indent: 2em;
	font-size: 28rpx;
	word-break: break-all;
	text-align: justify;
}

.tui-img__box {
	width: 100%;
	font-size: 0;
	padding-top: 4rpx;
}

.tui-img__box image {
	width: 200rpx;
	height: 200rpx;
	margin-right: 12rpx;
	margin-top: 12rpx;
}
</style>
