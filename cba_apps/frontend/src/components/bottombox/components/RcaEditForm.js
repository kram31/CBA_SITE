import React, { Component } from "react";

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

import SingleInput from "../../../components/bottombox/rca/components/SingleInput";
import SelectInput from "../../../components/bottombox/rca/components/SelectInput";

import { connect } from "react-redux";

import { updateRca } from "../../../actions/surveyActions";

class RcaEditForm extends Component {
    state = {
        modal: false,
        surveyed_ticket: this.props.rca.surveyed_ticket,
        agent: this.props.rca.agent,
        support_silo_issue_based: this.props.rca.support_silo_issue_based,
        service: this.props.rca.service,
        service_component: this.props.rca.service_component,
        brief_description: this.props.rca.brief_description,
        user_verbatim: this.props.rca.user_verbatim,
        dsat_cause: this.props.rca.dsat_cause,
        bb_driver_code2: this.props.rca.bb_driver_code2,
        bb_driver_code3: this.props.rca.bb_driver_code3,
        actual_issue: this.props.rca.actual_issue,
        controllability: this.props.rca.controllability,
        accountable_team: this.props.rca.accountable_team,
        q1_answer: this.props.rca.q1_answer,
        contacted_customer: this.props.rca.contacted_customer,
        summary: this.props.rca.summary,
        obs_in_call: this.props.rca.obs_in_call,
        accountable_entity: this.props.rca.accountable_entity,
        overall_reason_dsat: this.props.rca.overall_reason_dsat,
        coaching: this.props.rca.coaching,
        corrective_actions: this.props.rca.corrective_actions
    };

    handleSubmit = e => {
        e.preventDefault();

        let rca_data = this.state;
        rca_data.id = this.props.rca.id;
        delete rca_data.modal;

        console.log(rca_data);

        this.props.updateRca(rca_data);

        this.toggle();
    };

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleCancel = () => {
        this.toggle();
    };

    render() {
        return (
            <div>
                <Button color="primary" size="sm" onClick={this.toggle}>
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
                            {this.state.surveyed_ticket} - Root Cause Analysis
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="agent"
                                        label_name="Agent"
                                        value={this.state.agent}
                                        controlFunc={this.handleChange}
                                        readOnly={true}
                                    />
                                </Col>
                                <Col>
                                    <SelectInput
                                        type="select"
                                        size="sm"
                                        attr="support_silo_issue_based"
                                        label_name="SILO based on issue"
                                        value={
                                            this.state.support_silo_issue_based
                                        }
                                        controlFunc={this.handleChange}
                                        options={this.props.skills}
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
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="brief_description"
                                        label_name="Brief Description"
                                        value={this.state.brief_description}
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
                                        attr="user_verbatim"
                                        label_name="User's verbatim"
                                        value={this.state.user_verbatim}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <SelectInput
                                        type="select"
                                        size="sm"
                                        attr="dsat_cause"
                                        label_name="What caused the DSAT? Code 1"
                                        value={this.state.dsat_cause}
                                        controlFunc={this.handleChange}
                                        options={this.props.dsat_code1}
                                    />
                                </Col>
                                <Col md={4}>
                                    <SelectInput
                                        type="select"
                                        size="sm"
                                        attr="bb_driver_code2"
                                        label_name="BB Driver Code 2"
                                        value={this.state.bb_driver_code2}
                                        controlFunc={this.handleChange}
                                        options={this.props.bb_driver_code2}
                                    />
                                </Col>
                                <Col md={4}>
                                    <SelectInput
                                        type="select"
                                        size="sm"
                                        attr="bb_driver_code3"
                                        label_name="BB Driver Code 3"
                                        value={this.state.bb_driver_code3}
                                        controlFunc={this.handleChange}
                                        options={this.props.bb_driver_code3}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="actual_issue"
                                        label_name="Actual issue"
                                        value={this.state.actual_issue}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <SelectInput
                                        type="select"
                                        size="sm"
                                        attr="controllability"
                                        label_name="Controllability"
                                        value={this.state.controllability}
                                        controlFunc={this.handleChange}
                                        options={[
                                            {
                                                name: "ITSD Controllable"
                                            },
                                            {
                                                name: "Non ITSD Controllable"
                                            }
                                        ]}
                                    />
                                </Col>
                                <Col md={3}>
                                    <SelectInput
                                        type="select"
                                        size="sm"
                                        attr="accountable_team"
                                        label_name="Accountable Team"
                                        value={this.state.accountable_team}
                                        controlFunc={this.handleChange}
                                        options={this.props.accountable_team}
                                    />
                                </Col>
                                <Col md={3}>
                                    <SelectInput
                                        type="select"
                                        size="sm"
                                        attr="q1_answer"
                                        label_name="Q1 Answer?"
                                        value={this.state.q1_answer}
                                        controlFunc={this.handleChange}
                                        options={[
                                            {
                                                name: "Yes"
                                            },
                                            {
                                                name: "No"
                                            }
                                        ]}
                                    />
                                </Col>
                                <Col md={3}>
                                    <SelectInput
                                        type="select"
                                        size="sm"
                                        attr="contacted_customer"
                                        label_name="Informed user?"
                                        value={this.state.contacted_customer}
                                        controlFunc={this.handleChange}
                                        options={[
                                            {
                                                name: "Yes"
                                            },
                                            {
                                                name: "No"
                                            }
                                        ]}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="summary"
                                        label_name="Summary"
                                        value={this.state.summary}
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
                                        attr="obs_in_call"
                                        label_name="Place only relevant information in
                                        the call"
                                        value={this.state.obs_in_call}
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
                                        attr="accountable_entity"
                                        label_name="Accountable Entity"
                                        value={this.state.accountable_entity}
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
                                        attr="overall_reason_dsat"
                                        label_name="Place overall reason for DSAT"
                                        value={this.state.overall_reason_dsat}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={2}>
                                    <SelectInput
                                        type="select"
                                        size="sm"
                                        attr="coaching"
                                        label_name="Coahing done?"
                                        value={this.state.coaching}
                                        controlFunc={this.handleChange}
                                        options={[
                                            {
                                                name: "true"
                                            },
                                            {
                                                name: "false"
                                            }
                                        ]}
                                    />
                                </Col>
                                <Col md={10}>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="corrective_actions"
                                        label_name="Corrective actions"
                                        value={this.state.corrective_actions}
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

const mapStateToProps = state => ({
    agent: state.surveys.agent,
    survey: state.surveys.survey,
    skills: state.surveys.skills,
    dsat_code1: state.surveys.dsat_code1,
    bb_driver_code2: state.surveys.bb_driver_code2,
    bb_driver_code3: state.surveys.bb_driver_code3,
    accountable_team: state.surveys.teams
});

export default connect(
    mapStateToProps,
    { updateRca }
)(RcaEditForm);
