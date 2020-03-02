import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { add_comment } from "../../../../actions/ccmsActions";
import { Typeahead } from "react-bootstrap-typeahead";
import {
    Form,
    Input,
    Row,
    Col,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    Button,
    InputGroupButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

import CommentList from "./CommentList";

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            ccms: props.ccms_entry,
            entry: "",
            ccms_status:
                (props.ccms_entry || {}).ccms_status != null
                    ? (props.ccms_entry || {}).ccms_status
                    : "",
            ccms_entry_comments: props.ccms_entry_comment,
            contributor: (props.auth || {}).user
        };
    }

    handleChange = event => {
        const target = event.target;
        const name = target.name;

        const value =
            name === "ccms_status"
                ? this.props.ccms.ccms_status[target.value]
                : target.value;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.add_comment(this.state);
    };

    toggleDropDown = () =>
        this.setState({ dropdownOpen: !this.state.dropdownOpen });

    getList = id =>
        this.props.comments.filter(comment => (comment.ccms || {}).id == id);

    render() {
        const { ccms_status, entry, ccms } = this.state;

        return (
            <Fragment>
                <Row className="mt-3">
                    <Col>
                        <h4>Comments / Updates</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.getList(ccms.id).length != 0 ? (
                            <CommentList comments={this.getList(ccms.id)} />
                        ) : (
                            <p>No comments...</p>
                        )}
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit} autoComplete="off">
                    <FormGroup row>
                        <Col>
                            <InputGroup className="mb-4">
                                <InputGroupButtonDropdown
                                    addonType="prepend"
                                    isOpen={this.state.dropdownOpen}
                                    toggle={this.toggleDropDown}
                                >
                                    <DropdownToggle color="primary" caret>
                                        {ccms_status.name}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.props.ccms.ccms_status.map(
                                            (item, index) => (
                                                <DropdownItem
                                                    key={item.id}
                                                    value={index}
                                                    onClick={this.handleChange}
                                                    name="ccms_status"
                                                >
                                                    {item.name}
                                                </DropdownItem>
                                            )
                                        )}
                                    </DropdownMenu>
                                </InputGroupButtonDropdown>
                                {/* <Input
                                    color="primary"
                                    name="ccms_status"
                                    type="select"
                                    value={ccms_status}
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option
                                        key={ccms_status.id}
                                        value={ccms_status.id}
                                    >
                                        {ccms_status.name}
                                    </option>

                                    {(this.props.ccms || {}).ccms_status.map(
                                        (item, index) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        )
                                    )}
                                </Input> */}
                                <Input
                                    name="entry"
                                    value={entry}
                                    onChange={this.handleChange}
                                    placeholder="Enter comment here..."
                                />
                                <InputGroupAddon addonType="append">
                                    <Button color="success">
                                        <i className="fas fa-paper-plane"></i>
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ccms: state.ccms,
    ccms_status_list: state.ccms.ccms_list,
    comments: state.ccms.comments,
    auth: state.auth
});

export default connect(mapStateToProps, { add_comment })(CommentForm);
