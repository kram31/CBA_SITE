import React, { useState, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";

import { ADD_CSAT_ACCOUNTABLE_TEAM } from "../../../../actions/types";

import {
    GeneralRequest,
    editCsatAccountableTeam,
    deleteCsatAccountableTeam,
} from "../../../../actions/surveyActions";

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

const AccountableTeam = () => {
    const csat_accountable_team = useSelector(
        ({ surveys }) => surveys.csat_accountable_team
    );

    return (
        <Container style={{ color: "white" }}>
            <div>
                <div className="float-left">Accountable Teams</div>
                <div className="float-right">
                    <AddEditOption
                        csat_accountable_team={csat_accountable_team}
                    />
                </div>
            </div>
            <Table className="text-center" style={{ color: "white" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {csat_accountable_team.length &&
                        csat_accountable_team.map((team, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{team.name}</td>
                                <td>
                                    <div className="d-inline-block">
                                        <DeleteOption teamProp={team} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AccountableTeam;

const DeleteOption = ({ teamProp, className }) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const dispatch = useDispatch();

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
                    Delete Accountable Team
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to Delete{" "}
                    <strong>{teamProp.name}</strong>?
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        onClick={() => {
                            dispatch(deleteCsatAccountableTeam(teamProp));
                            toggle();
                        }}
                    >
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

const AddEditOption = ({ className, teamProp, csat_accountable_team }) => {
    const dispatch = useDispatch();
    const initialValue = { name: "" };
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [team, setTeam] = useState(teamProp || initialValue);

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            csat_accountable_team
                .map(({ name }) => name.toLowerCase())
                .filter((item) => (teamProp || {}).name != item)
                .includes(team.name.toLowerCase())
        ) {
            setError(
                `${team.name} already exists! Please provide another name.`
            );
        } else {
            if (teamProp) {
                console.log("EDIT", team);

                dispatch(editCsatAccountableTeam(team));
            } else {
                console.log("ADD", team);
                let reduxAdd = new GeneralRequest(
                    "csat_accountable_team",
                    team,
                    ADD_CSAT_ACCOUNTABLE_TEAM
                );
                dispatch(reduxAdd.addData());
            }

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
                        Add Team
                    </Fragment>
                )}
            </p>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader
                    toggle={toggle}
                    style={{
                        backgroundColor: teamProp ? "#f0ad4e" : "#5cb85c",
                    }}
                >
                    {teamProp ? "Edit" : "Add"} Team
                </ModalHeader>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="id_name">Name</Label>
                            <Input
                                bsSize="sm"
                                type="text"
                                name="name"
                                id="id_name"
                                value={team.name}
                                onChange={(e) =>
                                    setTeam({ name: e.target.value })
                                }
                                required
                            />
                        </FormGroup>
                        {error ? (
                            <p style={{ color: "#d9534f", fontSize: "12px" }}>
                                {error}
                            </p>
                        ) : null}

                        {/* <Button color="success" size="sm">
                            Submit
                        </Button> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success">Submit</Button>{" "}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
};
