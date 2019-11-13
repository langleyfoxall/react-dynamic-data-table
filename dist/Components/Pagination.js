"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.for-each");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Pagination =
/*#__PURE__*/
function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _possibleConstructorReturn(this, _getPrototypeOf(Pagination).apply(this, arguments));
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
        "aria-label": "Page navigation"
      }, _react["default"].createElement("ul", {
        className: "pagination"
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