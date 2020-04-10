import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import SurveyTable from "../surveyTable/SurveyTable";

import { ButtonGroup, Button, Card, CardTitle, Badge } from "reactstrap";

import UploadData from "../upload/UploadData";
import CsatModal from "../modal/CsatModal";
import RcaView from "../rca/RcaView";
import GeneralDropDown from "../reusable/GeneralDropDown";

import { collapseComponent } from "../../../../actions/surveyActions";

class SurveyView extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleRcaButton = (cellprops) => {
        console.log("working", cellprops.original);
    };

    render() {
        const dataList = [
            {
                name: "Agent List",
                component: "AgentView",
            },
            {
                name: "CSAT Administrators",
                component: "AdminRequest",
            },
            {
                name: "Agent Skills",
                component: "AgentSkill",
            },
        ];

        const { data, csat_admin, auth, csat_access_request } = this.props;
        const columns = [
            {
                Header: "Actions",
                id: "action_btn",

                Cell: (cellprops) => (
                    <ButtonGroup>
                        <CsatModal
                            component={RcaView}
                            buttonLabel="RCA"
                            className="modal-xl"
                            buttonColor="primary"
                            cellData={cellprops.original}
                        />
                    </ButtonGroup>
                ),
            },
            {
                Header: "Reference Number",
                id: "reference_number",
                accessor: ({ surveyed_ticket }) =>
                    surveyed_ticket.reference_number,
            },
            {
                Header: "Escalator Name",
                id: "escalator_name",
                accessor: ({ surveyed_ticket }) =>
                    `${surveyed_ticket.first_name} ${surveyed_ticket.last_name}`,
            },
            {
                Header: "Escalator Email Address",
                id: "customer_email_address",
                accessor: ({ surveyed_ticket }) =>
                    surveyed_ticket.customer_email_address,
            },
            {
                Header: "Date Escalated",
                id: "date_time",
                accessor: ({ surveyed_ticket }) => surveyed_ticket.date_time,
            },
            {
                Header: "Owner Name",
                id: "owner_name",
                accessor: ({ agent }) =>
                    agent.user.username === "ITSD_AskIT_Ticket_Triage"
                        ? "ITSD_AskIT_Ticket_Triage"
                        : `${agent.user.first_name} ${agent.user.last_name}`,
            },
            {
                Header: "Bottombox",
                id: "bottombox",
                accessor: ({ surveyed_ticket }) => surveyed_ticket.bottombox,
            },
        ];
        return (
            <Fragment>
                <Card className="my-2" body style={{ borderColor: "white" }}>
                    <CardTitle>CSAT Table</CardTitle>
                    {this.checkAdmin(csat_admin, auth.user.username) ? (
                        <ButtonGroup size="sm" className="col-5 mb-3">
                            <CsatModal
                                component={UploadData}
                                buttonLabel="Upload Data"
                                className="modal-xl"
                                buttonColor="success"
                            />
                            <Button
                                className="ml-1"
                                color="success"
                                onClick={() =>
                                    this.props.collapseComponent("DriverView")
                                }
                            >
                                Drivers
                            </Button>

                            {csat_access_request.length ? (
                                <Button
                                    className="ml-1"
                                    color="success"
                                    onClick={() =>
                                        this.props.collapseComponent(
                                            "AccessRequest"
                                        )
                                    }
                                >
                                    CSAT Access Request (Team Lead)
                                    <Badge color="danger" className="ml-2">
                                        {csat_access_request.length}
                                    </Badge>
                                </Button>
                            ) : null}
                            <GeneralDropDown dataList={dataList} />
                        </ButtonGroup>
                    ) : null}
                    {data.length ? (
                        <SurveyTable data={data} columns={columns} />
                    ) : null}
                </Card>
            </Fragment>
        );
    }
    checkAdmin = (admin_list, username) =>
        admin_list.map(({ user }) => user.username).includes(username);
}

const mapStateToProps = (state) => ({
    csat_admin: state.surveys.csat_admin,
    auth: state.auth,
    csat_access_request: state.surveys.csat_access_request,
});

export default connect(mapStateToProps, { collapseComponent })(SurveyView);
