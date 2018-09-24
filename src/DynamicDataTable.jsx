import React, { Component } from 'react';
import DataRow from "./Components/DataRow";

class DynamicDataTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedRowIds: [],
        };
    }

    componentWillUpdate(nextProps) {
        if (nextProps.rows !== this.props.rows) {
            this.setState({
                checkedRowIds: [],
            });
        }
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
                    const label = rowFieldName.replace(new RegExp('_', 'g'), ' ').trim();

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
                    <table className="table table-striped">
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
        return (
            <DataRow
                row={row}
                buttons={this.props.buttons}
                fields={this.getFields()}
                checkboxIsChecked={(value) => this.checkboxIsChecked(value)}
                checkboxChange={(e) => this.checkboxChange(e)}
                dataItemManipulator={(field, value) => this.props.dataItemManipulator(field, value)}
            />
        );
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
            return;
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

    renderButtons(row) {

        if (!this.props.buttons.length) {
            return ( <td></td> );
        }

        if (this.props.buttons.length===1) {
            return (
                <td>
                    <button type="button" className="btn btn-primary"
                            onClick={() => { this.props.buttons[0].callback(row) }}>
                        { this.props.buttons[0].name }
                    </button>
                </td>
            )
        }

        return (
            <td>
                <div className="btn-group">
                    <button type="button" className="btn btn-primary"
                            onClick={() => { this.props.buttons[0].callback(row) }}>
                        { this.props.buttons[0].name }
                    </button>
                    <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        { this.props.buttons.map((button, index) => this.renderButton(button, index, row))}
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

        let noDataMessage = 'No data.';

        if (this.props.noDataMessage) {
            noDataMessage = this.props.noDataMessage;
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
        const pageLinks = [];
        const props = this.props;
        const currentPage = props.currentPage;
        const totalPages = props.totalPages;

        if (totalPages <= 1) {
            return;
        }

        for (let i = 1; i <= totalPages; i++) {
            pageLinks.push(
                <li key={`page_${i}`} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button type="button" className="page-link" onClick={() => this.changePage(i)}>{ i }</button>
                </li>,
            );
        }

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                        <button type="button" className="page-link" onClick={() => this.previousPage()}>Previous</button>
                    </li>
                    { pageLinks }
                    <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                        <button type="button" className="page-link" onClick={() => this.nextPage()}>Next</button>
                    </li>
                </ul>
            </nav>
        );
    }

    changePage(page) {
        this.props.changePage(page);
    }

    previousPage() {
        if (this.props.currentPage > 1) {
            this.changePage(this.props.currentPage - 1);
        }
    }

    nextPage() {
        if (this.props.currentPage < this.props.totalPages) {
            this.changePage(this.props.currentPage + 1);
        }
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
    noDataMessage: '',
    dataItemManipulator: (field, value) => { return value; },
    buttons: [
        {
            name: 'View',
            callback: (row) => {
                window.location = `${location.href}/${row.id}`;
            }
        },
    ],
};

export default DynamicDataTable;
