import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
    get_ccms_list,
    isFetching,
    getSurveys,
    ack_entry,
    getComments,
    get_business_unit,
    get_ticket_status,
    get_escalation_type,
    get_accountable_team,
    get_site_code,
    get_ccms_owner
} from "../../../actions/ccmsActions";

import { Spinner, Container, Row, Col } from "reactstrap";

import CcmsTable from "./CcmsTable";

class Ccms extends Component {
    constructor(props) {
        super(props);

        props.get_ccms_list();
        props.getComments();
        props.get_business_unit();
        props.get_ticket_status();
        props.get_escalation_type();
        props.get_accountable_team();
        props.get_site_code();
        props.get_ccms_owner();

        this.state = {
            user_details: this.props.auth.user
        };
    }

    handleClick = childData => {
        const { user } = this.props.auth;

        let data = {
            is_acknowledged: true,
            acknowledged_by: user.displayName,
            date_acknowledged: this.getCurrentDate()
        };
        this.props.ack_entry(childData, data);
    };

    getCurrentDate = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;

        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        return mm + "/" + dd + "/" + yyyy;
    };

    render() {
        const { ccms, auth } = this.props;

        if (ccms.isFetching) return <Loading />;

        if (ccms.ccms_list.length && auth.user) {
            return (
                <Container>
                    <Row className="mb-5">
                        <Col>
                            {auth.user.group_list.includes("CCMS Admin") && (
                                <CcmsTable
                                    title=""
                                    ccms_array={ccms.ccms_list}
                                />
                            )}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {auth.user.username && (
                                <CcmsTable
                                    title="CCMS Owner VIEW - Assigning Escalation"
                                    ccms_array={ccms.ccms_list.filter(
                                        item =>
                                            ((item.ccms_owner || {}).user || {})
                                                .email == auth.user.username
                                    )}
                                />
                            )}
                        </Col>
                    </Row>
                </Container>
            );
        }

        return (
            <Fragment>
                <h1>No CCMS entries</h1>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ccms: state.ccms,
    auth: state.auth,
    comments: state.ccms.comments
});

export default connect(mapStateToProps, {
    get_ccms_list,
    isFetching,
    getSurveys,
    ack_entry,
    getComments,
    get_business_unit,
    get_ticket_status,
    get_escalation_type,
    get_accountable_team,
    get_site_code,
    get_ccms_owner
})(Ccms);

export const Loading = () => (
    <Spinner
        style={{
            width: "3rem",
            height: "3rem",
            top: "50%",
            left: "50%",
            position: "fixed"
        }}
    />
);
