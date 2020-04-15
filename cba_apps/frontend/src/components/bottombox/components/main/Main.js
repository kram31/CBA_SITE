import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import DriverView from "../drivers/DriverView";
import AgentView from "../agent/AgentView";
import SurveyView from "../survey/SurveyView";
import RequestAccess from "./RequestAccess";
import AccessRequest from "../access_request/AccessRequest";
import AdminRequest from "../admin_request/AdminRequest";
import AgentSkill from "../agent_skill/AgentSkill";
import TeamLeadView from "../team_lead/TeamLeadView";
import TeamView from "../team/TeamView";
import AccountableTeam from "../accountable_team/AccountableTeam";

import { Spinner, Collapse, Card, CardHeader, CardBody } from "reactstrap";

import {
    getAllData2,
    collapseComponent,
} from "../../../../actions/surveyActions";

class Main extends Component {
    constructor(props) {
        super(props);

        this.props.getAllData2();
    }

    handleClose = () => this.props.collapseComponent("");

    getListOfTeamLeads = (list) => list.map(({ user }) => user.username);

    getListOfCsatPerTeamLead = (csats, username) =>
        csats.filter((csat) =>
            csat.agent.teams
                .map((team) =>
                    team.team_leads.map((lead) => lead.user.username)
                )[0]
                .includes(username)
        );

    render() {
        const {
            surveys,
            csat_rcas,
            collapse_component,
            teamleads,
            auth,
            csat_admin,
        } = this.props;

        let componentList = [
            {
                title: "Agent View",
                component: AgentView,
                collapseValue: "AgentView",
            },
            {
                title: "Driver View",
                component: DriverView,
                collapseValue: "DriverView",
            },
            {
                title: "CSAT Request Access View",
                component: AccessRequest,
                collapseValue: "AccessRequest",
            },
            {
                title: "CSAT Administrator View",
                component: AdminRequest,
                collapseValue: "AdminRequest",
            },
            {
                title: "Agent Skill View",
                component: AgentSkill,
                collapseValue: "AgentSkill",
            },
            {
                title: "Team Leads View",
                component: TeamLeadView,
                collapseValue: "TeamLeadView",
            },
            {
                title: "Team View",
                component: TeamView,
                collapseValue: "TeamView",
            },
            {
                title: "Accountable Team View",
                component: AccountableTeam,
                collapseValue: "AccountableTeam",
            },
        ];

        return (
            <Fragment>
                {this.props.isFetching ? (
                    <Spinner
                        style={{
                            width: "3rem",
                            height: "3rem",
                            top: "50%",
                            left: "50%",
                            position: "fixed",
                        }}
                    />
                ) : (
                    <Fragment>
                        {this.getListOfTeamLeads(teamleads).includes(
                            auth.user.username
                        ) || this.checkAdmin(csat_admin, auth.user.username) ? (
                            <Fragment>
                                {csat_rcas ? (
                                    <Fragment>
                                        {componentList.map(
                                            (
                                                {
                                                    title,
                                                    component,
                                                    collapseValue,
                                                },
                                                i
                                            ) => (
                                                <CollapseComponent
                                                    isOpen={
                                                        collapse_component ===
                                                        collapseValue
                                                    }
                                                    title={title}
                                                    component={component}
                                                    close={this.handleClose}
                                                    className="mb-3"
                                                    key={i}
                                                />
                                            )
                                        )}

                                        <SurveyView
                                            data={
                                                this.getListOfTeamLeads(
                                                    teamleads
                                                ).includes(
                                                    auth.user.username
                                                ) &&
                                                !this.checkAdmin(
                                                    csat_admin,
                                                    auth.user.username
                                                )
                                                    ? this.getListOfCsatPerTeamLead(
                                                          csat_rcas,
                                                          auth.user.username
                                                      )
                                                    : csat_rcas
                                            }
                                        />
                                    </Fragment>
                                ) : (
                                    "No Survey found"
                                )}
                            </Fragment>
                        ) : (
                            <RequestAccess user={auth.user} />
                        )}
                    </Fragment>
                )}
            </Fragment>
        );
    }

    checkAdmin = (admin_list, username) =>
        admin_list.map(({ user }) => user.username).includes(username);
}

const CollapseComponent = ({ isOpen, title, component: Component, close }) => (
    <Collapse isOpen={isOpen}>
        <Card className="my-2">
            <CardHeader>
                <div style={{ float: "left" }}>{title}</div>
                <div
                    style={{
                        float: "right",
                        cursor: "pointer",
                    }}
                    onClick={close}
                >
                    <i className="fas fa-times"></i>
                </div>
            </CardHeader>
            <CardBody>
                <Component />
            </CardBody>
        </Card>
    </Collapse>
);

const mapStateToProps = (state) => ({
    surveys: state.surveys.surveys,
    csat_rcas: state.surveys.csat_rcas,
    isFetching: state.surveys.isFetching,
    auth: state.auth,
    collapse_component: state.surveys.collapse_component,
    teamleads: state.surveys.teamleads,
    csat_admin: state.surveys.csat_admin,
});

export default connect(mapStateToProps, {
    getAllData2,
    collapseComponent,
})(Main);
