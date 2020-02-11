import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import { connect } from "react-redux";

import {
    remove_user_from_ccms_admin,
    add_user_to_ccms_admin
} from "../../../../actions/ccmsActions";

class CcmsAdminForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users_list: [],
            ccms_admin_list: []
        };
    }

    handleSubmit = e => {
        e.preventDefault();
    };

    handleRemove = () => {
        this.props.remove_user_from_ccms_admin(this.state.ccms_admin_list);
    };

    handleAdd = () => {
        this.props.add_user_to_ccms_admin(this.state.users_list);
    };

    handleChange = e => {
        const { name, selectedOptions } = e.target;
        const { users_list, ccms_admin_list } = this.props;

        if (name == "users_list") {
            let selected = [...selectedOptions].map(
                item => this.getListofNotCcmsAdmin(users_list)[item.value]
            );

            this.setState(
                {
                    users_list: selected
                },
                () => console.log(this.state)
            );
        } else if (name == "ccms_admin_list") {
            this.setState(
                {
                    ccms_admin_list: [...selectedOptions].map(
                        item => ccms_admin_list[item.value]
                    )
                },
                () => console.log(this.state)
            );
        }
    };

    getListofNotCcmsAdmin = list =>
        list.filter(user => !user.groups.includes(1));

    render() {
        const { ccms } = this.props;

        const labelStyle = { color: "white" };
        return (
            <Row>
                <Col className="mb-3">
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label
                                        style={labelStyle}
                                        for="id_users_list"
                                    >
                                        Users List
                                    </Label>

                                    <Input
                                        type="select"
                                        name="users_list"
                                        id="id_users_list"
                                        size="7"
                                        onChange={this.handleChange}
                                        // value={this.state.users_list}
                                    >
                                        {this.getListofNotCcmsAdmin(
                                            (ccms || {}).users_list
                                        ).map((item, index) => {
                                            const {
                                                first_name,
                                                last_name,
                                                username
                                            } = item;
                                            return (
                                                <option
                                                    key={item.id}
                                                    value={index}
                                                >{`${first_name} ${last_name} - ${username}`}</option>
                                            );
                                        })}
                                    </Input>
                                </Col>
                                <Col md={1} className="my-auto">
                                    <Row>
                                        <Col className="text-center">
                                            <i
                                                onClick={this.handleAdd}
                                                id="ccms-btn-right"
                                                className="fas fa-chevron-circle-right"
                                            ></i>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="text-center">
                                            <i
                                                onClick={this.handleRemove}
                                                id="ccms-btn-left"
                                                className="fas fa-chevron-circle-left"
                                            ></i>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Label
                                        style={labelStyle}
                                        for="id_ccms_admin"
                                    >
                                        CCMS Administrators
                                    </Label>

                                    <Input
                                        type="select"
                                        name="ccms_admin_list"
                                        id="id_ccms_admin_list"
                                        size="7"
                                        onChange={this.handleChange}
                                    >
                                        {(ccms || {}).ccms_admin_list.map(
                                            (item, index) => {
                                                const {
                                                    first_name,
                                                    last_name,
                                                    username
                                                } = item;
                                                return (
                                                    <option
                                                        key={item.id}
                                                        value={index}
                                                    >{`${first_name} ${last_name} - ${username}`}</option>
                                                );
                                            }
                                        )}
                                    </Input>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    ccms: state.ccms,
    ccms_admin_list: state.ccms.ccms_admin_list,
    users_list: state.ccms.users_list
});

export default connect(mapStateToProps, {
    remove_user_from_ccms_admin,
    add_user_to_ccms_admin
})(CcmsAdminForm);
