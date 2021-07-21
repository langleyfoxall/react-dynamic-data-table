"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.reflect.construct.js");

require("core-js/modules/es6.object.create.js");

require("core-js/modules/es6.object.define-property.js");

require("core-js/modules/es6.weak-map.js");

require("core-js/modules/es6.string.iterator.js");

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.array.iterator.js");

require("core-js/modules/web.dom.iterable.js");

require("core-js/modules/es6.object.get-own-property-descriptor.js");

require("core-js/modules/es6.symbol.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.for-each.js");

require("core-js/modules/es6.object.set-prototype-of.js");

require("core-js/modules/es6.object.get-prototype-of.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Pagination = /*#__PURE__*/function (_Component) {
  _inherits(Pagination, _Component);

  var _super = _createSuper(Pagination);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _super.apply(this, arguments);
  }

  _createClass(Pagination, [{
    key: "render",
    value: function render() {
      var _this = this;

      var pageLinks = [];
      var props = this.props;
      var currentPage = props.currentPage;
      var totalPages = props.totalPages;

      if (totalPages <= 1) {
        return null;
      }

      this.getPagesToDisplay(currentPage, totalPages).forEach(function (page, index) {
        pageLinks.push(_react["default"].createElement("li", {
          key: "page_index_".concat(index),
          className: "page-item ".concat(currentPage === page ? 'active' : '')
        }, _react["default"].createElement("button", {
          type: "button",
          className: "page-link ".concat(!page ? 'disabled' : ''),
          onClick: function onClick() {
            if (page) {
              _this.changePage(page);
            }
          }
        }, page || '...')));
      });
      return _react["default"].createElement("nav", {
        "aria-label": "Page navigation ml-auto"
      }, _react["default"].createElement("ul", {
        className: "pagination mb-0"
      }, _react["default"].createElement("li", {
        className: "page-item ".concat(currentPage <= 1 ? 'disabled' : '')
      }, _react["default"].createElement("button", {
        type: "button",
        className: "page-link",
        onClick: function onClick() {
          return _this.previousPage();
        }
      }, "Previous")), pageLinks, _react["default"].createElement("li", {
        className: "page-item ".concat(currentPage >= totalPages ? 'disabled' : '')
      }, _react["default"].createElement("button", {
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

  return Pagination;
}(_react.Component);

Pagination.defaultProps = {
  paginationDelta: 4
};
Pagination.propTypes = {
  currentPage: _propTypes["default"].number,
  totalPages: _propTypes["default"].number,
  changePage: _propTypes["default"].func,
  paginationDelta: _propTypes["default"].number
};
var _default = Pagination;
exports["default"] = _default;