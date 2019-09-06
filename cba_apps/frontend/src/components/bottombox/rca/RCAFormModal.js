import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Col,
    Row,
    Form
} from "reactstrap";
import { connect } from "react-redux";
import { toggle } from "../../../actions/modalToggleActions";
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
    getTeams,
    addRCA
} from "../../../actions/surveyActions";

import SingleInput from "./components/SingleInput";
import SelectInput from "./components/SelectInput";

class RCAFormModal extends Component {
    state = {
        surveyed_ticket: "",
        agent: "",
        support_silo_issue_based: "",
        service: "",
        service_component: "",
        brief_description: "",
        user_verbatim: "",
        bb_driver_code2: "",
        bb_driver_code3: "",
        actual_issue: "",
        controllability: "",
        accountable_team: "",
        q1_answer: "",
        contacted_customer: "",
        summary: "",
        obs_in_call: "",
        accountable_entity: "",
        overall_reason_dsat: "",
        coaching: "",
        corrective_actions: ""
    };

    handleRCAButton = data => {
        const {
            toggle,
            getSurvey,
            getAgentDetails,
            getSkills,
            getDsatCode1,
            getBBDriverCode2,
            getBBDriverCode3,
            removeSurvey,
            getTeams
        } = this.props;

        const getDetails = data => {
            getSurvey(data);
            getAgentDetails(data.operator_lan_id);
            getSkills();
            getDsatCode1();
            getBBDriverCode2();
            getBBDriverCode3();
            getTeams();
        };

        toggle();

        !this.props.isOpen ? getDetails(data) : removeSurvey();
    };

    handleToggle = () => {
        this.props.toggle();
        !this.props.isOpen ? this.props.getSkills() : this.props.removeSurvey();
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    // Handle RCA Submit
    // >>> Send Post to http://localhost:8000/api/rca/ contents newSurvey
    // >>> Send Put request to http://localhost:8000/api/surveys/${reference_number}/ contents {"completed": true,"owner_name": "Jona Dorado","operator_lan_id": "doradojm"}

    handleSubmit = e => {
        e.preventDefault();

        const rcaData = this.state;
        rcaData.surveyed_ticket = this.props.survey.reference_number;

        this.props.addRCA(rcaData);

        this.handleToggle();
    };

    render() {
        let { reference_number, owner_name } = this.props.survey;

        const checkValue = elem => {
            let value;
            elem == null && !elem ? (value = "") : (value = elem);

            return value;
        };

        return (
            <div>
                <Button
                    outline
                    size="sm"
                    className="ml-1"
                    onClick={() => {
                        this.handleRCAButton(this.props.cellprops);
                    }}
                >
                    RCA
                </Button>

                <Modal
                    scrollable={true}
                    className="modal-lg"
                    isOpen={this.props.isOpen}
                    toggle={this.handleToggle}
                >
                    <Form
                        className="modal-content"
                        onSubmit={this.handleSubmit}
                    >
                        <ModalHeader toggle={this.handleToggle}>
                            Root Cause Analysis
                        </ModalHeader>
                        <ModalBody>
                            <h5>Ticket Details</h5>
                            <Row form>
                                <Col md={4}>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="surveyed_ticket"
                                        label_name="Surveyed Ticket Number"
                                        value={checkValue(reference_number)}
                                        controlFunc={this.handleChange}
                                        readOnly={true}
                                    />
                                </Col>
                                <Col md={4}>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="agent"
                                        label_name="Agent's Name"
                                        value={checkValue(owner_name)}
                                        controlFunc={this.handleChange}
                                        readOnly={true}
                                    />
                                </Col>
                                <Col md={4}>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="skill"
                                        label_name="Agent's Primary Skill"
                                        value={checkValue(
                                            this.props.agent.skill
                                        )}
                                        controlFunc={this.handleChange}
                                        readOnly={true}
                                    />
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
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
                                <Col md={4}>
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
                                <Col md={4}>
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
                            <Row form>
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
                            <Row form>
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
                            <Row form>
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
                            <Row form>
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
                            <Row form>
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
                            <Row form>
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
                            <Row form>
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
                            <Row form>
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
                            <Row form>
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
                            <Row form>
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
                            <Button
                                type="submit"
                                color="primary"
                                onSubmit={this.handleSubmit}
                                // onClick={this.handleToggle}
                            >
                                Submit
                            </Button>{" "}
                            <Button
                                type="submit"
                                color="secondary"
                                onClick={this.handleToggle}
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
    isOpen: state.modal.isOpen,
    survey: state.surveys.survey,
    agent: state.surveys.agent,
    skills: state.surveys.skills,
    dsat_code1: state.surveys.dsat_code1,
    bb_driver_code2: state.surveys.bb_driver_code2,
    bb_driver_code3: state.surveys.bb_driver_code3,
    accountable_team: state.surveys.teams
});

export default connect(
    mapStateToProps,
    {
        getSurveys,
        deleteSurvey,
        toggle,
        getSurvey,
        getAgentDetails,
        getSkills,
        getDsatCode1,
        getBBDriverCode2,
        getBBDriverCode3,
        removeSurvey,
        getTeams,
        addRCA
    }
)(RCAFormModal);
