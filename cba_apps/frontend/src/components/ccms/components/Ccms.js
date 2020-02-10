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
    get_ccms_owner,
    get_ccms_status,
    get_silo,
    get_ticket_type,
    get_ccms_admin_list,
    get_users_list,
    get_all_data
} from "../../../actions/ccmsActions";

import { Spinner, Container, Row, Col } from "reactstrap";

import CcmsTable from "./CcmsTable";
import CcmsAdminForm from "./CcmsAdmin/CcmsAdminForm";

class Ccms extends Component {
    constructor(props) {
        super(props);

        props.get_all_data();

        // props.get_ccms_list();
        // props.get_business_unit();
        // props.get_ticket_status();
        // props.get_escalation_type();
        // props.get_accountable_team();
        // props.get_site_code();
        // props.get_ccms_owner();
        // props.get_ccms_status();
        // props.get_silo();
        // props.get_ticket_type();
        // props.get_ccms_admin_list();
        // props.get_users_list();

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
                    <Row>
                        <Col>
                            <CcmsAdminForm />
                        </Col>
                    </Row>
                    {auth.user.group_list.includes("CCMS Admin") ? (
                        <Row className="mb-5">
                            <Col>
                                <CcmsTable
                                    key={1}
                                    table_name="main"
                                    title=""
                                    ccms_array={ccms.ccms_list}
                                />
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col>
                                <CcmsTable
                                    key={2}
                                    table_name="owner"
                                    title="CCMS Owner VIEW - Assigning Escalation"
                                    ccms_array={ccms.ccms_list.filter(
                                        item =>
                                            ((item.ccms_owner || {}).user || {})
                                                .email ==
                                            (auth.user || {}).username
                                    )}
                                />
                            </Col>
                        </Row>
                    )}
                    <Row>
                        <Col>
                            <CcmsTable
                                table_name="owner"
                                title="CCMS Owner VIEW - Assigning Escalation"
                                ccms_array={ccms.ccms_list.filter(
                                    item =>
                                        ((item.ccms_owner || {}).user || {})
                                            .email == (auth.user || {}).username
                                )}
                            />
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
    get_business_unit,
    get_ticket_status,
    get_escalation_type,
    get_accountable_team,
    get_site_code,
    get_ccms_owner,
    get_ccms_status,
    get_silo,
    get_ticket_type,
    get_ccms_admin_list,
    get_users_list,
    get_all_data
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
