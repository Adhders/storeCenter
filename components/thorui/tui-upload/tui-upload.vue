<template>
	<view class="tui-container" :style="{paddingBottom: parseInt(scopeImgList.length/3)*20 + 'rpx'}">
		<view @touchmove.stop.prevent="moveHandle" class="moveWrap">
			<movable-area class="movarea" ref="areaBox" id="areaBox" :style="{height: height*rowNum  + 'rpx'}">
				<view class="imgBox" :style="{height:width*rowNum  + 'rpx'}">
					<view :id="'img' + idx" class="imgItem" v-for="(item, idx) in scopeImgList" :key="idx"
						:style="{transition:addJump?' all 0.5s':'',opacity:idx===selectIdx?'0':'1', width: width + 'rpx', height: height + 'rpx', borderRadius:imgRadius+'rpx',padding:imgPadding+'rpx',left:(hoverImgIdx==='img'+idx?curHoverBoxMove.x+'rpx':''),top:(hoverImgIdx==='img'+idx?curHoverBoxMove.y+'rpx':'')}">
						<image :style="{borderRadius:imgRadius+'rpx' }" :ref="'img' + idx" :src="item.url" mode="aspectFill"
							@touchstart="tstr(idx, $event)" @touchmove="tsmo" @touchend="toend" @tap.stop="previewImage(item.url)"></image>
						<view v-if="!forbidDel" class="tui-img-del" @tap.stop="delImage(idx)"></view>
						<view v-if="statusArr[idx]!=1" class="tui-upload-mask">
							<view class="tui-upload-loading" v-if="statusArr[idx]==2"></view>
							<text class="tui-tips">{{statusArr[idx]==2?'上传中...':'上传失败'}}</text>
							<view class="tui-mask-btn" v-if="statusArr[idx]==3" @tap.stop="reUpLoad(idx)"
								hover-class="tui-btn-hover" :hover-stay-time="150">重新上传</view>
						</view>
					</view>
					<view v-if="isShowAdd" class="tui-upload-add" :style="{width:width+'rpx',height:height+'rpx'}"
						@tap="chooseImage">
						<view class="tui-upload-icon tui-icon-plus"></view>
						<!-- <tui-icon name="camera-add"></tui-icon> -->
					</view>
				</view>
				<movable-view v-if="moveSrc" :animation="false" class="moveV" :x="x" :y="y" direction="all"
					:style="{ width: width + 'rpx', height: height + 'rpx',padding:imgPadding+'rpx' }">
					<image :style="{borderRadius:imgRadius+'rpx' }" :src="moveSrc" mode="aspectFill"></image>
				</movable-view>
			</movable-area>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tuiUpload',
		emits: ['remove','complete'],
		props: {
			//展示图片宽度
			width: {
				type: [Number, String],
				default: 220
			},
			//展示图片高度
			height: {
				type: [Number, String],
				default: 220
			},
			//初始化图片路径
			value: {
				type: Array,
				default () {
					return []
				}
			},
			//禁用删除
			forbidDel: {
				type: Boolean,
				default: false
			},
			//禁用添加
			forbidAdd: {
				type: Boolean,
				default: false
			},
			//服务器接口地址。当接口地址为空时，直接返回本地图片地址
			serverUrl: {
				type: String,
				default: ""
			},
			//限制数
			limit: {
				type: Number,
				default: 9
			},
			//original 原图，compressed 压缩图，默认二者都有
			sizeType: {
				type: Array,
				default () {
					return ['original', 'compressed']
				}
			},
			//album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
			sourceType: {
				type: Array,
				default () {
					return ['album', 'camera']
				}
			},
			//可上传图片类型，默认为空，不限制  Array<String> ['jpg','png','gif']
			imageFormat: {
				type: Array,
				default () {
					return []
				}
			},
			//单张图片大小限制 MB
			size: {
				type: Number,
				default: 4
			},
			//文件对应的key，默认为 file
			fileKeyName: {
				type: String,
				default: "file"
			},
			//HTTP 请求 Header, header 中不能设置 Referer。
			header: {
				type: Object,
				default () {
					return {}
				}
			},
			//HTTP 请求中其他额外的 form data
			formData: {
				type: Object,
				default () {
					return {}
				}
			},
			//自定义参数
			params: {
				type: [Number, String],
				default: 0
			},

			// 拖拽参数
			//图片间距
			imgPadding: {
				type: Number,
				default: function() {
					return 0;
				}
			},
			//图片列数
			colNum: {
				type: Number,
				default: function() {
					return 3;
				}
			},
			//图片圆角
			imgRadius: {
				type: Number,
				default: function() {
					return 10;
				}
			},
			//是否开启可删除图片功能
			enableDel: {
				type: Boolean,
				default: function() {
					return false
				}
			}
		},
		data() {
			return {
				//图片地址
				imageList: [],
				//上传状态：1-上传成功 2-上传中 3-上传失败
				statusArr: [],
				keyList: [],

                //拖拽组建元素
				addJump:false,
				scopeImgList: [],
				areaBoxInfo: {},
				x: 0,
				y: 0,
				selectIdx: null,
				moveSrc: '',
				areaBoxTop: 0,
				hoverImgIdx: '',
				inBoxXY: {},
				curHoverBoxMove: {
					x: 0,
					y: 0
				},
				rowNum:1,
				screenWidth:0
			}
		},
		created() {
			this.initImages()
		},
		mounted() {
			let _this = this;
			this.getDomInfo('areaBox', info => {
				_this.areaBoxInfo = info;
				// 设置区域内所有图片的左上角坐标
				_this.scopeImgList.forEach((item, idx) => {
					_this.getDomInfo('img' + idx, res => {
						item.x = res.left - info.left;
					});
					_this.getDomInfo('img' + idx, res => {
						item.y = res.top - info.top;
					});
				});
			});
		},
		watch: {
			value(val) {
				if (val) {
					this.initImages()
				}
			},
			hoverImgIdx(e) {
				let idx = this.selectIdx
				let hoverIdx = parseInt(e.split('img')[1]);
				if (this.scopeImgList[idx]) {
					let selectRow = this.scopeImgList[idx].y / uni.upx2px(this.width)
					let selectColum= this.scopeImgList[idx].x / uni.upx2px(this.width)
					let hoverRow = this.scopeImgList[hoverIdx].y / uni.upx2px(this.width)
					let hoverColum= this.scopeImgList[hoverIdx].x / uni.upx2px(this.width)
					let left =  -(this.width * (hoverColum - selectColum))
					let top= -(this.width * (hoverRow - selectRow))
					this.curHoverBoxMove = {
						x: left,
						y: top,
					}
				}
			},
			imageList(e) {
                let imgList = []
				e.forEach((img)=>{ imgList.push({ url: img })})
				this.scopeImgList = imgList;
				this.rowNum=Math.ceil((e.length+1)/this.colNum) 
				let _this = this;
				this.$nextTick(function() {
					_this.getDomInfo('areaBox', info => {
						_this.areaBoxInfo = info;
						// 设置区域内所有图片的左上角坐标
						_this.scopeImgList.forEach((item, idx) => {
							_this.getDomInfo('img' + idx, res => {
								item.x = res.left - info.left;
							});
							_this.getDomInfo('img' + idx, res => {
								item.y = res.top - info.top;
							});
						});
					});
				})
			}
		},
		computed: {
			isShowAdd() {
				let isShow = true;
				if (this.forbidAdd || (this.limit && this.imageList.length >= this.limit)) {
					isShow = false;
				}
				return isShow
			}
		},
		methods: {
			initImages() {
				this.statusArr = [];
				this.imageList = [...this.value.filter((o)=>{return o})];
				for (let item of this.imageList) {
					this.statusArr.push("1")
				}
			},
			// 重新上传
			reUpLoad(index) {
				this.$set(this.statusArr, index, "2")
				this.change()
				this.uploadImage(index, this.imageList[index]).then(() => {
					this.change()
				}).catch(() => {
					this.change()
				})
			},
			/**
			 * @param manual 是否手动上传
			 **/
			change(manual = false) {
				let status = ~this.statusArr.indexOf("2") ? 2 : 1
				if (status != 2 && ~this.statusArr.indexOf("3")) {
					// 上传失败
					status = 3
				}
				this.$emit('complete', {
					status: status,
					imgArr: this.imageList,
					params: this.params,
					keyList: this.keyList,
					manual: manual
				})
			},
			toast(text) {
				text && uni.showToast({
					title: text,
					icon: "none"
				});
			},
			generateUUID() {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uuid;
            },
			chooseImage: function() {
				let _this = this;
				uni.chooseImage({
					count: _this.limit - _this.imageList.length,
					sizeType: _this.sizeType,
					sourceType: _this.sourceType,
					success: function(e) {
						let imageArr = [];
						for (let i = 0; i < e.tempFiles.length; i++) {
							let len = _this.imageList.length;
							if (len >= _this.limit) {
								_this.toast(`最多可上传${_this.limit}张图片`);
								break;
							}
							//过滤图片类型
							let path = e.tempFiles[i].path;

							if (_this.imageFormat.length > 0) {
								let format = ""
								// #ifdef H5
								let type = e.tempFiles[i].type;
								format = type.split('/')[1]
								// #endif

								// #ifndef H5
								format = path.split(".")[(path.split(".")).length - 1];
								// #endif

								if (_this.imageFormat.indexOf(format) == -1) {
									let text = `只能上传 ${_this.imageFormat.join(',')} 格式图片！`
									_this.toast(text);
									continue;
								}
							}

							//过滤超出大小限制图片
							let size = e.tempFiles[i].size;

							if (_this.size * 1024 * 1024 < size) {
								let err = `单张图片大小不能超过：${_this.size}MB`
								_this.toast(err);
								continue;
							}
							imageArr.push(path)
							_this.imageList.push(path)
							_this.statusArr.push("2")
						}
						_this.change()
						console.log('imageArr', imageArr)
						let start = _this.imageList.length - imageArr.length
						for (let j = 0; j < imageArr.length; j++) {
							let index = start + j
							//服务器地址
							if (_this.serverUrl) {
								const key= _this.generateUUID().split('-').join('') + '.jpg'
								_this.formData.key = key
								console.log('formData', _this.formData)
								_this.uploadImage(index, imageArr[j]).then(() => {
									_this.change()
								}).catch(() => {
									_this.change()
								})
							} else {
								//无服务器地址则直接返回成功
								_this.$set(_this.statusArr, index, "1")
								_this.change()
							}
						}
					}
				})
			},
			uploadImage: function(index, url, serverUrl) {
				let _this = this;
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: this.serverUrl || serverUrl,
						name: this.fileKeyName,
						header: this.header,
						formData: this.formData,
						filePath: url,
						success: function(res) {
							console.log('res', res)
							if (res.statusCode === 200) {
								//返回结果 此处需要按接口实际返回进行修改
								// let d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
								// //判断code，以实际接口规范判断
								// if (d.code % 100 === 0) {
								// 	// 上传成功 d.url 为上传后图片地址，以实际接口返回为准
								// 	d.url && (_this.imageList[index] = d.url)
								// 	_this.$set(_this.statusArr, index, d.url ? "1" : "3")
								// } else {
								// 	// 上传失败
								// 	_this.$set(_this.statusArr, index, "3")
								// }
								_this.keyList[index]= JSON.parse(res.data).key
								_this.$set(_this.statusArr, index, "1")
								resolve(index)
							} else {
								_this.$set(_this.statusArr, index, "3")
								reject(index)
							}
						},
						fail: function(res) {
							_this.$set(_this.statusArr, index, "3")
							reject(index)
						}
					})
				})

			},
			delImage: function(index) {
				this.imageList.splice(index, 1)
				this.statusArr.splice(index, 1)
				this.keyList.splice(index, 1)
				this.$emit("remove", {
					index: index,
					params: this.params
				})
				this.change()
			},
			previewImage: function(url) {
				if (!this.imageList.length) return;
				uni.previewImage({
					current: url,
					loop: true,
					urls: this.imageList
				})
			},
			/**
			 * 当属性serverUrl传空时，父级调用该方法一次性上传所有图片
			 * @param serverUrl 服务器接口地址
			 **/
			uploadAllImage(serverUrl) {
				if (!serverUrl) {
					this.toast('服务器接口地址不能为空！');
					return;
				}
				let imageArr = [...this.imageList]
				const len = imageArr.length
				for (let i = 0; i < len; i++) {
					//如果是服务器地址图片则无需再次上传
					if (imageArr[i].startsWith('https')) {
						continue;
					} else {
						this.$set(this.statusArr, i, "2")
						this.uploadImage(i, imageArr[i], serverUrl).then(() => {
							if (i === len - 1) {
								this.change(true)
							}
						}).catch(() => {
							if (i === len - 1) {
								this.change(true)
							}
						})
					}
				}
				},
				moveHandle() {
				return;
			},
			tstr(e, s) {
				const _this = this;
				_this.addJump=true
				_this.getDomInfo('areaBox', info => {
					_this.areaBoxInfo = info;
					// 设置区域内所有图片的左上角坐标
					_this.scopeImgList.forEach((item, idx) => {
						_this.getDomInfo('img' + idx, res => {
							item.x = res.left - info.left;
						});
						_this.getDomInfo('img' + idx, res => {
							item.y = res.top - info.top;
						});
					});
				});
				//获取拖拽区域的上边距和下边距
				let areaBoxTop = this.areaBoxInfo.top;
				let areaBoxLeft = this.areaBoxInfo.left;
				// console.log(this.areaBoxInfo)

				// 设置可移动方块的初始位置为当前所选中图片的位置坐标
				this.x = this.scopeImgList[e].x;
				this.y = this.scopeImgList[e].y;
				//显示可移动方块
				this.moveSrc = this.scopeImgList[e].url;
				//保存当前所选择的图片索引
				this.selectIdx = e;
				var x = s.changedTouches[0].clientX - areaBoxLeft;
				var y = s.changedTouches[0].clientY - areaBoxTop;
				// 保存鼠标在图片内的坐标
				this.inBoxXY = {
					x: x - this.scopeImgList[e].x,
					y: y - this.scopeImgList[e].y,
				}
			},
			tsmo(e) {
				const _this = this;
				let areaBoxTop = this.areaBoxInfo.top;
				let areaBoxLeft = this.areaBoxInfo.left;
				let width = this.width;
				//重置为以拖拽盒子左上角为坐标原点
				var x = e.changedTouches[0].clientX - areaBoxLeft;
				var y = e.changedTouches[0].clientY - areaBoxTop;
				this.x = x - this.inBoxXY.x;
				this.y = y - this.inBoxXY.y;

				this.scopeImgList.forEach((item, idx) => {
					if (x > item.x && x < item.x + width && y > item.y && y < item.y + width) {
						_this.hoverImgIdx = 'img' + idx
					}
				});
			},
			toend(e) {
				const _this = this;
				_this.addJump=false
				// 移动结束隐藏可移动方块
				let beforeIdx = _this.selectIdx;
				let afterIdx = parseInt(_this.hoverImgIdx.split('img')[1]);
				if (_this.hoverImgIdx !== '' && beforeIdx !== afterIdx) {
					_this.scopeImgList[beforeIdx].url = _this.scopeImgList[afterIdx].url;
					_this.scopeImgList[afterIdx].url = _this.moveSrc;
					this.$emit('moveEndList', this.scopeImgList);
				}
				this.moveSrc = '';
				this.hoverImgIdx = ''
				this.selectIdx = null
				let imageList = this.scopeImgList.map((img)=>{return img.url})
				this.$emit('complete', {
					status: 1,
					imgArr: imageList,
					params: _this.params,
					keyList: [],
				})
			},
			getDomInfo(id, callBack) {
				const query = uni.createSelectorQuery().in(this);
				query.select('#' + id)
					.boundingClientRect()
					.exec(function(res) {
						callBack(res[0]);
					});
			}
		},
	}
