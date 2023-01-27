"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es6.reflect.construct.js");
require("core-js/modules/es6.object.create.js");
require("core-js/modules/es6.object.define-property.js");
require("core-js/modules/es6.symbol.js");
require("core-js/modules/es6.number.constructor.js");
require("core-js/modules/es6.array.is-array.js");
require("core-js/modules/es6.string.iterator.js");
require("core-js/modules/es6.object.to-string.js");
require("core-js/modules/es6.array.iterator.js");
require("core-js/modules/web.dom.iterable.js");
require("core-js/modules/es6.array.from.js");
require("core-js/modules/es6.array.slice.js");
require("core-js/modules/es6.function.name.js");
require("core-js/modules/es6.object.keys.js");
require("core-js/modules/es6.array.filter.js");
require("core-js/modules/es6.object.get-own-property-descriptor.js");
require("core-js/modules/es6.array.for-each.js");
require("core-js/modules/es7.object.get-own-property-descriptors.js");
require("core-js/modules/es6.object.define-properties.js");
require("core-js/modules/es6.array.index-of.js");
require("core-js/modules/es6.object.assign.js");
require("core-js/modules/es6.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es6.function.bind.js");
require("core-js/modules/es6.object.set-prototype-of.js");
require("core-js/modules/es6.object.get-prototype-of.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _DynamicDataTable = _interopRequireDefault(require("./DynamicDataTable"));
var _excluded = ["disallowOrderingBy", "footer", "perPage"],
  _excluded2 = ["disallow_ordering_by"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var AjaxDynamicDataTable = /*#__PURE__*/function (_Component) {
  _inherits(AjaxDynamicDataTable, _Component);
  var _super = _createSuper(AjaxDynamicDataTable);
  function AjaxDynamicDataTable(props) {
    var _this;
    _classCallCheck(this, AjaxDynamicDataTable);
    _this = _super.call(this, props);
    var defaultOrderByField = props.defaultOrderByField,
      defaultOrderByDirection = props.defaultOrderByDirection,
      perPage = props.perPage;
    _this.state = {
      rows: [],
      currentPage: 1,
      perPage: perPage,
      totalPages: 1,
      totalRows: 0,
      orderByField: defaultOrderByField,
      orderByDirection: defaultOrderByDirection,
      disallowOrderingBy: [],
      meta: {},
      loading: false
    };
    _this.reload = _this.reload.bind(_assertThisInitialized(_this));
    _this.changePage = _this.changePage.bind(_assertThisInitialized(_this));
    _this.changeOrder = _this.changeOrder.bind(_assertThisInitialized(_this));
    _this.changePerPage = _this.changePerPage.bind(_assertThisInitialized(_this));
    _this.renderFooter = _this.renderFooter.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(AjaxDynamicDataTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadPage(1);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (JSON.stringify(prevProps.params) !== JSON.stringify(this.props.params)) {
        this.loadPage(1);
      }
    }
  }, {
    key: "loading",
    get: function get() {
      var state = this.state.loading;
      var prop = this.props.loading;
      return state || prop;
    }
  }, {
    key: "disallowOrderingBy",
    get: function get() {
      var state = this.state.disallowOrderingBy;
      var prop = this.props.disallowOrderingBy;
      return [].concat(_toConsumableArray(state), _toConsumableArray(prop));
    }
  }, {
    key: "renderFooter",
    value: function renderFooter(args) {
      var meta = this.state.meta;
      var footer = this.props.footer;
      if (typeof footer === 'function') {
        return footer(_objectSpread({
          meta: meta
        }, args));
      }
      return footer;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
        rows = _this$state.rows,
        totalRows = _this$state.totalRows,
        currentPage = _this$state.currentPage,
        totalPages = _this$state.totalPages,
        orderByField = _this$state.orderByField,
        orderByDirection = _this$state.orderByDirection;
      var _this$props = this.props,
        disallowOrderingBy = _this$props.disallowOrderingBy,
        footer = _this$props.footer,
        perPage = _this$props.perPage,
        props = _objectWithoutProperties(_this$props, _excluded);
      return /*#__PURE__*/_react["default"].createElement(_DynamicDataTable["default"], _extends({
        rows: rows,
        totalRows: totalRows,
        currentPage: currentPage,
        perPage: this.state.perPage,
        totalPages: totalPages,
        orderByField: orderByField,
        orderByDirection: orderByDirection,
        loading: this.loading,
        changePage: this.changePage,
        changeOrder: this.changeOrder,
        changePerPage: this.changePerPage,
        disallowOrderingBy: this.disallowOrderingBy,
        footer: footer ? this.renderFooter : undefined
      }, props));
    }
  }, {
    key: "reload",
    value: function reload() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.loadPage(page);
    }
  }, {
    key: "loadPage",
    value: function loadPage(page) {
      var _this2 = this;
      var _this$state2 = this.state,
        perPage = _this$state2.perPage,
        orderByField = _this$state2.orderByField,
        orderByDirection = _this$state2.orderByDirection;
      var _this$props2 = this.props,
        onLoad = _this$props2.onLoad,
        onError = _this$props2.onError,
        params = _this$props2.params,
        axios = _this$props2.axios;
      this.setState({
        loading: true
      }, function () {
        axios.get(_this2.props.apiUrl, {
          params: _objectSpread(_objectSpread({}, params), {}, {
            page: page,
            perPage: perPage,
            orderByField: orderByField,
            orderByDirection: orderByDirection
          })
        }).then(function (_ref) {
          var response = _ref.data;
          var _response$data = response.data,
            rows = _response$data.data,
            total = _response$data.total,
            current_page = _response$data.current_page,
            last_page = _response$data.last_page;
          var disallow_ordering_by = [];
          var meta = {};
          if (response.meta) {
            var _response$meta = response.meta;
            disallow_ordering_by = _response$meta.disallow_ordering_by;
            meta = _objectWithoutProperties(_response$meta, _excluded2);
            _response$meta;
          }
          var newState = {
            rows: rows,
            meta: meta,
            disallowOrderingBy: disallow_ordering_by,
            totalRows: total,
            currentPage: current_page,
            totalPages: last_page,
            loading: false
          };
          _this2.setState(newState);
          onLoad(newState);
        })["catch"](function (e) {
          _this2.setState({
            loading: false
          });
          onError(e);
        });
      });
    }
  }, {
    key: "changePage",
    value: function changePage(page) {
      this.loadPage(page);
    }
  }, {
    key: "changePerPage",
    value: function changePerPage(limit) {
      this.setState({
        perPage: limit
      }, this.reload);
    }
  }, {
    key: "changeOrder",
    value: function changeOrder(field, direction) {
      var _this3 = this;
      this.setState({
        orderByField: field,
        orderByDirection: direction
      }, function () {
        _this3.loadPage(1);
      });
    }
  }]);
  return AjaxDynamicDataTable;
}(_react.Component);
AjaxDynamicDataTable.defaultProps = {
  onLoad: function onLoad() {
    return null;
  },
  onError: function onError() {
    return null;
  },
  loading: false,
  params: {},
  defaultOrderByField: null,
  defaultOrderByDirection: null,
  axios: typeof window !== 'undefined' && window.axios ? window.axios : require('axios'),
  disallowOrderingBy: [],
  perPage: 15
};
AjaxDynamicDataTable.propTypes = {
  apiUrl: _propTypes["default"].string,
  onLoad: _propTypes["default"].func,
  onError: _propTypes["default"].func,
  loading: _propTypes["default"].bool,
  params: _propTypes["default"].object,
  defaultOrderByField: _propTypes["default"].string,
  defaultOrderByDirection: _propTypes["default"].string,
  axios: _propTypes["default"].any,
  disallowOrderingBy: _propTypes["default"].arrayOf(_propTypes["default"].string),
  perPage: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  perPageOptions: _propTypes["default"].arrayOf(_propTypes["default"].number)
};
var _default = AjaxDynamicDataTable;
exports["default"] = _default;