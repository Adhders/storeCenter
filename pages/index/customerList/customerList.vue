<template>
	<view class="container">
        <tui-navigation-bar isCustom :isOpacity="false"  backgroundColor="#e41f19"  @init="initHeader">
			<view class="tui-header" :style="{ height: height - top + 'px' }">
				<view :style="{ width: width + 'px' }" class="tui-flex__center">
					<view class="tui-back__box" @tap="back"><tui-icon name="arrowleft" color="#fff"></tui-icon></view>
					<view class="tui-searchbox tui-search-mr" @tap="search">
						<icon type="search" :size="13" color="#fff"></icon>
						<text class="tui-search-text">搜索用户</text>
					</view>
				</view>
			</view>
		</tui-navigation-bar>
		<tui-loading v-if="loadding"></tui-loading>
	    <view :style="{marginTop: height + 'px'}">
			<tui-list-cell padding="0" :lineLeft="false" @click="detail(customer)" v-for="customer, index in customerList" :key="index" >
				<view class="tui-list-cell tui-info-box">
					<view style="display: flex; align-items: center">
						<image :src="customer.avatarUrl" class="tui-avatar"></image>
						<text>{{customer.nickName}}</text>
					</view>
					<view class="tui-register-time"> {{customer.create_time | formatDate}} </view>
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
				width: 350,
				height: 64,
				top: 20,
				loadding: true,
                customerList: []
			}
		},
        onLoad() {
			this.pid = uni.getStorageSync("pid")
			this.store_id = uni.getStorageSync("store_id")
			let url = '/getStoreAllCustomer/' + this.pid + '/' + this.store_id
			this.tui.request(url,'GET', undefined, true).then((res)=>{
				this.loadding = false
				this.customerList = res.customerList
			})
        },
		filters: {
			formatDate(v){
				return utils.formatDate("y-m-d", v)
			},
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			initHeader(e) {
				this.width = Number(e.left);
				this.height = Number(e.height);
				this.top = Number(e.top);
			},
			detail(customer) {
				this.$store.commit('setTargetCustomer', customer)
				let url = "/pages/index/customerDetail/customerDetail?openid=" + customer.openid;
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
.container {
	padding-bottom: 20rpx;
	color: #333;
}
   
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

.tui-flex__center {
	display: flex;
	align-items: center;
}


.tui-flex {
	display: flex;
	align-items: center;
}


	.tui-list-cell {
		display: flex;
        width: 100%;
        justify-content: space-between;
		align-items: center;
		padding: 24rpx 30rpx;
		font-size: 30rpx;
	}

	.tui-info-box {
		font-size: 26rpx;
	}
    .tui-register-time{
        color: #a8a8a8
    }
	.tui-avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
   		overflow: hidden;
		margin-right: 20rpx;
	}
</style>
