(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/thorui/tui-upload/tui-upload"],{

/***/ 394:
/*!**************************************************************************!*\
  !*** D:/Project/storeCenter/components/thorui/tui-upload/tui-upload.vue ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tui_upload_vue_vue_type_template_id_218c3bf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tui-upload.vue?vue&type=template&id=218c3bf4&scoped=true& */ 395);
/* harmony import */ var _tui_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tui-upload.vue?vue&type=script&lang=js& */ 397);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _tui_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _tui_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _tui_upload_vue_vue_type_style_index_0_id_218c3bf4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tui-upload.vue?vue&type=style&index=0&id=218c3bf4&scoped=true&lang=css& */ 399);
/* harmony import */ var _Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs





/* normalize component */

var component = Object(_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _tui_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _tui_upload_vue_vue_type_template_id_218c3bf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _tui_upload_vue_vue_type_template_id_218c3bf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "218c3bf4",
  null,
  false,
  _tui_upload_vue_vue_type_template_id_218c3bf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/thorui/tui-upload/tui-upload.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 395:
/*!*********************************************************************************************************************!*\
  !*** D:/Project/storeCenter/components/thorui/tui-upload/tui-upload.vue?vue&type=template&id=218c3bf4&scoped=true& ***!
  \*********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_template_id_218c3bf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./tui-upload.vue?vue&type=template&id=218c3bf4&scoped=true& */ 396);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_template_id_218c3bf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_template_id_218c3bf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_template_id_218c3bf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_template_id_218c3bf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 396:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Project/storeCenter/components/thorui/tui-upload/tui-upload.vue?vue&type=template&id=218c3bf4&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 397:
/*!***************************************************************************************************!*\
  !*** D:/Project/storeCenter/components/thorui/tui-upload/tui-upload.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./tui-upload.vue?vue&type=script&lang=js& */ 398);
