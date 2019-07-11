import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DynamicDataTable from "./DynamicDataTable";

class AjaxDynamicDataTable extends Component {

    constructor(props) {
        super(props);
        const { defaultOrderByField, defaultOrderByDirection } = props;

        this.state = {
            rows: [],
            currentPage: 1,
            totalPages: 1,
            orderByField: defaultOrderByField,
            orderByDirection: defaultOrderByDirection,
            disableOrderingBy: {},
            loading: false,
        };

        this.reload = this.reload.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
    }

    componentDidMount() {
        this.loadPage(1);
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.params) !== JSON.stringify(this.props.params)) {
            this.loadPage(1);
        }
    }

    get disableOrderingBy() {
        const { disableOrderingBy: state } = this.state;
        const { disableOrderingBy: prop } = this.props;

        return {
            ...state,
            ...prop
        }
    }

    render() {

        const { rows, currentPage, totalPages, orderByField, orderByDirection, loading } = this.state;
        const { disableOrderingBy, ...props } = this.props;

        return (
            <DynamicDataTable
                rows={rows}
                currentPage={currentPage}
                totalPages={totalPages}
                orderByField={orderByField}
                orderByDirection={orderByDirection}
                loading={loading}
                changePage={this.changePage}
                changeOrder={this.changeOrder}
                disableOrderingBy={this.disableOrderingBy}
                {...props}
            />
        );
    }

    reload(page = 1) {
        this.loadPage(page);
    }

    loadPage(page) {
        const {orderByField, orderByDirection} = this.state;
        const {onLoad, params, axios} = this.props;

        this.setState(
            { loading: true },
            () => {
                axios.get(this.props.apiUrl, {

                    params: { ...params, page, orderByField, orderByDirection }
        
                }).then(({ data: response }) => {
        
                    const { disable_ordering_by } = response.meta;
                    const { data: rows, current_page, last_page } = response.data;

                    const newState = {
                        disableOrderingBy: disable_ordering_by,
                        rows,
                        currentPage: current_page,
                        totalPages:last_page,
                        loading: false
                    };
        
                    this.setState(newState);
                    onLoad(newState);
                });
            }
        );
    }

    changePage(page) {
        this.loadPage(page)
    }

    changeOrder(field, direction) {
        this.setState({ orderByField: field, orderByDirection: direction }, () => {

            this.loadPage(1);

        });
    }

}

AjaxDynamicDataTable.defaultProps = {
    onLoad: () => null,
    params: {},
    defaultOrderByField: null,
    defaultOrderByDirection: null,
    axios: window.axios || require('axios'),
    disableOrderingBy: {},
};

AjaxDynamicDataTable.propTypes = {
    apiUrl: PropTypes.string,
    onLoad: PropTypes.func,
    params: PropTypes.object,
    defaultOrderByField: PropTypes.string,
    defaultOrderByDirection: PropTypes.string,
    axios: PropTypes.any,
    disableOrderingBy: PropTypes.object,
};

export default AjaxDynamicDataTable;
