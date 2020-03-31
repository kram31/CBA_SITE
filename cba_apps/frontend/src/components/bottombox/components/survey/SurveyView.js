import React, { Component, Fragment } from "react";

import SurveyTable from "../surveyTable/SurveyTable";

import { ButtonGroup, Button, Card, CardTitle } from "reactstrap";

import UploadData from "../upload/UploadData";
import CsatModal from "../modal/CsatModal";
import RcaView from "../rca/RcaView";

class SurveyView extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleRcaButton = cellprops => {
        console.log("working", cellprops.original);
    };

    render() {
        const { data } = this.props;
        const columns = [
            {
                Header: "Actions",
                id: "action_btn",

                Cell: cellprops => (
                    <ButtonGroup>
                        <CsatModal
                            component={RcaView}
                            buttonLabel="RCA"
                            className="modal-xl"
                            buttonColor="primary"
                            cellData={cellprops.original}
                        />
                    </ButtonGroup>
                )
            },
            {
                Header: "Reference Number",
                id: "reference_number",
                accessor: ({ surveyed_ticket }) =>
                    surveyed_ticket.reference_number
            },
            {
                Header: "Escalator Name",
                id: "escalator_name",
                accessor: ({ surveyed_ticket }) =>
                    `${surveyed_ticket.first_name} ${surveyed_ticket.last_name}`
            },
            {
                Header: "Escalator Email Address",
                id: "customer_email_address",
                accessor: ({ surveyed_ticket }) =>
                    surveyed_ticket.customer_email_address
            },
            {
                Header: "Date Escalated",
                id: "date_time",
                accessor: ({ surveyed_ticket }) => surveyed_ticket.date_time
            },
            {
                Header: "Owner Name",
                id: "owner_name",
                accessor: ({ agent }) =>
                    agent.user.username === "ITSD_AskIT_Ticket_Triage"
                        ? "ITSD_AskIT_Ticket_Triage"
                        : `${agent.user.first_name} ${agent.user.last_name}`
            },
            {
                Header: "Bottombox",
                id: "bottombox",
                accessor: ({ surveyed_ticket }) => surveyed_ticket.bottombox
                // surveyed_ticket.bottombox === 1 ? (
                //     <span style={{ color: "red" }} defaultValue={1}>
                //         <i
                //             value={surveyed_ticket.bottombox}
                //             className="fas fa-thumbs-down fa-lg"
                //         ></i>
                //     </span>
                // ) : (
                //     <span style={{ color: "green" }} defaultValue={0}>
                //         <i
                //             value={surveyed_ticket.bottombox}
                //             className="fas fa-thumbs-up fa-lg"
                //         ></i>
                //     </span>
                // )
            }
        ];
        return (
            <Fragment>
                <Card className="my-2" body style={{ borderColor: "white" }}>
                    <CardTitle>CSAT Table</CardTitle>
                    <ButtonGroup size="sm" className="col-2 mb-3">
                        <CsatModal
                            component={UploadData}
                            buttonLabel="Upload Data"
                            className="modal-xl"
                            buttonColor="success"
                        />
                        <Button className="ml-1" color="success">
                            Agent List
                        </Button>
                    </ButtonGroup>
                    {data.length ? (
                        <SurveyTable data={data} columns={columns} />
                    ) : null}
                </Card>
            </Fragment>
        );
    }
}

export default SurveyView;
