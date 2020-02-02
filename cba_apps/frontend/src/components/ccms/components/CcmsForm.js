import React, { Component, Fragment } from "react";
import {
    Form,
    Row,
    Col,
    Input,
    Label,
    FormGroup,
    Button,
    InputGroup,
    InputGroupAddon
} from "reactstrap";
import { connect } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";

import { get_business_unit } from "../../../actions/ccmsActions";

class CcmsForm extends Component {
    constructor(props) {
        super(props);

        // this.state = { ...props.ccms_entry };
        // "business_unit",
        // "ticket_status"
        // "escalation_type",
        // "accountable_team",
        // "site_code"

        const {
            ticket_status,
            business_unit,
            escalation_type,
            accountable_team,
            site_code
        } = props.ccms_entry || {};

        this.state = {
            escalated_ticket: "",
            escalated_by: "",
            escalated_email_address: "",
            business_unit,
            specific_business_unit: "",
            ticket_status,
            escalation_type,
            accountable_team,
            escalated_name: "",
            lan_id: "",
            site_code,
            ccms_owner_username: "",
            summary_complaint: "",
            rca_required: "",
            is_complaint: "",
            is_compliment: ""
        };
    }

    handleChange = event => {
        // this.setState({
        //     [e.target.name]: e.target.value
        // });

        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    // handleSubmit = event => {
    //     event.preventDefault();
    //     console.log(event.target.value);
    // };

    handleClick = event => {
        event.preventDefault();
        console.log(event.target.value);
        console.log(this.state);
    };

    // Look for a way to make below dynamically

    arrayElements = [
        "business_unit",
        "escalation_type",
        "accountable_team",
        "site_code",
        "ticket_status"
    ];

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

                    return (
                        <Fragment key={index}>
                            {this.arrayElements.includes(col) ? (
                                <Col>
                                    <Label for={"id_" + col}>{x}: </Label>

                                    <Typeahead
                                        bsSize="sm"
                                        labelKey="name"
                                        onChange={selected => {
                                            this.setState({
                                                [col]: selected[0]
                                            });
                                        }}
                                        id={"id_" + col}
                                        options={this.props[col]}
                                        selected={
                                            this.state[col]
                                                ? [this.state[col]]
                                                : []
                                        }
                                        disabled={
                                            this.props.list_type ? true : false
                                        }
                                        placeholder="Select..."
                                        // ref="ticket_status"
                                        ref={typeahead =>
                                            (this.typeahead = typeahead)
                                        }
                                        selectHintOnEnter={true}
                                        clearButton
                                    />
                                </Col>
                            ) : (
                                <Col>
                                    <Label for={"id_" + col}>{x}: </Label>

                                    <Input
                                        bsSize="sm"
                                        type="text"
                                        name={col}
                                        id={"id_" + col}
                                        value={this.state[col]}
                                        onChange={this.handleChange}
                                        disabled={
                                            this.props.list_type ? true : false
                                        }
                                    ></Input>
                                </Col>
                            )}
                        </Fragment>
                    );
                })}
            </FormGroup>
        ));
    };

    // Converts 1 array to 3 or to any number of dimensional array

    convertToTwoDim = key_list => {
        let newArr = [];
        while (key_list.length) newArr.push(key_list.splice(0, 3));

        return newArr;
    };

    render() {
        // props.ccms_entry CCMS DETAILS

        // excluding below array from formContructor
        let toRemove = [
            "summary_complaint",
            "rca_required",
            "is_complaint",
            "is_compliment"
        ];

        return (
            <Fragment>
                <Form autoComplete="off">
                    {this.formContructor(
                        this.convertToTwoDim(
                            Object.keys(this.state).filter(
                                item => !toRemove.includes(item)
                            )
                        )
                    )}
                    <FormGroup>
                        <Label for="id_summary_complaint">Summary: </Label>
                        <Input
                            type="textarea"
                            rows="4"
                            name="summary_complaint"
                            id="id_summary_complaint"
                            value={this.state.summary_complaint}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Row>
                        <Col md={10}>
                            <Button
                                color="success"
                                className="mr-2"
                                value="Compliment"
                                onClick={e => this.handleClick(e)}
                            >
                                Submit Compliment
                            </Button>
                            <Button
                                color="danger"
                                className="mr-2"
                                value="Complaint"
                                onClick={e => this.handleClick(e)}
                            >
                                Submit Complaint
                            </Button>
                        </Col>
                        <Col md={2}>
                            <Input
                                bsSize="md"
                                type="checkbox"
                                name="rca_required"
                                id="id_rca_required"
                                checked={this.state.rca_required}
                                onChange={this.handleChange}
                            />
                            <Label for="id_rca_required">RCA Required?</Label>
                        </Col>
                    </Row>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    business_unit: state.ccms.business_unit,
    ticket_status: state.ccms.ticket_status,
    escalation_type: state.ccms.escalation_type,
    accountable_team: state.ccms.accountable_team,
    site_code: state.ccms.site_code
});

export default connect(mapStateToProps, { get_business_unit })(CcmsForm);
