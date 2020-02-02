import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import SingleInput from "../rca/components/SingleInput";

class SurveyDetails extends Component {
    sendData = () => {
        this.props.parentCallback("x");
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        let {
            reference_number,
            owner_name,
            first_name,
            last_name,
            customer_email_address,
            origination_source,
            callback_reference_number,
            related_incident_record,
            site_location,
            city,
            state,
            user_location,
            phone_number,
            call_type,
            service_type,
            service,
            service_component,
            average_score,
            fulfillment,
            assignment_group,
            originating_ticket_description,
            follow_up_comments,
            q1,
            q2,
            q2a,
            q3,
            q3a,
            q4,
            q5,
            q6,
            budi_bu,
            budi_lv7,
            bu_catg,
            date_issued,
            uploaded_by,
            date_uploaded
        } = this.props.survey;

        return (
            <Fragment>
                <h5>Survey Details</h5>
                <Row className="survey-row">
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="customer_name"
                            label_name="Customer Name"
                            value={`${first_name} ${last_name}`}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="customer_email_address"
                            label_name="Email Address"
                            value={customer_email_address}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="phone_number"
                            label_name="Phone number"
                            value={phone_number}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>

                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="user_location"
                            label_name="User Location"
                            value={user_location}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="callback_reference_number"
                            label_name="Callback Reference Number"
                            value={callback_reference_number}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="related_incident_record"
                            label_name="Related Incident Record"
                            value={related_incident_record}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="site_location"
                            label_name="Site Location"
                            value={site_location}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                    <Col md={3}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="city"
                            label_name="City"
                            value={city}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                    <Col md={3}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="state"
                            label_name="State"
                            value={state}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="call_type"
                            label_name="Call Type"
                            value={call_type}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="service_type"
                            label_name="Service Type"
                            value={service_type}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="service"
                            label_name="Service"
                            value={service}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="service_component"
                            label_name="Service Component"
                            value={service_component}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="assignment_group"
                            label_name="Assignment Group"
                            value={assignment_group}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>

                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="origination_source"
                            label_name="Source"
                            value={origination_source}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={12}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="originating_ticket_description"
                            label_name="Originating Ticket Description"
                            value={originating_ticket_description}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={12}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="follow_up_comments"
                            label_name="Follow up comments"
                            value={follow_up_comments}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="average_score"
                            label_name="Average Score"
                            value={average_score}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="fulfillment"
                            label_name="Fulfillment"
                            value={fulfillment}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={12}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="q1"
                            label_name="Q1"
                            value={q1}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={12}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="q2"
                            label_name="Q2"
                            value={q2}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={12}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="q2a"
                            label_name="Q2a"
                            value={q2a}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={12}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="q3"
                            label_name="Q3"
                            value={q3}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={12}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="q3a"
                            label_name="Q3a"
                            value={q3a}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={12}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="q4"
                            label_name="Q4"
                            value={q4}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={12}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="q5"
                            label_name="Q5"
                            value={q5}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={12}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="q6"
                            label_name="Q6"
                            value={q6}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="budi_bu"
                            label_name="BUDI_BU"
                            value={budi_bu}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="budi_lv7"
                            label_name="BUDI_LV7"
                            value={budi_lv7}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="bu_catg"
                            label_name="BU_CATG"
                            value={bu_catg}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="date_issued"
                            label_name="Date Issued"
                            value={date_issued}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
                <Row className="survey-row">
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="uploaded_by"
                            label_name="Uploaded by"
                            value={uploaded_by}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                    <Col md={6}>
                        <SingleInput
                            type="text"
                            size="sm"
                            attr="date_uploaded"
                            label_name="Date uploaded"
                            value={date_uploaded}
                            controlFunc={this.handleChange}
                            readOnly={true}
                        />
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    survey: state.surveys.survey
});

export default connect(null, {})(SurveyDetails);
