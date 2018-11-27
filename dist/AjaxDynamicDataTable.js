function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DynamicDataTable from "./DynamicDataTable";

class AjaxDynamicDataTable extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      currentPage: 1,
      totalPages: 1,
      orderByField: null,
      orderByDirection: null,
      loading: false
    };
    this.changePage = this.changePage.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
  }

  componentDidMount() {
    this.loadPage(1);
  }

  render() {
    const {
      rows,
      currentPage,
      totalPages,
      orderByField,
      orderByDirection,
      loading
    } = this.state;
    return React.createElement(DynamicDataTable, _extends({
      rows: rows,
      currentPage: currentPage,
      totalPages: totalPages,
      orderByField: orderByField,
      orderByDirection: orderByDirection,
      loading: loading,
      changePage: this.changePage,
      changeOrder: this.changeOrder
    }, this.props));
  }

  loadPage(page) {
    const axios = require('axios');

    const {
      orderByField,
      orderByDirection
    } = this.state;
    const {
      onLoad
    } = this.props;
    this.setState({
      loading: true
    }, () => {
      axios.get(this.props.apiUrl, {
        params: {
          page,
          orderByField,
          orderByDirection
        }
      }).then(response => {
        const {
          data: rows,
          current_page,
          last_page
        } = response.data.data;
        const newState = {
          rows,
          currentPage: current_page,
          totalPages: last_page,
          loading: false
        };
        this.setState(newState);
        onLoad(newState);
      });
    });
  }

  changePage(page) {
    this.loadPage(page);
  }

  changeOrder(field, direction) {
    this.setState({
      orderByField: field,
      orderByDirection: direction
    }, () => {
      this.loadPage(this.state.changePage);
    });
  }

}

AjaxDynamicDataTable.defaultProps = {
  onLoad: () => null
};
AjaxDynamicDataTable.propTypes = {
  apiUrl: PropTypes.string,
  onLoad: PropTypes.func
};
export default AjaxDynamicDataTable;