import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DynamicDataTable from "./DynamicDataTable";
import {AxiosInstance as axios} from "axios";

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

        const {rows, currentPage, totalPages, orderByField, orderByDirection} = this.state;

        return (
            <DynamicDataTable
                rows={rows}
                currentPage={currentPage}
                totalPages={totalPages}
                orderByField={orderByField}
                orderByDirection={orderByDirection}
                changePage={this.changePage.bind(this)}
                changeOrder={this.changeOrder.bind(this)}
                {...this.props}
            />
        );
    }

    loadPage(page) {

        const {orderByField, orderByDirection} = this.state;
        const axios = require('axios');

        axios.get(this.props.apiUrl, {

            params: {
                page: page,
                orderByField: orderByField,
                orderByDirection: orderByDirection,
            }

        }).then((response) => {

            const {current_page, last_page} = response.data.data;
            const rows = response.data.data.data;

            this.setState({
                rows: rows,
                currentPage: current_page,
                totalPages: last_page,
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