<template>
	<view>
		<view class="tui-mybg-box">
			<image :src="webURL + '/static/images/mall/my/img_bg_3x.png'" class="tui-my-bg" mode="widthFix"></image>
			<view class="tui-header-center">
				<image :src="storeInfo.trademark" class="tui-avatar" @tap="href(3)"></image>
				<view class="tui-info" v-if="isLogin">
					<view class="tui-nickname">
						{{storeInfo.storename}}
					</view>
				</view>
				<view class="tui-login" v-if="!isLogin" @tap="login">
					<text>登录/注册</text>
					<tui-icon name="arrowright" color="#fff" :size="36" unit="rpx"></tui-icon>
				</view>
			</view>

		</view>
		<view class="tui-content-box">
		    <view class="tui-box">
				<tui-list-cell :arrow="true" padding="0" :lineLeft="false">
					<tui-notice-bar is-left isRight scrollable color="#f54f46" backgroundColor="#fff" height=100 :content="content">
						<template v-slot:left>
							<view class="tui-padding">
								<tui-icon name="news-fill" :size="48" unit="rpx" color="#f54f46"></tui-icon>
							</view>
						</template>
						<template v-slot:right>
							<view class="tui-padding" style="padding-left: 36rpx">
								<tui-icon name="arrow-right" :size="48" unit="rpx" color="#f54f46"></tui-icon>
							</view>
						</template>
					</tui-notice-bar>
				</tui-list-cell>
			</view>
			<view class="tui-box tui-order-box">
				<tui-list-cell :arrow="true" padding="0" :lineLeft="false" @click="href(4,0)">
					<view class="tui-cell-header">
						<view class="tui-cell-title">店铺订单</view>
						<view class="tui-cell-sub">查看全部订单</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-list">
					<view class="tui-order-item" @tap="href(4, 1)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_daifukuan_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red" v-if="state.pendingPay>0">{{state.pendingPay}}</view>
						</view>
						<view class="tui-order-text">待付款</view>
					</view>
					<view class="tui-order-item" @tap="href(4, 2)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_daifahuo_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red" v-if="state.pendingDelivery>0">{{state.pendingDelivery}}</view>
						</view>
						<view class="tui-order-text">待发货</view>
					</view>
					<view class="tui-order-item" @tap="href(5)">
						<view class="tui-icon-box">
							<image src="/static/images/mall/my/icon_tuikuan_3x.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red" v-if="state.refundOrder>0">{{state.refundOrder}}</view>
						</view>
						<view class="tui-order-text">售后</view>
					</view>
				</view>
			</view>

			<view class="tui-box tui-assets-box">
				<tui-list-cell padding="0" :arrow="true" :lineLeft="false">
					<view class="tui-cell-header">
						<view class="tui-cell-title">今日统计</view>
						<view class="tui-cell-sub">更多数据</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-list tui-assets-list">
					<view class="tui-order-item" @tap="href(11)">
						<view class="tui-amount">￥<text class="tui-text__large">{{state.receipt.toFixed(2).split('.')[0]}}</text>
						.{{state.receipt.toFixed(2).split('.')[1]}}
						</view>
						<view class="tui-assets-text">支付金额</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-assets-num"><text  class="tui-text__large">{{state.orderNum}}</text></view>
						<view class="tui-assets-text">订单数</view>
					</view>
					<view class="tui-order-item" @tap="href(8)">
						<view class="tui-assets-num">
							<text  class="tui-text__large">{{uv}}</text>
						</view>
						<view class="tui-assets-text">访客数</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-assets-num">
							<text class="tui-text__large">{{pv}}</text>
						</view>
						<view class="tui-assets-text">浏览量</view>
					</view>
				</view>
			</view>

			<view class="tui-box tui-assets-box">
				<tui-list-cell padding="0" unlined :lineLeft="false">
					<view class="tui-cell-header">
						<view class="tui-cell-title">我的商品</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-list tui-assets-list">
					<view class="tui-order-item" @tap="href(6, 0)">
						<view class="tui-assets-num"><text  class="tui-text__large">{{state.onSales}}</text></view>
						<view class="tui-assets-text">销售中</view>
					</view>
					<view class="tui-order-item" @tap="href(6, 1)">
						<view class="tui-assets-num"><text  class="tui-text__large">{{state.putAway}}</text></view>
						<view class="tui-assets-text">待上架</view>
					</view>
					<view class="tui-order-item">
						<view class="tui-assets-num">
							<tui-icon name="plus" :size="40" unit="rpx" color="#000" bold></tui-icon>
						</view>
						<view class="tui-assets-text">新增商品</view>
					</view>
				</view>
			</view>

			<!--加载loadding-->
			<!-- <tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				webURL: 'https://www.thorui.cn/wx',
				top: 0, //标题图标距离顶部距离
				opacity: 0,
				scrollTop: 0.5,
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				pv: 0,
				uv: 0,
				content: ''
			};
		},
		onLoad: function(options) {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			uni.getSystemInfo({
				success: res => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
					this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;
					this.scrollH = res.windowWidth * 0.6;
				}
			});
			const appid = this.$store.state.appid
			const secret = this.$store.state.secret
			let url = "/getStoreStatic/" + appid + "/" + secret
			let data = { "begin_date":20220315, "end_date":20220315}
			this.tui.request(url,'POST', data, true).then((res)=>{
				console.log('res', res.data.list)
			})
			url = "/getStoreInfo/" + appid
			this.tui.request(url).then((res)=>{
				console.log('res', res)
				this.$store.commit('setStoreState', res.state)
				this.$store.commit('setStoreInfo', res.storeInfo)
			})
		},
		computed: {
			storeInfo() {
				return this.$store.state.storeInfo
			},
			state() {
				return this.$store.state.storeState
			},
		},
		methods: {
			href(page, index) {
				//未登录状态下应跳转至登录页面，此处未作处理
				let url = '';
				switch (page) {
					case 2:
						url = '/pages/my/set/set';
						break;
					case 3:
						url = '/pages/my/storeInfo/storeInfo';
						break;
					case 4:
						url = '/pages/my/myOrder/myOrder?currentTab=' + index;
						break;
					case 5:
						url = '/pages/my/refundList/refundList';
						break;
					case 6:
						url = '/pages/index/productList/productList?currentTab=' + index 	
					default:
						break;
				}
				if (url) {
					if (page == 3 && !this.isLogin) {
						this.isLogin = true;
						this.tui.toast('模拟登录成功~')
					} else {
						this.tui.href(url);
					}
				} else {
					this.tui.toast('功能尚未完善~');
				}
			},
			detail: function() {
				uni.navigateTo({
					url: '/pages/index/productDetail/productDetail'
				});
			},
			initNavigation(e) {
				this.opacity = e.opacity;
				this.top = e.top;
			},
			opacityChange(e) {
				this.opacity = e.opacity;
			},
			login() {
				this.isLogin = true
				this.tui.toast('模拟登录成功~')
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 200);  
		},
		// onReachBottom: function() {
		// 	if (!this.pullUpOn) return;
		// 	this.loadding = true;
		// 	if (this.pageIndex == 4) {
		// 		this.loadding = false;
		// 		this.pullUpOn = false;
		// 	} else {
		// 		let loadData = JSON.parse(JSON.stringify(this.productList));
		// 		loadData = loadData.splice(0, 10);
		// 		if (this.pageIndex == 1) {
		// 			loadData = loadData.reverse();
		// 		}
		// 		this.productList = this.productList.concat(loadData);
		// 		this.pageIndex = this.pageIndex + 1;
		// 		this.loadding = false;
		// 	}
		// }
	};
