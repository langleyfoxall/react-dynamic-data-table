import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const Pagination = class Pagination extends Component {

    render() {
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


DataRow.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    changePage: PropTypes.func,
};

