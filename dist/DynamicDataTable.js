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

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DataRow = _interopRequireDefault(require("./Components/DataRow"));

var _Pagination = _interopRequireDefault(require("./Components/Pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var DynamicDataTable =
/*#__PURE__*/
function (_Component) {
  _inherits(DynamicDataTable, _Component);

  function DynamicDataTable(props) {
    var _this;

    _classCallCheck(this, DynamicDataTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DynamicDataTable).call(this, props));
    _this.state = {
      checkedRows: []
    };
    _this.className = _this.className.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(DynamicDataTable, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps) {
      if (nextProps.rows !== this.props.rows) {
        this.setState({
          checkedRows: []
        });
      }
    }
  }, {
    key: "className",
    value: function className() {
      var _this$props = this.props,
          onClick = _this$props.onClick,
          hoverable = _this$props.hoverable;
      return (0, _classnames.default)(['table', 'table-striped', {
        'table-hover': onClick !== DynamicDataTable.noop || hoverable
      }]);
    }
  }, {
    key: "getFields",
    value: function getFields() {
      var rows = this.props.rows;
      var _this$props2 = this.props,
          fieldsToExclude = _this$props2.fieldsToExclude,
          fieldMap = _this$props2.fieldMap,
          fieldOrder = _this$props2.fieldOrder;
      var fields = [];

      if (!fieldsToExclude) {
        fieldsToExclude = [];
      }

      if (!fieldMap) {
        fieldMap = [];
      }

      if (!rows || !rows.length) {
        return [];
      }

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var rowFields = Object.keys(row);

        for (var j = 0; j < rowFields.length; j++) {
          var rowFieldName = rowFields[j];
          var exists = false;

          for (var k = 0; k < fields.length; k++) {
            var field = fields[k];

            if (field.name === rowFieldName) {
              exists = true;
              break;
            }
          }

          if (!exists) {
            var label = rowFieldName.replace(new RegExp('_', 'g'), ' ').replace(/^(.)|\s+(.)/g, function ($1) {
              return $1.toUpperCase();
            }).trim();
            fields.push({
              name: rowFieldName,
              label: label
            });
          }
        }
      }

      var regExpsToExclude = fieldsToExclude.filter(function (field) {
        return field.constructor && field.constructor === RegExp;
      });

      for (var _i = 0; _i < fields.length; _i++) {
        var _field = fields[_i];
        var shouldExclude = false; // Field exclusion

        if (fieldsToExclude.indexOf(_field.name) !== -1) {
          shouldExclude = true;
        } else {
          for (var _j = 0; _j < regExpsToExclude.length; _j++) {
            if (regExpsToExclude[_j].test(_field.name)) {
              shouldExclude = true;
              break;
            }
          }
        }

        if (shouldExclude) {
          fields.splice(_i, 1);
          _i--;
          continue;
        } // Field mapping


        if (fieldMap.hasOwnProperty(_field.name)) {
          fields[_i].label = fieldMap[_field.name];
        }
      }

      if (fieldOrder.length) {
        var orderedFields = Array(fieldOrder.length);

        var _loop = function _loop(_i2) {
          var field = fields[_i2];
          var j = fieldOrder.findIndex(function (query) {
            if (query.constructor) {
              switch (query.constructor) {
                case RegExp:
                  return query.test(field.name);

                default:
                  return query === field.name;
              }
            }

            return false;
          });

          if (j !== -1) {
            var entry = orderedFields[j];

            if (!entry) {
              orderedFields.splice(j, 1, field);
            } else if (Array.isArray(entry)) {
              orderedFields[j].push(field);
            } else {
              orderedFields[j] = [entry, field];
            }

            return "continue";
          }

          orderedFields.push(field);
        };

        for (var _i2 = 0; _i2 < fields.length; _i2++) {
          var _ret = _loop(_i2);

          if (_ret === "continue") continue;
        }

        var flatten = function flatten(arr) {
          return arr.reduce(function (flat, toFlatten) {
            return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
          }, []);
        };

        return orderedFields.flat();
      }

      return fields;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          errorMessage = _this$props3.errorMessage,
          loading = _this$props3.loading,
          rows = _this$props3.rows;
      var fields = this.getFields();

      if (errorMessage) {
        return this.renderErrorTable();
      }

      if (loading) {
        return this.renderLoadingTable();
      }

      if (!rows || !rows.length) {
        return this.renderEmptyTable();
      }

      return _react.default.createElement("div", null, _react.default.createElement("div", {
        className: "table-responsive"
      }, _react.default.createElement("table", {
        className: this.className()
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, this.renderCheckboxCell('all'), fields.map(function (field) {
        return _this2.renderHeader(field);
      }), this.renderActionsCell())), _react.default.createElement("tbody", null, rows.map(function (row) {
        return _this2.renderRow(row);
      })))), this.renderPagination());
    }
  }, {
    key: "renderRow",
    value: function renderRow(row) {
      var _this3 = this;

      var _this$props4 = this.props,
          onClick = _this$props4.onClick,
          buttons = _this$props4.buttons,
          renderCheckboxes = _this$props4.renderCheckboxes,
          _dataItemManipulator = _this$props4.dataItemManipulator,
          rowRenderer = _this$props4.rowRenderer;
      return rowRenderer({
        row: row,
        onClick: onClick,
        buttons: buttons,
        renderCheckboxes: renderCheckboxes,
        key: row.id,
        fields: this.getFields(),
        dataItemManipulator: function dataItemManipulator(field, value) {
          return _dataItemManipulator(field, value);
        },
        checkboxIsChecked: function checkboxIsChecked(value) {
          return _this3.checkboxIsChecked(value);
        },
        onCheckboxChange: function onCheckboxChange(e) {
          return _this3.checkboxChange(e);
        }
      });
    }
  }, {
    key: "renderHeader",
    value: function renderHeader(field) {
      var _this4 = this;

      var props = this.props;
      var orderByIcon = '';

      if (props.orderByField === field.name) {
        orderByIcon = props.orderByDirection === 'asc' ? '↓' : '↑';
      }

      return _react.default.createElement("th", {
        style: {
          cursor: props.changeOrder ? 'pointer' : 'default'
        },
        key: field.name,
        onClick: function onClick() {
          return _this4.changeOrder(field);
        }
      }, field.label, "\xA0", orderByIcon);
    }
  }, {
    key: "renderActionsCell",
    value: function renderActionsCell() {
      var _this5 = this;

      var props = this.props;
      var state = this.state;

      if (!props.renderCheckboxes || !this.props.actions.length) {
        return _react.default.createElement("th", null);
      }

      return _react.default.createElement("th", {
        className: "rddt-action-cell"
      }, _react.default.createElement("div", {
        className: "dropdown"
      }, _react.default.createElement("button", {
        className: "btn btn-secondary dropdown-toggle",
        type: "button",
        id: "dropdownMenuButton",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false",
        disabled: !state.checkedRows.length
      }, "Actions"), _react.default.createElement("div", {
        className: "dropdown-menu",
        "aria-labelledby": "dropdownMenuButton"
      }, this.props.actions.map(function (action) {
        return _this5.renderActionButton(action);
      }))));
    }
  }, {
    key: "renderActionButton",
    value: function renderActionButton(action) {
      var _this6 = this;

      return _react.default.createElement("button", {
        key: "action_".concat(action.name),
        type: "button",
        className: "dropdown-item",
        onClick: function onClick() {
          action.callback(_this6.state.checkedRows);

          _this6.setState({
            checkedRows: []
          });
        }
      }, action.name);
    }
  }, {
    key: "changeOrder",
    value: function changeOrder(field) {
      var props = this.props;
      var newOrderByDirection = 'asc';

      if (!props.changeOrder) {
        return;
      }

      if (props.orderByField === field.name) {
        newOrderByDirection = props.orderByDirection === 'asc' ? 'desc' : 'asc';
      }

      props.changeOrder(field.name, newOrderByDirection);
    }
  }, {
    key: "renderCheckboxCell",
    value: function renderCheckboxCell(value) {
      var _this7 = this;

      if (!this.props.renderCheckboxes) {
        return;
      }

      var checkbox = _react.default.createElement("div", {
        className: "form-check"
      }, _react.default.createElement("input", {
        type: "checkbox",
        value: value,
        checked: this.checkboxIsChecked(value),
        onChange: function onChange(event) {
          return _this7.checkboxChange({
            event: event,
            row: value
          });
        }
      }));

      if (value === 'all') {
        return _react.default.createElement("th", null, checkbox);
      }

      return _react.default.createElement("td", null, checkbox);
    }
  }, {
    key: "checkboxIsChecked",
    value: function checkboxIsChecked(row) {
      var checkedRows = this.state.checkedRows;
      var rows = this.props.rows;

      if (row === 'all') {
        return checkedRows.length === rows.length;
      }

      var index = -1;
      var selected = JSON.stringify(row);

      for (var i = 0; i < checkedRows.length; i++) {
        var current = JSON.stringify(checkedRows[i]);

        if (current === selected) {
          index = i;
          break;
        }
      }

      return index !== -1;
    }
  }, {
    key: "checkboxChange",
    value: function checkboxChange(_ref) {
      var event = _ref.event,
          row = _ref.row;
      var rows = this.props.rows;
      var target = event.target;

      if (row === 'all') {
        if (target.checked) {
          var _checkedRows = [];
          rows.forEach(function (row) {
            return _checkedRows.push(row);
          });
          this.setState({
            checkedRows: _checkedRows
          });
        } else {
          this.setState({
            checkedRows: []
          });
        }

        return;
      }

      var index = -1;
      var checkedRows = this.state.checkedRows;
      var selected = JSON.stringify(row);

      for (var i = 0; i < checkedRows.length; i++) {
        var current = JSON.stringify(checkedRows[i]);

        if (current === selected) {
          index = i;
          break;
        }
      }

      if (target.checked) {
        if (index === -1) {
          checkedRows.push(row);
        }
      } else {
        if (index !== -1) {
          checkedRows.splice(index, 1);
        }
      }

      this.setState({
        checkedRows: checkedRows
      });
    }
  }, {
    key: "renderLoadingTable",
    value: function renderLoadingTable() {
      var _this$props5 = this.props,
          loadingIndicator = _this$props5.loadingIndicator,
          loadingMessage = _this$props5.loadingMessage,
          loadingComponent = _this$props5.loadingComponent;

      if (loadingComponent) {
        return loadingComponent;
      }

      return _react.default.createElement("div", {
        className: "table-responsive"
      }, _react.default.createElement("table", {
        className: "table table-striped"
      }, _react.default.createElement("tbody", null, _react.default.createElement("tr", null, _react.default.createElement("td", {
        className: "text-center"
      }, !!loadingIndicator && _react.default.createElement("div", null, loadingIndicator), !!loadingMessage && _react.default.createElement("div", null, loadingMessage))))));
    }
  }, {
    key: "renderErrorTable",
    value: function renderErrorTable() {
      return _react.default.createElement("div", {
        className: "table-responsive"
      }, _react.default.createElement("table", {
        className: "table table-striped"
      }, _react.default.createElement("tbody", null, _react.default.createElement("tr", null, _react.default.createElement("td", {
        className: "text-center"
      }, this.props.errorMessage)))));
    }
  }, {
    key: "renderEmptyTable",
    value: function renderEmptyTable() {
      var _this$props6 = this.props,
          noDataMessage = _this$props6.noDataMessage,
          noDataComponent = _this$props6.noDataComponent;

      if (_react.default.isValidElement(noDataComponent)) {
        return noDataComponent;
      }

      return _react.default.createElement("div", {
        className: "table-responsive"
      }, _react.default.createElement("table", {
        className: "table table-striped"
      }, _react.default.createElement("tbody", null, _react.default.createElement("tr", null, _react.default.createElement("td", {
        className: "text-center"
      }, noDataMessage)))));
    }
  }, {
    key: "renderPagination",
    value: function renderPagination() {
      var props = this.props;
      return _react.default.createElement(_Pagination.default, {
        currentPage: props.currentPage,
        totalPages: props.totalPages,
        changePage: function changePage(page) {
          return props.changePage(page);
        }
      });
    }
  }], [{
    key: "noop",
    value: function noop() {
      return null;
    }
  }, {
    key: "rowRenderer",
    value: function rowRenderer(_ref2) {
      var row = _ref2.row,
          onClick = _ref2.onClick,
          buttons = _ref2.buttons,
          fields = _ref2.fields,
          renderCheckboxes = _ref2.renderCheckboxes,
          checkboxIsChecked = _ref2.checkboxIsChecked,
          onCheckboxChange = _ref2.onCheckboxChange,
          _dataItemManipulator2 = _ref2.dataItemManipulator;
      return _react.default.createElement(_DataRow.default, {
        key: row.id,
        row: row,
        onClick: onClick,
        buttons: buttons,
        fields: fields,
        renderCheckboxes: renderCheckboxes,
        checkboxIsChecked: checkboxIsChecked,
        checkboxChange: onCheckboxChange,
        dataItemManipulator: function dataItemManipulator(field, value) {
          return _dataItemManipulator2(field, value);
        }
      });
    }
  }]);

  return DynamicDataTable;
}(_react.Component);