</script>

<style>

	/* #ifdef MP */
	.tui-set-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* #endif */
	.tui-icon-box {
		position: relative;
	}

	.tui-icon-setup {
		margin-left: 8rpx;
	}

	.tui-badge {
		position: absolute;
		font-size: 24rpx;
		height: 32rpx;
		min-width: 20rpx;
		padding: 0 6rpx;
		border-radius: 40rpx;
		right: 10rpx;
		top: -5rpx;
		transform: scale(0.8) translateX(60%);
		transform-origin: center center;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.tui-badge-red {
		background: #f74d54;
		color: #fff;
	}

	.tui-badge-white {
		background: #fff;
		color: #f74d54;
	}

	.tui-badge-dot {
		position: absolute;
		height: 12rpx;
		width: 12rpx;
		border-radius: 50%;
		right: -12rpx;
		top: 0;
		background: #f74d54;
	}

	.tui-mybg-box {
		width: 100%;
		height: 400rpx;
		position: relative;
	}

	.tui-my-bg {
		width: 100%;
		height: 464rpx;
		position: relative;
		top: -40rpx;
		display: block;
	}

	.tui-header-center {
		position: absolute;
		width: 100%;
		height: 128rpx;
		left: 0;
		top: 120rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-avatar {
		flex-shrink: 0;
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
		display: block;
	}

	.tui-info {
		width: 60%;
		padding-left: 30rpx;
	}

	.tui-login {
		width: 60%;
		padding-left: 30rpx;
		font-size: 32rpx;
		line-height: 32rpx;
		color: #fff;
		display: flex;
		align-items: center;
	}

	.tui-nickname {
		font-size: 30rpx;
		font-weight: 500;
		color: #fff;
		display: flex;
		align-items: center;
	}

	.tui-img-vip {
		width: 56rpx;
		height: 24rpx;
		margin-left: 18rpx;
	}

	.tui-explain {
		width: 80%;
		font-size: 24rpx;
		font-weight: 400;
		color: #fff;
		opacity: 0.75;
		padding-top: 8rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-btn-edit {
		flex-shrink: 0;
		padding-right: 22rpx;
	}

	.tui-header-btm {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 280rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
	}

	.tui-btm-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tui-btm-num {
		font-size: 32rpx;
		font-weight: 600;
		position: relative;
	}

	.tui-btm-text {
		font-size: 24rpx;
		opacity: 0.85;
		padding-top: 4rpx;
	}

	.tui-content-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;
		top: -70rpx;
		margin-bottom: 160rpx;
		z-index: 10;
	}
    
	.tui-padding{
		padding: 0 20rpx;
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
		margin-top: 20rpx;
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
	.tui-amount{
		font-size: 24rpx;
	}
	.tui-text__large {
		font-size: 36rpx;
		font-weight: bold;
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
		width: 25%;
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
