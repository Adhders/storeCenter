<script>
	export default {
		onLaunch: function() {
			let that = this;
			// #ifdef MP-WEIXIN
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							that.tui.modal('更新提示', '新版本已经上线啦~，为了获得更好的体验，建议立即更新', false, res => {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate();
							});
						});
						updateManager.onUpdateFailed(function() {
							// 新的版本下载失败
							that.tui.modal('更新失败', '新版本更新失败，为了获得更好的体验，请您删除当前小程序，重新扫码打开', false, res => {});
						});
					}
				});
			}
			// #endif
			this.calcNavBarInfo()
            let pid = uni.getStorageSync("pid")
			if(pid){
				let pid = uni.getStorageSync("pid")
				let url = '/defaultStore/' + pid
				this.tui.request(url).then((res)=>{
					if(res.code=='0'){
						this.$store.commit('login', true)
						this.$store.commit('setStoreInfo', res.default_store)
					}
				})
			}
		},
		globalData: {
			//全局数据管理
			windowWidth: 390,
			navBarHeight: 44, // 导航栏高度
			menuBottom: 0, // 胶囊距底部间距（顶部间距也是这个）
			menuTop: 0, // 胶囊距手机的顶部距离
			menuHeight: 0, // 胶囊高度
			menuWidth: 0, // 胶囊宽度
			appid: '',
		},
		methods:{
			calcNavBarInfo() {
				// 获取系统信息
				const systemInfo = uni.getSystemInfoSync();
				// console.log('systemInfo', systemInfo)
				this.globalData.windowWidth = systemInfo.windowWidth
				// 胶囊按钮位置信息
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
				// console.log('menuButtonInfo', menuButtonInfo)
				// 导航栏高度 = 状态栏到胶囊的间距（胶囊上坐标位置-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
				this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo
					.height + systemInfo.statusBarHeight;
				// console.log(menuButtonInfo, this.globalData.navBarHeight)
				// 状态栏和菜单按钮(标题栏)之间的间距
				// 等同于菜单按钮(标题栏)到正文之间的间距（胶囊上坐标位置-状态栏高度）
				this.globalData.menuBottom = menuButtonInfo.top - systemInfo.statusBarHeight;
				this.globalData.menuTop = menuButtonInfo.top
				this.globalData.menuWidth = menuButtonInfo.width
				// 菜单按钮栏(标题栏)的高度
				this.globalData.menuHeight = menuButtonInfo.height;
				// console.log('navBarHeight', this.globalData.navBarHeight, 'menuTop', this.globalData.menuTop, 'menuHeight',
				// 	this.globalData.menuHeight)
			},

		},
		onError: function(err) {
			//全局错误监听
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
				const res = uni.getSystemInfoSync();
				let errMsg = `手机品牌：${res.brand}；手机型号：${res.model}；操作系统版本：${res.system}；客户端平台：${res.platform}；错误描述：${err}`;
				console.log('发生错误：' + errMsg);
			});
			// #endif
		}
	};
</script>

<style>
	@import './common/app.css';
</style>
