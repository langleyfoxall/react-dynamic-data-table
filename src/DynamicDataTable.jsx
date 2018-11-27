import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DataRow from "./Components/DataRow";
import Pagination from "./Components/Pagination";

class DynamicDataTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedRowIds: [],
        };

        this.className = this.className.bind(this);
    }

    static rowRenderer({ row, onClick, buttons, fields, renderCheckboxes, checkboxIsChecked, onCheckboxChange, dataItemManipulator }) {
        return (
            <DataRow
                key={row.id}
                row={row}
                onClick={onClick}
                buttons={buttons}
                fields={fields}
                renderCheckboxes={renderCheckboxes}
                checkboxIsChecked={checkboxIsChecked}
                checkboxChange={onCheckboxChange}
                dataItemManipulator={(field, value) => dataItemManipulator(field, value)}
            />
        );
    }

    componentWillUpdate(nextProps) {
        if (nextProps.rows !== this.props.rows) {
            this.setState({
                checkedRowIds: [],
            });
        }
    }

    className() {
        const { onClick } = this.props;

        return classNames([
            'table', 'table-striped',
            { 'table-hover': !!onClick }
        ]);
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
                    const label = rowFieldName
                        .replace(new RegExp('_', 'g'), ' ')
                        .replace(/^(.)|\s+(.)/g, function ($1) {
                            return $1.toUpperCase()
                        })
                        .trim();

                    fields.push({
                        name: rowFieldName,
                        label,
                    });
                }
            }
        }

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];

            // Field exclusion
            if (fieldsToExclude.indexOf(field.name) !== -1) {
                fields.splice(i, 1);
                i--;
                continue;
            }

            // Field mapping
            if (fieldMap.hasOwnProperty(field.name)) {
                fields[i].label = fieldMap[field.name];
            }
        }

        return fields;
    }

    render() {
        const fields = this.getFields();
        const rows = this.props.rows;

        if (this.props.errorMessage) {
            return this.renderErrorTable();
        }

        if (this.props.loadingMessage) {
            return this.renderLoadingTable();
        }

        if (!rows || !rows.length) {
            return this.renderEmptyTable();
        }

        return (
            <div>
                <div className="table-responsive">
                    <table className={this.className()}>
                        <thead>
                            <tr>
                                { this.renderCheckboxCell('all') }
                                { fields.map(field => this.renderHeader(field)) }
                                { this.renderActionsCell() }
                            </tr>
                        </thead>
                        <tbody>
                            { rows.map(row => this.renderRow(row)) }
                        </tbody>
                    </table>
                </div>
                { this.renderPagination() }
            </div>
        );
    }

    renderRow(row) {
        const { onClick, buttons, renderCheckBoxes: renderCheckboxes, dataItemManipulator, rowRenderer } = this.props;

        return rowRenderer({
            row,
            onClick,
            buttons,
            renderCheckboxes,
            key: row.id,
            fields: this.getFields(),
            dataItemManipulator: (field, value) => dataItemManipulator(field, value),
            checkboxIsChecked: (value) => this.checkboxIsChecked(value),
            onCheckboxChange: (e) => this.checkboxChange(e),
        });
    }

    renderHeader(field) {
        const props = this.props;
        let orderByIcon = '';

        if (props.orderByField === field.name) {
            orderByIcon = (props.orderByDirection === 'asc') ? '↓' : '↑';
        }

        return (
            <th style={{ cursor: (props.changeOrder ? 'pointer' : 'default') }} key={field.name} onClick={() => this.changeOrder(field)}>
                { field.label }
                &nbsp;
                { orderByIcon }
            </th>
        );
    }

    renderActionsCell() {
        const props = this.props;
        const state = this.state;

        if (!props.renderCheckboxes || !this.props.actions.length) {
            return (
                <th/>
            );
        }

        return (
            <th>
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        disabled={!state.checkedRowIds.length}
                    >
                        Actions
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        { this.props.actions.map(action => this.renderActionButton(action))}
                    </div>
                </div>
            </th>
        );
    }

    renderActionButton(action) {
        return (
            <button
                key={`action_${action.name}`}
                type="button"
                className="dropdown-item"
                onClick={() => {
                    action.callback(this.state.checkedRowIds);
                    this.setState({ checkedRowIds: [] });
                }}
            >
                { action.name }
            </button>
        );
    }

    changeOrder(field) {
        const props = this.props;
        let newOrderByDirection = 'asc';

        if (!props.changeOrder) {
            return;
        }

        if (props.orderByField === field.name) {
            newOrderByDirection = (props.orderByDirection === 'asc') ? 'desc' : 'asc';
        }

        props.changeOrder(field.name, newOrderByDirection);
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
                    checked={this.checkboxIsChecked(value)}
                    onChange={e => this.checkboxChange(e)}
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

    checkboxIsChecked(value) {
        if (value === 'all') {
            return this.state.checkedRowIds.length === this.props.rows.length;
        }

        return this.state.checkedRowIds.indexOf(value) !== -1;
    }

    checkboxChange(e) {
        const target = e.target;
        const props = this.props;
        const rows = props.rows;

        if (target.value === 'all') {
            if (target.checked) {
                const ids = [];
                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    ids.push(row.id);
                }
                this.setState({ checkedRowIds: ids });
            } else {
                this.setState({ checkedRowIds: [] });
            }
            return;
        }

        const checkedRowIds = this.state.checkedRowIds;
        const rowId = parseInt(target.value);

        if (target.checked) {
            if (checkedRowIds.indexOf(rowId) === -1) {
                checkedRowIds.push(rowId);
            }
        } else {
            const index = checkedRowIds.indexOf(rowId);
            if (index !== -1) {
                checkedRowIds.splice(index, 1);
            }
        }

        this.setState({ checkedRowIds });
    }

    renderLoadingTable() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td className="text-center">
                                <div className="mt-5">
                                    { this.props.loadingIndicator ? this.props.loadingIndicator : null }
                                </div>
                                <div className="mt-5">
                                    { this.props.loadingMessage }
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    renderErrorTable() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <tbody>
                    <tr>
                        <td className="text-center">
                            { this.props.errorMessage }
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    renderEmptyTable() {

        const { noDataMessage, noDataComponent } = this.props;

        if (React.isValidElement(noDataComponent)) {
            return noDataComponent;
        }

        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td className="text-center">
                                { noDataMessage }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    renderPagination() {
        const props = this.props;

        return (
            <Pagination
                currentPage={props.currentPage}
                totalPages={props.totalPages}
                changePage={(page) => props.changePage(page)}
            />
        );
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
    loadingMessage: PropTypes.string,
    loadingComponent: PropTypes.object,
    errorMessage: PropTypes.string,
    noDataMessage: PropTypes.string,
    dataItemManipulator: PropTypes.func,
    buttons: PropTypes.array,
    rowRenderer: PropTypes.func,
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
    loadingMessage: '',
    loadingComponent: null,
    errorMessage: '',
    noDataMessage: 'No data.',
    dataItemManipulator: (field, value) => { return value; },
    buttons: [
        {
            name: 'View',
            callback: (row) => {
                window.location = `${location.href}/${row.id}`;
            }
        },
    ],
    rowRenderer: DynamicDataTable.rowRenderer,
};

export default DynamicDataTable;
