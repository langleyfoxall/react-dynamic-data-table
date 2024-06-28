import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DataRow from './Components/DataRow';
import Pagination from './Components/Pagination';
import PerPage from './Components/PerPage';

import flatten from 'core-js/fn/array/flatten';

class DynamicDataTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedRows: [],
        };

        this.className = this.className.bind(this);
        this.changePerPage = this.changePerPage.bind(this);
    }

    static noop() {
        return null;
    }

    static rowRenderer({ row, onClick, buttons, fields, onMouseUp, onMouseDown, renderCheckboxes, disableCheckbox, checkboxIsChecked, onCheckboxChange, dataItemManipulator, dangerouslyRenderFields, actions, editableColumns, index, rowIsActive }) {
        return (
            <DataRow
                key={row.id}
                row={row}
                onClick={onClick}
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
                buttons={buttons}
                fields={fields}
                actions={actions}
                renderCheckboxes={renderCheckboxes}
                disableCheckbox={disableCheckbox}
                editableColumns={editableColumns}
                checkboxIsChecked={checkboxIsChecked}
                checkboxChange={onCheckboxChange}
                dataItemManipulator={(field, value, row) => dataItemManipulator(field, value, row)}
                dangerouslyRenderFields={dangerouslyRenderFields}
                index={index}
                rowIsActive={rowIsActive}
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
        const { onClick, onMouseUp, onMouseDown, hoverable, className } = this.props;

        return classNames([
            className,
            {
                'table-hover':
                    onClick !== DynamicDataTable.noop
                    || onMouseUp !== DynamicDataTable.noop
                    || onMouseDown !== DynamicDataTable.noop
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

            return flatten(orderedFields);
        }

        return fields;
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

    changePerPage(limit) {
        const { changePerPage } = this.props;

        if (!changePerPage) {
            return;
        }

        changePerPage(limit);
    }

    checkboxIsChecked(row) {
        const { checkedRows } = this.state;
        const { rows, isCheckboxChecked, disabledCheckboxes } = this.props;

        if (isCheckboxChecked !== DynamicDataTable.noop) {
            return isCheckboxChecked(row, rows);
        }

        if (row === 'all') {
            return (
                checkedRows.length === rows.filter(({ id }) => (
                    !disabledCheckboxes.includes(id)
                )).length
            );
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

    checkboxChange(event, row) {
        const { rows, onMasterCheckboxChange, onCheckboxChange, isCheckboxChecked, disabledCheckboxes } = this.props;
        const { target } = event;

        if (row === 'all') {
            if(onMasterCheckboxChange !== DynamicDataTable.noop) {
                onMasterCheckboxChange(event, rows);
            }
        } else if (onCheckboxChange !== DynamicDataTable.noop) {
            onCheckboxChange(event, row);
        }

        if (isCheckboxChecked !== DynamicDataTable.noop) {
            return;
        }

        if (row === 'all') {
            if (target.checked) {
                const checkedRows = [];

                rows.filter(({ id }) => !disabledCheckboxes.includes(id))
                    .forEach(row => checkedRows.push(row));

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

    render() {
        const { errorMessage, loading, rows, footer } = this.props;
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
                            {this.renderCheckboxCell('all')}
                            {fields.map(field => this.renderHeader(field))}
                            {this.renderActionsCell()}
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((row, index) => this.renderRow(row, index))}
                        </tbody>
                        {!!footer && (
                            <tfoot>
                                {this.renderFooter()}
                            </tfoot>
                        )}
                    </table>
                </div>
                <div className={'d-flex justify-content-between align-items-center'}>
                    {this.renderPerPage()}
                    {this.renderPagination()}
                </div>
            </div>
        );
    }

    renderFooter() {
        const { rows, actions, footer } = this.props;

        const checkbox = this.renderCheckboxCell('all');
        const width = this.getFields().length;

        if (checkbox) {
            width++;
        }

        if (actions.length) {
            width++;
        }

        if (typeof footer === 'function') {
            return (
                footer({
                    rows,
                    width,
                })
            );
        }

        if (React.isValidElement(footer)) {
            return footer;
        }

        return null;
    }

    renderRow(row, index) {
        const {
            onClick, onMouseUp, onMouseDown, buttons, renderCheckboxes, disabledCheckboxes, dataItemManipulator, rowRenderer, dangerouslyRenderFields, actions, editableColumns, rowIsActive,
        } = this.props;

        return rowRenderer({
            row,
            onClick,
            onMouseUp,
            onMouseDown,
            buttons,
            renderCheckboxes,
            disableCheckbox: disabledCheckboxes.includes(row.id),
            key: row.id,
            fields: this.getFields(),
            dataItemManipulator: (field, value, row) => dataItemManipulator(field, value, row),
            checkboxIsChecked: (value) => this.checkboxIsChecked(value),
            onCheckboxChange: (e) => this.checkboxChange(e, row),
            dangerouslyRenderFields,
            actions,
            editableColumns,
            index,
            rowIsActive,
        });
    }

    renderHeader(field) {
        const { orderByField, orderByDirection, orderByAscIcon, orderByDescIcon, prependOrderByIcon = false, allowOrderingBy, disallowOrderingBy, changeOrder, columnWidths } = this.props;
        let {orderByIcon = ''} = this.props;

        if (orderByField === field.name) {
            if (orderByDirection === 'asc') {
                orderByIcon = orderByAscIcon
            } else {
                orderByIcon = orderByDescIcon
            }
        }

        const canOrderBy = (
            (allowOrderingBy.length === 0 || allowOrderingBy.includes(field.name))
            && !disallowOrderingBy.includes(field.name)
        );

        const onClickHandler = (
            canOrderBy
                ? () => this.changeOrder(field)
                : () => {
                }
        );

        const cursor = (
            changeOrder && canOrderBy
                ? 'pointer'
                : 'default'
        );

        let width = columnWidths[field.name]

        if (typeof width === 'number') {
            width = `${width}%`
        }

        return (
            <th
                key={field.name}
                width={width}
                onClick={onClickHandler}
                style={{ cursor }}
            >
                {canOrderBy && prependOrderByIcon ? orderByIcon : ''}
                { field.label }
                &nbsp;
                {canOrderBy && !prependOrderByIcon ? orderByIcon : ''}
            </th>
        );
    }

    renderActionsCell() {
        const { actions, buttons } = this.props;
        const state = this.state;

        if (!buttons.length && !actions.length) {
            return null;
        } else if (!actions.length) {
            return <th />;
        }

        return (
            <th className="rddt-action-cell">
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        disabled={!state.checkedRows.length}
                    >
                        Actions
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {this.props.actions.map(action => this.renderActionButton(action))}
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
                {action.name}
            </button>
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
                    checked={this.checkboxIsChecked(value)}
                    onChange={event => this.checkboxChange(event, value)}
                />
            </div>
        );

        if (value === 'all') {
            if (!this.props.renderMasterCheckbox) {
                return <th/>
            }

            return (
                <th>{checkbox}</th>
            );
        }

        return (
            <td>{checkbox}</td>
        );
    }

    renderLoadingTable() {
        const { loadingIndicator, loadingMessage, loadingComponent, className } = this.props;

        if (loadingComponent) {
            return loadingComponent;
        }

        return (
            <div className="table-responsive">
                <table className={className}>
                    <tbody>
                    <tr>
                        <td className="text-center">
                            {!!loadingIndicator && (
                                <div>
                                    {loadingIndicator}
                                </div>
                            )}
                            {!!loadingMessage && (
                                <div>
                                    {loadingMessage}
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
        const { className, errorMessage } = this.props;
        return (
            <div className="table-responsive">
                <table className={className}>
                    <tbody>
                    <tr>
                        <td className="text-center">
                            {errorMessage}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    renderEmptyTable() {

        const { noDataMessage, noDataComponent, className } = this.props;

        if (React.isValidElement(noDataComponent)) {
            return noDataComponent;
        }

        return (
            <div className="table-responsive">
                <table className={className}>
                    <tbody>
                    <tr>
                        <td className="text-center">
                            {noDataMessage}
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
                paginationDelta={props.paginationDelta}
                alwaysShowPagination={props.alwaysShowPagination}
            />
        );
    }

    renderPerPage() {
        const { changePerPage, totalRows, perPageOptions, perPage, perPageRenderer } = this.props;

        const props = {
            totalRows,
            value: perPage,
            onChange: this.changePerPage,
            options: perPageOptions,
        };

        if (!changePerPage) {
            return;
        }

        if (typeof perPageRenderer === 'function') {
            return perPageRenderer(props);
        }

        if (React.isValidElement(perPageRenderer)) {
            return (
                React.cloneElement(
                    perPageRenderer,
                    props
                )
            );
        }

        return perPageRenderer;
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
    orderByIcon: PropTypes.node,
    orderByAscIcon: PropTypes.node,
    orderByDescIcon: PropTypes.node,
    renderCheckboxes: PropTypes.bool,
    disabledCheckboxes: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.number, PropTypes.string
        ])
    ),
    editableColumns: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        controlled: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        optionsForRow: PropTypes.func
    })),
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
    onMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    rowIsActive: PropTypes.func,
    hoverable: PropTypes.bool,
    allowOrderingBy: PropTypes.array,
    disallowOrderingBy: PropTypes.array,
    dangerouslyRenderFields: PropTypes.array,
    paginationDelta: PropTypes.number,
    columnWidths: PropTypes.object,
    totalRows: PropTypes.number,
    changePerPage: PropTypes.func,
    perPage: PropTypes.oneOfType([
        PropTypes.number, PropTypes.string,
    ]),
    perPageOptions: PropTypes.arrayOf(PropTypes.number),
    perPageRenderer: PropTypes.oneOfType([
        PropTypes.node, PropTypes.func,
    ]),
    isCheckboxChecked: PropTypes.func,
    onMasterCheckboxChange: PropTypes.func,
    renderMasterCheckbox: PropTypes.bool,
    onCheckboxChange: PropTypes.func,
    footer: PropTypes.oneOfType([
        PropTypes.func, PropTypes.node
    ]),
    alwaysShowPagination: PropTypes.bool,
    className: PropTypes.string
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
    orderByIcon: '',
    orderByAscIcon: '↓',
    orderByDescIcon: '↑',
    renderCheckboxes: false,
    disabledCheckboxes: [],
    editableColumns: [],
    actions: [],
    loading: false,
    loadingMessage: 'Loading data...',
    loadingIndicator: null,
    loadingComponent: null,
    errorMessage: '',
    noDataMessage: 'No data.',
    noDataComponent: null,
    dataItemManipulator: (field, value, row) => value === null ? '' : value,
    buttons: [
        {
            name: 'View',
            callback: (e, row) => {
                window.location = `${window.location.href.split(/[?#]/)[0]}/${row.id}`;
            }
        },
    ],
    rowRenderer: DynamicDataTable.rowRenderer,
    onClick: DynamicDataTable.noop,
    onMouseUp: DynamicDataTable.noop,
    onMouseDown: DynamicDataTable.noop,
    rowIsActive: DynamicDataTable.noop,
    hoverable: false,
    allowOrderingBy: [],
    disallowOrderingBy: [],
    dangerouslyRenderFields: [],
    paginationDelta: 4,
    columnWidths: {},
    totalRows: 0,
    changePerPage: null,
    perPage: 15,
    perPageRenderer: props => (
        <PerPage {...props} />
    ),
    isCheckboxChecked: DynamicDataTable.noop,
    onMasterCheckboxChange: DynamicDataTable.noop,
    renderMasterCheckbox: true,
    onCheckboxChange: DynamicDataTable.noop,
    footer: null,
    alwaysShowPagination: false,
    className: 'table table-striped',
};

export default DynamicDataTable;
