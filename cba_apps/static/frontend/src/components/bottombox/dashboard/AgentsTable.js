import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "reactstrap";

import AgentDetailModal from "../components/AgentDetailModal";
import AddAgentModal from "../components/AddAgentModal";

class AgentsTable extends Component {
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
    resetFields = () => {
        this.setState({ filtered: [], sortedData: [] });
    };
    render() {
        let agents_headers;
        if (this.props.agents[0]) {
            agents_headers = Object.keys(this.props.agents[0]);
            let headers = agents_headers.map(val =>
                Object.assign({ ["Header"]: val, ["accessor"]: val })
            );
            const buttons = {
                Header: "Actions",
                filterable: false,
                Cell: cellprops => (
                    <Fragment>
                        <div className="btn-group">
                            <AgentDetailModal
                                agentDetail={cellprops.original}
                            />
                        </div>
                        {/* <Button
                            className="ml-1"
                            color="danger"
                            size="sm"
                            onClick={() => this.handleDelete(cellprops.original)}
                        >
                            Delete
                        </Button> */}
                    </Fragment>
                ),
                width: 200
            };
            let columns = [buttons, ...headers];
            return (
                <Fragment>
                    <h3>Agents Table</h3>
                    <ButtonGroup>
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
                        <AddAgentModal />
                    </ButtonGroup>

                    <ReactTable
                        // className="-striped -highlight"
                        data={this.props.agents}
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
    agents: state.surveys.agents
});

export default connect(mapStateToProps)(AgentsTable);
