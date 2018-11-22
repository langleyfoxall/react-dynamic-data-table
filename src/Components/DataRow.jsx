import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DataRow extends Component {

    handleOnClick(row) {
        const { onClick } = this.props;

        if (!!onClick) {
            return onClick(row);
        }
    }

    render() {
        const { row, fields } = this.props;

        return (
            <tr onClick={() => this.handleOnClick(row)}>
                { this.renderCheckboxCell(row.id) }
                { fields.map(field => this.renderCell(field, row)) }
                { this.renderButtons(row) }
            </tr>
        );
    }

    renderCheckboxCell(value) {
        if (!this.props.renderCheckboxes) {
            return;
        }

        const checkbox = (
            <div className="form-check">
                <input
                    type="checkbox"
                    value={value}
                    checked={this.props.checkboxIsChecked(value)}
                    onChange={e => this.props.checkboxChange(e)}
                />
            </div>
        );

        if (value === 'all') {
            return (
                <th>{ checkbox }</th>
            );
        }

        return (
            <td>{ checkbox }</td>
        );
    }

    renderCell(field, row) {
        let value = row[field.name];

        value = this.props.dataItemManipulator(field.name, value);

        if (typeof value === 'object' || typeof value === 'array') {
            value = JSON.stringify(value);
        }

        return (
            <td key={`${row.id}_${field.name}`}>{ value }</td>
        );
    }

    renderButtons(row) {
        const buttons = this.props.buttons;

        if (!buttons.length) {
            return ( <td></td> );
        }

        if (buttons.length===1) {
            return (
                <td>
                    <button type="button" className="btn btn-primary"
                            onClick={() => { buttons[0].callback(row) }}>
                        { buttons[0].name }
                    </button>
                </td>
            )
        }

        return (
            <td>
                <div className="btn-group">
                    <button type="button" className="btn btn-primary"
                            onClick={() => { buttons[0].callback(row) }}>
                        { buttons[0].name }
                    </button>
                    <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        { buttons.map((button, index) => this.renderButton(button, index, row))}
                    </div>
                </div>
            </td>
        );
    }

    renderButton(button, index, row) {

        if (index===0) {
            return;
        }

        return (
            <div
                style={{cursor: 'pointer'}}
                key={`button_${button.name}`}
                className="dropdown-item"
                onClick={() => { button.callback(row) }}>
                { button.name }
            </div>
        )
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