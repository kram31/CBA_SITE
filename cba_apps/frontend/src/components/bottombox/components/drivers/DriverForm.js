import React, { Component } from "react";

import { connect } from "react-redux";

import { Form, Input, Label, FormGroup } from "reactstrap";

import ConfirmModal from "../../../ccms/components/Drivers/ConfirmModal";

import {
    addDsatCode1,
    addBbDriverCode2,
    addBbDriverCode3,
    updateDsatCode1,
    updateBbDriverCode2,
    updateBbDriverCode3
} from "../../../../actions/surveyActions";

class DriverForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.task == "add" ? "" : props.driverDetails.name,
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
            updateBbDriverCode3,
            updateBbDriverCode2,
            updateDsatCode1,
            addBbDriverCode3,
            addBbDriverCode2,
            addDsatCode1,
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
                        console.log("DSAT Code 1 EDIT", driverDetails, {
                            name
                        });
                        updateDsatCode1(driverDetails, { name });
                        break;
                    }

                case "Driver Code 2":
                    if (task == "add") {
                        addBbDriverCode2({
                            name,
                            dsat_Code1: selectedCode.id
                        });
                        break;
                    } else if (task == "edit") {
                        updateBbDriverCode2(driverDetails, {
                            name,
                            dsat_Code1: driverDetails.dsat_Code1
                        });
                        break;
                    }
                case "Driver Code 3":
                    if (task == "add") {
                        addBbDriverCode3({
                            name,
                            bb_Driver_Code2: selectedCode.id
                        });
                        break;
                    } else if (task == "edit") {
                        updateBbDriverCode3(driverDetails, {
                            name,
                            bb_Driver_Code2: driverDetails.bb_Driver_Code2
                        });
                        break;
                    }
                // else if (task == "edit") {
                //     updateDsatCode1(driverDetails, { name });
                //     break;
                // }

                default:
                    break;
            }
            // if (task == "add" && tableName == "Cause Code") {
            //     // ADD CAUSE CODE
            // } else if (task == "edit") {
            //     // EDIT

            //     updateDsatCode1(driverDetails, { name });
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
                </FormGroup>
            </Form>
        );
    }
}

export default connect(null, {
    addDsatCode1,
    addBbDriverCode2,
    addBbDriverCode3,
    updateDsatCode1,
    updateBbDriverCode2,
    updateBbDriverCode3
})(DriverForm);
