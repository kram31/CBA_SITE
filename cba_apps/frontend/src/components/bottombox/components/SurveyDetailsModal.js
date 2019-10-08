import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Row,
    Col
} from "reactstrap";
import { connect } from "react-redux";
import { updateSurvey } from "../../../actions/surveyActions";

import SingleInput from "../../../components/bottombox/rca/components/SingleInput";

class SurveyDetailsModal extends React.Component {
    state = {
        modal: false,
        callback_reference_number: this.props.survey.callback_reference_number,
        related_incident_record: this.props.survey.related_incident_record,
        first_name: this.props.survey.first_name,
        last_name: this.props.survey.last_name,
        company_name: this.props.survey.company_name,
        phone_number: this.props.survey.phone_number,
        site_location: this.props.survey.site_location,
        customer_email_address: this.props.survey.customer_email_address,
        city: this.props.survey.city,
        state: this.props.survey.state,
        date_time: this.props.survey.date_time,
        origination_source: this.props.survey.origination_source,
        call_type: this.props.survey.call_type,
        service_type: this.props.survey.service_type,
        service: this.props.survey.service,
        service_component: this.props.survey.service_component,
        assignment_group: this.props.survey.assignment_group,
        q1: this.props.survey.q1,
        q2: this.props.survey.q2,
        q2a: this.props.survey.q2a,
        q3: this.props.survey.q3,
        q3a: this.props.survey.q3a,
        q4: this.props.survey.q4,
        q5: this.props.survey.q5,
        q6: this.props.survey.q6,
        average_score: this.props.survey.average_score,
        operator_lan_id: this.props.survey.operator_lan_id,
        owner_name: this.props.survey.owner_name,
        fulfillment: this.props.survey.fulfillment,
        follow_up_comments: this.props.survey.follow_up_comments,
        originating_ticket_description: this.props.survey
            .originating_ticket_description,
        budi_bu: this.props.survey.budi_bu,
        budi_lv7: this.props.survey.budi_lv7,
        bu_catg: this.props.survey.bu_catg,
        date_issued: this.props.survey.date_issued
    };

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    handleSubmit = e => {
        e.preventDefault();

        let survey_data = this.state;
        delete survey_data.modal;

        survey_data.reference_number = this.props.survey.reference_number;
        survey_data.agent = this.props.survey.operator_lan_id;

        console.log(this.state);
        this.props.updateSurvey(survey_data);
        this.toggle();
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleCancel = () => {
        this.setState(prevState => ({
            callback_reference_number: this.props.survey
                .callback_reference_number,
            related_incident_record: this.props.survey.related_incident_record,
            first_name: this.props.survey.first_name,
            last_name: this.props.survey.last_name,
            company_name: this.props.survey.company_name,
            phone_number: this.props.survey.phone_number,
            site_location: this.props.survey.site_location,
            customer_email_address: this.props.survey.customer_email_address,
            city: this.props.survey.city,
            state: this.props.survey.state,
            date_time: this.props.survey.date_time,
            origination_source: this.props.survey.origination_source,
            call_type: this.props.survey.call_type,
            service_type: this.props.survey.service_type,
            service: this.props.survey.service,
            service_component: this.props.survey.service_component,
            assignment_group: this.props.survey.assignment_group,
            q1: this.props.survey.q1,
            q2: this.props.survey.q2,
            q2a: this.props.survey.q2a,
            q3: this.props.survey.q3,
            q3a: this.props.survey.q3a,
            q4: this.props.survey.q4,
            q5: this.props.survey.q5,
            q6: this.props.survey.q6,
            average_score: this.props.survey.average_score,
            operator_lan_id: this.props.survey.operator_lan_id,
            owner_name: this.props.survey.owner_name,
            fulfillment: this.props.survey.fulfillment,
            follow_up_comments: this.props.survey.follow_up_comments,
            originating_ticket_description: this.props.survey
                .originating_ticket_description,
            budi_bu: this.props.survey.budi_bu,
            budi_lv7: this.props.survey.budi_lv7,
            bu_catg: this.props.survey.bu_catg,
            date_issued: this.props.survey.date_issued
        }));
        this.toggle();
    };

    render() {
        const { reference_number } = this.props.survey;
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>
                    View
                </Button>
                <Modal
                    scrollable={true}
                    className="modal-xl modal-main"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <Form className="modal-content">
                        <ModalHeader
                            className="modal-header"
                            toggle={this.handleCancel}
                        >
                            {reference_number}
                        </ModalHeader>
                        <ModalBody>
                            {/* below on TOP */}
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="first_name"
                                        label_name="First Name"
                                        value={this.state.first_name}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="first_name"
                                        label_name="Last Name"
                                        value={this.state.last_name}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="customer_email_address"
                                        label_name="Customer Email Address"
                                        value={
                                            this.state.customer_email_address
                                        }
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="company_name"
                                        label_name="Company Name"
                                        value={this.state.company_name}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="phone_number"
                                        label_name="Phone Number"
                                        attr="phone_number"
                                        value={this.state.phone_number}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="site_location"
                                        label_name="Site Location"
                                        value={this.state.site_location}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="city"
                                        label_name="City"
                                        value={this.state.city}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="state"
                                        label_name="State"
                                        value={this.state.state}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="callback_reference_number"
                                        label_name="Callback Reference Number"
                                        value={
                                            this.state.callback_reference_number
                                        }
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="relared_incident_record"
                                        label_name="Related Incident Record"
                                        value={
                                            this.state.relared_incident_record
                                        }
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="vip"
                                        label_name="VIP"
                                        value={this.state.vip}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="date_time"
                                        label_name="Date Time"
                                        value={this.state.date_time}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="origination_source"
                                        label_name="Origination Source"
                                        value={this.state.origination_source}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="call_type"
                                        label_name="Call Type"
                                        value={this.state.call_type}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="service_type"
                                        label_name="Service Type"
                                        value={this.state.service_type}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="service"
                                        label_name="Service"
                                        value={this.state.service}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="service_component"
                                        label_name="Service Component"
                                        value={this.state.service_component}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="assignment_group"
                                        label_name="Assignment Group"
                                        value={this.state.assignment_group}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="q1"
                                        label_name="Q1"
                                        value={this.state.q1}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="q2"
                                        label_name="Q2"
                                        value={this.state.q2}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="q2a"
                                        label_name="Q2a"
                                        value={this.state.q2a}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="q3"
                                        label_name="Q3"
                                        value={this.state.q3}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="q3a"
                                        label_name="Q3a"
                                        value={this.state.q3a}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="q4"
                                        label_name="Q4"
                                        value={this.state.q4}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="q5"
                                        label_name="Q5"
                                        value={this.state.q5}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="q6"
                                        label_name="Q6"
                                        value={this.state.q6}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="average_score"
                                        label_name="Average Score"
                                        value={this.state.average_score}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="owner_name"
                                        label_name="Owner Name"
                                        value={this.state.owner_name}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="operator_lan_id"
                                        label_name="Operator Lan ID"
                                        value={this.state.operator_lan_id}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="fulfillment"
                                        label_name="Fulfillment"
                                        value={this.state.fulfillment}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="follow_up_comments"
                                        label_name="Follow Up Comments"
                                        value={this.state.follow_up_comments}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="originating_ticket_description"
                                        label_name="Originating Ticket Description"
                                        value={
                                            this.state
                                                .originating_ticket_description
                                        }
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="budi_bu"
                                        label_name="Budi_Bu"
                                        value={this.state.budi_bu}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="budi_lv7"
                                        label_name="Budi_lv7"
                                        value={this.state.budi_lv7}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="bu_catg"
                                        label_name="Bu_catg"
                                        value={this.state.bu_catg}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="date_issued"
                                        label_name="Date Issued"
                                        value={this.state.date_issued}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleSubmit}>
                                Update
                            </Button>{" "}
                            <Button
                                color="secondary"
                                onClick={this.handleCancel}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default connect(
    null,
    { updateSurvey }
)(SurveyDetailsModal);
