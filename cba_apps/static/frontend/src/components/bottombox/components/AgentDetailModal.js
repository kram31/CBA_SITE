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

import { updateAgent } from "../../../actions/surveyActions";

class AgentDetailModal extends Component {
    state = {
        modal: false,
        email: this.props.agentDetail.email,
        location: this.props.agentDetail.location,
        wave: this.props.agentDetail.wave,
        skill: this.props.agentDetail.skill,
        team_lead: this.props.agentDetail.team_lead
    };

    handleSubmit = e => {
        e.preventDefault();
        // need to include operator_lan_id and name to make PUT requests
        let agentData = this.state;
        delete agentData.modal;
        agentData.operator_lan_id = this.props.agentDetail.operator_lan_id;
        agentData.name = this.props.agentDetail.name;

        this.props.updateAgent(agentData);

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
                    className="modal-lg modal-main"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <Form className="modal-content">
                        <ModalHeader
                            className="modal-header"
                            toggle={this.handleCancel}
                        >
                            {this.props.agentDetail.name}
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col>
                                    <p>
                                        <span>Operator Lan ID: </span>
                                        <strong>
                                            {
                                                this.props.agentDetail
                                                    .operator_lan_id
                                            }
                                        </strong>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="email"
                                        label_name="Email"
                                        value={this.state.email}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SingleInput
                                        type="text"
                                        size="sm"
                                        attr="location"
                                        label_name="Location"
                                        value={this.state.location}
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
                                        attr="wave"
                                        label_name="Wave"
                                        value={this.state.wave}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                                <Col>
                                    <SelectInput
                                        type="select"
                                        size="sm"
                                        attr="skill"
                                        label_name="Skill"
                                        value={this.state.skill}
                                        controlFunc={this.handleChange}
                                        options={this.props.skills}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <SelectInput
                                        type="select"
                                        size="sm"
                                        attr="team_lead"
                                        label_name="Team Lead"
                                        value={this.state.team_lead}
                                        controlFunc={this.handleChange}
                                        options={this.props.teamleads}
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
    survey: state.surveys.survey,
    skills: state.surveys.skills,
    dsat_code1: state.surveys.dsat_code1,
    bb_driver_code2: state.surveys.bb_driver_code2,
    bb_driver_code3: state.surveys.bb_driver_code3,
    teamleads: state.surveys.teamleads
});

export default connect(
    mapStateToProps,
    { updateAgent }
)(AgentDetailModal);
