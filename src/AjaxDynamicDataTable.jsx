import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DynamicDataTable from "./DynamicDataTable";

class AjaxDynamicDataTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rows: [],
            currentPage: 1,
            totalPages: 1,
            orderByField: null,
            orderByDirection: null,
        };
    }

    componentDidMount() {
        this.loadPage(1);
    }

    render() {

        const state = this.state;

        return (
            <DynamicDataTable
                rows={state.rows}
                currentPage={state.currentPage}
                totalPages={state.totalPages}
                orderByField={state.orderByField}
                orderByDirection={state.orderByDirection}
                changePage={page => this.changePage(page)}
                changeOrder={(field, direction) => this.changeOrder(field, direction)}
                {...this.props}
            />
        );
    }

    loadPage(page) {

        const state = this.state;
        const axios = require('axios');

        axios.get(this.props.apiUrl, {

            page: page,
            orderByField: state.orderByField,
            orderByDirection: state.orderByDirection,

        }).then((response) => {

            const data = response.data.data;
            const rows = data.data;

            this.setState({
                rows: rows,
                currentPage: data.current_page,
                totalPages: data.last_page,
            });

        });
    }

    changePage(page) {
        this.loadPage(page)
    }

    changeOrder(field, direction) {
        this.setState({ orderByField: field, orderByDirection: direction }, () => {

            this.loadPage(this.state.changePage);

        });
    }

}

AjaxDynamicDataTable.propTypes = {
    apiUrl: PropTypes.string,
};

AjaxDynamicDataTable.defaultProps = {
};

export default AjaxDynamicDataTable;