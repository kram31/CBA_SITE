import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Table, Row, Col, Collapse } from "reactstrap";
import SurveyDetails from "./SurveyDetails";

class SurveyList extends Component {
    state = {
        activeItem: {},
        isOpen: false
    };
    handleClick = item => {
        // this.props.getSurvey(item);
        // this.props.getAgentDetails(item.operator_lan_id);
        this.setState((state, props) => ({
            activeItem: item,
            // agent: this.props.agent,
            isOpen: true
        }));
    };
    closeCallback = x => {
        this.setState((state, props) => ({
            isOpen: false
        }));
    };
    survey_list = list => {
        if (list) {
            return list;
        }
        return [];
    };
    render() {
        if (this.props.survey_list) {
            return (
                <Fragment>
                    <Table size="sm">
                        <thead>
                            <tr>
                                <th>Survey Number</th>
                                <th>Customer Name</th>
                                <th>Owner Name</th>
                                <th>Average Score</th>
                                <th>Survey Category</th>
                                <th>RCA</th>
                                <th>Date Issued</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.survey_list(this.props.survey_list).map(
                                (survey, i) => (
                                    <Fragment key={i}>
                                        <tr>
                                            <td
                                                style={{
                                                    cursor: "pointer"
                                                }}
                                                onClick={() =>
                                                    this.handleClick(survey)
                                                }
                                            >
                                                {survey.reference_number}
                                            </td>
                                            <td>
                                                {survey.first_name}{" "}
                                                {survey.last_name}
                                            </td>
                                            <td>{survey.owner_name}</td>
                                            <td>{survey.average_score}</td>
                                            <td>
                                                {survey.bottombox === 1
                                                    ? "Bottombox"
                                                    : "Topbox"}
                                            </td>
                                            <td>
                                                {survey.completed === true
                                                    ? "Completed"
                                                    : "Not Completed"}
                                            </td>
                                            <td>{survey.date_issued}</td>
                                        </tr>
                                        {this.state.activeItem ? (
                                            this.state.activeItem
                                                .reference_number ===
                                                survey.reference_number && (
                                                <tr>
                                                    <td colSpan={7}>
                                                        <Collapse
                                                            isOpen={
                                                                this.state
                                                                    .isOpen
                                                            }
                                                        >
                                                            <Row>
                                                                <Col>
                                                                    <SurveyDetails
                                                                        survey={
                                                                            this
                                                                                .state
                                                                                .activeItem
                                                                        }
                                                                        parentCallback={
                                                                            this
                                                                                .closeCallback
                                                                        }
                                                                    />
                                                                </Col>
                                                                {/* <Col md={6}>
                                                    <RCAForm
                                                    survey={
                                                        this.state
                                                        .activeItem
                                                    }
                                                    parentCallback={
                                                        this.closeCallback
                                                    }
                                                    />
                                                </Col> */}
                                                            </Row>
                                                        </Collapse>
                                                    </td>
                                                </tr>
                                            )
                                        ) : (
                                            <tr>
                                                <td></td>
                                            </tr>
                                        )}
                                    </Fragment>
                                )
                            )}
                        </tbody>
                    </Table>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Row>
                        <Col>No Data</Col>
                    </Row>
                </Fragment>
            );
        }
    }
}

export default SurveyList;
