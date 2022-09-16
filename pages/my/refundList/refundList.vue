<template>
	<view class="container">
		<tui-tabs :tabs="tabs" :currentTab="currentTab" :isFixed="scrollTop>=0" @change="change" selectedColor="#E41F19" sliderBgColor="#E41F19"
				:itemWidth="(100/tabs.length)+'%'"></tui-tabs>	
		<!--选项卡逻辑自己实现即可，此处未做处理-->
    	<tui-loading v-if="loadding"></tui-loading>
		<view class="tui-order-list" v-else>
			<view class="tui-order-item" v-for="(order, orderIndex) in displayList" :key="orderIndex">
				<tui-list-cell :hover="false" :lineLeft="false" padding="10rpx 30rpx">
					<view class="tui-goods-title">
						<view style="display: flex; align-items: center">
							<image :src="order.avatarUrl" class="tui-avatar" @tap="userInfo(order.openid)"></image>
							<view class="tui-customer-name">{{order.nickName}}</view>
						</view>
						<view class="tui-order-status" v-if="order.status==='处理中'">{{order.refundType}}</view>
						<view class="tui-order-status" v-else>{{order.status}}</view>
					</view>
				</tui-list-cell>
				<t-order-item :order="order"></t-order-item>
				<tui-list-cell :hover="false" unlined>
					<view class="tui-goods-price" v-if="order.status==='退款成功'">
						<view style="margin-left: 10px">已退款：</view>
						<view class="tui-price-large tui-order-status">￥{{order.netCost}}</view>
					</view>
					<view class="tui-goods-price" v-else>
						<view>实付：</view>
						<view class="tui-price-large">￥{{order.netCost}}</view>
						<view style="margin-left: 10px">退款金额：</view>
						<view class="tui-price-large tui-order-status">￥{{order.netCost}}</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-btn">
					<view class="tui-btn-ml">
						<tui-button type="black" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="detail(order)">
							售后详情
						</tui-button>
					</view>
					<view class="tui-btn-ml" v-if="order.status==='处理中'">
						<tui-button type="danger" plain width="152rpx" height="56rpx" :size="26" shape="circle" @tap="onDeal(order)">
							去处理
						</tui-button>
					</view>
				</view>
			</view>
      		<tui-no-data v-if="displayList.length===0" :fixed="false"
						 imgUrl="https://system.chuangbiying.com/static/images/index/img_noorder.png">
				您还没有相关的订单</tui-no-data>
			<tui-modal :show="isDelete" @click="onRemove"  title="确定删除售后单？" content="删除之后此售后单将无法恢复，请慎重考虑？"></tui-modal>	
		</view>
		<!-- <tui-divider width="60%" gradual>没有更多了</tui-divider> -->
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
			tabs: [{name: "待受理"}, {name: "处理中"}, {name: "申请记录"}],
			scrollTop: 0,
			currentTab: 0,
			selectedOrder: null,
			isDelete: false,
			loadding: true,
      		displayList: [],
		
		};
	},
    onLoad(option){
		this.pid = uni.getStorageSync("pid")
		this.store_id = uni.getStorageSync("store_id")
		let url = '/getStoreAllRefundOrder/' + this.pid + '/' + this.store_id
		this.tui.request(url).then((res)=>{
			this.loadding = false
			this.$store.commit('setRefundList', res.refundList)
			this.switchTab(this.currentTab)
		})
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
	computed: {
        refundList(){
			return this.$store.state.refundList
		},
	},
	methods: {
		change(e) {
			this.currentTab = e.index
			this.switchTab(this.currentTab)
		},
		switchTab(v){
			switch(v){
				case 0: {
					this.displayList = this.refundList.filter((o)=>{
						return o.status==="处理中"
					})
					break;
				}
				case 1: {
					this.displayList = []
					break;
				}
				case 2: {
					this.displayList = this.refundList
					break;
				}
			}
		},
		detail(order) {
			if(order.refundNum){
		  		this.tui.href('/pages/my/refundDetail/refundDetail?order=' + encodeURIComponent(JSON.stringify(order)))
			}
		},
		onDeal(order){
			let url = '/refund_miniProg/'  + this.pid + '/' + this.store_id 
			this.tui.request(url, 'POST',
				{ amount: {'refund': parseInt(order.refund_fee*100), 'total': parseInt(order.netCost*100), 'currency':'CNY' }, 
				refundNum: order.refundNum, orderNum: order.orderNum}).then((res)=>{
				if(res.code==200){
					this.tui.toast("退款成功")
					this.$store.state.storeState.refundNum-=1
					let index= this.refundList.findIndex((o) => { return o.refundNum == order.refundNum})
					this.refundList[index].status="退款成功"
					this.switchTab(this.currentTab)
				}
				else {
					this.tui.toast(res.message)
				}
			})
			console.log('order', order)
		}
	}
};
</script>

<style>

.container {
	padding: 20rpx 0;
	box-sizing: border-box;
}

.tui-order-list {
	width: 100%;
 	margin-top: 60rpx;
	box-sizing: border-box;
}

.tui-order-item {
  margin-top: 20rpx;
  border-radius: 10rpx;
  overflow: hidden;
}

.tui-goods-title {
	width: 100%;
	font-size: 28rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.tui-order-type {
	font-size: 26rpx;
	display: flex;
	align-items: center;
}

.tui-customer-name {
	font-size: 26rpx;
	margin-left: 5px;
}

.tui-order-status {
	color: #eb0909;
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
	padding: 20rpx 8rpx;
	box-sizing: border-box;
}

.tui-avatar {
	flex-shrink: 0;
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	display: block;
}

.tui-goods-price {
	width: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	font-size: 24rpx;
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
.tui-order-message{
	background: #fff;
	/* padding: 0 30rpx; */
}

.tui-apply-btn {
	padding-top: 20rpx;
}

.tui-btn-ml {
	margin-left: 20rpx;
}
</style>
