import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
    get_ccms_list,
    isFetching,
    getSurveys,
    ack_entry,
    getComments
} from "../../../actions/ccmsActions";

import { Spinner, Container } from "reactstrap";

import CcmsView from "./CcmsView";

class Ccms extends Component {
    constructor(props) {
        super(props);

        props.get_ccms_list();
        props.getComments();

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

    getListPerOwner = username => {
        const { ccms } = this.props;

        let x = [];

        if (username) {
            return ccms.ccms_list.filter(
                item => item.ccms_owner_username == username
            );
        }
    };

    render() {
        const { ccms, auth } = this.props;

        if (ccms.isFetching) return <Loading />;

        if (ccms.ccms_list.length && auth.user) {
            return (
                <Container>
                    {auth.user.group_list.includes("CCMS Admin") && (
                        <CcmsView title="" ccms_array={ccms.ccms_list} />
                    )}

                    {auth.user.username && (
                        <CcmsView
                            title="Owner's List"
                            ccms_array={ccms.ccms_list.filter(
                                item =>
                                    item.ccms_owner_username ==
                                    auth.user.username
                            )}
                        />
                    )}
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
    getComments
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
