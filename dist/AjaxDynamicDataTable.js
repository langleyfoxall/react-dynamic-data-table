"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es6.object.create.js");
require("core-js/modules/es6.object.define-property.js");
require("core-js/modules/es6.object.get-prototype-of.js");
require("core-js/modules/es6.reflect.construct.js");
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
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _DynamicDataTable = _interopRequireDefault(require("./DynamicDataTable"));
var _excluded = ["disallowOrderingBy", "footer", "perPage"],
  _excluded2 = ["disallow_ordering_by"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var AjaxDynamicDataTable = /*#__PURE__*/function (_Component) {
  function AjaxDynamicDataTable(props) {
    var _this;
    _classCallCheck(this, AjaxDynamicDataTable);
    _this = _callSuper(this, AjaxDynamicDataTable, [props]);
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
    _this.reload = _this.reload.bind(_this);
    _this.changePage = _this.changePage.bind(_this);
    _this.changeOrder = _this.changeOrder.bind(_this);
    _this.changePerPage = _this.changePerPage.bind(_this);
    _this.renderFooter = _this.renderFooter.bind(_this);
    return _this;
  }
  _inherits(AjaxDynamicDataTable, _Component);
  return _createClass(AjaxDynamicDataTable, [{
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
var _default = exports["default"] = AjaxDynamicDataTable;