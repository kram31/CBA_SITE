import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import DatatablePage from "../upload-data/survey-data-table/DatatablePage";
import RCATable from "./RCATable";

import SideBar from "../../SideBar";
import Dashboard from "./Dashboard";
import BottomboxDrivers from "../components/BottomboxDrivers";
import AgentsComponent from "../components/AgentsComponent";

import {
    Spinner,
    Fade,
    Row,
    Col,
    Collapse,
    Card,
    CardHeader,
    CardBody
} from "reactstrap";

import {
    getAgents,
    getSurveys,
    getSkills,
    getDsatCode1,
    getBBDriverCode2,
    getBBDriverCode3,
    removeSurvey,
    getTeams,
    getRcas,
    getAllData2
} from "../../../actions/surveyActions";

class BottomBox extends Component {
    componentDidMount() {
        this.props.getAllData2();
    }

    render() {
        return (
            <Fragment>
                {this.props.isFetching ? (
                    <Spinner
                        style={{
                            width: "3rem",
                            height: "3rem",
                            top: "50%",
                            left: "50%",
                            position: "fixed"
                        }}
                    />
                ) : (
                    <div>
                        <Fade>
                            <div className="sidebar-main">
                                <SideBar />
                            </div>
                        </Fade>
                        <div className="main mb-5">
                            <Collapse isOpen={this.props.survey_view_collapse}>
                                <div className="section">
                                    <Card>
                                        <CardHeader>
                                            <h4>
                                                <strong>Survey View</strong>
                                            </h4>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col>
                                                    <Fade>
                                                        <DatatablePage />
                                                    </Fade>
                                                </Col>
                                            </Row>
                                            <Row className="mt-3">
                                                <Col>
                                                    <Fade>
                                                        <RCATable />
                                                    </Fade>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Collapse>
                            <Collapse isOpen={this.props.agent_view_collapse}>
                                <div className="section">
                                    <Fade>
                                        <AgentsComponent />
                                    </Fade>
                                </div>
                            </Collapse>
                            <div className="section">
                                <Collapse
                                    isOpen={this.props.bottombox_view_collapse}
                                >
                                    <Fade>
                                        <BottomboxDrivers />
                                    </Fade>
                                </Collapse>
                            </div>
                            <div className="section">
                                <Fade>
                                    <Dashboard />
                                </Fade>
                            </div>
                        </div>
                    </div>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    surveys: state.surveys.surveys,
    isFetching: state.surveys.isFetching,
    bottombox: state.surveys.bottombox,
    agents: state.surveys.agents,
    rcas: state.surveys.rcas,
    agent_view_collapse: state.surveys.agent_view_collapse,
    bottombox_view_collapse: state.surveys.bottombox_view_collapse,
    survey_view_collapse: state.surveys.survey_view_collapse
});

export default connect(mapStateToProps, {
    getSurveys,
    getSkills,
    getDsatCode1,
    getBBDriverCode2,
    getBBDriverCode3,
    removeSurvey,
    getTeams,
    getRcas,
    getAgents,
    getAllData2
})(BottomBox);
