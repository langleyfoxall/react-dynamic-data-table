import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DataRow extends Component {

    static noop() {
        return null;
    }

    shouldDangerouslyRenderField(field) {
        const { dangerouslyRenderFields } = this.props;

        return dangerouslyRenderFields.includes(field);
    }

    render() {
        const { row, fields, onClick, onContextMenu } = this.props;

        return (
            <tr
                onClick={e => onClick(e, row)}
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
                    onChange={e => this.props.checkboxChange(e, row)}
                    onClick={e => e.stopPropagation()}
                />
            </div>
        );

        return (
            <td>{ checkbox }</td>
        );
    }

    renderCell(field, row) {
        const { editableColumns, managedInputs, onInputChange, index, selectColumns, optionsForColumn} = this.props;

        let value = row[field.name];

        value = this.props.dataItemManipulator(field.name, value);

        const key = `${row.id}_${field.name}`;

        if(selectColumns.includes(field.name)) {
            return (
                <td key={key}>
                    <select
                        defaultValue={value}
                        value={managedInputs ? value : undefined}
                        onChange={event => onInputChange(event, field.name, row, index)}>
                        {optionsForColumn(field.name, row).map(option => (
                            <option value={option.value}>{option.label}</option>
                        ))

                        }
                    </select>
                </td>
            )
        }

        if(editableColumns.includes(field.name)) {
            return (
                <td key={key}>
                    <input defaultValue={value} value={managedInputs ? value : undefined} onChange={event => onInputChange(event, field.name, row, index)} />
                </td>
            )
        }

        if (React.isValidElement(value)) {
            return (
                <td key={key}>{value}</td>
            );
        }

        if (this.shouldDangerouslyRenderField(field.name)) {
            return (
                <td key={key} dangerouslySetInnerHTML={{__html: value}}/>
            );
        }

        if (typeof value === 'object' || typeof value === 'array') {
            value = JSON.stringify(value);
        }

        return (
            <td key={key}>{ value }</td>
        );
    }

    renderButtons(row) {
        const { buttons, actions } = this.props;

        if (typeof buttons === 'function') {
            return buttons(row);
        }

        if (!buttons.length && !actions.length) {
            return null;
        } else if (!buttons.length) {
            return <td />;
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
                onClick={e => button.callback(e, row)}
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
            return (
                <div
                    style={{cursor: 'pointer'}}
                    key={`button_${button.name}`}
                    className="dropdown-item">
                    {button.render(row)}
                </div>
            )
        }

        return (
            <div
                style={{cursor: 'pointer'}}
                key={`button_${button.name}`}
                className="dropdown-item"
                onClick={e => button.callback(e, row)}>
                {button.name}
            </div>
        )
    }

}

DataRow.defaultProps = {
    onClick: DataRow.noop,
    onContextMenu: DataRow.noop,
    dangerouslyRenderFields: [],
    actions: [],
    editableColumns: [],
    managedInputs: false,
    onInputChange: DataRow.noop,
    selectColumns: [],
    optionsForColumn: DataRow.noop
};

DataRow.propTypes = {
    row: PropTypes.object,
    buttons: PropTypes.oneOfType([
        PropTypes.array, PropTypes.func,
    ]),
    actions: PropTypes.array,
    checkboxIsChecked: PropTypes.func,
    checkboxChange: PropTypes.func,
    dataItemManipulator: PropTypes.func,
    renderCheckboxes: PropTypes.bool,
    editableColumns: PropTypes.array,
    managedInputs: PropTypes.bool,
    onClick: PropTypes.func,
    onContextMenu: PropTypes.func,
    dangerouslyRenderFields: PropTypes.array,
    onInputChange: PropTypes.func,
    index: PropTypes.number.required,
    selectColumns: PropTypes.array,
    optionsForColumn: PropTypes.func
};

export default DataRow;
