import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import moment from "moment";

import { connect } from "react-redux";

import { deleteSurvey } from "../../../../actions/surveyActions";
import { toggle } from "../../../../actions/modalToggleActions";

import RCAFormModal from "../../rca/RCAFormModal";
import RcaEditForm from "../../components/RcaEditForm";
import SurveyDetailsModal from "../../components/SurveyDetailsModal";

import {
    getSurvey,
    getAgentDetails,
    getRca,
    removeRca
} from "../../../../actions/surveyActions";

import ReactExport from "react-data-export";

import {
    Button,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Col
} from "reactstrap";

import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

let agent_headers = [
    "operator_lan_id",
    "surveys",
    "name",
    "email",
    "location",
    "wave",
    "skill",
    "team_lead"
];

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class DatatablePage extends Component {
    state = {
        cellprops: null,
        filtered: [],
        start_date: "",
        end_date: "",
        data: [],
        filter: false,
        sortedData: [],
        rca_headers: [],

        agent: []
    };

    componentDidUpdate(prevProps) {
        const { agents, rcas } = this.props;
        if (rcas != prevProps.rcas) {
            this.setState({
                rca_headers: rcas[0] && Object.keys(rcas[0]),
                rcas
            });
        }
        if (agents != prevProps.agents) {
            this.setState({
                agents
            });
        }
    }

    handleDelete = e => this.props.deleteSurvey(e);

    handleToggle = data => {
        data.completed == true
            ? this.props.getRca(data)
            : this.props.removeRca();
        this.props.getSurvey(data);
        this.props.getAgentDetails(data.operator_lan_id);
        this.props.toggle();
    };

    handleClick = () => {
        let sortedData = this.reactTable.getResolvedState().sortedData;
        this.setState({ sortedData });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: moment(e.target.value).format("DD/MM/YYYY")
        });
    };

    handleEvent = (e, picker) => {
        console.log(moment(picker.startDate).format("DD/MM/YYYY"));
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
        // customfilter not used yet
        // const customFilter = ({ fieldName, filter, onChange }) => {
        //   return (
        //     <select
        //       onChange={event => onChange(event.target.value)}
        //       style={{ width: "100%" }}
        //       value={filter ? filter.value : "all"}
        //     >
        //       <option value="all">Show All</option>
        //       {testData
        //         .map(item => item[fieldName])

        //         .filter((item, i, s) => s.lastIndexOf(item) == i)
        //         .map(function(value) {
        //           log.debug("renderItem: ", value);
        //           return (
        //             <option key={value} value={value}>
        //               {value}
        //             </option>
        //           );
        //         })}
        //     </select>
        //   );
        // };

        // Creating Headers for table
        const headers = this.props.headers.map(val => {
            switch (val) {
                case "date_issued":
                    return Object.assign({
                        ["Header"]: val,
                        ["accessor"]: val,

                        ["Filter"]: ({ filter, onChange }) => (
                            <DateRangePicker
                                onApply={(event, picker) => onChange(picker)}
                            >
                                <Button className="btn-filter" size="sm">
                                    Filter Date
                                </Button>
                            </DateRangePicker>
                        ),
                        ["filterMethod"]: (filter, row) => {
                            //   let date_q = moment(row["date_issued"]).format("YYYY-MM-DD");

                            filter
                                ? console.log(filter)
                                : console.log("no filter");

                            let format = "YYYY-MM-DD";
                            let date_q = row["date_issued"];
                            let startD = moment(filter.value.startDate).format(
                                format
                            );
                            let endD = moment(filter.value.endDate).format(
                                format
                            );

                            if (
                                moment(date_q).isBetween(startD, endD, null, [])
                            ) {
                                return true;
                            }
                        }
                    });

                case "completed":
                    return Object.assign({
                        ["Header"]: val,
                        ["id"]: val,
                        ["accessor"]: val => val.completed.toString()
                    });

                default:
                    return Object.assign({
                        ["Header"]: val,
                        ["accessor"]: val
                    });
            }
        });

        // Creating buttons for table
        const buttons = {
            Header: "Actions",
            filterable: false,
            Cell: cellprops => (
                <Fragment>
                    <div className="btn-group">
                        <SurveyDetailsModal survey={cellprops.original} />

                        <Button
                            color={
                                cellprops.original.completed == true
                                    ? "success"
                                    : cellprops.original.bottombox == 1
                                    ? "danger"
                                    : "warning"
                            }
                            size="sm"
                            className="ml-1"
                            onClick={() =>
                                this.handleToggle(cellprops.original)
                            }
                        >
                            RCA
                        </Button>
                        <RCAFormModal />

                        <Button
                            className="ml-1"
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
                    </div>
                </Fragment>
            ),
            width: 200
        };
        const columns = [buttons, ...headers];

        const surveysTableExcelSheet = (
            <ExcelSheet
                data={
                    this.state.sortedData[0]
                        ? this.state.sortedData
                        : this.props.surveys
                }
                name="Surveys"
            >
                {this.props.headers.map(item => (
                    <ExcelColumn key={item} label={item} value={item} />
                ))}
            </ExcelSheet>
        );

        let rca_headers;
        let rcaTableExcelSheet;

        if (this.props.rcas[0]) {
            rca_headers = Object.keys(this.props.rcas[0]);
            rcaTableExcelSheet = (
                <ExcelSheet data={this.props.rcas} name="RCAS">
                    {rca_headers.map(item => (
                        <ExcelColumn key={item} label={item} value={item} />
                    ))}
                </ExcelSheet>
            );
        } else {
            rcaTableExcelSheet = (
                <ExcelSheet data={[{ data: "no_data" }]} name="RCAS">
                    <ExcelColumn label="data" value="data" />
                </ExcelSheet>
            );
        }

        return (
            <Fragment>
                <h3>Survey Table</h3>
                <Row className="mb-2">
                    <Col md={6} style={{ display: "inline" }}>
                        <Fragment>
                            <ExcelFile
                                filename="Bottombox"
                                element={
                                    <Button
                                        className="mr-2 btn-bb"
                                        onClick={this.handleClick}
                                    >
                                        Download
                                    </Button>
                                }
                            >
                                {surveysTableExcelSheet}
                                {rcaTableExcelSheet}

                                {this.props.agents.length != 0 ? (
                                    <ExcelSheet
                                        data={this.props.agents}
                                        name="Agents"
                                    >
                                        {this.props.agent_headers.map(item =>
                                            item != "surveys" ? (
                                                <ExcelColumn
                                                    key={item}
                                                    label={item}
                                                    value={item}
                                                />
                                            ) : (
                                                <ExcelColumn
                                                    key={item}
                                                    label={item}
                                                    value="test"
                                                />
                                            )
                                        )}
                                    </ExcelSheet>
                                ) : (
                                    console.log("Do Nothing Agent")
                                )}
                            </ExcelFile>
                        </Fragment>

                        <Button
                            className="mr-2 btn-bb"
                            onClick={this.filterToggle}
                        >
                            Filter
                        </Button>
                        <Button
                            className="mr-2 btn-bb"
                            onClick={this.resetFields}
                        >
                            Reset
                        </Button>
                    </Col>
                </Row>

                <ReactTable
                    className="-striped -highlight"
                    ref={r => (this.reactTable = r)}
                    filtered={this.state.filtered}
                    onFilteredChange={filtered => {
                        this.setState({
                            filtered,
                            sortedData: this.reactTable.getResolvedState()
                                .sortedData
                        });
                    }}
                    style={{ backgroundColor: "white" }}
                    // DATA that will be displayed should be the same data to be extracted
                    data={this.props.data}
                    columns={columns}
                    minRows={5}
                    defaultPageSize={5}
                    filterable={this.state.filter}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    headers: state.surveys.headers,
    data: state.surveys.surveys,
    isOpen: state.modal.isOpen,
    surveys: state.surveys.surveys,
    agents: state.surveys.agents,
    agent_headers: state.surveys.agent_headers,
    rcas: state.surveys.rcas,
    rca: state.surveys.rca
});

export default connect(
    mapStateToProps,
    {
        deleteSurvey,
        toggle,
        getSurvey,
        getAgentDetails,
        getRca,
        removeRca
    }
)(DatatablePage);
