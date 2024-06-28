import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DynamicDataTable from './DynamicDataTable'

class AjaxDynamicDataTable extends Component {
  constructor (props) {
    super(props)
    const { defaultOrderByField, defaultOrderByDirection, perPage } = props

    this.state = {
      rows: [],
      currentPage: 1,
      perPage,
      totalPages: 1,
      totalRows: 0,
      orderByField: defaultOrderByField,
      orderByDirection: defaultOrderByDirection,
      disallowOrderingBy: [],
      meta: {},
      loading: false
    }

    this.reload = this.reload.bind(this)

    this.changePage = this.changePage.bind(this)
    this.changeOrder = this.changeOrder.bind(this)
    this.changePerPage = this.changePerPage.bind(this)

    this.renderFooter = this.renderFooter.bind(this)
  }

  componentDidMount () {
    this.loadPage(1)
  }

  componentDidUpdate (prevProps) {
    if (JSON.stringify(prevProps.params) !== JSON.stringify(this.props.params)) {
      this.loadPage(1)
    }
  }

  get loading () {
    const { loading: state } = this.state
    const { loading: prop } = this.props

    return state || prop
  }

  get disallowOrderingBy () {
    const { disallowOrderingBy: state } = this.state
    const { disallowOrderingBy: prop } = this.props

    return [
      ...state,
      ...prop
    ]
  }

  renderFooter (args) {
    const { meta } = this.state
    const { footer } = this.props

    if (typeof footer === 'function') {
      return footer({ meta, ...args })
    }

    return footer
  }

  render () {
    const { rows, totalRows, currentPage, totalPages, orderByField, orderByDirection } = this.state
    const { disallowOrderingBy, footer, perPage, ...props } = this.props

    return (
      <DynamicDataTable
        rows={rows}
        totalRows={totalRows}
        currentPage={currentPage}
        perPage={this.state.perPage}
        totalPages={totalPages}
        orderByField={orderByField}
        orderByDirection={orderByDirection}
        loading={this.loading}
        changePage={this.changePage}
        changeOrder={this.changeOrder}
        changePerPage={this.changePerPage}
        disallowOrderingBy={this.disallowOrderingBy}
        footer={footer ? this.renderFooter : undefined}
        {...props}
      />
    )
  }

  reload (page = 1) {
    this.loadPage(page)
  }

  loadPage (page) {
    const { perPage, orderByField, orderByDirection } = this.state
    const { onLoad, onError, params, axios } = this.props

    this.setState(
      { loading: true },
      () => {
        axios.get(this.props.apiUrl, {

          params: { ...params, page, perPage, orderByField, orderByDirection }

        }).then(({ data: response }) => {
          const { data: rows, total, current_page: currentPage, last_page: totalPages } = response.data
          let disallowOrderingBy = []
          let meta = {}

          if (response.meta) {
            ({ disallow_ordering_by: disallowOrderingBy, ...meta } = response.meta)
          }

          const newState = {
            rows,
            meta,
            disallowOrderingBy,
            totalRows: total,
            currentPage,
            totalPages,
            loading: false
          }

          this.setState(newState)
          onLoad(newState)
        }).catch((e) => {
          this.setState({ loading: false })
          onError(e)
        })
      }
    )
  }

  changePage (page) {
    this.loadPage(page)
  }

  changePerPage (limit) {
    this.setState(
      { perPage: limit },
      this.reload
    )
  }

  changeOrder (field, direction) {
    this.setState({ orderByField: field, orderByDirection: direction }, () => {
      this.loadPage(1)
    })
  }
}

AjaxDynamicDataTable.defaultProps = {
  onLoad: () => null,
  onError: () => null,
  loading: false,
  params: {},
  defaultOrderByField: null,
  defaultOrderByDirection: null,
  axios: typeof window !== 'undefined' && window.axios
    ? window.axios
    : require('axios'),
  disallowOrderingBy: [],
  perPage: 15
}

AjaxDynamicDataTable.propTypes = {
  apiUrl: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  loading: PropTypes.bool,
  params: PropTypes.object,
  defaultOrderByField: PropTypes.string,
  defaultOrderByDirection: PropTypes.string,
  axios: PropTypes.any,
  disallowOrderingBy: PropTypes.arrayOf(PropTypes.string),
  perPage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  perPageOptions: PropTypes.arrayOf(PropTypes.number),
  footer: PropTypes.node
}

export default AjaxDynamicDataTable
