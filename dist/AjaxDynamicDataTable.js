import React, { Component } from 'react';
import DynamicDataTable from "./DynamicDataTable";

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
    return React.createElement(DynamicDataTable, {
      rows: state.rows,
      currentPage: state.currentPage,
      totalPages: state.totalPages,
      orderByField: state.orderByField,
      orderByDirection: state.orderByDirection,
      changePage: page => this.changePage(page),
      changeOrder: (field, direction) => this.changeOrder(field, direction)
    });
  }

  loadPage(page) {
    axois.get(this.props.apiUrl, {
      page: page,
      orderByField: this.state.api.orderByField,
      orderByDirection: this.state.api.orderByDirection
    }).then(response => {
      const data = response.data.data;
      const meta = response.data.meta;
      this.setState({
        rows: data,
        currentPage: meta.current_page,
        totalPages: meta.last_page
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
  apiUrl: PropTypes.apiUrl
};
DynamicDataTable.defaultProps = {
  apiUrl: null
};
export default AjaxDynamicDataTable;