import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DataRow from "./Components/DataRow";
import Pagination from "./Components/Pagination";

class DynamicDataTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedRows: [],
        };

        this.className = this.className.bind(this);
    }

    static noop() {
        return null;
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
                checkedRows: [],
            });
        }
    }

    className() {
        const { onClick, hoverable } = this.props;

        return classNames([
            'table', 'table-striped',
            {
                'table-hover': 
                    onClick !== DynamicDataTable.noop 
                    || hoverable
            }
        ]);
    }

    getFields() {
        const { rows } = this.props;
        let { fieldsToExclude, fieldMap, fieldOrder } = this.props;

        const fields = [];

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

        const regExpsToExclude = fieldsToExclude.filter(field => field.constructor && field.constructor === RegExp);

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            let shouldExclude = false;

            // Field exclusion
            if (fieldsToExclude.indexOf(field.name) !== -1) {
                shouldExclude = true;
            } else {
                for (let j = 0; j < regExpsToExclude.length; j++) {
                    if (regExpsToExclude[j].test(field.name)) {
                        shouldExclude = true;
    
                        break;
                    }
                }
            }

            if (shouldExclude) {
                fields.splice(i, 1);
                i--;

                continue;
            }

            // Field mapping
            if (fieldMap.hasOwnProperty(field.name)) {
                fields[i].label = fieldMap[field.name];
            }
        }

        if (fieldOrder.length) {
            const orderedFields = Array(fieldOrder.length);

            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];
                const j = fieldOrder.findIndex(query => {
                    if (query.constructor) {
                        switch(query.constructor) {
                            case RegExp:
                                return query.test(field.name);
                            default:
                                return query === field.name;
                        }
                    }

                    return false;
                });

                if (j !== -1) {
                    const entry = orderedFields[j];

                    if (!entry) {
                        orderedFields.splice(j, 1, field);
                    } else if (Array.isArray(entry)) {
                        orderedFields[j].push(field);
                    } else {
                        orderedFields[j] = [entry, field];
                    }

                    continue;
                }

                orderedFields.push(field);
            }

            return orderedFields.flat();
        }

        return fields;
    }

    render() {
        const { errorMessage, loading, rows } = this.props;
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
        const { onClick, buttons, renderCheckboxes, dataItemManipulator, rowRenderer } = this.props;

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
        
        const canOrderBy = props.allowOrderingBy.length === 0 || props.allowOrderingBy.includes(field.name);

        const onClickHandler = canOrderBy
            ? () => this.changeOrder(field)
            : () => {};
        
        const cursor = props.changeOrder && canOrderBy ? 'pointer' : 'default';
        
        return (
            <th style={{ cursor }} key={field.name} onClick={onClickHandler}>
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
            <th className="rddt-action-cell">
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        disabled={!state.checkedRows.length}
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
                    action.callback(this.state.checkedRows);
                    this.setState({ checkedRows: [] });
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
                    onChange={event => this.checkboxChange({ event, row: value })}
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

    checkboxIsChecked(row) {
        const { checkedRows } = this.state;
        const { rows } = this.props;

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

    checkboxChange({ event, row }) {
        const { rows } = this.props;
        const { target } = event;

        if (row === 'all') {
            if (target.checked) {
                const checkedRows = [];

                rows.forEach(row => checkedRows.push(row));

                this.setState({ checkedRows });
            } else {
                this.setState({ checkedRows: [] });
            }

            return;
        }

        let index = -1;
        const { checkedRows } = this.state;
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

        this.setState({ checkedRows });
    }

    renderLoadingTable() {
        const { loadingIndicator, loadingMessage, loadingComponent } = this.props;

        if (loadingComponent) {
            return loadingComponent;
        }

        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td className="text-center">
                                {!!loadingIndicator && (
                                    <div>
                                        { loadingIndicator }
                                    </div>
                                )}
                                {!!loadingMessage && (
                                    <div>
                                        { loadingMessage }
                                    </div>
                                )}
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
    fieldOrder: PropTypes.array,
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
    buttons: PropTypes.oneOfType([
        PropTypes.array, PropTypes.func,
    ]),
    rowRenderer: PropTypes.func,
    onClick: PropTypes.func,
    hoverable: PropTypes.bool,
    allowOrderingBy: PropTypes.array,
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
    dataItemManipulator: (field, value) => value === null ? '' : value,
    buttons: [
        {
            name: 'View',
            callback: (row) => {
                window.location = `${location.href}/${row.id}`;
            }
        },
    ],
    rowRenderer: DynamicDataTable.rowRenderer,
    onClick: DynamicDataTable.noop,
    hoverable: false,
    allowOrderingBy: [],
};

export default DynamicDataTable;
