"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es6.object.create.js");
require("core-js/modules/es6.object.define-property.js");
require("core-js/modules/es6.object.get-prototype-of.js");
require("core-js/modules/es6.reflect.construct.js");
require("core-js/modules/es6.symbol.js");
require("core-js/modules/es6.number.constructor.js");
require("core-js/modules/es6.weak-map.js");
require("core-js/modules/es6.string.iterator.js");
require("core-js/modules/es6.object.to-string.js");
require("core-js/modules/es6.array.iterator.js");
require("core-js/modules/web.dom.iterable.js");
require("core-js/modules/es6.object.get-own-property-descriptor.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es6.function.bind.js");
require("core-js/modules/es6.array.map.js");
require("core-js/modules/es6.object.set-prototype-of.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
var PerPage = /*#__PURE__*/function (_Component) {
  function PerPage(props) {
    var _this;
    _classCallCheck(this, PerPage);
    _this = _callSuper(this, PerPage, [props]);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }
  _inherits(PerPage, _Component);
  return _createClass(PerPage, [{
    key: "onChange",
    value: function onChange(_ref) {
      var value = _ref.target.value;
      var onChange = this.props.onChange;
      onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        _this$props$className = _this$props.className,
        container = _this$props$className.container,
        innerContainer = _this$props$className.innerContainer,
        select = _this$props$className.select,
        value = _this$props.value,
        defaultValue = _this$props.defaultValue,
        options = _this$props.options,
        totalRows = _this$props.totalRows;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: container
      }, /*#__PURE__*/_react["default"].createElement("span", null, "Showing"), /*#__PURE__*/_react["default"].createElement("div", {
        className: innerContainer
      }, /*#__PURE__*/_react["default"].createElement("select", {
        className: select,
        value: value || defaultValue,
        onChange: this.onChange
      }, options.map(function (option) {
        return /*#__PURE__*/_react["default"].createElement("option", {
          key: option,
          value: option
        }, option);
      }))), /*#__PURE__*/_react["default"].createElement("span", null, "of ", totalRows, " records"));
    }
  }]);
}(_react.Component);
PerPage.defaultProps = {
  className: {
    container: 'd-flex align-items-center',
    innerContainer: 'form-group mb-0 mx-sm-3 mx-2',
    select: 'form-control'
  },
  defaultValue: 15,
  options: [10, 15, 30, 50, 75, 100]
};
PerPage.propTypes = {
  onChange: _propTypes["default"].func.isRequired,
  totalRows: _propTypes["default"].number.isRequired,
  value: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired,
  defaultValue: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  className: _propTypes["default"].shape({
    container: _propTypes["default"].string,
    innerContainer: _propTypes["default"].string,
    select: _propTypes["default"].string
  }),
  options: _propTypes["default"].arrayOf(_propTypes["default"].number)
};
var _default = exports["default"] = PerPage;