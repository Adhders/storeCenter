<template>
	<view class="tui-box tui-tool-box">
		<tui-list-cell :arrow="true" padding="0" :lineLeft="false">
			<view class="tui-cell-header">
				<view class="tui-cell-title">常用工具</view>
				<view class="tui-cell-sub">查看更多</view>
			</view>
		</tui-list-cell>
		<view class="tui-order-list tui-flex-wrap">
			<view class="tui-tool-item" @tap="href('user')">
				<view class="tui-icon-box">
					<image src="/static/images/mall/my/icon_user.png" class="tui-tool-icon"></image>
				
				</view>
				<view class="tui-tool-text">用户管理</view>
			</view>
			<view class="tui-tool-item" @tap="href('goods')">
				<view class="tui-icon-box">
					<image src="/static/images/mall/my/icon_goods.png" class="tui-tool-icon"></image>
				</view>
				<view class="tui-tool-text">商品</view>
			</view>
			<view class="tui-tool-item">
				<view class="tui-icon-box">
					<image src="/static/images/mall/my/icon_data.png" class="tui-tool-icon"></image>
				</view>
				<view class="tui-tool-text">数据</view>
			</view>
			<view class="tui-tool-item">
				<view class="tui-icon-box">
					<image src="/static/images/mall/my/icon_logistics.png" class="tui-tool-icon"></image>
				</view>
				<view class="tui-tool-text">配送管理</view>
			</view>
			<view class="tui-tool-item">
				<view class="tui-icon-box">
					<image src="/static/images/mall/my/icon_kefu_3x.png" class="tui-tool-icon"></image>
				</view>
				<view class="tui-tool-text">官方客服</view>
			</view>
			<view class="tui-tool-item">
				<view class="tui-icon-box">
					<image src="/static/images/mall/my/icon_address.png" class="tui-tool-icon"></image>
				</view>
				<view class="tui-tool-text">地址</view>
			</view>
			<!-- <view class="tui-tool-item" @tap="href(11)">
				<view class="tui-icon-box">
					<image src="/static/images/mall/my/icon_printer.png" class="tui-tool-icon"></image>
				</view>
				<view class="tui-tool-text">打印机</view>
			</view> -->
			<!-- <view class="tui-tool-item">
				<view class="tui-icon-box">
					<image src="/static/images/mall/my/icon_kaipiao_3x.png" class="tui-tool-icon"></image>
				</view>
				<view class="tui-tool-text">开发票</view>
			</view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	onLoad: function(options) {
		
	},
	methods: {
		href(num){
			console.log('goto', num)
			let url = ''
			switch(num){
				case 'user':
					url = '/pages/index/customerList/customerList'
					break;
				case 'goods':
					url = '/pages/index/productList/productList'
					break;
				case 3:
					url = '/pages/index/customerList/customerList'
					break;			
			}
			console.log('url',url)
			uni.navigateTo({
				url: url
			})
		}
		
	}
};
</script>

<style>
page {
	background: #fcfcfc;
}
.tui-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-order-box {
		height: 208rpx;
	}

	.tui-cell-header {
		width: 100%;
		height: 74rpx;
		padding: 0 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-cell-title {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 600;
		color: #333;
	}

	.tui-cell-sub {
		font-size: 26rpx;
		font-weight: 400;
		color: #999;
		padding-right: 28rpx;
	}

	.tui-order-list {
		width: 100%;
		height: 134rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
.tui-order-text,
	.tui-tool-text {
		font-size: 26rpx;
		font-weight: 400;
		color: #666;
		padding-top: 4rpx;
	}

	.tui-tool-text {
		font-size: 24rpx;
	}

	.tui-order-icon {
		width: 56rpx;
		height: 56rpx;
		display: block;
	}

	.tui-assets-box {
		height: 200rpx;
		margin-top: 20rpx;
	}

	.tui-assets-list {
		height: 125rpx;
	}

	.tui-assets-num {
		font-size: 32rpx;
		font-weight: 500;
		color: #333;
		position: relative;
	}

	.tui-assets-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #666;
		padding-top: 6rpx;
	}

	.tui-tool-box {
		margin-top: 20rpx;
	}

	.tui-flex-wrap {
		flex-wrap: wrap;
		height: auto;
		padding-bottom: 30rpx;
	}

	.tui-tool-item {
		width: 33.333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-tool-icon {
		width: 64rpx;
		height: 64rpx;
		display: block;
	}

	.tui-badge-icon {
		width: 66rpx;
		height: 30rpx;
		position: absolute;
		right: 0;
		transform: translateX(88%);
		top: -15rpx;
	}


</style>
