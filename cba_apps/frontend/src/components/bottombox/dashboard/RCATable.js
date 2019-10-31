import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import RcaEditForm from "../components/RcaEditForm";
import {
    getSurvey,
    deleteRca,
    getAgentDetails
} from "../../../actions/surveyActions";

class RCATable extends Component {
    state = {
        filter: false,
        filtered: [],
        sortedData: []
    };

    filterToggle = () => {
        this.setState((state, props) => ({
            filter: !state.filter
        }));
    };

    handleDelete = data => {
        this.props.deleteRca(data);
    };

    handleClick = data => {
        this.props.getSurvey(data);
    };

    resetFields = () => {
        this.setState({ filtered: [], sortedData: [] });
    };

    render() {
        if (this.props.rcas[0]) {
            let rcas = this.props.rcas.map(item => {return {...item, "dsat_cause": item.dsat_cause.name, "bb_driver_code2": item.bb_driver_code2.name, "bb_driver_code3": item.bb_driver_code3.name}})
            
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
                        <Button
                            className="ml-1"
                            color="danger"
                            size="sm"
                            onClick={() =>
                                this.handleDelete(cellprops.original)
                            }
                        >
                            Delete
                        </Button>
                    </Fragment>
                ),
                width: 200
            };
            const columns = [buttons, ...headers];
            return (
                <Fragment>
                    <h3>RCA Table</h3>
                    <Button
                        className="mr-2 mb-2 btn-bb"
                        onClick={this.filterToggle}
                    >
                        Filter
                    </Button>
                    <Button
                        className="mr-2 mb-2 btn-bb"
                        onClick={this.resetFields}
                    >
                        Reset
                    </Button>
                    <ReactTable
                        // className="-striped -highlight"
                        data={rcas}
                        columns={columns}
                        minRows={5}
                        defaultPageSize={5}
                        filterable={this.state.filter}
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

export default connect(
    mapStateToProps,
    { getSurvey, deleteRca, getAgentDetails }
)(RCATable);
