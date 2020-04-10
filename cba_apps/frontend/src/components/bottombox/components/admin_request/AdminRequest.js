import React, { Component, Fragment } from "react";

import { Form, Input, Button, Row, Col, Table, Label } from "reactstrap";

import { connect } from "react-redux";

import {
    getUsers,
    addCsatAdmin,
    deleteCsatAdmin,
} from "../../../../actions/surveyActions";

class AdminRequest extends Component {
    constructor(props) {
        super(props);

        props.getUsers();

        this.state = {
            user: "",
        };
    }

    handleChange = (e) => {
        const { cba_users } = this.props;
        const { name, value } = e.target;
        this.setState({ [name]: cba_users[value] });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        // console.log("SUBMIT", this.state);

        this.props.addCsatAdmin(this.state);
    };

    render() {
        const { cba_users, csat_admin } = this.props;

        const { user } = this.state;

        return (
            <div className="px-5">
                {cba_users.length ? (
                    <Fragment>
                        {csat_admin.length ? (
                            <Fragment>
                                <Row>
                                    <Col>
                                        <h5 style={{ color: "white" }}>
                                            CSAT Administrators
                                        </h5>
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
                                            className="text-center"
                                        >
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Email</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {csat_admin.map(
                                                    (admin, index) => (
                                                        <tr key={index}>
                                                            <th scope="row">
                                                                {index + 1}
                                                            </th>
                                                            <td>
                                                                {
                                                                    admin.user
                                                                        .first_name
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    admin.user
                                                                        .last_name
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    admin.user
                                                                        .email
                                                                }
                                                            </td>
                                                            <td className="text-center">
                                                                <i
                                                                    style={{
                                                                        color:
                                                                            "red",
                                                                        cursor:
                                                                            "pointer",
                                                                    }}
                                                                    className="far fa-times-circle"
                                                                    onClick={() =>
                                                                        this.props.deleteCsatAdmin(
                                                                            admin
                                                                        )
                                                                    }
                                                                ></i>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </Fragment>
                        ) : null}

                        <Row>
                            <Col md={6}>
                                <Form
                                    onSubmit={this.handleSubmit}
                                    style={{ color: "white" }}
                                >
                                    <Label for="id_team">Users</Label>
                                    <Input
                                        type="select"
                                        bsSize="sm"
                                        name="user"
                                        id="id_team"
                                        value={user ? user.username : ""}
                                        onChange={this.handleChange}
                                        required
                                    >
                                        {user ? (
                                            <option>{user.username}</option>
                                        ) : (
                                            <option value="">
                                                Select User...
                                            </option>
                                        )}
                                        {cba_users.map((user, index) => (
                                            <option key={user.id} value={index}>
                                                {user.first_name}{" "}
                                                {user.last_name} -{" "}
                                                {user.username}
                                            </option>
                                        ))}
                                    </Input>
                                    <Row className="mt-3">
                                        <Col md={5}>
                                            <Button size="sm" color="success">
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Fragment>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cba_users: state.surveys.cba_users,
    csat_admin: state.surveys.csat_admin,
});

export default connect(mapStateToProps, {
    getUsers,
    addCsatAdmin,
    deleteCsatAdmin,
})(AdminRequest);
