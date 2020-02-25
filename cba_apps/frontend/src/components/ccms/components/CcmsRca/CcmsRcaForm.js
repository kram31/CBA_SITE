import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Typeahead } from "react-bootstrap-typeahead";
import {
    Form,
    Row,
    Col,
    FormGroup,
    Input,
    Label,
    Container,
    Button,
    Card,
    CardTitle
} from "reactstrap";

import { complete_ccms_rca } from "../../../../actions/ccmsActions";

import ConfirmRcaSubmitModal from "./ConfirmRcaSubmitModal";

class CcmsRcaForm extends Component {
    constructor(props) {
        super(props);

        const {
            agent_name,
            ticket_description,
            ccms_ticket_description,
            team_spg_accountability,
            business_unit,
            specific_bu,
            agent_silo,
            controllability,
            cause_code,
            escalation_driver,
            escalation_driver_cause,
            event_description,
            ticket_number
        } = props.ccms_rca;

        this.state = {
            ccms_rca_state: {
                agent_name: agent_name ? agent_name : "",
                ticket_description: ticket_description
                    ? ticket_description
                    : "",
                ccms_ticket_description: ccms_ticket_description
                    ? ccms_ticket_description
                    : "",
                team_spg_accountability: team_spg_accountability
                    ? team_spg_accountability
                    : "",
                business_unit: business_unit ? business_unit : "",
                specific_bu: specific_bu ? specific_bu : "",
                agent_silo,
                controllability,
                cause_code,
                escalation_driver,
                escalation_driver_cause,
                event_description: event_description ? event_description : "",
                ticket_number: ticket_number ? ticket_number : ""
            },
            modal: false
        };
    }

    handleChange = event => {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        let ccms_rca_state = { ...this.state.ccms_rca_state };

        ccms_rca_state[name] = value;

        this.setState(
            {
                ccms_rca_state
            },
            () => console.log(this.state.ccms_rca_state) // STATE CHECK ON EVERY CHANGE
        );
    };

    exemptions = ["escalation_driver", "escalation_driver_cause"];

    typeaheadProps = col => ({
        bsSize: "sm",
        labelKey: "name",
        onChange: selected => {
            let ccms_rca_state = { ...this.state.ccms_rca_state };

            ccms_rca_state[col] = selected[0];

            if (col === "cause_code" && !selected[0]) {
                ccms_rca_state.escalation_driver = null;
                ccms_rca_state.escalation_driver_cause = null;
            } else if (col === "escalation_driver" && !selected[0]) {
                ccms_rca_state.escalation_driver_cause = null;
            }
            return this.setState({ ccms_rca_state });
        },
        id: "id_rca_" + col,
        options: !this.exemptions.includes(col)
            ? this.props[col]
            : this.filteredDriverList(
                  this.props[col],
                  this.state.ccms_rca_state,
                  col
              ),
        selected: this.state.ccms_rca_state[col]
            ? this.exemptions.includes(col) &&
              !this.state.ccms_rca_state.cause_code
                ? []
                : [this.state.ccms_rca_state[col]]
            : [],
        placeholder: "Select...",
        selectHintOnEnter: true,
        clearButton: true,
        name: col
    });

    // this.exemptions.includes(col) && !cause_code ?  [] : this.state.ccms_rca_state[col]

    // this.filteredDriverList(this.props[col],this.state.ccms_rca_state, col)

    filteredDriverList = (driverName, selectedData, tableName) => {
        if (
            tableName == "escalation_driver" ||
            tableName === "escalation_driver_cause"
        ) {
            return driverName.filter(item => {
                if (selectedData.cause_code && selectedData.escalation_driver) {
                    return (
                        item.escalation_driver ==
                        selectedData.escalation_driver.id
                    );
                } else if (selectedData.cause_code) {
                    return item.cause_code == selectedData.cause_code.id;
                }
            });
        }

        return driverName;
    };

    handleSubmit = e => {
        e.preventDefault();

        this.setState({
            modal: true
        });
    };

