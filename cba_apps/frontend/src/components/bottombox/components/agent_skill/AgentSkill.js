import React, { useState, Fragment } from "react";

import {
    Label,
    Input,
    Form,
    Button,
    Table,
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";

import { GeneralRequest } from "../../../../actions/surveyActions";

import { ADD_AGENT_SKILL, DELETE_AGENT_SKILL } from "../../../../actions/types";

const AgentSkill = () => {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const reduxAction = new GeneralRequest(
            "agent_skills",
            { name },
            ADD_AGENT_SKILL
        );

        dispatch(reduxAction.addData());

        setName("");
        console.log({ name });
    };

    const handleDelete = (data) => {
        const reduxAction = new GeneralRequest(
            "agent_skills",
            data,
            DELETE_AGENT_SKILL
        );

        dispatch(reduxAction.deleteData());
    };

    const agent_skills = useSelector((state) => state.surveys.agent_skills);
    const dispatch = useDispatch();

    return (
        <div style={{ color: "white" }} className="px-5">
            {agent_skills.length ? (
                <Fragment>
                    <Row>
                        <Col>
                            <h5>Agent Skills</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table
                                style={{
                                    color: "white",
                                    fontSize: "14px",
                                }}
                                bordered
                                className="text-center "
                            >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agent_skills.map((item, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.name}</td>
                                            <td>
                                                <i
                                                    style={{
                                                        color: "red",
                                                        cursor: "pointer",
                                                    }}
                                                    className="far fa-times-circle"
                                                    onClick={() =>
                                                        handleDelete(item)
                                                    }
                                                ></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Fragment>
            ) : null}
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Label for="id_name">Name</Label>
                <InputGroup size="sm" className="col-5">
                    <Input
                        type="text"
                        id="id_name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <InputGroupAddon addonType="append">
                        <Button type="submit" color="success">
                            Add
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </Form>
        </div>
    );
};

export default AgentSkill;
