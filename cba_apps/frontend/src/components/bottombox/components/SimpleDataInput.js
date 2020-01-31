import React, { Component } from "react";
import {
    Modal,
    Form,
    ModalHeader,
    ModalBody,
    Row,
    Col,
    ModalFooter,
    Button
} from "reactstrap";

import { connect } from "react-redux";
import {
    addTeam,
    addSkill,
    addTeamLead,
    addDsatCode1,
    addBbDriverCode2,
    addBbDriverCode3
} from "../../../actions/surveyActions";
import SingleInput from "../rca/components/SingleInput";

import DataTable from "./DataTable";

class SimpleDataInput extends Component {
    state = {
        modal: false,
        name: ""
    };

    componentWillReceiveProps(newProps) {
        this.setState((state, props) => ({
            modal: newProps.modal
        }));
    }

    toggle = () => {
        this.setState((state, props) => ({ modal: false, name: "" }));
        this.props.onModalChange(false);
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    // identifier = e.target.name.id

    handleSubmit = e => {
        e.preventDefault();

        const data = { name: this.state.name };

        console.log(e.target.name.id);

        switch (e.target.name.id) {
            case "addSkill":
                this.props.addSkill(data);
                // console.log(e.target.name.id)
                break;
            case "addTeamLead":
                this.props.addTeamLead(data);
                // console.log(e.target.name.id)
                break;
            case "addDsatCode1":
                this.props.addDsatCode1(data);
                // console.log(e.target.name.id)
                break;
            case "addBbDriverCode2":
                this.props.addBbDriverCode2(data);
                // console.log(e.target.name.id)
                break;
            case "addBbDriverCode3":
                this.props.addBbDriverCode3(data);
                // console.log(e.target.name.id)
                break;
            case "addTeam":
                this.props.addTeam(data);
                // console.log(e.target.name.id)
                break;
            default:
                return console.log("not added");
        }

        this.toggle();
    };

    render() {
        return (
            <div>
                <Modal
                    scrollable={true}
                    className="modal-md modal-main"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <Form
                        className="modal-content"
                        onSubmit={this.handleSubmit}
                    >
                        <ModalHeader
                            toggle={this.toggle}
                            className="modal-header"
                            // this.props.label_name
                        >
                            {this.props.label_name}
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col className="mx-auto">
                                    <SingleInput
                                        type="text"
                                        size="md"
                                        attr="name"
                                        // this.props.data_name
                                        id={this.props.data_name}
                                        label_name="Name"
                                        value={this.state.name}
                                        controlFunc={this.handleChange}
                                        readOnly={false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <DataTable
                                        table={
                                            (this.props.data_name ===
                                                "addSkill" &&
                                                this.props.skills) ||
                                            (this.props.data_name ===
                                                "addTeamLead" &&
                                                this.props.teamleads) ||
                                            (this.props.data_name ===
                                                "addTeam" &&
                                                this.props.teams)
                                        }
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type="submit"
                                onSubmit={this.handleSubmit}
                                className="btn-submit"
                            >
                                Submit
                            </Button>{" "}
                            <Button
                                type="button"
                                className="btn-submit"
                                onClick={this.toggle}
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
    teamleads: state.surveys.teamleads,
    teams: state.surveys.teams,
    skills: state.surveys.skills
});

export default connect(mapStateToProps, {
    addTeam,
    addSkill,
    addTeamLead,
    addDsatCode1,
    addBbDriverCode2,
    addBbDriverCode3
})(SimpleDataInput);
