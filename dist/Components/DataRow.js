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

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

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

var DataRow =
/*#__PURE__*/
function (_Component) {
  _inherits(DataRow, _Component);

  function DataRow() {
    _classCallCheck(this, DataRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(DataRow).apply(this, arguments));
  }

  _createClass(DataRow, [{
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
          _onContextMenu = _this$props.onContextMenu;
      return _react["default"].createElement("tr", {
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
        }
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

      var checkbox = _react["default"].createElement("div", {
        className: "form-check"
      }, _react["default"].createElement("input", {
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

      return _react["default"].createElement("td", null, checkbox);
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
          return _react["default"].createElement("td", {
            key: key
          }, _react["default"].createElement("select", {
            defaultValue: value,
            value: column.controlled ? value : undefined,
            onChange: function onChange(event) {
              event.stopPropagation();
              column.onChange(event, field.name, row, index);
            }
          }, column.optionsForRow(row, field.name).map(function (option) {
            return _react["default"].createElement("option", {
              value: option.value
            }, option.label);
          })));
        }

        return _react["default"].createElement("td", {
          key: key
        }, _react["default"].createElement("input", {
          type: column.type,
          defaultValue: value,
          value: column.controlled ? value : undefined,
          onChange: function onChange(event) {
            event.stopPropagation();
            column.onChange(event, field.name, row, index);
          }
        }));
      }

      if (_react["default"].isValidElement(value)) {
        return _react["default"].createElement("td", {
          key: key
        }, value);
      }

      if (this.shouldDangerouslyRenderField(field.name)) {
        return _react["default"].createElement("td", {
          key: key,
          dangerouslySetInnerHTML: {
            __html: value
          }
        });
      }

      if (_typeof(value) === 'object' || typeof value === 'array') {
        value = JSON.stringify(value);
      }

      return _react["default"].createElement("td", {
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
        return _react["default"].createElement("td", null);
      }

      var button = buttons[0];

      if (buttons.length === 1) {
        return _react["default"].createElement("td", {
          className: "rddt-action-cell"
        }, this.renderFirstButton(button, row));
      }

      return _react["default"].createElement("td", {
        className: "rddt-action-cell"
      }, _react["default"].createElement("div", {
        className: "btn-group",
        onClick: function onClick(e) {
          return e.stopPropagation();
        }
      }, this.renderFirstButton(button, row), _react["default"].createElement("button", {
        type: "button",
        className: "btn btn-primary dropdown-toggle dropdown-toggle-split",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false"
      }, _react["default"].createElement("span", {
        className: "sr-only"
      }, "Toggle Dropdown")), _react["default"].createElement("div", {
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

      return _react["default"].createElement("button", {
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
        return _react["default"].createElement("div", {
          style: {
            cursor: 'pointer'
          },
          key: "button_".concat(button.name),
          className: "dropdown-item"
        }, button.render(row));
      }

      return _react["default"].createElement("div", {
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

  return DataRow;
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
  index: _propTypes["default"].number.required
};
var _default = DataRow;
exports["default"] = _default;