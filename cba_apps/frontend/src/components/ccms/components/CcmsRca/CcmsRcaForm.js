import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Form, Row, Col, FormGroup, Input, Label, Container } from "reactstrap";

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
            completed_by
        } = props.ccms_rca;

        this.state = {
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
            completed_by
        };
    }

    render() {
        const { ccms_rca, ccms } = this.props;
        return (
            <Fragment>
                <Form>
                    <Container fluid>
                        <FormGroup row>TICKET AND AGENT INFORMATION</FormGroup>

                        <FormGroup row>
                            <Label for="id_escalated_ticket">
                                Escalated Ticket
                            </Label>
                            <Col>
                                <Input
                                    type="text"
                                    name="escalated_ticket"
                                    id="id_escalated_ticket"
                                    disabled
                                    value={ccms.escalated_ticket}
                                />
                            </Col>
                        </FormGroup>
                    </Container>
                </Form>
            </Fragment>
        );
    }
}

export default CcmsRcaForm;
