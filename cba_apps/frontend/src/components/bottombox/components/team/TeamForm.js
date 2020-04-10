import React, { Component, Fragment } from "react";

import { Row, Col, FormGroup, Label, Input, Form } from "reactstrap";

import FormInput from "../rca/FormInput";

class TeamForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...props.cba_team };
    }
    render() {
        return <Fragment>{/* <FormInput /> */}</Fragment>;
    }
}

export default TeamForm;