    parentCallback = childData => {
        const { complete_ccms_rca, ccms_rca } = this.props;
        let ccms_rca_state = { ...this.state.ccms_rca_state };
        console.log(childData);

        if (childData === "Yes") {
            // Save RCA
            complete_ccms_rca({ ccms_rca, ccms_rca_state });
        }

        this.toggle();
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    render() {
        const { ccms_rca, ccms } = this.props;
        const {
            agent_name,
            agent_silo,
            escalated_ticket,
            ccms_rca_state,
            modal
        } = this.state;

        const labelLength = 3;

        // modal, toggle, parentCallback
        return (
            <Fragment>
                <ConfirmRcaSubmitModal
                    modal={modal}
                    toggle={this.toggle}
                    parentCallback={this.parentCallback}
                    ccms_rca={ccms_rca}
                />
                <Form
                    style={{ fontSize: "14px" }}
                    autoComplete="off"
                    onSubmit={this.handleSubmit}
                >
                    <Card body className="mb-2">
                        <CardTitle>TICKET AND AGENT INFORMATION</CardTitle>
                        <FormGroup row size="sm">
                            <Label
                                for="id_rca_escalated_ticket"
                                md={labelLength}
                            >
                                Escalated Ticket
                            </Label>

                            <Col>
                                <Input
                                    bsSize="sm"
                                    type="text"
                                    name="escalated_ticket"
                                    id="id_rca_escalated_ticket"
                                    disabled
                                    value={ccms.escalated_ticket}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="id_rca_agent_name" sm={labelLength}>
                                Agent's Name
                            </Label>

                            <Col>
                                <Input
                                    onChange={this.handleChange}
                                    bsSize="sm"
                                    type="text"
                                    name="agent_name"
                                    id="id_rca_agent_name"
                                    value={ccms_rca_state.agent_name}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="id_rca_agent_silo" sm={labelLength}>
                                Agent's Silo
                            </Label>

                            <Col>
                                <Typeahead
                                    {...this.typeaheadProps("agent_silo")}
                                    inputProps={{ required: true }}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="id_rca_ticket_description"
                                sm={labelLength}
                            >
                                Ticket's Description
                            </Label>

                            <Col>
                                <Input
                                    onChange={this.handleChange}
                                    bsSize="sm"
                                    type="text"
                                    name="ticket_description"
                                    id="id_rca_ticket_description"
                                    value={ccms_rca_state.ticket_description}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row size="sm">
                            <Label
                                for="id_rca_summary_complaint"
                                md={labelLength}
                            >
                                Captured Issue
                            </Label>

                            <Col>
                                <Input
                                    bsSize="sm"
                                    type="text"
                                    name="summary_complaint"
                                    id="id_rca_summary_complaint"
                                    disabled
                                    value={ccms.summary_complaint}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="id_rca_ccms_ticket_description"
                                sm={labelLength}
                            >
                                CCMS Ticket Description
                            </Label>

                            <Col>
                                <Input
                                    onChange={this.handleChange}
                                    bsSize="sm"
                                    type="text"
                                    name="ccms_ticket_description"
                                    id="id_rca_ccms_ticket_description"
                                    value={
                                        ccms_rca_state.ccms_ticket_description
                                    }
                                />
                            </Col>
                        </FormGroup>
                    </Card>

                    <Card body className="mb-2">
                        <CardTitle>RCA DETAILS</CardTitle>
                        <FormGroup row>
                            <Label
                                for="id_rca_controllability"
                                sm={labelLength}
                            >
                                Controllability
                            </Label>

                            <Col>
                                <Typeahead
                                    {...this.typeaheadProps("controllability")}
                                    inputProps={{ required: true }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="id_rca_cause_code" sm={labelLength}>
                                Cause Code
                            </Label>

                            <Col>
                                <Typeahead
                                    {...this.typeaheadProps("cause_code")}
                                    inputProps={{ required: true }}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="id_rca_escalation_driver"
                                sm={labelLength}
                            >
                                Escalation Driver
                            </Label>

                            <Col>
                                <Typeahead
                                    {...this.typeaheadProps(
                                        "escalation_driver"
                                    )}
                                    inputProps={{
                                        required: true
                                    }}
                                    disabled={!ccms_rca_state.cause_code}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="id_rca_escalation_driver_causer"
                                sm={labelLength}
                            >
                                Escalation Driver Cause
                            </Label>

                            <Col>
                                <Typeahead
                                    {...this.typeaheadProps(
                                        "escalation_driver_cause"
                                    )}
                                    inputProps={{
                                        required: true
                                    }}
                                    disabled={
                                        !ccms_rca_state.escalation_driver ||
                                        !ccms_rca_state.cause_code
                                    }
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="id_rca_team_spg_accountability"
                                sm={labelLength}
                            >
                                Team (SPG Accountability)
                            </Label>

                            <Col>
                                <Input
                                    onChange={this.handleChange}
                                    bsSize="sm"
                                    type="text"
                                    name="team_spg_accountability"
                                    id="id_rca_team_spg_accountability"
                                    value={
                                        ccms_rca_state.team_spg_accountability
                                    }
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="id_rca_business_unit" sm={labelLength}>
                                Business Unit
                            </Label>

                            <Col>
                                <Input
                                    onChange={this.handleChange}
                                    bsSize="sm"
                                    type="text"
                                    name="business_unit"
                                    id="id_rca_business_unit"
                                    value={ccms_rca_state.business_unit}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="id_rca_specific_bu" sm={labelLength}>
                                Specific BU
                            </Label>

                            <Col>
                                <Input
                                    onChange={this.handleChange}
                                    bsSize="sm"
                                    type="text"
                                    name="specific_bu"
                                    id="id_rca_specific_bu"
                                    value={ccms_rca_state.specific_bu}
                                />
                            </Col>
                        </FormGroup>
                    </Card>

                    <Card body className="mb-2">
                        <CardTitle>Summary</CardTitle>

                        <FormGroup row>
                            <Label for="id_rca_ticket_number" sm={labelLength}>
                                Ticket Number
                            </Label>

                            <Col>
                                <Input
                                    onChange={this.handleChange}
                                    bsSize="sm"
                                    type="input"
                                    name="ticket_number"
                                    id="id_rca_ticket_number"
                                    value={ccms_rca_state.ticket_number}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="id_rca_event_description"
                                sm={labelLength}
                            >
                                Event Description
                            </Label>
                            <Col>
                                <Input
                                    onChange={this.handleChange}
                                    bsSize="sm"
                                    type="textarea"
                                    name="event_description"
                                    id="id_rca_event_description"
                                    value={ccms_rca_state.event_description}
                                    rows={4}
                                />
                            </Col>
                        </FormGroup>
                    </Card>

                    {ccms_rca.completed_on ? (
                        <Button>Update</Button>
                    ) : (
                        <Button>Submit</Button>
                    )}
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    agent_silo: state.ccms.silo,
    controllability: state.ccms.accountable_team,
    cause_code: state.ccms.cause_code,
    escalation_driver: state.ccms.escalation_driver,
    escalation_driver_cause: state.ccms.escalation_driver_cause
});

export default connect(mapStateToProps, { complete_ccms_rca })(CcmsRcaForm);
