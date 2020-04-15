import React, { useState, Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";

import { editCbaTeam } from "../../../../actions/surveyActions";

import { Input, Label, Form, Button } from "reactstrap";

const SetTeamForm = ({ teamlead, toggle }) => {
    const cba_teams = useSelector((state) => state.surveys.cba_teams);
    const dispatch = useDispatch();

    const getTeam = (cba_teams, teamlead) =>
        cba_teams.filter(({ team_leads }) =>
            team_leads
                .map(({ user }) => user.username)
                .includes(teamlead.user.username)
        );

    const [teams, setTeams] = useState(
        teamlead ? getTeam(cba_teams, teamlead) : []
    );

    const handleChange = (e) => {
        console.log(e.target.value);

        const { selectedOptions } = e.target;

        const values = cba_teams.filter(({ agent_skill }) =>
            [...selectedOptions]
                .map((opt) => opt.value)
                .includes(agent_skill.name)
        );

        setTeams(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(teams);

        let selectedTeams = teams.map((team) => ({
            ...team,
            team_leads: !team.team_leads
                .map(({ id }) => id)
                .includes(teamlead.id)
                ? [...team.team_leads, teamlead]
                : team.team_leads,
        }));

        let unSelectedTeams = getTeam(cba_teams, teamlead)
            .filter((team) => !teams.map(({ id }) => id).includes(team.id))
            .map((team) => ({
                ...team,
                team_leads: team.team_leads.filter(
                    (lead) => lead.id != teamlead.id
                ),
            }));

        [...selectedTeams, ...unSelectedTeams].forEach((team) =>
            dispatch(editCbaTeam(team))
        );

        toggle();

        // console.log("SUBMIT", [...selectedTeams, ...unSelectedTeams]);
    };

    return (
        <div className="mx-3 my-2">
            <Form onSubmit={handleSubmit}>
                <Label>
                    Team Lead: {teamlead.user.first_name}{" "}
                    {teamlead.user.last_name}
                </Label>
                <Input
                    type="select"
                    bsSize="sm"
                    name="teams"
                    id="id_teams"
                    value={
                        teams.length
                            ? teams.map(({ agent_skill }) => agent_skill.name)
                            : []
                    }
                    onChange={handleChange}
                    multiple
                    size={cba_teams.length.toString()}
                >
                    {cba_teams.map((team, index) => (
                        <option key={index} value={team.agent_skill.name}>
                            {team.agent_skill.name}
                        </option>
                    ))}
                </Input>
                <p className="text-muted mt-1" style={{ fontSize: "12px" }}>
                    Hold control for multiple selections.
                </p>
                <Button color="success" size="sm">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default SetTeamForm;
