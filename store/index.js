
import fetch from '../common/httpRequest'

// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
// #endif
// #ifdef VUE3
import {createStore} from 'vuex'
const store = createStore({
// #endif
	state: {
		//是否登录 项目中改为真实登录信息判断，如token
		isLogin: false,
		//用户信息
		storeInfo: {
			trademark: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
			storename: '',
		},
		//当前是否有网络连接
		networkConnected: true,
		isOnline: false,
		width : 750,
		targetCustomer: null,
		refundList: [],
		orderList: [],
		storeState: {'pendingPay': 0, 'pendingDelivery': 0, 'refundOrder': 0, 'onSales': 0, 'putAway': 0, 'orderNum': 0, 'receipt': 0},
		addressList: [],
		currentReview: [],
		goodsList: [],
		goodsGroup: [],
		goodsProperty: [],
		tagList: []
	},
	mutations: {
		setReturnUrl(state, returnUrl) {
			state.returnUrl = returnUrl
		},
		networkChange(state, payload) {
			state.networkConnected = payload.isConnected
		},
		setOnline(state, payload) {
			state.isOnline = state.isOnline
		},
		setWidth(state, width){
		    state.width = width
		},
		login(state, isLogin){
		    state.isLogin = isLogin
		},
		setStoreInfo(state, storeInfo){
			state.storeInfo = storeInfo
		},
		setAddress(state, addressList){
			state.addressList = addressList
		},
		setStoreState(state, storeState){
		    state.storeState = storeState
	    },
		setTargetCustomer(state, customer){
			state.targetCustomer = customer
		},
		setRefundList(state, refundList){
			state.refundList = refundList
		},
		setOrderList(state, orderList){
			state.orderList = orderList
		},
		updateGoodsList(state,goodsList){
			state.goodsList = goodsList
		},
		updateGoodsGroup(state, goodsGroup){
			state.goodsGroup = goodsGroup
		},
		updateGoodsProperty(state, goodsProperty){
			state.goodsProperty = goodsProperty
		},
		updateTagList(state, goodsTag){
			state.tagList = goodsTag
		}

	},
	actions: {
		getOnlineStatus: async function({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				// #ifndef MP-WEIXIN
				resolve(true)
				// #endif
				// #ifdef MP-WEIXIN
				if (state.isOnline) {
					resolve(state.isOnline)
				} else {
					fetch.request("/Home/GetStatus", "GET", {}, false, true, true).then((res) => {
						if (res.code == 100 && res.data == 1) {
							commit('setOnline', {
								isOnline: true
							})
							resolve(true)
						} else {
							commit('setOnline', {
								isOnline: false
							})
							resolve(false)
						}
					}).catch((res) => {
						reject(false)
					})
				}
				// #endif
			})
		}
	}
})

export default store