DynamicDataTable.propTypes = {
  rows: _propTypes.default.array,
  fieldsToExclude: _propTypes.default.array,
  fieldMap: _propTypes.default.object,
  fieldOrder: _propTypes.default.array,
  currentPage: _propTypes.default.number,
  totalPages: _propTypes.default.number,
  orderByField: _propTypes.default.string,
  orderByDirection: _propTypes.default.oneOf(['asc', 'desc']),
  renderCheckboxes: _propTypes.default.bool,
  actions: _propTypes.default.array,
  loading: _propTypes.default.bool,
  loadingMessage: _propTypes.default.string,
  loadingIndicator: _propTypes.default.element,
  loadingComponent: _propTypes.default.element,
  errorMessage: _propTypes.default.string,
  noDataMessage: _propTypes.default.string,
  noDataComponent: _propTypes.default.element,
  dataItemManipulator: _propTypes.default.func,
  buttons: _propTypes.default.array,
  rowRenderer: _propTypes.default.func,
  onClick: _propTypes.default.func,
  hoverable: _propTypes.default.bool
};
DynamicDataTable.defaultProps = {
  rows: [],
  fieldsToExclude: [],
  fieldMap: {},
  fieldOrder: [],
  currentPage: 1,
  totalPages: 1,
  orderByField: null,
  orderByDirection: 'asc',
  renderCheckboxes: false,
  actions: [],
  loading: false,
  loadingMessage: 'Loading data...',
  loadingIndicator: null,
  loadingComponent: null,
  errorMessage: '',
  noDataMessage: 'No data.',
  noDataComponent: null,
  dataItemManipulator: function dataItemManipulator(field, value) {
    return value;
  },
  buttons: [{
    name: 'View',
    callback: function callback(row) {
      window.location = "".concat(location.href, "/").concat(row.id);
    }
  }],
  rowRenderer: DynamicDataTable.rowRenderer,
  onClick: DynamicDataTable.noop,
  hoverable: false
};
var _default = DynamicDataTable;
exports.default = _default;