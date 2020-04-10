import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Row, Col, Input, Label } from "reactstrap";
import TeamForm from "./TeamForm";

class TeamView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: props.teams
        };
    }

    teams = [
        {
            id: 7,
            agent_skill: {
                id: 5,
                name: "CET/FC"
            },
            team_lead: null
        },
        {
            id: 8,
            agent_skill: {
                id: 6,
                name: "Desktop"
            },
            team_lead: null
        }
    ];

    handleChange = e => {
        const { cba_teams } = this.props;
        const { value } = e.target;

        this.setState(
            {
                team: cba_teams[value]
            },
            () => console.log(this.state.team)
        );
    };

    render() {
        const { cba_teams } = this.props;
        return (
            <Fragment>
                <Row>
                    <Col>
                        <Label for={`id_agent`}>CBA Team</Label>
                        <Input
                            type="select"
                            name="team"
                            id="id_agent"
                            size="4"
                            onChange={this.handleChange}
                            // value={this.teams.map(
                            //     ({ agent_skill }) => agent_skill.name
                            // )}
                            value={["CET/FC"]}
                            multiple
                        >
                            {cba_teams && cba_teams.length
                                ? cba_teams.map((team, index) => (
                                      <option key={index} value={index}>
                                          {team.agent_skill.name}
                                      </option>
                                  ))
                                : null}
                        </Input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.team ? (
                            <TeamForm team={this.state.team} />
                        ) : null}
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    cba_teams: state.surveys.cba_teams
});

export default connect(mapStateToProps, {})(TeamView);
{
    /* <Input
    type="select"
    name="ccms_owner"
    id="id_ccms_owner"
    size="7"
    onChange={this.handleChange}
    // value={this.state.users_list}
>
    {(ccms || {}).ccms_owner
        .filter(item => !((item.user || {}).groups || {}).includes(1))
        .map((item, index) => {
            const { first_name, last_name, username } = item.user;
            return (
                <option
                    key={item.id}
                    value={index}
                >{`${first_name} ${last_name}`}</option>
            );
        })}
</Input>; */
}
