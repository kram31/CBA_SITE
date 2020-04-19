import React, { useState, Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
    addCbaTeam,
    editCbaTeam,
    GeneralRequest,
} from "../../../../actions/surveyActions";

import { DELETE_CBA_TEAMS } from "../../../../actions/types";

import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Input,
    Label,
    FormGroup,
    Form,
    Container,
} from "reactstrap";

import TeamForm from "./TeamForm";

const TeamView = () => {
    const cba_teams = useSelector(({ surveys }) => surveys.cba_teams);

    const collapse_component = useSelector(
        (surveys) => surveys.collapse_component
    );

    // useEffect(() => console.log("TEAM VIEW"), []);

    return (
        <Container>
            {cba_teams.length ? <TeamTable cba_teams={cba_teams} /> : null}
        </Container>
    );
};

export default TeamView;

const TeamTable = ({ cba_teams }) => (
    <div style={{ color: "white" }}>
        <Row>
            <Col>
                <div className="float-left">CBA Teams</div>
                <div className="float-right">
                    <AddTeamModal />
                </div>
            </Col>
        </Row>
        <Table style={{ color: "white" }}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Team Lead(s)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {cba_teams.map((team, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{team.agent_skill.name}</td>
                        <td>
                            <TeamModal
                                label={team.team_leads
                                    .map(
                                        ({ user }) =>
                                            `${user.first_name} ${user.last_name}`
                                    )
                                    .join(", ")}
                                team={team}
                            />
                        </td>
                        <td>
                            <div className="d-inline-block">
                                <AddTeamModal teamProp={team} />
                            </div>
                            <div className="d-inline-block">
                                <DeleteModal teamProp={team} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
);

const DeleteModal = ({ teamProp, className }) => {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();

    const toggle = () => setModal(!modal);

    const handleDelete = () => {
        let reduxAction = new GeneralRequest(
            "cba_teams",
            teamProp,
            DELETE_CBA_TEAMS
        );
        dispatch(reduxAction.deleteData());
        toggle();
    };

    return (
        <div>
            <span
                style={{ cursor: "pointer", color: "#d9534f" }}
                onClick={toggle}
            >
                <i className="far fa-trash-alt"></i>
            </span>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader
                    style={{ backgroundColor: "#d9534f" }}
                    toggle={toggle}
                >
                    Delete Team
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete {teamProp.agent_skill.name}?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleDelete}>
                        Yes
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

const TeamModal = ({ className, label, team }) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={toggle}
            >
                {label || "No Team Lead set"}
            </span>

            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>
                    Team {team.agent_skill.name} Lead(s) Assignment
                </ModalHeader>
                <ModalBody>
                    <TeamForm teamProp={team} toggle={toggle} />
                </ModalBody>
            </Modal>
        </div>
    );
};

const AddTeamModal = ({ className, teamProp }) => {
    const initialValue = {
        agent_skill: { name: "" },
        team_leads: "",
    };
    const [modal, setModal] = useState(false);
    const [error, setError] = useState("");
    const [team, setTeam] = useState(teamProp || initialValue);

    const dispatch = useDispatch();

    const cba_teams = useSelector(({ surveys }) => surveys.cba_teams);
    const teamleads = useSelector(({ surveys }) => surveys.teamleads);

    const toggle = () => setModal(!modal);

    const handleChange = (e) => {
        const { selectedOptions } = e.target;

        const values = teamleads.filter((lead) =>
            [...selectedOptions]
                .map((opt) => opt.value)
                .includes(lead.user.username)
        );

        // console.log(values);

        setTeam({ ...team, team_leads: values });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            cba_teams
                .map(({ agent_skill }) => agent_skill.name.toLowerCase())
                .filter(
                    (item) => ((teamProp || {}).agent_skill || {}).name != item
                )
                .includes(team.agent_skill.name.toLowerCase())
        ) {
            setError(
                `${team.agent_skill.name} already exists! Please provide another name.`
            );
        } else {
            // console.log("SUBMIT", team);

            teamProp ? dispatch(editCbaTeam(team)) : dispatch(addCbaTeam(team));

            setTeam(initialValue);

            toggle();
        }
    };

    return (
        <div>
            <p
                onClick={toggle}
                style={{
                    cursor: "pointer",
                    color: "#5cb85c",
                    fontSize: "14px",
                }}
            >
                {teamProp ? (
                    <span className="mr-2">
                        <i className="far fa-edit"></i>
                    </span>
                ) : (
                    <Fragment>
                        <span className="mr-2">
                            <i className="fas fa-plus-square"></i>
                        </span>
                        Add New Team
                    </Fragment>
                )}
            </p>

            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader
                    style={{ backgroundColor: "#5cb85c" }}
                    toggle={toggle}
                >
                    {teamProp ? "Edit" : "Add New"} Team
                </ModalHeader>
                <ModalBody>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="id_name">Name</Label>
                            <Input
                                bsSize="sm"
                                type="text"
                                name="name"
                                id="id_name"
                                value={team.agent_skill.name}
                                onChange={(e) =>
                                    setTeam({
                                        ...team,
                                        agent_skill: { name: e.target.value },
                                    })
                                }
                            />
                        </FormGroup>
                        {error ? (
                            <p style={{ color: "#d9534f", fontSize: "12px" }}>
                                {error}
                            </p>
                        ) : null}
                        <FormGroup>
                            <Label for={`id_team_leads`}>
                                Select Team Lead(s)
                            </Label>

                            <Input
                                type="select"
                                bsSize="sm"
                                name="team_leads"
                                id="id_team_leads"
                                value={
                                    team.team_leads.length
                                        ? team.team_leads.map(
                                              ({ user }) => user.username
                                          )
                                        : []
                                }
                                onChange={handleChange}
                                required
                                multiple
                                size="10"
                            >
                                {teamleads &&
                                    teamleads.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item.user.username}
                                        >
                                            {item.user.first_name}{" "}
                                            {item.user.last_name} -{" "}
                                            {item.user.username}
                                        </option>
                                    ))}
                            </Input>
                        </FormGroup>
                        <Button color="success" size="sm">
                            Submit
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};
