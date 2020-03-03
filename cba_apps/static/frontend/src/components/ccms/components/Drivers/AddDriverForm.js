import React, { Component } from "react";
import { connect } from "react-redux";
import {
    add_cause_code,
    edit_cause_code,
    addEscalationDriver,
    editEscalationDriver,
    addEscalationDriverCause,
    editEscalationDriverCause
} from "../../../../actions/ccmsActions";

import { Form, Input, InputGroup, InputGroupAddon, Button } from "reactstrap";
import ConfirmModal from "./ConfirmModal";

class AddDriverForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.task == "add" ? "" : props.driverDetails.name,
            isOpen: false
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        const { isOpen } = this.state;

        // Open Modal

        this.setState({ isOpen: !isOpen });
    };

    handleModalToggle = () => {
        this.setState({ isOpen: !this.state.isOpen, name: "" });
    };

    parentCallback = childData => {
        const {
            editEscalationDriverCause,
            addEscalationDriverCause,
            addEscalationDriver,
            editEscalationDriver,
            add_cause_code,
            edit_cause_code,
            tableName,
            task,
            cancelEdit,
            driverDetails,
            selectedCode
        } = this.props;

        const { name } = this.state;

        if (childData == "Yes") {
            // Send

            switch (tableName) {
                case "Cause Code":
                    if (task == "add") {
                        add_cause_code({ name });
                        break;
                    } else if (task == "edit") {
                        edit_cause_code(driverDetails, { name });
                        break;
                    }

                case "Escalation Driver":
                    if (task == "add") {
                        addEscalationDriver({
                            name,
                            cause_code: selectedCode.id
                        });
                        break;
                    } else if (task == "edit") {
                        editEscalationDriver(driverDetails, {
                            name,
                            cause_code: driverDetails.cause_code
                        });
                        break;
                    }
                case "Escalation Driver Cause":
                    if (task == "add") {
                        console.log(selectedCode);
                        addEscalationDriverCause({
                            name,
                            escalation_driver: selectedCode.id
                        });
                        break;
                    } else if (task == "edit") {
                        editEscalationDriverCause(driverDetails, {
                            name,
                            escalation_driver: driverDetails.escalation_driver
                        });
                        break;
                    }
                // else if (task == "edit") {
                //     edit_cause_code(driverDetails, { name });
                //     break;
                // }

                default:
                    break;
            }
            // if (task == "add" && tableName == "Cause Code") {
            //     // ADD CAUSE CODE
            // } else if (task == "edit") {
            //     // EDIT

            //     edit_cause_code(driverDetails, { name });
            // }
        }

        cancelEdit();

        this.setState({ name: "" });
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleKeyDown = e => {
        if (e.keyCode == 27) {
            this.props.cancelEdit();
        }
    };

    render() {
        const { isOpen, name } = this.state;
        const { tableName, task } = this.props;

        return (
            <Form autoComplete="off" onSubmit={e => this.handleSubmit(e)}>
                <Input
                    bsSize="sm"
                    className="w-200"
                    required
                    type="text"
                    name="name"
                    onKeyDown={e => this.handleKeyDown(e)}
                    onChange={e => this.handleChange(e)}
                    value={name}
                    placeholder="Input here..."
                />

                <ConfirmModal
                    open={isOpen}
                    toggle={this.handleModalToggle}
                    parentCallback={this.parentCallback}
                    tableName={tableName}
                    input={name}
                    task={task}
                />
            </Form>
        );
    }
}

export default connect(null, {
    add_cause_code,
    edit_cause_code,
    addEscalationDriver,
    editEscalationDriver,
    addEscalationDriverCause,
    editEscalationDriverCause
})(AddDriverForm);
