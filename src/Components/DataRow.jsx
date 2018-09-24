import React, { Component } from 'react';
import DynamicDataTable from "../DynamicDataTable";

class DataRow extends Component {

    render() {

        return (
            <tr key={row.id}>
                { this.renderCheckboxCell(row.id) }
                { this.props.fields.map(field => this.renderCell(field, row)) }
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

}

DataRow.propTypes = {
    row: PropTypes.object,
    buttons: PropTypes.array,
    checkboxIsChecked: PropTypes.func,
    checkboxChange: PropTypes.func,
    dataItemManipulator: PropTypes.func,
};


export default DynamicDataTable;
