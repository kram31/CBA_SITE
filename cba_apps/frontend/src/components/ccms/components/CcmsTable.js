import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { search_ccms } from "../../../actions/ccmsActions";

import CcmsList from "./CcmsList";

import { Row, Col, Form, Input } from "reactstrap";

import CcmsAdminModal from "./CcmsAdmin/CcmsAdminModal";

class CcmsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            search: "",
            search_results: props.filtered_ccms_list,
            ccms_from_parent: props.ccms_array
        };
    }

    handleSearch = e => {
        const { ccms } = this.state;

        // e.target.name: e.target.value

        this.setState({
            [e.target.name]: e.target.value
        });

        let kw = e.target.value;
        this.props.search_ccms(kw);

        // search for ccms.ccms_list.id, ccms.ccms_list.escalated_ticket, ccms.ccms_list.escalated_email_address, ccms.ccms_list.escalated_name
        // all results will be stored in an array of objects

        // let items = ccms.filter(
        //     item =>
        //         kw == item.id ||
        //         kw == item.escalated_ticket ||
        //         kw == item.escalated_email_address ||
        //         kw == item.escalated_name
        // );

        // this.setState({
        //     search_results: items
        // });
    };

    render() {
        const { title, ccms } = this.props;
        const { search, ccms_from_parent } = this.state;

        return (
            <Fragment>
                <Row className="mb-2">
                    <Col>
                        <h1 style={{ color: "orange" }}>
                            {!title
                                ? "CCMS CCA VIEW - Assigning Escalation"
                                : title}
                        </h1>
                    </Col>
                    {!title ? (
                        <Col>
                            <CcmsAdminModal
                                color="primary"
                                buttonLabel="CCMS Admin"
                            />
                        </Col>
                    ) : null}
                </Row>
                <Row>
                    <Col md={3} className="mb-3">
                        <Form autoComplete="off">
                            <Input
                                bsSize="sm"
                                type="text"
                                name="search"
                                placeholder="Search"
                                onChange={this.handleSearch}
                            />
                        </Form>
                    </Col>
                </Row>
                <CcmsList
                    table_name={this.props.table_name}
                    ccms_list={
                        search ? ccms.filtered_ccms_list : ccms_from_parent
                    }
                    list_type={title}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ccms: state.ccms,
    filtered_ccms_list: state.ccms.filtered_ccms_list,
    auth: state.auth
});

export default connect(mapStateToProps, { search_ccms })(CcmsTable);
