import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
    Form,
    Row,
    Col,
    FormGroup,
    Input,
    Label,
    Button,
    Card,
    CardTitle
} from "reactstrap";

import RcaFniModal from "./RcaFniModal";
import RcaFniList from "./RcaFniList";
import { complete_fni, get_fni_list } from "../../../../../actions/ccmsActions";

class RcaFindingsAndInvestigation extends Component {
    constructor(props) {
        super(props);
        // Need props >>> ccms_rca

        this.state = {
            fni: {
                agent_name: "",
                ticket_number: "",
                description: ""
            },
            modal: false
        };
    }

    handleChange = e => {
        const { name, value } = e.target;

        let fni = { ...this.state.fni };

        fni[name] = value;

        this.setState({
            fni
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        // Open confirmation modal
        this.toggle();
    };

    parentCallback = childData => {
        const { complete_fni, ccms_rca } = this.props;
        let fni = { ...this.state.fni };
        // console.log(childData);
        // console.log(fni);
        // console.log(ccms_rca.id);

        if (childData === "Yes") {
            // Save RCA
            complete_fni({ ccms_rca: ccms_rca.id, ...fni });
        }

        this.toggle();
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    // modal, toggle, parentCallback, ccms_rca

    render() {
        const labelLength = 3;
        const { fni, modal } = this.state;
        const { ccms_rca, fni_list } = this.props;
        return (
            <Fragment>
                <RcaFniModal
                    modal={modal}
                    toggle={this.toggle}
                    parentCallback={this.parentCallback}
                    ccms_rca={ccms_rca}
                />
                <Form onSubmit={this.handleSubmit} autoComplete="off">
                    <Card body className="mb-2">
                        <CardTitle>
                            <h5>Findings and Investigation</h5>
                        </CardTitle>
                        <FormGroup row size="sm">
                            <Label for="id_fni_ticket_number" md={labelLength}>
                                Ticket Number
                            </Label>

                            <Col>
                                <Input
                                    bsSize="sm"
                                    type="text"
                                    name="ticket_number"
                                    id="id_fni_ticket_number"
                                    onChange={this.handleChange}
                                    value={fni.ticket_number}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row size="sm">
                            <Label for="id_fni_agent_name" md={labelLength}>
                                Agent's Name
                            </Label>

                            <Col>
                                <Input
                                    bsSize="sm"
                                    type="text"
                                    name="agent_name"
                                    id="id_fni_agent_name"
                                    onChange={this.handleChange}
                                    value={fni.agent_name}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row size="sm">
                            <Label for="id_fni_description" md={labelLength}>
                                Description
                            </Label>

                            <Col>
                                <Input
                                    bsSize="sm"
                                    type="textarea"
                                    name="description"
                                    id="id_fni_description"
                                    onChange={this.handleChange}
                                    value={fni.description}
                                    rows={4}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <Row className="mb-2">
                            <Col>
                                <Button color="success">Submit</Button>
                            </Col>
                        </Row>
                    </Card>
                </Form>
                {!fni_list || !fni_list.length ? null : (
                    <Card body>
                        <CardTitle>
                            List of Findings and Investigation
                        </CardTitle>
                        <RcaFniList />
                    </Card>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    fni_list: state.ccms.fni
});

export default connect(mapStateToProps, { complete_fni, get_fni_list })(
    RcaFindingsAndInvestigation
);
