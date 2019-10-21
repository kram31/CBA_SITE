import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import SurveyContent from "./SurveyContent";
import DatatablePage from "../upload-data/survey-data-table/DatatablePage";
import RCATable from "./RCATable";
import AgentsTable from "./AgentsTable";
import SideBar from "../../SideBar";
import DougnutChartBottomboxSurveys from "./Charts/DougnutChartBottomboxSurveys";
import PieChartCompletedSurveysCount from "./Charts/PieChartCompletedSurveysCount";
import BarChartSurveyTopDrivers from "./Charts/BarChartSurveyTopDrivers";

import { Spinner, Fade, Row, Col } from "reactstrap";

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
                        <div className="main">
                            <Row>
                                <Col md={4}>
                                    <Fade>
                                        <div className="section chart">
                                            <DougnutChartBottomboxSurveys />
                                        </div>
                                    </Fade>
                                </Col>
                                <Col md={4}>
                                    <Fade>
                                        <div className="section chart">
                                            <PieChartCompletedSurveysCount />
                                        </div>
                                    </Fade>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Fade>
                                        <div className="section chart">
                                            <BarChartSurveyTopDrivers />
                                        </div>
                                    </Fade>
                                </Col>
                            </Row>
                            <Fade>
                                {this.props.bottombox.length !== 0 && (
                                    <div className="section section-a">
                                        <SurveyContent />
                                    </div>
                                )}
                            </Fade>

                            <Fade>
                                <div className="section section-c">
                                    <DatatablePage />
                                </div>
                            </Fade>
                            <Row>
                                <Col md={6}>
                                    <Fade>
                                        <div className="section">
                                            <AgentsTable />
                                        </div>
                                    </Fade>
                                </Col>
                                <Col md={6}>
                                    <Fade>
                                        <div className="section">
                                            <RCATable />
                                        </div>
                                    </Fade>
                                </Col>
                            </Row>
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
    rcas: state.surveys.rcas
});

export default connect(
    mapStateToProps,
    {
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
    }
)(BottomBox);
