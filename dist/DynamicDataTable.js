import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DataRow from "./Components/DataRow";
import Pagination from "./Components/Pagination";

class DynamicDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedRows: []
    };
    this.className = this.className.bind(this);
  }

  static noop() {
    return null;
  }

  static rowRenderer({
    row,
    onClick,
    buttons,
    fields,
    renderCheckboxes,
    checkboxIsChecked,
    onCheckboxChange,
    dataItemManipulator
  }) {
    return React.createElement(DataRow, {
      key: row.id,
      row: row,
      onClick: onClick,
      buttons: buttons,
      fields: fields,
      renderCheckboxes: renderCheckboxes,
      checkboxIsChecked: checkboxIsChecked,
      checkboxChange: onCheckboxChange,
      dataItemManipulator: (field, value) => dataItemManipulator(field, value)
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.rows !== this.props.rows) {
      this.setState({
        checkedRows: []
      });
    }
  }

  className() {
    const {
      onClick,
      onContextMenu,
      hoverable
    } = this.props;
    return classNames(['table', 'table-striped', {
      'table-hover': onClick !== DynamicDataTable.noop || onContextMenu !== DynamicDataTable.noop || hoverable
    }]);
  }

  getFields() {
    const rows = this.props.rows;
    const fields = [];
    let fieldsToExclude = this.props.fieldsToExclude;
    let fieldMap = this.props.fieldMap;

    if (!fieldsToExclude) {
      fieldsToExclude = [];
    }

    if (!fieldMap) {
      fieldMap = [];
    }

    if (!rows || !rows.length) {
      return [];
    }

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowFields = Object.keys(row);

      for (let j = 0; j < rowFields.length; j++) {
        const rowFieldName = rowFields[j];
        let exists = false;

        for (let k = 0; k < fields.length; k++) {
          const field = fields[k];

          if (field.name === rowFieldName) {
            exists = true;
            break;
          }
        }

        if (!exists) {
          const label = rowFieldName.replace(new RegExp('_', 'g'), ' ').replace(/^(.)|\s+(.)/g, function ($1) {
            return $1.toUpperCase();
          }).trim();
          fields.push({
            name: rowFieldName,
            label
          });
        }
      }
    }

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]; // Field exclusion

      if (fieldsToExclude.indexOf(field.name) !== -1) {
        fields.splice(i, 1);
        i--;
        continue;
      } // Field mapping


      if (fieldMap.hasOwnProperty(field.name)) {
        fields[i].label = fieldMap[field.name];
      }
    }

    return fields;
  }

  render() {
    const {
      errorMessage,
      loading,
      rows
    } = this.props;
    const fields = this.getFields();

    if (errorMessage) {
      return this.renderErrorTable();
    }

    if (loading) {
      return this.renderLoadingTable();
    }

    if (!rows || !rows.length) {
      return this.renderEmptyTable();
    }

    return React.createElement("div", null, React.createElement("div", {
      className: "table-responsive"
    }, React.createElement("table", {
      className: this.className()
    }, React.createElement("thead", null, React.createElement("tr", null, this.renderCheckboxCell('all'), fields.map(field => this.renderHeader(field)), this.renderActionsCell())), React.createElement("tbody", null, rows.map(row => this.renderRow(row))))), this.renderPagination());
  }

  renderRow(row) {
    const {
      onClick,
      buttons,
      renderCheckboxes,
      dataItemManipulator,
      rowRenderer
    } = this.props;
    return rowRenderer({
      row,
      onClick,
      buttons,
      renderCheckboxes,
      key: row.id,
      fields: this.getFields(),
      dataItemManipulator: (field, value) => dataItemManipulator(field, value),
      checkboxIsChecked: value => this.checkboxIsChecked(value),
      onCheckboxChange: e => this.checkboxChange(e)
    });
  }

  renderHeader(field) {
    const props = this.props;
    let orderByIcon = '';

    if (props.orderByField === field.name) {
      orderByIcon = props.orderByDirection === 'asc' ? '↓' : '↑';
    }

    return React.createElement("th", {
      style: {
        cursor: props.changeOrder ? 'pointer' : 'default'
      },
      key: field.name,
      onClick: () => this.changeOrder(field)
    }, field.label, "\xA0", orderByIcon);
  }

  renderActionsCell() {
    const props = this.props;
    const state = this.state;

    if (!props.renderCheckboxes || !this.props.actions.length) {
      return React.createElement("th", null);
    }

    return React.createElement("th", {
      className: "rddt-action-cell"
    }, React.createElement("div", {
      className: "dropdown"
    }, React.createElement("button", {
      className: "btn btn-secondary dropdown-toggle",
      type: "button",
      id: "dropdownMenuButton",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false",
      disabled: !state.checkedRows.length
    }, "Actions"), React.createElement("div", {
      className: "dropdown-menu",
      "aria-labelledby": "dropdownMenuButton"
    }, this.props.actions.map(action => this.renderActionButton(action)))));
  }

  renderActionButton(action) {
    return React.createElement("button", {
      key: `action_${action.name}`,
      type: "button",
      className: "dropdown-item",
      onClick: () => {
        action.callback(this.state.checkedRows);
        this.setState({
          checkedRows: []
        });
      }
    }, action.name);
  }

  changeOrder(field) {
    const props = this.props;
    let newOrderByDirection = 'asc';

    if (!props.changeOrder) {
      return;
    }

    if (props.orderByField === field.name) {
      newOrderByDirection = props.orderByDirection === 'asc' ? 'desc' : 'asc';
    }

    props.changeOrder(field.name, newOrderByDirection);
  }

  renderCheckboxCell(value) {
    if (!this.props.renderCheckboxes) {
      return;
    }

    const checkbox = React.createElement("div", {
      className: "form-check"
    }, React.createElement("input", {
      type: "checkbox",
      value: value,
      checked: this.checkboxIsChecked(value),
      onChange: event => this.checkboxChange({
        event,
        row: value
      })
    }));

    if (value === 'all') {
      return React.createElement("th", null, checkbox);
    }

    return React.createElement("td", null, checkbox);
  }

  checkboxIsChecked(row) {
    const {
      checkedRows
    } = this.state;
    const {
      rows
    } = this.props;

    if (row === 'all') {
      return checkedRows.length === rows.length;
    }

    let index = -1;
    const selected = JSON.stringify(row);

    for (let i = 0; i < checkedRows.length; i++) {
      const current = JSON.stringify(checkedRows[i]);

      if (current === selected) {
        index = i;
        break;
      }
    }

    return index !== -1;
  }

  checkboxChange({
    event,
    row
  }) {
    const {
      rows
    } = this.props;
    const {
      target
    } = event;

    if (row === 'all') {
      if (target.checked) {
        const checkedRows = [];
        rows.forEach(row => checkedRows.push(row));
        this.setState({
          checkedRows
        });
      } else {
        this.setState({
          checkedRows: []
        });
      }

      return;
    }

    let index = -1;
    const {
      checkedRows
    } = this.state;
    const selected = JSON.stringify(row);

    for (let i = 0; i < checkedRows.length; i++) {
      const current = JSON.stringify(checkedRows[i]);

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
      checkedRows
    });
  }

  renderLoadingTable() {
    const {
      loadingIndicator,
      loadingMessage,
      loadingComponent
    } = this.props;

    if (loadingComponent) {
      return loadingComponent;
    }

    return React.createElement("div", {
      className: "table-responsive"
    }, React.createElement("table", {
      className: "table table-striped"
    }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
      className: "text-center"
    }, !!loadingIndicator && React.createElement("div", null, loadingIndicator), !!loadingMessage && React.createElement("div", null, loadingMessage))))));
  }

  renderErrorTable() {
    return React.createElement("div", {
      className: "table-responsive"
    }, React.createElement("table", {
      className: "table table-striped"
    }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
      className: "text-center"
    }, this.props.errorMessage)))));
  }

  renderEmptyTable() {
    const {
      noDataMessage,
      noDataComponent
    } = this.props;

    if (React.isValidElement(noDataComponent)) {
      return noDataComponent;
    }

    return React.createElement("div", {
      className: "table-responsive"
    }, React.createElement("table", {
      className: "table table-striped"
    }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", {
      className: "text-center"
    }, noDataMessage)))));
  }

  renderPagination() {
    const props = this.props;
    return React.createElement(Pagination, {
      currentPage: props.currentPage,
      totalPages: props.totalPages,
      changePage: page => props.changePage(page)
    });
  }

}

DynamicDataTable.propTypes = {
  rows: PropTypes.array,
  fieldsToExclude: PropTypes.array,
  fieldMap: PropTypes.object,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  orderByField: PropTypes.string,
  orderByDirection: PropTypes.oneOf(['asc', 'desc']),
  renderCheckboxes: PropTypes.bool,
  actions: PropTypes.array,
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  loadingIndicator: PropTypes.element,
  loadingComponent: PropTypes.element,
  errorMessage: PropTypes.string,
  noDataMessage: PropTypes.string,
  noDataComponent: PropTypes.element,
  dataItemManipulator: PropTypes.func,
  buttons: PropTypes.array,
  rowRenderer: PropTypes.func,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  hoverable: PropTypes.bool
};
DynamicDataTable.defaultProps = {
  rows: [],
  fieldsToExclude: [],
  fieldMap: {},
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
  dataItemManipulator: (field, value) => {
    return value;
  },
  buttons: [{
    name: 'View',
    callback: row => {
      window.location = `${location.href}/${row.id}`;
    }
  }],
  rowRenderer: DynamicDataTable.rowRenderer,
  onClick: DynamicDataTable.noop,
  onContextMenu: DynamicDataTable.noop,
  hoverable: false
};
export default DynamicDataTable;