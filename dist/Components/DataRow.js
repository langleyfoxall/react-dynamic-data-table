import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DataRow extends Component {
  handleOnClick(row) {
    const {
      onClick
    } = this.props;

    if (!!onClick) {
      return onClick(row);
    }
  }

  render() {
    const {
      row,
      fields
    } = this.props;
    return React.createElement("tr", {
      onClick: () => this.handleOnClick(row)
    }, this.renderCheckboxCell(row.id), fields.map(field => this.renderCell(field, row)), this.renderButtons(row));
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
      checked: this.props.checkboxIsChecked(value),
      onChange: e => this.props.checkboxChange(e)
    }));

    if (value === 'all') {
      return React.createElement("th", null, checkbox);
    }

    return React.createElement("td", null, checkbox);
  }

  renderCell(field, row) {
    let value = row[field.name];
    value = this.props.dataItemManipulator(field.name, value);

    if (typeof value === 'object' || typeof value === 'array') {
      value = JSON.stringify(value);
    }

    return React.createElement("td", {
      key: `${row.id}_${field.name}`
    }, value);
  }

  renderButtons(row) {
    const buttons = this.props.buttons;

    if (!buttons.length) {
      return React.createElement("td", null);
    }

    if (buttons.length === 1) {
      return React.createElement("td", {
        className: "rddt-action-cell"
      }, React.createElement("button", {
        type: "button",
        className: "btn btn-primary",
        onClick: () => {
          buttons[0].callback(row);
        }
      }, buttons[0].name));
    }

    return React.createElement("td", {
      className: "rddt-action-cell"
    }, React.createElement("div", {
      className: "btn-group"
    }, React.createElement("button", {
      type: "button",
      className: "btn btn-primary",
      onClick: () => {
        buttons[0].callback(row);
      }
    }, buttons[0].name), React.createElement("button", {
      type: "button",
      className: "btn btn-primary dropdown-toggle dropdown-toggle-split",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false"
    }, React.createElement("span", {
      className: "sr-only"
    }, "Toggle Dropdown")), React.createElement("div", {
      className: "dropdown-menu",
      "aria-labelledby": "dropdownMenuButton"
    }, buttons.map((button, index) => this.renderButton(button, index, row)))));
  }

  renderButton(button, index, row) {
    if (index === 0) {
      return;
    }

    return React.createElement("div", {
      style: {
        cursor: 'pointer'
      },
      key: `button_${button.name}`,
      className: "dropdown-item",
      onClick: () => {
        button.callback(row);
      }
    }, button.name);
  }

}

DataRow.propTypes = {
  row: PropTypes.object,
  buttons: PropTypes.array,
  checkboxIsChecked: PropTypes.func,
  checkboxChange: PropTypes.func,
  dataItemManipulator: PropTypes.func,
  renderCheckboxes: PropTypes.bool,
  onClick: PropTypes.func
};
export default DataRow;