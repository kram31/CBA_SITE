import React, { Component, Fragment } from "react";
import CcmsModal from "./Modals/CcmsModal";

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

import { get_business_unit, update_ccms } from "../../../actions/ccmsActions";

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
            site_code,
            escalated_ticket,
            escalated_by,
            escalated_email_address,
            specific_business_unit,
            escalated_name,
            lan_id,
            ccms_owner,
            summary_complaint,
            rca_required,
            is_complaint,
            is_compliment
        } = props.ccms_entry || {};

        this.state = {
            escalated_ticket,
            escalated_by,
            escalated_email_address,
            business_unit,
            specific_business_unit,
            ticket_status,
            escalation_type,
            accountable_team,
            escalated_name,
            lan_id,
            site_code,
            ccms_owner,
            summary_complaint,
            rca_required,
            is_complaint,
            is_compliment,
            isOpen: false
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

    handleClick = event => {
        event.preventDefault();

        const { value } = event.target;

        // create trigger to open up ARE YOU SURE? modal

        if (value === "Compliment") {
            console.log("Trigger Compliment Request");
        } else if (value === "") console.log("Trigger Complaint Request");

        console.log(this.state);
    };

    // Look for a way to make below dynamically

    arrayElements = [
        "business_unit",
        "escalation_type",
        "accountable_team",
        "site_code",
        "ticket_status",
        "ccms_owner"
    ];

    typeaheadProps = col => ({
        bsSize: "sm",
        labelKey:
            col == "ccms_owner" ? option => `${option.user.email}` : "name",
        onChange: selected =>
            this.setState(
                { [col]: selected[0] },
                console.log({ [col]: selected[0] })
            ),
        id: "id_" + col,
        options: this.props[col],
        selected: this.state[col] ? [this.state[col]] : [],
        disabled: this.props.list_type ? true : false,
        placeholder: "Select...",
        ref: typeahead => (this.typeahead = typeahead),
        selectHintOnEnter: true,
        clearButton: true
    });

    inputProps = col => ({
        bsSize: "sm",
        type: col == "escalated_email_address" ? "email" : "text",
        name: col,
        id: "id_" + col,
        value: this.state[col],
        onChange: this.handleChange,
        disabled: this.props.list_type ? true : false
    });

    formContructor = key_list => {
        return key_list.map((item, i) => (
            <Row key={i} className="mb-2">
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
                                        {...this.typeaheadProps(col)}
                                        required
                                    />
                                </Col>
                            ) : (
                                <Col>
                                    <Label for={"id_" + col}>{x}: </Label>

                                    <Input
                                        {...this.inputProps(col)}
                                        required
                                    ></Input>
                                </Col>
                            )}
                        </Fragment>
                    );
                })}
            </Row>
        ));
    };

    // Converts 1 array to 3 or to any number of dimensional array

    convertToTwoDim = key_list => {
        let newArr = [];
        while (key_list.length) newArr.push(key_list.splice(0, 3));

        return newArr;
    };

    updateStateThenSend = (property, id) => {
        this.setState({ [property]: true }, () =>
            this.submitForm(this.state, id)
        );
    };

    callbackFunction = childData => {
        const { is_sending, value, ccms_entry_id } = childData;

        if (is_sending == "Yes" && value == "Complaint") {
            this.updateStateThenSend("is_complaint", ccms_entry_id);
        } else if (is_sending == "Yes" && value == "Compliment") {
            this.updateStateThenSend("is_compliment", ccms_entry_id);
        }

        // clear state ????
    };

    submitForm = (data, id) => {
        console.log(data);
        this.props.update_ccms(data, id);
    };

    modalButtonProps = [
        {
            buttonLabel: "Submit Compliment",
            value: "Compliment",
            color: "success",
            className: "mr-2",
            parentCallback: this.callbackFunction
        },
        {
            buttonLabel: "Submit Complaint",
            value: "Complaint",
            color: "danger",
            className: "mr-2",
            parentCallback: this.callbackFunction
        }
    ];

    validate;

    handleSubmit = event => {
        const form = event.currentTarget;
        console.log(this.state.ccms_owner);
        if (!this.state.ccms_owner) {
            event.preventDefault();
            event.stopPropagation();

            return false;
        }

        event.preventDefault();
        this.setState({ isOpen: !this.state.isOpen }, () =>
            console.log(this.state)
        );
    };

    toggleModalCallback = () => {
        this.setState({ isOpen: false });
    };

    render() {
        // props.ccms_entry CCMS DETAILS

        // excluding below array from formContructor

        let toRemove = [
            "summary_complaint",
            "rca_required",
            "is_complaint",
            "is_compliment",
            "isOpen",
            "validationState"
        ];

        return (
            <Fragment>
                <Form autoComplete="off" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        {this.formContructor(
                            this.convertToTwoDim(
                                Object.keys(this.state).filter(
                                    item => !toRemove.includes(item)
                                )
                            )
                        )}

                        <Label for="id_summary_complaint">Summary: </Label>
                        <Input
                            type="textarea"
                            rows="4"
                            name="summary_complaint"
                            id="id_summary_complaint"
                            value={this.state.summary_complaint}
                            onChange={this.handleChange}
                            required
                            disabled={this.props.list_type ? true : false}
                        />
                    </FormGroup>

                    <Row>
                        <Col>
                            <Button
                                type="submit"
                                name="is_compliment"
                                onClick={e =>
                                    this.setState({
                                        [e.target.name]: true
                                    })
                                }
                                color="success"
                                className="mr-2"
                            >
                                Compliment
                            </Button>
                            <Button
                                type="submit"
                                name="is_complaint"
                                onClick={e =>
                                    this.setState({
                                        [e.target.name]: true
                                    })
                                }
                                color="danger"
                                className="mr-2"
                            >
                                Complaint
                            </Button>

                            {/* {this.modalButtonProps.map((btn, index) => (
                                <CcmsModal
                                    key={index}
                                    ccms_entry_id={
                                        (this.props.ccms_entry || {}).id
                                    }
                                    {...btn}
                                    isOpen
                                />
                            ))} */}
                            <CcmsModal
                                isOpen={this.state.isOpen}
                                parentToggle={this.toggleModalCallback}
                                parentCallback={this.callbackFunction}
                                value={
                                    this.state.is_compliment
                                        ? "Compliment"
                                        : "Complaint"
                                }
                                ccms_entry_id={(this.props.ccms_entry || {}).id}
                            />
                        </Col>
                        <Col md={2}>
                            <Input
                                bsSize="md"
                                type="checkbox"
                                name="rca_required"
                                id="id_rca_required"
                                checked={this.state.rca_required}
                                onChange={this.handleChange}
                                disabled={this.props.list_type ? true : false}
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
    site_code: state.ccms.site_code,
    ccms_owner: state.ccms.ccms_owner
});

export default connect(mapStateToProps, { get_business_unit, update_ccms })(
    CcmsForm
);
