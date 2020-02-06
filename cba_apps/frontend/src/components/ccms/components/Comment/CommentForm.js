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
    Button
} from "reactstrap";

import CommentList from "./CommentList";

class CommentForm extends Component {
    constructor(props) {
        super(props);

        // props needed
        // ccms_entry
        // ccms_entry_comments

        console.log(props.ccms_entry.ccms_status);

        this.state = {
            // ...props.ccms_entry,
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
        const value =
            target.name === "ccms_status"
                ? (this.props.ccms || {}).ccms_status.filter(
                      item => item.id == target.value
                  )[0]
                : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        console.log("submit");

        this.props.add_comment(this.state);
    };

    getList = id =>
        this.props.comments.filter(comment => (comment.ccms || {}).id == id);

    render() {
        const { ccms_status, entry, ccms } = this.state;

        return (
            <Fragment>
                <Row className="mt-3">
                    <Col>
                        <h4>Comments</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.getList(ccms.id).length != 0 ? (
                            <CommentList comments={this.getList(ccms.id)} />
                        ) : null}
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit} autoComplete="off">
                    <FormGroup>
                        <Row>
                            <Col md={4}>
                                <Input
                                    color="primary"
                                    name="ccms_status"
                                    type="select"
                                    value={ccms_status}
                                    onChange={this.handleChange}
                                    required

                                    // onClick={() =>
                                    //     this.setState({ ccms_status: "" })
                                    // }
                                >
                                    {/* {ccms_status ? (
                                        <option
                                            key={ccms_status.id}
                                            value={ccms_status.id}
                                        >
                                            {ccms_status.name}
                                        </option>
                                    ) : (
                                        <option value="">select...</option>
                                    )} */}

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
                                </Input>
                                {/* <Typeahead
                                    labelKey="name"
                                    onChange={selected =>
                                        this.setState({
                                            ccms_status: selected[0]
                                        })
                                    }
                                    id="id_ccms_status"
                                    options={
                                        (this.props.ccms || {}).ccms_status
                                    }
                                    selected={
                                        this.state.ccms_status
                                            ? [this.state.ccms_status]
                                            : []
                                    }
                                    placeholder="Select..."
                                    selectHintOnEnter={true}
                                    clearButton={true}
                                    name="ccms_status"
                                /> */}
                            </Col>
                            <Col>
                                <InputGroup className="mb-4">
                                    {/* <InputGroupAddon addonType="prepend">
                                <Input
                                    color="primary"
                                    name="ccms_status"
                                    type="select"
                                    value={ccms_status}
                                    onChange={this.handleChange}
                                >
                                    <option value="">select...</option>
                                    {(this.props.ccms || {}).ccms_status.map(
                                        (item, index) => (
                                            <option key={item.id} value={index}>
                                                {item.name}
                                            </option>
                                        )
                                    )}
                                </Input>
                            </InputGroupAddon> */}
                                    <Input
                                        name="entry"
                                        value={entry}
                                        onChange={this.handleChange}
                                        placeholder="Enter comment here..."
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button color="secondary">
                                            <i className="fas fa-check"></i>
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Col>
                        </Row>
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
