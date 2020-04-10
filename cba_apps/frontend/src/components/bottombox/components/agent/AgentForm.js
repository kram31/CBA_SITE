import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
    Form,
    Row,
    Col,
    Input,
    Label,
    FormGroup,
    Button,
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody,
    Popover,
} from "reactstrap";

import FormInput from "../rca/FormInput";
import TeamView from "../team/TeamView";
import TeamLeadDataForm from "../team/TeamLeadDataForm";

class AgentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.agent,
            isOpen: false,
        };
    }
    handleChange = (e) => {
        const { value, name } = e.target;

        this.setState({ [name]: value });
    };

    componentDidUpdate = (prevProps) => {
        prevProps.agent.operator_lan_id !== this.props.agent.operator_lan_id &&
            this.setState({
                ...this.props.agent,
            });
    };

    callbackTeamLead = (data) => {
        const agent = this.state;
        console.log(
            "AGENT FORM",
            "New Team",
            data.team,
            "TEAM ID",
            data.team_id
        );

        console.log("AgentForm", {
            ...agent,
            teams: agent.teams.map((t) =>
                t.id === data.team_id ? { ...data.team } : t
            ),
        });
        this.setState({
            ...agent,
            teams: agent.teams.map((t) =>
                t.id === data.team_id ? { ...data.team } : t
            ),
        });
    };

    render() {
        return (
            <Fragment>
                <Form style={{ color: "white" }}>
                    {(this.state || {}).user ? (
                        <Row>
                            <Col>
                                {Object.keys(this.state).map((key, index) => {
                                    if (
                                        [
                                            "operator_lan_id",
                                            "location",
                                            "wave",
                                        ].includes(key)
                                    ) {
                                        return (
                                            <FormInput
                                                key={index}
                                                type="text"
                                                objKey={key}
                                                index={index}
                                                inputValue={this.state[key]}
                                                disabled={true}
                                                onChange={this.handleChange}
                                            />
                                        );
                                    }
                                })}
                            </Col>
                            <Col>
                                {Object.keys(this.state.user).map(
                                    (key, index) => {
                                        if (
                                            [
                                                "username",
                                                "first_name",
                                                "last_name",
                                            ].includes(key)
                                        ) {
                                            return (
                                                <FormInput
                                                    key={index}
                                                    type="text"
                                                    objKey={key}
                                                    index={index}
                                                    inputValue={
                                                        this.state.user[key]
                                                    }
                                                    disabled={true}
                                                    onChange={this.handleChange}
                                                />
                                            );
                                        }
                                    }
                                )}
                            </Col>
                            <Col>
                                <Label for="id_team">Agent's Team(s)</Label>
                                {this.state.teams.length ? (
                                    this.state.teams.map((team, i) => (
                                        <fieldset
                                            style={{
                                                border: "1px solid white",
                                                fontSize: "14px",
                                            }}
                                            key={i}
                                        >
                                            <legend
                                                style={{
                                                    fontSize: "16px",
                                                    width: "auto",
                                                    marginLeft: "10px",
                                                    padding: "0px 5px 0px",
                                                }}
                                            >
                                                {team.agent_skill.name}
                                            </legend>
                                            <div
                                                style={{
                                                    marginLeft: "10px",
                                                    marginBottom: "20px",
                                                }}
                                            >
                                                <div>
                                                    <div
                                                        style={{
                                                            float: "left",
                                                            width: "50%",
                                                        }}
                                                    >
                                                        Team Lead(s):{" "}
                                                    </div>

                                                    <div
                                                        style={{
                                                            float: "right",
                                                            width: "50%",
                                                            textAlign: "right",
                                                            paddingRight:
                                                                "10px",
                                                        }}
                                                    >
                                                        <a
                                                            style={{
                                                                cursor:
                                                                    "pointer",
                                                            }}
                                                            type="button"
                                                            id="PopoverLegacy"
                                                        >
                                                            <i className="far fa-edit"></i>
                                                        </a>
                                                        <TeamLeadPopover
                                                            team={team}
                                                            callbackTeamLead={
                                                                this
                                                                    .callbackTeamLead
                                                            }
                                                            agent={this.state}
                                                            isOpen={
                                                                this.state
                                                                    .isOpen
                                                            }
                                                            toggle={this.toggle}
                                                        />
                                                    </div>
                                                </div>
                                                {team.team_leads.length ? (
                                                    // this.getTeamLeadDetails(
                                                    //     team.team.team_leads
                                                    // )
                                                    team.team_leads.map(
                                                        ({ user }, i) => (
                                                            <div
                                                                key={i}
                                                            >{`${user.first_name} ${user.last_name}`}</div>
                                                        )
                                                    )
                                                ) : (
                                                    // team.team.team_leads.map(
                                                    //     ({ user }, i) => (
                                                    //         <div key={i}>
                                                    //             {`${user.first_name} ${user.last_name}`}
                                                    //         </div>
                                                    //     )
                                                    // )
                                                    <Fragment>
                                                        "Not set"
                                                    </Fragment>
                                                )}
                                            </div>
                                        </fieldset>
                                    ))
                                ) : (
                                    <Row>
                                        <Col>
                                            <Button
                                                size="sm"
                                                type="button"
                                                id="PopoverLegacy"
                                            >
                                                No Team Assigned to Agent /
                                                Click here to set
                                            </Button>
                                        </Col>
                                    </Row>
                                )}
                            </Col>
                        </Row>
                    ) : null}
                </Form>
            </Fragment>
        );
    }

    getTeamLeadDetails = (list) =>
        this.props.teamleads
            .filter((lead) => list.includes(lead.id))
            .map(({ user }, i) => (
                <div key={i}>{`${user.first_name} ${user.last_name}`}</div>
            ));

    displayTeams = (teams) =>
        teams.map((team) => (
            <Fragment>
                <Row>
                    <Col>{team.team.agent_skill.name}</Col>
                </Row>
            </Fragment>
        ));

    toggle = () => this.setState({ isOpen: !this.state.isOpen });
}

const TeamLeadPopover = ({ team, callbackTeamLead, agent, isOpen, toggle }) => (
    <UncontrolledPopover
        className="popover-container"
        trigger="legacy"
        placement="left"
        target="PopoverLegacy"
        isOpen={isOpen}
        toggle={toggle}
        // style={{ maxWidth: "700px" }}
    >
        <PopoverHeader>{team.agent_skill.name}</PopoverHeader>
        <PopoverBody>
            <TeamLeadDataForm
                cba_team={team}
                callbackTeamLead={callbackTeamLead}
                agent={agent}
                team_id={team.id}
                toggle={toggle}
            />
        </PopoverBody>
    </UncontrolledPopover>
);

// const TeamLeadPopover = ({ team, callbackTeamLead, agent }) => (
//     <Popover
//         className="popover-container"
//         trigger="legacy"
//         placement="left"
//         target="PopoverLegacy"
//         // style={{ maxWidth: "700px" }}
//     >
//         <PopoverHeader>{team.team.agent_skill.name}</PopoverHeader>
//         <PopoverBody>
//             <TeamLeadDataForm
//                 cba_team={team.team}
//                 callbackTeamLead={callbackTeamLead}
//                 agent={agent}
//                 team_id={team.id}
//             />
//         </PopoverBody>
//     </Popover>
// );

const mapStateToProps = (state) => ({
    agent_list: state.surveys.agents,
    teamleads: state.surveys.teamleads,
});

export default connect(mapStateToProps, {})(AgentForm);
