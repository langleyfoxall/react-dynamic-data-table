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
require("core-js/modules/es6.array.for-each.js");
require("core-js/modules/es6.object.set-prototype-of.js");
require("core-js/modules/es6.function.bind.js");
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
var Pagination = /*#__PURE__*/function (_Component) {
  function Pagination() {
    _classCallCheck(this, Pagination);
    return _callSuper(this, Pagination, arguments);
  }
  _inherits(Pagination, _Component);
  return _createClass(Pagination, [{
    key: "render",
    value: function render() {
      var _this = this;
      var pageLinks = [];
      var props = this.props;
      var currentPage = props.currentPage;
      var totalPages = props.totalPages;
      var alwaysShowPagination = props.alwaysShowPagination;
      if (!alwaysShowPagination && totalPages <= 1) {
        return null;
      }
      this.getPagesToDisplay(currentPage, totalPages).forEach(function (page, index) {
        pageLinks.push( /*#__PURE__*/_react["default"].createElement("li", {
          key: "page_index_".concat(index),
          className: "page-item ".concat(currentPage === page ? 'active' : '')
        }, /*#__PURE__*/_react["default"].createElement("button", {
          type: "button",
          className: "page-link ".concat(!page ? 'disabled' : ''),
          onClick: function onClick() {
            if (page) {
              _this.changePage(page);
            }
          }
        }, page || '...')));
      });
      return /*#__PURE__*/_react["default"].createElement("nav", {
        "aria-label": "Page navigation ml-auto"
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: "pagination mb-0"
      }, /*#__PURE__*/_react["default"].createElement("li", {
        className: "page-item ".concat(currentPage <= 1 ? 'disabled' : '')
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "page-link",
        onClick: function onClick() {
          return _this.previousPage();
        }
      }, "Previous")), pageLinks, /*#__PURE__*/_react["default"].createElement("li", {
        className: "page-item ".concat(currentPage >= totalPages ? 'disabled' : '')
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "page-link",
        onClick: function onClick() {
          return _this.nextPage();
        }
      }, "Next"))));
    }
  }, {
    key: "changePage",
    value: function changePage(page) {
      this.props.changePage(page);
    }
  }, {
    key: "previousPage",
    value: function previousPage() {
      if (this.props.currentPage > 1) {
        this.changePage(this.props.currentPage - 1);
      }
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      if (this.props.currentPage < this.props.totalPages) {
        this.changePage(this.props.currentPage + 1);
      }
    }
  }, {
    key: "getPagesToDisplay",
    value: function getPagesToDisplay(currentPage, totalPages) {
      var paginationDelta = this.props.paginationDelta;
      var pages = [];
      for (var i = 1; i <= totalPages; i++) {
        var isFirstPage = i === 1;
        var isLastPage = i === totalPages;
        var isWithinDelta = Math.abs(currentPage - i) <= paginationDelta;
        if (isFirstPage || isLastPage || isWithinDelta) {
          // If this element isn't directly sequential to the last, add a filler null element.
          if (pages.length >= 1 && i !== pages[pages.length - 1] + 1) {
            pages.push(null);
          }
          pages.push(i);
        }
      }
      return pages;
    }
  }]);
}(_react.Component);
Pagination.defaultProps = {
  paginationDelta: 4,
  alwaysShowPagination: false
};
Pagination.propTypes = {
  currentPage: _propTypes["default"].number,
  totalPages: _propTypes["default"].number,
  changePage: _propTypes["default"].func,
  paginationDelta: _propTypes["default"].number,
  alwaysShowPagination: _propTypes["default"].bool
};
var _default = exports["default"] = Pagination;