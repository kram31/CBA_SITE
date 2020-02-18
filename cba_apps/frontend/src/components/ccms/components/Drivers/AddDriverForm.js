import React, { Component } from "react";
import { connect } from "react-redux";
import { add_cause_code } from "../../../../actions/ccmsActions";

import { Form, Input, InputGroup, InputGroupAddon, Button } from "reactstrap";
import ConfirmModal from "./ConfirmModal";

class AddDriverForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const { tableName, add_cause_code } = this.props;

        if (tableName == "Cause Code") {
            add_cause_code(this.state);
            console.log(this.state);
        }
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <Form autoComplete="off" onSubmit={e => this.handleSubmit(e)}>
                <InputGroup size="sm">
                    <Input
                        type="text"
                        name="name"
                        onChange={e => this.handleChange(e)}
                    />
                    <InputGroupAddon addonType="append">
                        <ConfirmModal />
                        {/* <Button color="success">
                            <i className="fas fa-plus"></i>
                        </Button> */}
                    </InputGroupAddon>
                </InputGroup>
            </Form>
        );
    }
}

export default connect(null, { add_cause_code })(AddDriverForm);
