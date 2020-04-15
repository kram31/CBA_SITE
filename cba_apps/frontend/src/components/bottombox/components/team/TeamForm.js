import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Form, Label, Input, Button, FormGroup } from "reactstrap";

import { editCbaTeam } from "../../../../actions/surveyActions";

const TeamForm = ({ teamProp, toggle }) => {
    const initialValue = {
        agent_skill: "",
        team_leads: "",
    };

    const teamleads = useSelector(({ surveys }) => surveys.teamleads);

    const dispatch = useDispatch();

    const [team, setTeam] = useState(teamProp || initialValue);

    const handleChange = (e) => {
        const { selectedOptions } = e.target;

        const values = teamleads.filter((lead) =>
            [...selectedOptions]
                .map((opt) => opt.value)
                .includes(lead.user.username)
        );

        // console.log(values);

        setTeam({ ...teamProp, team_leads: values });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(editCbaTeam(team));

        console.log("SUBMIT", team);

        toggle();
    };

    return (
        <Form autoComplete="off" onSubmit={handleSubmit}>
            <FormGroup>
                <Label for={`id_team_leads`}>Select Team Lead(s)</Label>

                <Input
                    type="select"
                    bsSize="sm"
                    name="team_leads"
                    id="id_team_leads"
                    value={
                        team.team_leads.length
                            ? team.team_leads.map(({ user }) => user.username)
                            : []
                    }
                    onChange={handleChange}
                    required
                    multiple
                    size="10"
                >
                    {teamleads &&
                        teamleads.map((item, index) => (
                            <option key={index} value={item.user.username}>
                                {item.user.first_name} {item.user.last_name} -{" "}
                                {item.user.username}
                            </option>
                        ))}
                </Input>
            </FormGroup>
            <p style={{ fontSize: "12px" }} className="text-muted">
                Note: Hold control then click for multiple selection.
            </p>
            <Button size="sm" type="submit" id="PopoverLegacy" color="success">
                Submit
            </Button>
        </Form>
    );
};

export default TeamForm;
