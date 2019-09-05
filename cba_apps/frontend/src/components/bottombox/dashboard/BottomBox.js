import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import UploadDataModal from "../upload-data/UploadDataModal";
import RCAFormModal from "../rca/RCAFormModal";
import UploadData from "../upload-data/UploadData";
import SurveyContent from "./SurveyContent";

import {
    Card,
    Fade,
    CardHeader,
    CardFooter,
    CardBody,
    Row,
    Col
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
                <Row>
                    <Col md={2}></Col>
                    <Col md={8}>
                        <SurveyContent
                            bottombox_not_completed={
                                this.props.bottombox_not_completed
                            }
                        />
                    </Col>
                    <Col md={2} className="bg-dark" style={{ height: "80%" }}>
                        <UploadDataModal />
                        <h5>test</h5>
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
