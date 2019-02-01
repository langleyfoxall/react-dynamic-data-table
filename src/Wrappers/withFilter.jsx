
import React from 'react';

export default WrappedComponent => (
    class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {};
            this.state.timeout = null;
            this.state.params = {};

            this.onFilter = this.onFilter.bind(this);
        }

        onFilter({ target: { value } }) {
            const { timeout } = this.state;

            if (timeout) {
                clearTimeout(timeout);
            }

            this.setState({
                timeout: setTimeout(() => {
                    this.setState({
                        params: {
                            query: value,
                        },
                    });
                }, 250),
            });
        }

        render() {
            const { params: filterParams } = this.state;

            return (
                <WrappedComponent
                    {...this.props}
                    onFilter={this.onFilter}
                    filterParams={filterParams}
                />
            );
        }
    }
)