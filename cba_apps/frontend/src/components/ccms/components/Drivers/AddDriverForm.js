import React, { Component } from "react";
import { connect } from "react-redux";
import {
    add_cause_code,
    edit_cause_code
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
            add_cause_code,
            edit_cause_code,
            tableName,
            task,
            cancelEdit,
            driverDetails
        } = this.props;
        const { name } = this.state;

        if (childData == "Yes") {
            console.log(`from AddDriverForm - ${childData}`);
            // Send
            if (task == "add") {
                // ADD
                if (tableName == "Cause Code") {
                    add_cause_code({ name });
                }
            } else if (task == "edit") {
                // EDIT

                edit_cause_code(driverDetails, { name });
            }
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
                    style={{
                        backgroundColor: "rgb(52,58,64)",
                        color: "white"
                    }}
                    bsSize="sm"
                    className="w-200"
                    required
                    type="text"
                    name="name"
                    onKeyDown={e => this.handleKeyDown(e)}
                    onChange={e => this.handleChange(e)}
                    value={name}
                    placeholder="Enter name..."
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

export default connect(null, { add_cause_code, edit_cause_code })(
    AddDriverForm
);
