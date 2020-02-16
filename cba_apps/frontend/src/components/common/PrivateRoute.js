import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner, Container } from "reactstrap";
import NoAccess from "../ccms/components/Common/NoAccess";

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
    }
    //render Ccms if member of CCMS Admin and CcmsOwner else send axios request to request table

    render() {
        const { component: Component, auth, name, ...rest } = this.props;
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
                                ) &&
                                (auth.user || {}).is_member_of_ccms_owners
                            ) {
                                // USER HAS ACCESS TO CCMS
                                return <Component {...props} />;
                            } else {
                                // USER HAS NO ACCESS TO CCMS
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

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
