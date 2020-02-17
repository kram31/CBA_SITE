import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import { add_ccms_owner } from "../../../../actions/ccmsActions";

class CcmsAccessRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            access_request: null
        };
    }

    handleChange = e => {
        const { access_request } = this.props;
        const { value } = e.target;

        console.log(access_request[value]);
        this.setState({
            access_request: access_request[value]
        });
    };

    handleSubmit = e => {
        e.preventDefault();
    };

    // add user to ccms_owner list then remove remove by deleting it
    handleClick = () => {
        this.props.add_ccms_owner(this.state.access_request);
    };

    render() {
        const labelStyle = { color: "white" };
        const { access_request } = this.props;
        return (
            <Fragment>
                <Form>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Label style={labelStyle} for="id_users_list">
                                    Access Requests
                                </Label>

                                <Input
                                    type="select"
                                    name="access_request"
                                    id="id_access_request"
                                    size="7"
                                    onChange={this.handleChange}
                                    // value={this.state.users_list}
                                >
                                    {access_request.map((item, index) => {
                                        const { username } = item.user;
                                        return (
                                            <option key={item.id} value={index}>
                                                {username}
                                            </option>
                                        );
                                    })}
                                </Input>
                                <Button
                                    onClick={this.handleClick}
                                    className="mt-3"
                                    color="success"
                                >
                                    Approve
                                </Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    access_request: state.ccms.access_request
});

export default connect(mapStateToProps, { add_ccms_owner })(CcmsAccessRequest);
