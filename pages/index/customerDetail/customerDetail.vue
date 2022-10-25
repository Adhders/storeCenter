<template>
	<view class="tui-set-box">
		<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href('customerInfo')">
			<view class="tui-list-cell tui-info-box">
                <view style=flex:1>
                   <image :src="userInfo.avatarUrl" class="tui-avatar"></image>
				   <view class="tui-userInfo">
                       <view class="tui-user-name"> {{userInfo.nickName}} </view>
                       <view class="tui-register-time"> {{userInfo.create_time | formatDate}} 注册</view>
                   </view>
                </view>
			</view>
		</tui-list-cell>
		<view class="tui-mtop">
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href('order')">
				<view class="tui-list-cell tui-arrow-right">
					<view>消费次数</view>
                    <view class="tui-right-value"> {{customerDetail.orderNum}} </view>
				</view>
			</tui-list-cell>
            <tui-list-cell padding="0" :lineLeft="false" :arrow="true"  @click="href('refundOrder')">
				<view class="tui-list-cell tui-arrow-right">
					<view>退款订单</view>
                    <view class="tui-right-value"> {{customerDetail.refundNum}} </view>
				</view>
			</tui-list-cell>
			<tui-list-cell padding="0" :lineLeft="false">
				<view class="tui-list-cell">
					<view>累计消费</view>
                    <view class="tui-right-value"> {{customerDetail.overall}} </view>
				</view>
			</tui-list-cell>
            <tui-list-cell padding="0" :lineLeft="false">
				<view class="tui-list-cell">
					<view>客单价</view>
                    <view class="tui-right-value"> ￥{{ customerDetail.orderNum? (customerDetail.overall/customerDetail.orderNum).toFixed(2) : 0}}</view>
				</view>
			</tui-list-cell>
			<tui-list-cell padding="0" :lineLeft="false">
				<view class="tui-list-cell">
					<view>上次消费时间</view>
                    <view class="tui-right-value" > {{customerDetail.lastTime | formatDate}} </view>
				</view>
			</tui-list-cell>
		</view>
		<view class="tui-mtop">
            <tui-list-cell padding="0" :lineLeft="false" :arrow="true">
				<view class="tui-list-cell tui-arrow-right">
					<view>会员卡余额</view>
                    <view class="tui-right-value"> ￥0.00 </view>
				</view>
			</tui-list-cell>
            <tui-list-cell padding="0" :lineLeft="false">
				<view class="tui-list-cell">
					<view>会员等级</view>
                    <view class="tui-right-value"> 非会员 </view>
				</view>
			</tui-list-cell>
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true">
				<view class="tui-list-cell tui-arrow-right">
					<view>可用优惠券</view>
                    <view class="tui-right-value"> 0张 </view>
				</view>
			</tui-list-cell>
		</view>
	</view>
</template>

<script>
	import utils from "@/utils/util.js"
	export default {
		data() {
			return {
				userInfo: {},
				customerDetail: {'orderNum': 0, 'refundNum': 0, 'overall': 0, 'lastTime': ''}
			}
		},
		onLoad(options){
			this.userInfo = JSON.parse(decodeURIComponent(options.customer))
			let url = '/getCustomerDetail/' + this.userInfo.openid
			this.tui.request(url,'GET', undefined, true).then((res)=>{
				this.customerDetail = res.customerDetail
			})
		},
		filters: {
			formatDate(v){
				return utils.formatDate("y-m-d", v)
			},
		},
		methods: {
			href(page) {
				let url = "";
				switch (page) {
					case 'customerInfo':
						url = "/pages/index/customerInfo/customerInfo?customer=" + encodeURIComponent(JSON.stringify(this.userInfo))
						break;
					case 'order':
						url = "/pages/my/myOrder/myOrder?openid=" + this.userInfo.openid
						break;
					case 'refundOrder':
						url = "/pages/my/refundList/refundList?openid=" + this.userInfo.openid
						break;
					default:
						break;
				}
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	.tui-set-box {
		padding-bottom: 20rpx;
		color: #333;
	}

	.tui-list-cell {
		display: flex;
		align-items: center;
        width: 100%;
        justify-content: space-between;
		padding: 24rpx 30rpx;
		font-size: 26rpx;
	}
    
    .tui-arrow-right{
        padding-right: 60rpx;
    }

	.tui-info-box {
		font-size: 30rpx;
	}

	.tui-avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 12rpx;
   		overflow: hidden;
        float: left;
		margin-right: 20rpx;
	}
    .tui-userInfo {
        margin-top: 24rpx;
    }
    .tui-register-time{
        font-size: 24rpx;
        color: #a8a8a8;

    }
    .tui-right-value {
        color: #a8a8a8;
    }
	.tui-mtop {
		margin-top: 20rpx;
	}

	.tui-exit {
		padding: 100rpx 24rpx;
	}
</style>
