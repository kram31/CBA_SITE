import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import moment from "moment";

import { connect } from "react-redux";

import {
    deleteSurvey,
    getBottomboxSurveyView,
    getTopboxSurveyView,
    getCompletedSurveyView,
    getAllSurveyView
} from "../../../../actions/surveyActions";
import { toggle } from "../../../../actions/modalToggleActions";

import RCAFormModal from "../../rca/RCAFormModal";

import SurveyDetailsModal from "../../components/SurveyDetailsModal";

import {
    getSurvey,
    getAgentDetails,
    getRca,
    removeRca
} from "../../../../actions/surveyActions";

import ReactExport from "react-data-export";

import { Button, Badge, Row, Col } from "reactstrap";

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

    getData = data => {
        if (data === "bottombox") {
            this.props.getBottomboxSurveyView();
        } else if (data === "topbox") {
            this.props.getTopboxSurveyView();
        } else if (data === "completed") {
            this.props.getCompletedSurveyView();
        } else if (data === "all") {
            this.props.getAllSurveyView();
        }
    };

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
                                this.props.surveys
                                    .filter(
                                        survey =>
                                            cellprops.original
                                                .reference_number ===
                                            survey.reference_number
                                    )
                                    .map(item => item.completed)[0] == true
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

        if (!Array.isArray(this.props.rcas) || !this.props.rcas.length) {
            rcaTableExcelSheet = (
                <ExcelSheet data={[{ data: "no_data" }]} name="RCAS">
                    <ExcelColumn label="data" value="data" />
                </ExcelSheet>
            );
        } else {
            rca_headers = Object.keys(this.props.rcas[0]);
            rcaTableExcelSheet = (
                <ExcelSheet data={this.props.rcas} name="RCAS">
                    {rca_headers.map(item => (
                        <ExcelColumn key={item} label={item} value={item} />
                    ))}
                </ExcelSheet>
            );
        }

        return (
            <Fragment>
                <h5>Survey Table</h5>

                <Row className="mb-3 mt-2">
                    <Col style={{ display: "inline" }}>
                        <Button
                            size="sm"
                            color="success"
                            onClick={() => this.getData("completed")}
                            className="mr-2"
                        >
                            Completed RCA{" "}
                            <Badge color="secondary">
                                {this.props.completed_survey_count}
                            </Badge>
                        </Button>
                        <Button
                            size="sm"
                            color="warning"
                            className="mr-2"
                            onClick={() => this.getData("topbox")}
                        >
                            Topbox - RCA not done{" "}
                            <Badge color="secondary">
                                {this.props.incomplete_topbox_count}
                            </Badge>
                        </Button>
                        <Button
                            size="sm"
                            color="danger"
                            className="mr-2"
                            onClick={() => this.getData("bottombox")}
                        >
                            Bottombox - RCA not done{" "}
                            <Badge color="secondary">
                                {this.props.incomplete_bottombox_count}
                            </Badge>
                        </Button>
                        <Button
                            size="sm"
                            color="primary"
                            className="mr-2"
                            onClick={() => this.getData("all")}
                        >
                            All{" "}
                            <Badge color="secondary">
                                {this.props.data.length}
                            </Badge>
                        </Button>
                        <span>Legend for RCA button</span>
                    </Col>
                </Row>

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
                    data={this.props.surveys_view}
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
    surveys_view: state.surveys.surveys_view,
    isOpen: state.modal.isOpen,
    surveys: state.surveys.surveys,
    agents: state.surveys.agents,
    agent_headers: state.surveys.agent_headers,
    rcas: state.surveys.rcas,
    rca: state.surveys.rca,
    incomplete_bottombox_count: state.surveys.surveys.filter(
        survey => survey.bottombox === 1 && survey.completed === false
    ).length,
    incomplete_topbox_count: state.surveys.surveys.filter(
        survey => survey.bottombox === 0 && survey.completed === false
    ).length,
    completed_survey_count: state.surveys.surveys.filter(
        survey => survey.completed === true
    ).length
});

export default connect(mapStateToProps, {
    deleteSurvey,
    toggle,
    getSurvey,
    getAgentDetails,
    getRca,
    removeRca,
    getBottomboxSurveyView,
    getTopboxSurveyView,
    getCompletedSurveyView,
    getAllSurveyView
})(DatatablePage);
