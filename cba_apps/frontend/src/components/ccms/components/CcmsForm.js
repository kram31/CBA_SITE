import React, { Component, Fragment } from "react";

import CcmsModal from "./Modals/CcmsModal";
import CommentForm from "./Comment/CommentForm";

import {
    Form,
    Row,
    Col,
    Input,
    Label,
    FormGroup,
    Button,
    Spinner
} from "reactstrap";
import { connect } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";

import {
    get_business_unit,
    update_ccms,
    getComments,
    get_ccms_rca
} from "../../../actions/ccmsActions";

class CcmsForm extends Component {
    constructor(props) {
        super(props);

        // props.getComments(props.ccms_entry.id);

        // this.state = { ...props.ccms_entry, isOpen: false };

        const {
            ticket_status,
            ticket_type,
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
            silo,
            ccms_owner,
            summary_complaint,
            rca_required,
            is_complaint
        } = props.ccms_entry || {};

        this.state = {
            escalated_ticket,
            ticket_type,
            escalated_by,
            escalated_email_address,
            business_unit,
            specific_business_unit,
            ticket_status,
            escalation_type,
            accountable_team,
            escalated_name,
            lan_id,
            silo,
            site_code,
            ccms_owner,
            summary_complaint,
            rca_required,
            is_complaint,

            isOpen: false,
            updateButton: true
        };
    }

    handleChange = event => {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    // NOT BEING USED YET
    // WILL USE IT FOR RCA FORM

    handleClick = event => {
        event.preventDefault();

        const { value } = event.target;

        // create trigger to open up ARE YOU SURE? modal

        if (value === "Compliment") {
            console.log("Trigger Compliment Request");
        } else if (value === "") console.log("Trigger Complaint Request");
    };

    // Look for a way to make below dynamically

    arrayElements = [
        "business_unit",
        "escalation_type",
        "accountable_team",
        "site_code",
        "ticket_status",
        "ccms_owner",
        "ticket_type",
        "silo"
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
        selectHintOnEnter: true,
        clearButton: true,
        name: col
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
                                        inputProps={{ required: true }}
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

    updateStateThenSend = (id, value) => {
        if (value == "Complaint") {
            this.setState(
                {
                    is_complaint: true,
                    ccms_status: {
                        id: 1,
                        name: "Open - Assigned"
                    }
                },
                () => this.submitForm(this.state, id)
            );
        } else if (value == "Compliment") {
            this.setState(
                {
                    is_complaint: false,
                    ccms_status: {
                        id: 10,
                        name: "Closed"
                    }
                },
                () => this.submitForm(this.state, id)
            );
        }
    };

    callbackFunction = childData => {
        const { is_sending, value, ccms_entry_id } = childData;

        if (is_sending == "No") {
            return this.setState({
                isOpen: false
            });
        }

        if (is_sending == "Yes") {
            this.updateStateThenSend(ccms_entry_id, value);
        }
    };

    submitForm = (data, id) => {
        this.props.update_ccms(data, id);
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isOpen: !this.state.isOpen }, () =>
            console.log(this.state)
        );
    };

    toggleModalCallback = () => {
        this.setState({ isOpen: false });
    };

    render() {
        // excluding below array from formContructor

        let toRemove = [
            "summary_complaint",
            "rca_required",
            "is_complaint",
            "isOpen",
            "id",
            "mail",
            "ccms_status",
            "mail_age",
            "acknowledged_by",
            "is_acknowledged",
            "is_resolved",
            "date_acknowledged",
            "updateButton"
        ];

        return (
            <Fragment>
                <Row className="mb-2">
                    <Col>
                        <Form autoComplete="off" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                {this.formContructor(
                                    this.convertToTwoDim(
                                        Object.keys(this.state).filter(
                                            item => !toRemove.includes(item)
                                        )
                                    )
                                )}

                                <Label for="id_summary_complaint">
                                    Summary:{" "}
                                </Label>
                                <Input
                                    type="textarea"
                                    rows="4"
                                    name="summary_complaint"
                                    id="id_summary_complaint"
                                    value={this.state.summary_complaint}
                                    onChange={this.handleChange}
                                    required
                                    disabled={
                                        this.props.list_type ? true : false
                                    }
                                />
                            </FormGroup>

                            <Row>
                                {!this.props.list_type ? (
                                    <Col>
                                        <CcmsModal
                                            isOpen={this.state.isOpen}
                                            parentToggle={
                                                this.toggleModalCallback
                                            }
                                            parentCallback={
                                                this.callbackFunction
                                            }
                                            value={
                                                this.state.is_compliment
                                                    ? "Compliment"
                                                    : "Complaint"
                                            }
                                            ccms_entry_id={
                                                (this.props.ccms_entry || {}).id
                                            }
                                        />
                                        {this.props.ccms_entry.ccms_status &&
                                        this.state.updateButton ? (
                                            <Button
                                                name="is_complaint"
                                                onClick={e =>
                                                    this.setState({
                                                        updateButton: false
                                                    })
                                                }
                                                color="success"
                                                className="mr-2"
                                            >
                                                Update
                                            </Button>
                                        ) : (
                                            <Fragment>
                                                <Button
                                                    type="submit"
                                                    name="is_compliment"
                                                    onClick={e =>
                                                        this.setState({
                                                            is_complaint: false
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
                                                            [e.target
                                                                .name]: true
                                                        })
                                                    }
                                                    color="danger"
                                                    className="mr-2"
                                                >
                                                    Complaint
                                                </Button>
                                                {this.props.ccms_entry
                                                    .ccms_status ? (
                                                    <Button
                                                        name="is_complaint"
                                                        onClick={e =>
                                                            this.setState({
                                                                updateButton: true
                                                            })
                                                        }
                                                        color="warning"
                                                        className="mr-2"
                                                    >
                                                        Cancel Update
                                                    </Button>
                                                ) : null}
                                            </Fragment>
                                        )}
                                    </Col>
                                ) : null}
                                <Col md={3}>
                                    {this.props.list_type &&
                                    this.state.rca_required ? (
                                        <Button
                                            onClick={() =>
                                                console.log("Open RCA")
                                            }
                                        >
                                            RCA
                                        </Button>
                                    ) : this.props.list_type &&
                                      !this.state.rca_required ? null : (
                                        <Fragment>
                                            <Input
                                                bsSize="md"
                                                type="checkbox"
                                                name="rca_required"
                                                id="id_rca_required"
                                                checked={
                                                    this.state.rca_required
                                                }
                                                onChange={this.handleChange}
                                                disabled={
                                                    this.props.list_type
                                                        ? true
                                                        : false
                                                }
                                            />
                                            <Label for="id_rca_required">
                                                RCA Required?
                                            </Label>
                                        </Fragment>
                                    )}
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>

                {this.props.ccms_entry.ccms_status &&
                this.props.ccms_entry.ccms_owner ? (
                    this.props.is_fetching_comments ? (
                        <Spinner />
                    ) : (
                        <CommentForm ccms_entry={this.props.ccms_entry} />
                    )
                ) : null}
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
    ccms_owner: state.ccms.ccms_owner,
    comments: state.ccms.comments,
    silo: state.ccms.silo,
    ticket_type: state.ccms.ticket_type,
    is_fetching_comments: state.ccms.is_fetching_comments
});

export default connect(mapStateToProps, {
    get_business_unit,
    update_ccms,
    getComments,
    get_ccms_rca
})(CcmsForm);
