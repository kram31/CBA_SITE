import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import CcmsList from "./CcmsList";

import {
    Spinner,
    Card,
    CardBody,
    CardHeader,
    Container,
    Row,
    Col,
    Table,
    Form,
    Input,
    Button
} from "reactstrap";

class CcmsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
            search_results: []
        };
    }

    handleSearch = e => {
        const { ccms_list } = this.props.ccms;

        // e.target.name: e.target.value
        console.log(e.target.value);

        this.setState({
            [e.target.name]: e.target.value
        });

        let kw = e.target.value;

        // search for ccms.ccms_list.id, ccms.ccms_list.escalated_ticket, ccms.ccms_list.escalated_email_address, ccms.ccms_list.escalated_name
        // all results will be stored in an array of objects

        let items = ccms_list.filter(
            item =>
                kw == item.id ||
                kw == item.escalated_ticket ||
                kw == item.escalated_email_address ||
                kw == item.escalated_name
        );
        // console.log(items);

        this.setState({
            search_results: items
        });
    };

    render() {
        const { ccms } = this.props;
        const { search_results, search } = this.state;

        return (
            <Fragment>
                <h1 style={{ color: "white" }}>CCMS List</h1>
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
                        !search
                            ? ccms.ccms_list
                            : search_results.length && search_results
                    }
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
