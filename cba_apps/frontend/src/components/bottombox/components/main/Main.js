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
import Dashboard from "../dashboard/Dashboard";

import { Spinner, Collapse, Card, CardHeader, CardBody } from "reactstrap";

import {
    getAllData2,
    collapseComponent,
    getAllDataTeamLead,
    getCbaTeams,
    getCsatAdmin,
    getTeamLeads,
    isFetching,
    toggleFetch,
} from "../../../../actions/surveyActions";

class Main extends Component {
    constructor(props) {
        super(props);

        this.getInitialData();

        this.state = {
            isAdmin: false,
            isTeamLead: false,
        };
    }

    async getInitialData() {
        const {
            getCbaTeams,
            getCsatAdmin,
            auth,
            getAllData2,
            getAllDataTeamLead,
            getTeamLeads,
            isFetching,
            toggleFetch,
        } = this.props;

        try {
            await toggleFetch();
            let cbaTeams = await getCbaTeams();
            let myTeams =
                cbaTeams &&
                cbaTeams
                    .filter(({ team_leads }) =>
                        team_leads
                            .map(({ user }) => user.username)
                            .includes(auth.user.username)
                    )
                    .map(({ agent_skill }) => agent_skill.name)
                    .join(", ");
            console.log("FIRST REQ", myTeams);
            let cbaAdmins = await getCsatAdmin();
            // console.log("SECOND REQ", cbaAdmins);
            let cbaTeamLeads = await getTeamLeads();
            // console.log("THIRD REQ", cbaTeamLeads);
            console.log(this.checkAdmin(cbaAdmins, auth.user.username));
            this.checkAdmin(cbaAdmins, auth.user.username)
                ? await getAllData2()
                : myTeams && (await getAllDataTeamLead(myTeams));

            this.setState({
                isAdmin: this.checkAdmin(cbaAdmins, auth.user.username),
                isTeamLead: this.getListOfTeamLeads(cbaTeamLeads).includes(
                    auth.user.username
                ),
            });
            await toggleFetch();
        } catch (err) {
            console.log(err);
        }
    }

    handleClose = () => this.props.collapseComponent("");

    getListOfTeamLeads = (list) => list.map(({ user }) => user.username);

    render() {
        const { csat_rcas, collapse_component, auth, csat_admin } = this.props;

        const { isAdmin, isTeamLead } = this.state;

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
                {this.props.fetch ? (
                    <Spinner
                        style={{
                            width: "3rem",
                            height: "3rem",
                            top: "50%",
                            left: "50%",
                            position: "fixed",
                            color: "white",
                        }}
                    />
                ) : (
                    <Fragment>
                        {isAdmin || isTeamLead ? (
                            <Fragment>
                                {csat_rcas ? (
                                    <Fragment>
                                        {isAdmin &&
                                            componentList.map(
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
                                        {/* <Dashboard /> */}
                                        <SurveyView data={csat_rcas} />
                                    </Fragment>
                                ) : (
                                    <div
                                        className="text-center"
                                        style={{
                                            color: "white",
                                        }}
                                    >
                                        <h4>No RCA/ Survey found</h4>
                                        <div style={{ fontSize: "14px" }}>
                                            <div>
                                                Please reach out to the
                                                application adminstrator(s).
                                            </div>
                                            {csat_admin.length &&
                                                csat_admin
                                                    .filter(
                                                        ({ user }) =>
                                                            user.username !=
                                                            "mark.lascano@dxc.com"
                                                    )
                                                    .map(({ user }, i) => (
                                                        <div key={i}>
                                                            {user.username}
                                                        </div>
                                                    ))}
                                        </div>
                                    </div>
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
    csat_rcas: state.surveys.csat_rcas,
    fetch: state.surveys.isFetching,
    auth: state.auth,
    collapse_component: state.surveys.collapse_component,
    teamleads: state.surveys.teamleads,
    csat_admin: state.surveys.csat_admin,
    cba_teams: state.surveys.cba_teams,
});

export default connect(mapStateToProps, {
    getAllData2,
    collapseComponent,
    getAllDataTeamLead,
    getCbaTeams,
    getCsatAdmin,
    getTeamLeads,
    isFetching,
    toggleFetch,
})(Main);
