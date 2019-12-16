import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PerPage extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange({ target: { value } }) {
        const { onChange } = this.props;

        onChange(value)
    }

    render() {
        const { className: { container, innerContainer, select }, value, defaultValue, options, totalRows } = this.props;

        return (
            <div className={container}>
                <span>Showing</span>
                <div className={innerContainer}>
                    <select
                        className={select}
                        value={value || defaultValue}
                        onChange={this.onChange}
                    >
                        {options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <span>of {totalRows} records</span>
            </div>
        )
    }
}

PerPage.defaultProps = {
    className: {
        container: 'd-flex align-items-center',
        innerContainer: 'form-group mb-0 mx-sm-3 mx-2',
        select: 'form-control',
    },
    defaultValue: 15,
    options: [
        10, 15, 30,
        50, 75, 100
    ],
}

PerPage.propTypes = {
    onChange: PropTypes.func.isRequired,
    totalRows: PropTypes.number.isRequired,
    value: (
        PropTypes
            .oneOfType([PropTypes.number, PropTypes.string])
            .isRequired
    ),
    defaultValue: (
        PropTypes.oneOfType([
            PropTypes.number, PropTypes.string,
        ])
    ),
    className: (
        PropTypes.shape({
            container: PropTypes.string,
            innerContainer: PropTypes.string,
            select: PropTypes.string,
        })
    ),
    options: PropTypes.arrayOf(PropTypes.number),
}

export default PerPage;
