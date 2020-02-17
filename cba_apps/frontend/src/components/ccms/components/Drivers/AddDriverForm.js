import React, { Component } from "react";
import { connect } from "react-redux";
import { add_cause_code } from "../../../../actions/ccmsActions";

import { Form, Input } from "reactstrap";

class AddDriverForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ""
        };
    }

    handleChange = e => {
        console.log(e.target.value);
    };

    render() {
        return (
            <Form autoComplete="off">
                <Input
                    type="text"
                    name="input"
                    onChange={e => this.handleChange(e)}
                />
            </Form>
        );
    }
}

export default AddDriverForm;
