import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DynamicDataTable from "./DynamicDataTable";

class AjaxDynamicDataTable extends Component {

    constructor(props) {
        super(props);

        const { defaultOrderByField, defaultOrderByDirection, defaultPageLimit } = props;

        this.state = {
            rows: [],
            currentPage: 1,
            totalPages: 1,
            orderByField: defaultOrderByField,
            orderByDirection: defaultOrderByDirection,
            pageLimit: defaultPageLimit,
            loading: false,
        };

        this.reload = this.reload.bind(this);

        this.resetPageLimit = this.resetPageLimit.bind(this);
        this.setPageLimit = this.setPageLimit.bind(this);

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

    render() {

        const {rows, currentPage, totalPages, orderByField, orderByDirection, loading} = this.state;

        return (
            <React.Fragment>
                <DynamicDataTable
                    rows={rows}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    orderByField={orderByField}
                    orderByDirection={orderByDirection}
                    loading={loading}
                    changePage={this.changePage}
                    changeOrder={this.changeOrder}
                    {...this.props}
                />
                { this.renderPageLimit() }
            </React.Fragment>
        );
    }

    renderPageLimit() {

        const { pageLimit, loading } = this.state;
        const { pageLimitRenderer } = this.props;

        if (!pageLimitRenderer || loading) {
            return null
        }

        const props = {
            onChange: this.setPageLimit,
            value: pageLimit
        };

        if(typeof pageLimitRenderer === 'function') {
            return pageLimitRenderer({
                setPageLimit: this.setPageLimit,
                resetPageLimit: this.resetPageLimit,
                ...props
            })
        }

        return (
            React.cloneElement(
                pageLimitRenderer,
                props
            )
        )
    }

    reload(page = 1) {
        this.loadPage(page);
    }

    loadPage(page) {

        const axios = require('axios');
        const {orderByField, orderByDirection, pageLimit} = this.state;
        const {onLoad, params} = this.props;

        this.setState(
            { loading: true },
            () => {
                axios.get(this.props.apiUrl, {

                    params: { ...params, page, orderByField, orderByDirection, pageLimit }
        
                }).then((response) => {
        
                    const { data: rows, current_page, last_page } = response.data.data;
                    const newState = { rows, currentPage: current_page, totalPages: last_page, loading: false };
        
                    this.setState(newState);
                    onLoad(newState);
                });
            }
        );
    }

    setPageLimit(pageLimit) {
        const event = typeof pageLimit === 'object' && pageLimit.nativeEvent;

        if (event) {
          pageLimit = event.target.value;
        }

        this.setState(
            { pageLimit },
            () => this.reload()
        )
    }

    resetPageLimit() {
        const { defaultPageLimit } = this.props;

        this.setState(
            { pageLimit: defaultPageLimit },
            () => this.reload()
        )
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
    defaultPageLimit: null,
    pageLimitRenderer: null
};

AjaxDynamicDataTable.propTypes = {
    apiUrl: PropTypes.string,
    onLoad: PropTypes.func,
    params: PropTypes.object,
    defaultOrderByField: PropTypes.string,
    defaultOrderByDirection: PropTypes.string,
    defaultPageLimit: PropTypes.number,
    pageLimitRenderer: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ])
};

export default AjaxDynamicDataTable;
