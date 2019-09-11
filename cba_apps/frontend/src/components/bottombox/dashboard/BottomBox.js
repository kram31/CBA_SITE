import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import UploadDataModal from "../upload-data/UploadDataModal";
import RCAFormModal from "../rca/RCAFormModal";
import UploadData from "../upload-data/UploadData";
import SurveyContent from "./SurveyContent";
import DatatablePage from "../upload-data/survey-data-table/DatatablePage";

import {
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
    getSurveys,
    deleteSurvey,
    getSurvey,
    getAgentDetails,
    getSkills,
    getDsatCode1,
    getBBDriverCode2,
    getBBDriverCode3,
    removeSurvey,
    getTeams
} from "../../../actions/surveyActions";

class BottomBox extends Component {
    componentDidMount() {
        this.props.getSurveys();
    }

    render() {
        return (
            <Fragment>
                <Row className="my-4 mr-3">
                    <Col>
                        <DatatablePage />
                    </Col>
                </Row>
                <Row className="my-4 mr-3">
                    <Col>
                        <DatatablePage />
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    bottombox_not_completed: state.surveys.bottombox_not_completed
});

export default connect(
    mapStateToProps,
    { getSurveys }
)(BottomBox);
