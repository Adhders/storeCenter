<template>
	<view class="tui-storeInfo-box">
		<tui-list-cell padding="0" :hover="false">
			<view class="tui-list-cell">
				<view>店铺头像</view>
				<image :src="storeInfo.trademark" class="tui-avatar" mode="aspectFill"></image>
			</view>
		</tui-list-cell>
		<tui-list-cell padding="0">
			<view class="tui-list-cell">
				<view>名称</view>
				<view class="tui-content">{{storeInfo.storename}}</view>
			</view>
		</tui-list-cell>
		<tui-list-cell padding="0">
			<view class="tui-list-cell">
				<view>介绍</view>
				<view class="tui-content">{{storeInfo.introduce}}</view>
			</view>
		</tui-list-cell>
		<tui-list-cell padding="0" :hover="false">
			<view class="tui-list-cell">
				<view>AppID</view>
				<text class="tui-content" 	user-select>{{storeInfo.appid}}</text>
			</view>
		</tui-list-cell>
		<tui-list-cell padding="0" :hover="false" v-if="storeInfo.mchId">
			<view class="tui-list-cell">
				<view>商户号</view>
				<text class="tui-content" 	user-select>{{storeInfo.mchId}}</text>
			</view>
		</tui-list-cell>
		<!-- <tui-list-cell padding="0" :hover="false">
			<view class="tui-list-cell">
				<view>店铺二维码</view>
				<view class="tui-content">{{storeInfo.mchId}}</view>
			</view>
		</tui-list-cell> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed: {
			storeInfo() {
				return this.$store.state.storeInfo
			}
		},
		methods: {

		}
	}
</script>

<style>
	.tui-storeInfo-box {
		margin: 20rpx 0;
		color: #333;
	}

	.tui-list-cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		font-size: 26rpx;
	}

	.tui-avatar {
		width: 100rpx;
		height: 100rpx;
		display: block;
		overflow: hidden;
		border-radius: 50%;
	}

	.tui-content {
		font-size: 26rpx;
		color: #666;
	}
</style>
