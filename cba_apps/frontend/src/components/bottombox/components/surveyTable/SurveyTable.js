import React, { Component, Fragment } from "react";

import ReactTable from "react-table";

class SurveyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Fragment>
                <ReactTable
                    className="-striped -highlight"
                    data={this.props.data}
                    columns={columns}
                    minRows={10}
                    defaultPageSize={10}
                />
            </Fragment>
        );
    }
}

export default SurveyTable;
