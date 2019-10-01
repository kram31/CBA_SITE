import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import UploadDataModal from "../upload-data/UploadDataModal";
import RCAFormModal from "../rca/RCAFormModal";
import UploadData from "../upload-data/UploadData";
import SurveyContent from "./SurveyContent";
import DatatablePage from "../upload-data/survey-data-table/DatatablePage";
import SideBar from "../../SideBar";

import {
    Spinner,
    Card,
    Fade,
    CardHeader,
    CardFooter,
    CardBody,
    Row,
    Col,
    ButtonGroup,
    Button
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
    getRcas
} from "../../../actions/surveyActions";

class BottomBox extends Component {
    componentDidMount() {
        this.props.getRcas();
        this.props.getSurveys();
        this.props.getSkills();
        this.props.getDsatCode1();
        this.props.getBBDriverCode2();
        this.props.getBBDriverCode3();
        this.props.getTeams();
        this.props.getAgents();
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
                        <div className="main">
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
                        </div>
                    </div>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isFetching: state.surveys.isFetching,
    bottombox: state.surveys.bottombox,
    agents: state.surveys.agents
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
        getAgents
    }
)(BottomBox);
