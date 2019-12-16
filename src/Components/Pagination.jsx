import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {

    render() {
        const pageLinks = [];
        const props = this.props;
        const currentPage = props.currentPage;
        const totalPages = props.totalPages;

        if (totalPages <= 1) {
            return null;
        }

        this.getPagesToDisplay(currentPage, totalPages).forEach((page, index) => {
            pageLinks.push(
                <li key={`page_index_${index}`} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button
                        type="button"
                        className={`page-link ${!page ? 'disabled' : ''}`}
                        onClick={() => {
                            if (page) {
                                this.changePage(page)
                            }
                        }}
                    >{ page || '...' }</button>
                </li>,
            );
        });

        return (
            <nav aria-label="Page navigation ml-auto">
                <ul className="pagination mb-0">
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

    getPagesToDisplay(currentPage, totalPages) {
        const { paginationDelta } = this.props;
        const pages = [];
        
        for (let i = 1; i <= totalPages; i++) {
            const isFirstPage = i === 1;
            const isLastPage = i === totalPages;
            const isWithinDelta = Math.abs(currentPage - i) <= paginationDelta;
            
            if (isFirstPage || isLastPage || isWithinDelta) {
                // If this element isn't directly sequential to the last, add a filler null element.
                if (pages.length >= 1 && i !== pages[pages.length - 1] + 1) {
                    pages.push(null);
                }
                
                pages.push(i);
            }
        }
    
        return pages;
    }
}

Pagination.defaultProps = {
    paginationDelta: 4,
};

Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    changePage: PropTypes.func,
    paginationDelta: PropTypes.number,
};

export default Pagination;
