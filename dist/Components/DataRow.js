"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          row = _this$props.row,
          fields = _this$props.fields,
          _onClick = _this$props.onClick,
          _onContextMenu = _this$props.onContextMenu;
      return _react.default.createElement("tr", {
        onClick: function onClick() {
          return _onClick(row);
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
          renderCheckboxes = _this$props2.renderCheckboxes;

      if (!renderCheckboxes) {
        return;
      }

      var checkbox = _react.default.createElement("div", {
        className: "form-check"
      }, _react.default.createElement("input", {
        type: "checkbox",
        checked: this.props.checkboxIsChecked(row),
        onChange: function onChange(event) {
          return _this2.props.checkboxChange({
            event: event,
            row: row
          });
        },
        onClick: function onClick(e) {
          return e.stopPropagation();
        }
      }));

      return _react.default.createElement("td", null, checkbox);
    }
  }, {
    key: "renderCell",
    value: function renderCell(field, row) {
      var value = row[field.name];
      value = this.props.dataItemManipulator(field.name, value);

      if (_typeof(value) === 'object' || typeof value === 'array') {
        value = JSON.stringify(value);
      }

      return _react.default.createElement("td", {
        key: "".concat(row.id, "_").concat(field.name)
      }, value);
    }
  }, {
    key: "renderButtons",
    value: function renderButtons(row) {
      var _this3 = this;

      var buttons = this.props.buttons;

      if (!buttons.length) {
        return _react.default.createElement("td", null);
      }

      if (buttons.length === 1) {
        return _react.default.createElement("td", {
          className: "rddt-action-cell"
        }, _react.default.createElement("button", {
          type: "button",
          className: "btn btn-primary",
          onClick: function onClick() {
            buttons[0].callback(row);
          }
        }, buttons[0].name));
      }

      return _react.default.createElement("td", {
        className: "rddt-action-cell"
      }, _react.default.createElement("div", {
        className: "btn-group",
        onClick: function onClick(e) {
          return e.stopPropagation();
        }
      }, _react.default.createElement("button", {
        type: "button",
        className: "btn btn-primary",
        onClick: function onClick() {
          buttons[0].callback(row);
        }
      }, buttons[0].name), _react.default.createElement("button", {
        type: "button",
        className: "btn btn-primary dropdown-toggle dropdown-toggle-split",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false"
      }, _react.default.createElement("span", {
        className: "sr-only"
      }, "Toggle Dropdown")), _react.default.createElement("div", {
        className: "dropdown-menu",
        "aria-labelledby": "dropdownMenuButton"
      }, buttons.map(function (button, index) {
        return _this3.renderButton(button, index, row);
      }))));
    }
  }, {
    key: "renderButton",
    value: function renderButton(button, index, row) {
      if (index === 0) {
        return;
      }

      return _react.default.createElement("div", {
        style: {
          cursor: 'pointer'
        },
        key: "button_".concat(button.name),
        className: "dropdown-item",
        onClick: function onClick() {
          button.callback(row);
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
  onContextMenu: DataRow.noop
};
DataRow.propTypes = {
  row: _propTypes.default.object,
  buttons: _propTypes.default.array,
  checkboxIsChecked: _propTypes.default.func,
  checkboxChange: _propTypes.default.func,
  dataItemManipulator: _propTypes.default.func,
  renderCheckboxes: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  onContextMenu: _propTypes.default.func
};
var _default = DataRow;
exports.default = _default;