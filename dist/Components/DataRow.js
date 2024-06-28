"use strict";

require("core-js/modules/es6.object.create.js");
require("core-js/modules/es6.object.define-property.js");
require("core-js/modules/es6.object.get-prototype-of.js");
require("core-js/modules/es6.reflect.construct.js");
require("core-js/modules/es6.symbol.js");
require("core-js/modules/es6.number.constructor.js");
require("core-js/modules/es6.string.iterator.js");
require("core-js/modules/es6.object.to-string.js");
require("core-js/modules/es6.array.iterator.js");
require("core-js/modules/web.dom.iterable.js");
require("core-js/modules/es6.weak-map.js");
require("core-js/modules/es6.object.get-own-property-descriptor.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es6.string.includes.js");
require("core-js/modules/es7.array.includes.js");
require("core-js/modules/es6.array.map.js");
require("core-js/modules/es6.function.name.js");
require("core-js/modules/es6.array.find-index.js");
require("core-js/modules/es6.object.set-prototype-of.js");
require("core-js/modules/es6.function.bind.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var DataRow = /*#__PURE__*/function (_Component) {
  function DataRow() {
    _classCallCheck(this, DataRow);
    return _callSuper(this, DataRow, arguments);
  }
  _inherits(DataRow, _Component);
  return _createClass(DataRow, [{
    key: "shouldDangerouslyRenderField",
    value: function shouldDangerouslyRenderField(field) {
      var dangerouslyRenderFields = this.props.dangerouslyRenderFields;
      return dangerouslyRenderFields.includes(field);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props = this.props,
        row = _this$props.row,
        fields = _this$props.fields,
        _onClick = _this$props.onClick,
        _onMouseUp = _this$props.onMouseUp,
        _onMouseDown = _this$props.onMouseDown,
        _onContextMenu = _this$props.onContextMenu,
        rowIsActive = _this$props.rowIsActive;
      return /*#__PURE__*/_react["default"].createElement("tr", {
        onClick: function onClick(e) {
          return _onClick(e, row);
        },
        onMouseUp: function onMouseUp(e) {
          return _onMouseUp(e, row);
        },
        onMouseDown: function onMouseDown(e) {
          return _onMouseDown(e, row);
        },
        onContextMenu: function onContextMenu(e) {
          return _onContextMenu(e, row);
        },
        className: rowIsActive(row) ? 'table-active' : null
      }, this.renderCheckboxCell(), fields.map(function (field) {
        return _this.renderCell(field, row);
      }), this.renderButtons(row));
    }
  }, {
    key: "renderCheckboxCell",
    value: function renderCheckboxCell() {
      var _this2 = this;
      var _this$props2 = this.props,
        row = _this$props2.row,
        renderCheckboxes = _this$props2.renderCheckboxes,
        disableCheckbox = _this$props2.disableCheckbox;
      if (!renderCheckboxes) {
        return;
      }
      var checkbox = /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-check"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        name: "bulk-select-".concat(row.id),
        type: "checkbox",
        checked: this.props.checkboxIsChecked(row),
        onChange: function onChange(e) {
          return _this2.props.checkboxChange(e, row);
        },
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        disabled: disableCheckbox
      }));
      return /*#__PURE__*/_react["default"].createElement("td", null, checkbox);
    }
  }, {
    key: "renderCell",
    value: function renderCell(field, row) {
      var _this$props3 = this.props,
        editableColumns = _this$props3.editableColumns,
        index = _this$props3.index;
      var value = row[field.name];
      value = this.props.dataItemManipulator(field.name, value, row);
      var key = "".concat(row.id, "_").concat(field.name);
      var columnIndex = editableColumns.findIndex(function (column) {
        return column.name === field.name;
      });
      if (columnIndex !== -1) {
        var column = editableColumns[columnIndex];
        if (column.type === 'select') {
          return /*#__PURE__*/_react["default"].createElement("td", {
            key: key
          }, /*#__PURE__*/_react["default"].createElement("select", {
            defaultValue: value,
            value: column.controlled ? value : undefined,
            onChange: function onChange(event) {
              event.stopPropagation();
              column.onChange(event, field.name, row, index);
            }
          }, column.optionsForRow(row, field.name).map(function (option) {
            return /*#__PURE__*/_react["default"].createElement("option", {
              value: option.value
            }, option.label);
          })));
        }
        return /*#__PURE__*/_react["default"].createElement("td", {
          key: key
        }, /*#__PURE__*/_react["default"].createElement("input", {
          type: column.type,
          defaultValue: value,
          value: column.controlled ? value : undefined,
          onChange: function onChange(event) {
            event.stopPropagation();
            column.onChange(event, field.name, row, index);
          }
        }));
      }
      if ( /*#__PURE__*/_react["default"].isValidElement(value)) {
        return /*#__PURE__*/_react["default"].createElement("td", {
          key: key
        }, value);
      }
      if (this.shouldDangerouslyRenderField(field.name)) {
        return /*#__PURE__*/_react["default"].createElement("td", {
          key: key,
          dangerouslySetInnerHTML: {
            __html: value
          }
        });
      }
      if (_typeof(value) === 'object' || typeof value === 'array') {
        value = JSON.stringify(value);
      }
      return /*#__PURE__*/_react["default"].createElement("td", {
        key: key
      }, value);
    }
  }, {
    key: "renderButtons",
    value: function renderButtons(row) {
      var _this3 = this;
      var _this$props4 = this.props,
        buttons = _this$props4.buttons,
        actions = _this$props4.actions;
      if (typeof buttons === 'function') {
        return buttons(row);
      }
      if (!buttons.length && !actions.length) {
        return null;
      } else if (!buttons.length) {
        return /*#__PURE__*/_react["default"].createElement("td", null);
      }
      var button = buttons[0];
      if (buttons.length === 1) {
        return /*#__PURE__*/_react["default"].createElement("td", {
          className: "rddt-action-cell"
        }, this.renderFirstButton(button, row));
      }
      return /*#__PURE__*/_react["default"].createElement("td", {
        className: "rddt-action-cell"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "btn-group",
        onClick: function onClick(e) {
          return e.stopPropagation();
        }
      }, this.renderFirstButton(button, row), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "btn btn-primary dropdown-toggle dropdown-toggle-split",
        "data-bs-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "sr-only"
      }, "Toggle Dropdown")), /*#__PURE__*/_react["default"].createElement("div", {
        className: "dropdown-menu",
        "aria-labelledby": "dropdownMenuButton"
      }, buttons.map(function (button, index) {
        return _this3.renderButton(button, index, row);
      }))));
    }
  }, {
    key: "renderFirstButton",
    value: function renderFirstButton(button, row) {
      if (typeof button.render === 'function') {
        return button.render(row);
      }
      return /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "btn btn-primary",
        onClick: function onClick(e) {
          return button.callback(e, row);
        }
      }, button.name);
    }
  }, {
    key: "renderButton",
    value: function renderButton(button, index, row) {
      if (index === 0) {
        return;
      }
      if (typeof button.render === 'function') {
        return /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            cursor: 'pointer'
          },
          key: "button_".concat(button.name),
          className: "dropdown-item"
        }, button.render(row));
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          cursor: 'pointer'
        },
        key: "button_".concat(button.name),
        className: "dropdown-item",
        onClick: function onClick(e) {
          return button.callback(e, row);
        }
      }, button.name);
    }
  }], [{
    key: "noop",
    value: function noop() {
      return null;
    }
  }]);
}(_react.Component);
DataRow.defaultProps = {
  onClick: DataRow.noop,
  onMouseUp: DataRow.noop,
  onMouseDown: DataRow.noop,
  onContextMenu: DataRow.noop,
  dangerouslyRenderFields: [],
  actions: [],
  editableColumns: []
};
DataRow.propTypes = {
  row: _propTypes["default"].object,
  buttons: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].func]),
  actions: _propTypes["default"].array,
  checkboxIsChecked: _propTypes["default"].func,
  checkboxChange: _propTypes["default"].func,
  dataItemManipulator: _propTypes["default"].func,
  renderCheckboxes: _propTypes["default"].bool,
  editableColumns: _propTypes["default"].array,
  onClick: _propTypes["default"].func,
  onMouseUp: _propTypes["default"].func,
  onMouseDown: _propTypes["default"].func,
  onContextMenu: _propTypes["default"].func,
  dangerouslyRenderFields: _propTypes["default"].array,
  index: _propTypes["default"].number.isRequired
};
var _default = exports["default"] = DataRow;