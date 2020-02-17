import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner, Container } from "reactstrap";
import NoAccess from "../ccms/components/Common/NoAccess";
import { get_access_request } from "../../actions/ccmsActions";

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        props.get_access_request();
    }
    //render Ccms if member of CCMS Admin and CcmsOwner else send axios request to request table

    render() {
        const {
            component: Component,
            auth,
            name,
            access_request_list,
            ...rest
        } = this.props;

        return (
            <Route
                {...rest}
                render={props => {
                    // CHECK FIRST IF auth.user exists
                    if (auth.user) {
                        if (name == "Ccms") {
                            if (
                                (auth.user || {}).group_list.includes(
                                    "CCMS Admin"
                                ) ||
                                (auth.user || {}).is_member_of_ccms_owners
                            ) {
                                // USER HAS ACCESS TO CCMS
                                return <Component {...props} />;
                            } else {
                                // USER HAS NO ACCESS TO CCMS

                                if (access_request_list && auth.user) {
                                    if (
                                        access_request_list.filter(
                                            item =>
                                                item.user.username ==
                                                auth.user.username
                                        ).length != 0
                                    ) {
                                        // Request already exists
                                        return <RequestAlreadyExists />;
                                    }
                                }

                                return <NoAccess />;
                            }
                        } else if (name == "BottomBox") {
                            return <Component {...props} />;
                        }
                    } else {
                        return <Spinner />;
                    }
                }}
            />
        );
    }
}

const RequestAlreadyExists = props => (
    <Container>
        <h3>You already have requested access. Click here to follow up</h3>
    </Container>
);

const mapStateToProps = state => ({
    auth: state.auth,
    access_request_list: state.ccms.access_request
});

export default connect(mapStateToProps, { get_access_request })(PrivateRoute);
