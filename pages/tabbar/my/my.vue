<template>
	<view class="tui-set-box">
		<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(1)">
			<view class="tui-list-cell tui-info-box">
				<image :src="storeInfo.trademark" class="tui-avatar"></image>
				<view>{{storeInfo.storename}}</view>
			</view>
		</tui-list-cell>
		<view class="tui-mtop">
			<!-- <tui-list-cell padding="0" :lineLeft="false" :arrow="true">
				<view class="tui-list-cell">
					账户与安全
				</view>
			</tui-list-cell> -->
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(3)">
				<view class="tui-list-cell">
					消息提醒设置
				</view>    
			</tui-list-cell>
		</view>
		<view class="tui-mtop">
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(4)">
				<view class="tui-list-cell">
					官方客服
				</view>
			</tui-list-cell>
			<!-- <tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="href(5)">
				<view class="tui-list-cell">
					意见反馈
				</view>
			</tui-list-cell> -->
		</view>

		<view class="tui-exit">
			<tui-button shape="circle" shadow type="danger" height="88rpx">退出登录</tui-button>
		</view>
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
			},
		},
		methods: {
			href(page) {
				let url = "";
				switch (page) {
					case 1:
						url = "/pages/my/userInfo/userInfo"
						break;
					case 2:
						url = "/pages/my/address/address"
						break;
					case 3:
						url = "/pages/my/notice/notice"
						break;
					case 4:
						url = "/pages/common/about/about"
						break;
					case 5:
						url = "/pages/my/feedback/feedback?page=mall"
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
		padding: 24rpx 30rpx;
		font-size: 30rpx;
	}

	.tui-info-box {
		font-size: 34rpx;
	}

	.tui-avatar {
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
   		overflow: hidden;
		margin-right: 20rpx;
	}

	.tui-mtop {
		margin-top: 20rpx;
	}

	.tui-exit {
		padding: 100rpx 24rpx;
	}
</style>
