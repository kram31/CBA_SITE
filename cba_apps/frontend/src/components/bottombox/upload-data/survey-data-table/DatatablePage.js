import React, { Component, Fragment } from "react";
import ReactTable from "react-table";

import { connect } from "react-redux";

import { getSurveys, deleteSurvey } from "../../../../actions/surveyActions";

import RCAFormModal from "../../rca/RCAFormModal";

import { Button } from "reactstrap";

class DatatablePage extends Component {
    state = { cellprops: null };
    componentDidMount() {
        this.props.getSurveys();
    }

    handleDelete = e => this.props.deleteSurvey(e);

    render() {
        // Creating Headers for table
        const headers = this.props.headers.map(val =>
            Object.assign({ ["Header"]: val, ["accessor"]: val })
        );
        // Creating buttons for table
        const buttons = {
            Header: "Actions",
            Cell: cellprops => (
                <Fragment>
                    <div className="btn-group">
                        <Button
                            outline
                            color="danger"
                            size="sm"
                            onClick={() =>
                                this.handleDelete(
                                    cellprops.original.reference_number
                                )
                            }
                        >
                            Delete
                        </Button>
                        {cellprops.original.bottombox == 1 && (
                            <RCAFormModal cellprops={cellprops.original} />
                        )}
                    </div>
                </Fragment>
            ),
            width: 200
        };
        const columns = [buttons, ...headers];
        return (
            <Fragment>
                <h3>Survey Table</h3>
                <ReactTable
                    className="-striped -highlight"
                    style={{ backgroundColor: "white" }}
                    data={this.props.data}
                    columns={columns}
                    minRows={10}
                    defaultPageSize={10}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    headers: state.surveys.headers,
    data: state.surveys.surveys,
    isOpen: state.modal.isOpen
});

export default connect(
    mapStateToProps,
    {
        getSurveys,
        deleteSurvey
    }
)(DatatablePage);
