import React, { Component } from "react";

import { connect } from "react-redux";

import { Form, Input, Label, FormGroup } from "reactstrap";

import ConfirmModal from "../../../ccms/components/Drivers/ConfirmModal";

import { addDsatCode1 } from "../../../../actions/surveyActions";

class DriverForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            isOpen: false
        };
    }

    table = {
        dsat_code1: {
            endpoint: "/api/dsat_code1"
        }
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
            addDsatCode1,
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
                case "DSAT Code 1":
                    if (task == "add") {
                        addDsatCode1({ name });

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

    handleSubmit = e => {
        e.preventDefault();

        const { isOpen } = this.state;

        // Open Modal

        this.setState({ isOpen: !isOpen });
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState(
            {
                [name]: value
            },
            () => console.log(this.state)
        );
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
                <FormGroup>
                    <Label for={`id_name`}>Name</Label>

                    <Input
                        bsSize="sm"
                        type="text"
                        name="name"
                        required
                        id={`id_name`}
                        value={name}
                        onKeyDown={e => this.handleKeyDown(e)}
                        onChange={e => this.handleChange(e)}
                    ></Input>

                    <ConfirmModal
                        open={isOpen}
                        toggle={this.handleModalToggle}
                        parentCallback={this.parentCallback}
                        tableName={tableName}
                        input={name}
                        task={task}
                    />
                </FormGroup>
            </Form>
        );
    }
}

export default connect(null, { addDsatCode1 })(DriverForm);
