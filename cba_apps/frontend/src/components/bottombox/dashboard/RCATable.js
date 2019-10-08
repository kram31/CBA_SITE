import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import { connect } from "react-redux";
import RcaEditForm from "../components/RcaEditForm";

class RCATable extends Component {
    state = {
        filtered: [],
        sortedData: []
    };
    render() {
        if (this.props.rcas) {
            const rca_headers = Object.keys(this.props.rcas[0]);

            let headers = rca_headers.map(val =>
                Object.assign({ ["Header"]: val, ["accessor"]: val })
            );
            const buttons = {
                Header: "Actions",
                filterable: false,
                Cell: cellprops => (
                    <Fragment>
                        <div className="btn-group">
                            <RcaEditForm rca={cellprops.original} />
                        </div>
                    </Fragment>
                ),
                width: 200
            };
            const columns = [buttons, ...headers];
            return (
                <Fragment>
                    <h3>RCA Table</h3>
                    <ReactTable
                        // className="-striped -highlight"
                        data={this.props.rcas}
                        columns={columns}
                        minRows={5}
                        defaultPageSize={5}
                    />
                </Fragment>
            );
        } else {
            return <Fragment></Fragment>;
        }
    }
}
const mapStateToProps = state => ({
    rcas: state.surveys.rcas
});

export default connect(mapStateToProps)(RCATable);