</script>

<style lang="less" scoped>
	@font-face {
		font-family: 'tuiUpload';
		src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAATcAA0AAAAAByQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEwAAAABoAAAAciR52BUdERUYAAASgAAAAHgAAAB4AKQALT1MvMgAAAaAAAABCAAAAVjxvR/tjbWFwAAAB+AAAAEUAAAFK5ibpuGdhc3AAAASYAAAACAAAAAj//wADZ2x5ZgAAAkwAAADXAAABAAmNjcZoZWFkAAABMAAAAC8AAAA2FpiS+WhoZWEAAAFgAAAAHQAAACQH3QOFaG10eAAAAeQAAAARAAAAEgwAACBsb2NhAAACQAAAAAwAAAAMAEoAgG1heHAAAAGAAAAAHwAAACABEgA2bmFtZQAAAyQAAAFJAAACiCnmEVVwb3N0AAAEcAAAACgAAAA6OMUs4HjaY2BkYGAAYo3boY/i+W2+MnCzMIDAzb3qdQj6fwPzf+YGIJeDgQkkCgA/KAtvAHjaY2BkYGBu+N/AEMPCAALM/xkYGVABCwBZ4wNrAAAAeNpjYGRgYGBl0GJgZgABJiDmAkIGhv9gPgMADTABSQB42mNgZGFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7PGJ9xMjf8b2CIYW5gaAAKM4LkANt9C+UAAHjaY2GAABYIVmBgAAAA+gAtAAAAeNpjYGBgZoBgGQZGBhBwAfIYwXwWBg0gzQakGRmYnjE+4/z/n4EBQksxSf6GqgcCRjYGOIeRCUgwMaACRoZhDwCiLwmoAAAAAAAAAAAAAAAASgCAeNpdjkFKw0AARf/vkIR0BkPayWRKQZtYY90ohJju2kOIbtz0KD1HVm50UfEmWXoAr9ADOHFARHHzeY//Fx8Ci+FJfIgdJFa4AhgiMshbrCuIsLxhFJZVs+Vl1bT1GddtbXTC3OhohN4dg4BJ3zMJAnccyfm468ZzHXddrH9ZKbHzdf9n/vkY/xv9sPQXgGEvBrHHwst5kTbXLE+YpYVPkxepPmW94W16UbdNJd6f3SAzo5W7m1jaKd+8ZZIvk5nlKw9SK6Wle7BLS3f/bTzQLmfAF2T1NsQAeNp9kD1OAzEQhZ/zByQSQiCoXVEA2vyUKRMp9Ailo0g23pBo1155nUg5AS0VB6DlGByAGyDRcgpelkmTImvt6PObmeexAZzjGwr/3yXuhBWO8ShcwREy4Sr1F+Ea+V24jhY+hRvUf4SbuFUD4RYu1BsdVO2Eu5vSbcsKZxgIV3CKJ+Eq9ZVwjfwqXMcVPoQb1L+EmxjjV7iFa2WpDOFhMEFgnEFjig3jAjEcLJIyBtahOfRmEsxMTzd6ETubOBso71dilwMeaDnngCntPbdmvkon/mDLgdSYbh4FS7YpjS4idCgbXyyc1d2oc7D9nu22tNi/a4E1x+xRDWzU/D3bM9JIbAyvkJI18jK3pBJTj2hrrPG7ZynW814IiU68y/SIx5o0dTr3bmniwOLn8owcfbS5kj33qBw+Y1kIeb/dTsQgil2GP5PYcRkAAAB42mNgYoAALjDJyIAOWMGiTIxMjMxsKak5qSWpbFmZiRmJ+QAmgAUIAAAAAf//AAIAAQAAAAwAAAAWAAAAAgABAAMABAABAAQAAAACAAAAAHjaY2BgYGQAgqtL1DlA9M296nUwGgA+8QYgAAA=) format('woff');
		font-weight: normal;
		font-style: normal;
	}

	.tui-upload-icon {
		font-family: "tuiUpload" !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		padding: 10rpx;
	}
	.tui-icon-plus:before {
		content: "\e609";
	}

	.tui-icon-delete:before {
		content: "\e601";
	}

	.tui-upload-add {
		font-size: 44rpx;
		font-weight: 100;
		color: #888;
		background-color: #F7F7F7;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.tui-image-item {
		position: relative;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}

	.tui-image-item:nth-of-type(3n) {
		margin-right: 0;
	}

	.tui-item-img {
		display: block;
	}

	.tui-img-del {
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		right: -12rpx;
		top: -12rpx;
		background-color: #EB0909;
		border-radius: 50%;
		color: white;
		font-size: 34rpx;
		z-index: 10;
	}

	.tui-img-del::before {
		content: '';
		width: 16rpx;
		height: 1px;
		position: absolute;
		left: 10rpx;
		top: 18rpx;
		background-color: #fff;
	}

	.tui-upload-mask {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx 0;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.tui-upload-loading {
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		border: 2px solid;
		border-color: #B2B2B2 #B2B2B2 #B2B2B2 #fff;
		animation: tui-rotate 0.7s linear infinite;
	}

	@keyframes tui-rotate {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.tui-tips {
		font-size: 26rpx;
		color: #fff;
	}

	.tui-mask-btn {
		padding: 4rpx 16rpx;
		border-radius: 40rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;
		border: 1rpx solid #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-top: 26rpx;
	}

	.tui-btn-hover {
		opacity: 0.8;
	}

	.movarea {
		width: 100%;
		height: 320rpx;
		display: flex;
		flex-direction: row;
	}
	.imgBox {
		width: 100%;
		height: 320rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		.imgItem {
			position: relative;
			box-sizing: border-box;
			left: 0;
			top: 0;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			box-sizing: border-box;
			image {
				width: 100%;
				height: 100%;
				// transition: all 0.2s;
				vertical-align: top;
			}
			.closeBtn {
				color: #FFFFFF;
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				z-index: 1002;
				background-color: rgba(0, 0, 0, 0.5);
			}
		
		}
		.imgItem:nth-of-type(3n) {
			margin-right: 0;
		}
	}

	.moveV {
		opacity: 0.6;
		z-index: 999;
		box-sizing: border-box;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.select {
		opacity: 0;
	}
</style>
