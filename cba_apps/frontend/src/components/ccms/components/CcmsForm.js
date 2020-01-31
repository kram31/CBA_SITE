import React, { Component, Fragment } from "react";
import { Form, Row, Col, Input, Label, FormGroup } from "reactstrap";

class CcmsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            escalated_ticket: "",
            escalated_by: "",
            escalated_email_address: "",
            business_unit: "",
            specific_business_unit: "",
            ticket_status: "",
            escalation_type: "",
            accountable_team: "",
            escalated_name: "",
            lan_id: "",
            site_code: "",
            ccms_owner_username: ""
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    arrayElements = "business_unit";

    formContructor = key_list => {
        return key_list.map((item, i) => (
            <FormGroup row key={i}>
                {item.map((col, index) => {
                    let x = col
                        .split("_")
                        .map(
                            item => item.charAt(0).toUpperCase() + item.slice(1)
                        )
                        .join(" ");

                    let wrap = {
                        type: "string",
                        name: col,
                        id: col,
                        placeholder: x,
                        value: this.state[col],
                        onChange: this.handleChange
                    };

                    return (
                        <Fragment key={index}>
                            <Col>
                                <Label for={col}>{x}: </Label>

                                <Input
                                    type={
                                        col === "business_unit"
                                            ? "select"
                                            : "text"
                                    }
                                    name={col}
                                    id={col}
                                    placeholder={x}
                                    value={this.state[col]}
                                    onChange={this.handleChange}
                                >
                                    {col === "business_unit" ? (
                                        <Fragment>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Fragment>
                                    ) : null}
                                </Input>
                            </Col>
                        </Fragment>
                    );
                })}
            </FormGroup>
        ));
    };

    // Converts 1 array to 2 dimensional array

    convertToTwoDim = key_list => {
        let newArr = [];
        while (key_list.length) newArr.push(key_list.splice(0, 2));

        return newArr;
    };

    render() {
        return (
            <Fragment>
                <h1>You Form</h1>
                <Form>
                    {this.formContructor(
                        this.convertToTwoDim(Object.keys(this.state))
                    )}
                </Form>
            </Fragment>
        );
    }
}

export default CcmsForm;
