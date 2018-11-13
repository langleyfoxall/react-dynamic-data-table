function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DynamicDataTable from "./DynamicDataTable";
import { AxiosInstance as axios } from "axios";

class AjaxDynamicDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      currentPage: 1,
      totalPages: 1,
      orderByField: null,
      orderByDirection: null
    };
  }

  componentDidMount() {
    this.loadPage(1);
  }

  render() {
    const state = this.state;
    return React.createElement(DynamicDataTable, _extends({
      rows: state.rows,
      currentPage: state.currentPage,
      totalPages: state.totalPages,
      orderByField: state.orderByField,
      orderByDirection: state.orderByDirection,
      changePage: page => this.changePage(page),
      changeOrder: (field, direction) => this.changeOrder(field, direction)
    }, this.props));
  }

  loadPage(page) {
    const state = this.state;

    const axios = require('axios');

    axios.get(this.props.apiUrl, {
      page: page,
      orderByField: state.orderByField,
      orderByDirection: state.orderByDirection
    }).then(response => {
      const data = response.data.data;
      const rows = data.data;
      this.setState({
        rows: rows,
        currentPage: data.current_page,
        totalPages: data.last_page
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

DynamicDataTable.propTypes = {
  apiUrl: PropTypes.string
};
DynamicDataTable.defaultProps = {
  apiUrl: null
};
export default AjaxDynamicDataTable;