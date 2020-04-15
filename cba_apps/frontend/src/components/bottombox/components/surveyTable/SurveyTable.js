import React, { Component, Fragment } from "react";

import ReactTable from "react-table";

class SurveyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { data, columns, filter } = this.props;

        // const columns = Object.keys(data[0]).map(item => ({
        //     Header: item,
        //     accessor: item
        // }));

        return (
            <Fragment>
                <ReactTable
                    style={{ backgroundColor: "white" }}
                    className="-striped -highlight"
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                    filterable={filter}
                />
            </Fragment>
        );
    }
}

export default SurveyTable;
