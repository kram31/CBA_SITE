import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import CcmsList from "./CcmsList";

import { Row, Col, Form, Input } from "reactstrap";

class CcmsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            search: "",
            search_results: [],
            ccms: props.ccms_array
        };
    }

    handleSearch = e => {
        const { ccms } = this.state;

        // e.target.name: e.target.value

        this.setState({
            [e.target.name]: e.target.value
        });

        let kw = e.target.value;

        // search for ccms.ccms_list.id, ccms.ccms_list.escalated_ticket, ccms.ccms_list.escalated_email_address, ccms.ccms_list.escalated_name
        // all results will be stored in an array of objects

        let items = ccms.filter(
            item =>
                kw === item.id ||
                kw === item.escalated_ticket ||
                kw === item.escalated_email_address ||
                kw === item.escalated_name
        );

        this.setState({
            search_results: items
        });
    };

    render() {
        const { title } = this.props;
        const { search_results, search, ccms } = this.state;

        return (
            <Fragment>
                <h1 style={{ color: "white" }}>
                    {!title ? "CCMS List" : title}
                </h1>
                <Row>
                    <Col md={4} className="mb-3">
                        <Form autoComplete="off">
                            <Input
                                type="text"
                                name="search"
                                placeholder="Search"
                                onChange={this.handleSearch}
                            />
                        </Form>
                    </Col>
                </Row>
                <CcmsList
                    ccms={
                        !search ? ccms : search_results.length && search_results
                    }
                    list_type={title}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ccms: state.ccms,
    auth: state.auth
});

export default connect(mapStateToProps, {})(CcmsView);
