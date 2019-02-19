import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DataRow extends Component {

    static noop() {
        return null;
    }

    render() {
        const { row, fields, onClick, onContextMenu } = this.props;

        return (
            <tr
                onClick={() => onClick(row)}
                onContextMenu={e => onContextMenu(e, row)}
            >
                { this.renderCheckboxCell() }
                { fields.map(field => this.renderCell(field, row)) }
                { this.renderButtons(row) }
            </tr>
        );
    }

    renderCheckboxCell() {
        const { row, renderCheckboxes } = this.props;

        if (!renderCheckboxes) {
            return;
        }

        const checkbox = (
            <div className="form-check">
                <input
                    type="checkbox"
                    checked={this.props.checkboxIsChecked(row)}
                    onChange={event => this.props.checkboxChange({ event, row })}
                    onClick={e => e.stopPropagation()}
                />
            </div>
        );

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
        const { buttons } = this.props;

        if (typeof buttons === 'function') {
            return buttons(row);
        }

        if (!buttons.length) {
            return ( <td></td> );
        }

        const button = buttons[0];

        if (buttons.length===1) {
            return (
                <td className="rddt-action-cell">
                    {this.renderFirstButton(button, row)}
                </td>
            )
        }

        return (
            <td className="rddt-action-cell">
                <div
                    className="btn-group"
                    onClick={e => e.stopPropagation()}
                >
                    {this.renderFirstButton(button, row)}
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

    renderFirstButton(button, row) {
        if (typeof button.render === 'function') {
            return button.render(row)
        }

       return (
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => { button.callback(row) }}
            >
                {button.name}
            </button>
       )
    }

    renderButton(button, index, row) {

        if (index===0) {
            return;
        }

        if (typeof button.render === 'function') {
            <div
                style={{cursor: 'pointer'}}
                key={`button_${button.name}`}
                className="dropdown-item">
                {button.render(row)}
            </div>
        }

        return (
            <div
                style={{cursor: 'pointer'}}
                key={`button_${button.name}`}
                className="dropdown-item"
                onClick={() => { button.callback(row) }}>
                {button.name}
            </div>
        )
    }

}

DataRow.defaultProps = {
    onClick: DataRow.noop,
    onContextMenu: DataRow.noop,
};

DataRow.propTypes = {
    row: PropTypes.object,
    buttons: PropTypes.oneOfType([
        PropTypes.array, PropTypes.func,
    ]),
    checkboxIsChecked: PropTypes.func,
    checkboxChange: PropTypes.func,
    dataItemManipulator: PropTypes.func,
    renderCheckboxes: PropTypes.bool,
    onClick: PropTypes.func,
    onContextMenu: PropTypes.func,
};

export default DataRow;