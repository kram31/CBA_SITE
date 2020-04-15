import React, { useState, Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button, Label, FormGroup, Col, Row } from "reactstrap";

import { GeneralRequest } from "../../../../actions/surveyActions";

import { ADD_TEAMLEAD, EDIT_TEAMLEAD } from "../../../../actions/types";

const TeamLeadForm = ({ userProp, task, toggle }) => {
    const teamleads = useSelector(({ surveys }) => surveys.teamleads);

    const initialValue = {
        first_name: "",
        last_name: "",
        username: "",
    };

    const [user, setUser] = useState((userProp || {}).user || initialValue);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (
        //     teamleads
        //         .map(({ user }) => user.username.toLowerCase())
        //         .filter(
        //             (item) => ((userProp || {}).user || {}).username != item
        //         ).includes(user.username.toLowerCase())
        // )
        switch (task) {
            case "Add":
                let reduxAdd = new GeneralRequest(
                    "teamleads",
                    { user },
                    ADD_TEAMLEAD
                );
                dispatch(reduxAdd.addData());
                // console.log("Add", user);
                break;

            case "Edit":
                let reduxEdit = new GeneralRequest(
                    "teamleads",
                    { ...userProp, user: user },
                    EDIT_TEAMLEAD
                );
                dispatch(reduxEdit.editData());
                console.log("EDIT", { ...userProp, user: user });
                break;

            default:
                break;
        }

        setUser(initialValue);
        toggle();
    };

    return (
        <div className="my-2" style={{ fontSize: "14px" }}>
            <Form onSubmit={handleSubmit} autoComplete="off">
                {Object.keys(user)
                    .filter((item) =>
                        ["first_name", "last_name", "username"].includes(item)
                    )
                    .map((item, index) => (
                        <Fragment key={index}>
                            <FormGroup row>
                                <Label for={"id_" + item}>
                                    {item
                                        .split("_")
                                        .map(
                                            (str) =>
                                                str.charAt(0).toUpperCase() +
                                                str.slice(1)
                                        )
                                        .join(" ")}
                                </Label>
                                <Col>
                                    <Input
                                        bsSize="sm"
                                        id={"id_" + item}
                                        type={
                                            item === "username"
                                                ? "email"
                                                : "text"
                                        }
                                        name={item}
                                        value={user[item]}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                            </FormGroup>
                            {item === "username" && (
                                <Row>
                                    <Col className="offset-md-1">
                                        <p
                                            className="text-muted"
                                            style={{ fontSize: "12px" }}
                                        >
                                            NOTE: Username should be DXC email
                                            address... eg. dxctest@dxc.com
                                        </p>
                                    </Col>
                                </Row>
                            )}
                        </Fragment>
                    ))}
                <Row>
                    <Col>
                        <Button size="sm" color="success">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default TeamLeadForm;