/* harmony import */ var _Program_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Program_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Program_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Program_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Program_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 398:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Project/storeCenter/components/thorui/tui-upload/tui-upload.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default2 =
{
  name: 'tuiUpload',
  emits: ['remove', 'complete'],
  props: {
    //展示图片宽度
    width: {
      type: [Number, String],
      default: 220 },

    //展示图片高度
    height: {
      type: [Number, String],
      default: 220 },

    //初始化图片路径
    value: {
      type: Array,
      default: function _default() {
        return [];
      } },

    //删除图片前是否弹框确认
    delConfirm: {
      type: Boolean,
      default: false },

    //禁用删除
    forbidDel: {
      type: Boolean,
      default: false },

    //禁用添加
    forbidAdd: {
      type: Boolean,
      default: false },

    //服务器接口地址。当接口地址为空时，直接返回本地图片地址
    serverUrl: {
      type: String,
      default: "" },

    //限制数
    limit: {
      type: Number,
      default: 9 },

    //original 原图，compressed 压缩图，默认二者都有
    sizeType: {
      type: Array,
      default: function _default() {
        return ['original', 'compressed'];
      } },

    //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
    sourceType: {
      type: Array,
      default: function _default() {
        return ['album', 'camera'];
      } },

    //可上传图片类型，默认为空，不限制  Array<String> ['jpg','png','gif']
    imageFormat: {
      type: Array,
      default: function _default() {
        return [];
      } },

    //单张图片大小限制 MB 
    size: {
      type: Number,
      default: 4 },

    //文件对应的key，默认为 file
    fileKeyName: {
      type: String,
      default: "file" },

    //HTTP 请求 Header, header 中不能设置 Referer。
    header: {
      type: Object,
      default: function _default() {
        return {};
      } },

    //HTTP 请求中其他额外的 form data
    formData: {
      type: Object,
      default: function _default() {
        return {};
      } },

    //自定义参数
    params: {
      type: [Number, String],
      default: 0 } },


  data: function data() {
    return {
      //图片地址
      imageList: [],
      //上传状态：1-上传成功 2-上传中 3-上传失败
      statusArr: [] };

  },
  created: function created() {
    this.initImages();
  },
  watch: {
    value: function value(val) {
      if (val) {
        this.initImages();
      }
    } },

  computed: {
    isShowAdd: function isShowAdd() {
      var isShow = true;
      if (this.forbidAdd || this.limit && this.imageList.length >= this.limit) {
        isShow = false;
      }
      return isShow;
    } },

  methods: {
    initImages: function initImages() {
      this.statusArr = [];
      this.imageList = _toConsumableArray(this.value);var _iterator = _createForOfIteratorHelper(
      this.imageList),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var item = _step.value;
          this.statusArr.push("1");
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
    },
    // 重新上传
    reUpLoad: function reUpLoad(index) {var _this2 = this;
      this.$set(this.statusArr, index, "2");
      this.change();
      this.uploadImage(index, this.imageList[index]).then(function () {
        _this2.change();
      }).catch(function () {
        _this2.change();
      });
    },
    /**
        * @param manual 是否手动上传
        **/
    change: function change() {var manual = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var status = ~this.statusArr.indexOf("2") ? 2 : 1;
      if (status != 2 && ~this.statusArr.indexOf("3")) {
        // 上传失败
        status = 3;
      }
      this.$emit('complete', {
        status: status,
        imgArr: this.imageList,
        params: this.params,
        manual: manual });

    },
    toast: function toast(text) {
      text && uni.showToast({
        title: text,
        icon: "none" });

    },
    chooseImage: function chooseImage() {
      var _this = this;
      uni.chooseImage({
        count: _this.limit - _this.imageList.length,
        sizeType: _this.sizeType,
        sourceType: _this.sourceType,
        success: function success(e) {
          var imageArr = [];
          for (var i = 0; i < e.tempFiles.length; i++) {
            var len = _this.imageList.length;
            if (len >= _this.limit) {
              _this.toast("\u6700\u591A\u53EF\u4E0A\u4F20".concat(_this.limit, "\u5F20\u56FE\u7247"));
              break;
            }
            //过滤图片类型
            var path = e.tempFiles[i].path;

            if (_this.imageFormat.length > 0) {
              var format = "";






              format = path.split(".")[path.split(".").length - 1];


              if (_this.imageFormat.indexOf(format) == -1) {
                var text = "\u53EA\u80FD\u4E0A\u4F20 ".concat(_this.imageFormat.join(','), " \u683C\u5F0F\u56FE\u7247\uFF01");
                _this.toast(text);
                continue;
              }
            }

            //过滤超出大小限制图片
            var size = e.tempFiles[i].size;

            if (_this.size * 1024 * 1024 < size) {
              var _err = "\u5355\u5F20\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7\uFF1A".concat(_this.size, "MB");
              _this.toast(_err);
              continue;
            }
            imageArr.push(path);
            _this.imageList.push(path);
            _this.statusArr.push("2");
          }
          _this.change();

          var start = _this.imageList.length - imageArr.length;
          for (var j = 0; j < imageArr.length; j++) {
            var index = start + j;
            //服务器地址
            if (_this.serverUrl) {
              _this.uploadImage(index, imageArr[j]).then(function () {
                _this.change();
              }).catch(function () {
                _this.change();
              });
            } else {
              //无服务器地址则直接返回成功
              _this.$set(_this.statusArr, index, "1");
              _this.change();
            }
          }
        } });

    },
    uploadImage: function uploadImage(index, url, serverUrl) {var _this3 = this;
      var _this = this;
      return new Promise(function (resolve, reject) {
        uni.uploadFile({
          url: _this3.serverUrl || serverUrl,
          name: _this3.fileKeyName,
          header: _this3.header,
          formData: _this3.formData,
          filePath: url,
          success: function success(res) {
            if (res.statusCode == 200) {
              //返回结果 此处需要按接口实际返回进行修改
              var d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}");
              //判断code，以实际接口规范判断
              if (d.code % 100 === 0) {
                // 上传成功 d.url 为上传后图片地址，以实际接口返回为准
                d.url && (_this.imageList[index] = d.url);
                _this.$set(_this.statusArr, index, d.url ? "1" : "3");
              } else {
                // 上传失败
                _this.$set(_this.statusArr, index, "3");
              }
              resolve(index);
            } else {
              _this.$set(_this.statusArr, index, "3");
              reject(index);
            }
          },
          fail: function fail(res) {
            _this.$set(_this.statusArr, index, "3");
            reject(index);
          } });

      });

    },
    delImage: function delImage(index) {
      var that = this;
      if (this.delConfirm) {
        uni.showModal({
          title: '提示',
          content: '确认删除该图片吗？',
          showCancel: true,
          cancelColor: "#555",
          confirmColor: "#eb0909",
          confirmText: "确定",
          success: function success(res) {
            if (res.confirm) {
              that.imageList.splice(index, 1);
              that.statusArr.splice(index, 1);
              that.$emit("remove", {
                index: index,
                params: that.params });

              that.change();
            }
          } });

      } else {
        that.imageList.splice(index, 1);
        that.statusArr.splice(index, 1);
        that.$emit("remove", {
          index: index,
          params: that.params });

        that.change();
      }
    },
    previewImage: function previewImage(index) {
      if (!this.imageList.length) return;
      uni.previewImage({
        current: this.imageList[index],
        loop: true,
        urls: this.imageList });

    },
    /**
        * 当属性serverUrl传空时，父级调用该方法一次性上传所有图片
        * @param serverUrl 服务器接口地址
        **/
    uploadAllImage: function uploadAllImage(serverUrl) {var _this4 = this;
      if (!serverUrl) {
        this.toast('服务器接口地址不能为空！');
        return;
      }
      var imageArr = _toConsumableArray(this.imageList);
      var len = imageArr.length;var _loop = function _loop(
      i) {
        //如果是服务器地址图片则无需再次上传
        if (imageArr[i].startsWith('https')) {
          return "continue";
        } else {
          _this4.$set(_this4.statusArr, i, "2");
          _this4.uploadImage(i, imageArr[i], serverUrl).then(function () {
            if (i === len - 1) {
              _this4.change(true);
            }
          }).catch(function () {
            if (i === len - 1) {
              _this4.change(true);
            }
          });
        }};for (var i = 0; i < len; i++) {var _ret = _loop(i);if (_ret === "continue") continue;
      }
    } } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 399:
/*!***********************************************************************************************************************************!*\
  !*** D:/Project/storeCenter/components/thorui/tui-upload/tui-upload.vue?vue&type=style&index=0&id=218c3bf4&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Program_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Program_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_style_index_0_id_218c3bf4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Program/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./tui-upload.vue?vue&type=style&index=0&id=218c3bf4&scoped=true&lang=css& */ 400);
/* harmony import */ var _Program_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Program_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Program_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_style_index_0_id_218c3bf4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Program_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Program_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Program_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_style_index_0_id_218c3bf4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Program_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Program_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Program_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_style_index_0_id_218c3bf4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Program_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Program_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Program_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_style_index_0_id_218c3bf4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Program_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Program_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Program_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Program_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tui_upload_vue_vue_type_style_index_0_id_218c3bf4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 400:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Project/storeCenter/components/thorui/tui-upload/tui-upload.vue?vue&type=style&index=0&id=218c3bf4&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/thorui/tui-upload/tui-upload.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/thorui/tui-upload/tui-upload-create-component',
    {
        'components/thorui/tui-upload/tui-upload-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(394))
        })
    },
    [['components/thorui/tui-upload/tui-upload-create-component']]
]);
