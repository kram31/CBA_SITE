import React, { Component } from "react";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Form
} from "reactstrap";

import { addAgent } from "../../../actions/surveyActions";

import SingleInput from "../../../components/bottombox/rca/components/SingleInput";
import SelectInput from "../../../components/bottombox/rca/components/SelectInput";

import { connect } from "react-redux";

class AddAgentModal extends Component {
    state = {
        modal: false,
        name: "",
        operator_lan_id: "",
        email: "",
        location: "",
        wave: "",
        skill: "",
        team_lead: ""
    };
    handleSubmit = e => {
        e.preventDefault();

        let newAgent = this.state;

        console.log(newAgent);
        this.props.addAgent(newAgent);
        // need to include operator_lan_id and name to make PUT requests

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
                <Button
                    color="primary"
                    onClick={this.toggle}
                    className="mr-2 mb-2 btn-bb"
                >
                    Add Agent
                </Button>
                <Modal
                    scrollable={true}
                    className="modal-lg modal-main"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <Form className="modal-content">
                        <ModalHeader
                            toggle={this.handleCancel}
                            className="modal-header"
                        >
                            Add Agent
                        </ModalHeader>
                        <ModalBody>
                            <Row>
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
                                        attr="name"
                                        label_name="Name"
                                        value={this.state.name}
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
                                Add
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
    { addAgent }
)(AddAgentModal);
