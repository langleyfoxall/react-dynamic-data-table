"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DynamicDataTable", {
  enumerable: true,
  get: function get() {
    return _DynamicDataTable["default"];
  }
});
Object.defineProperty(exports, "AjaxDynamicDataTable", {
  enumerable: true,
  get: function get() {
    return _AjaxDynamicDataTable["default"];
  }
});
Object.defineProperty(exports, "DataRow", {
  enumerable: true,
  get: function get() {
    return _DataRow["default"];
  }
});
Object.defineProperty(exports, "Pagination", {
  enumerable: true,
  get: function get() {
    return _Pagination["default"];
  }
});
Object.defineProperty(exports, "PerPage", {
  enumerable: true,
  get: function get() {
    return _PerPage["default"];
  }
});
exports["default"] = void 0;

var _DynamicDataTable = _interopRequireDefault(require("./DynamicDataTable"));

var _AjaxDynamicDataTable = _interopRequireDefault(require("./AjaxDynamicDataTable"));

var _DataRow = _interopRequireDefault(require("./Components/DataRow"));

var _Pagination = _interopRequireDefault(require("./Components/Pagination"));

var _PerPage = _interopRequireDefault(require("./Components/PerPage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _DynamicDataTable["default"];
exports["default"] = _default;