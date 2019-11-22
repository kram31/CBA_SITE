import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
    component: Component,
    isAuthenticated,
    user,
    ...rest
}) => (
    <Route
        {...rest}
        render={props => {
            if (isAuthenticated) {
                return <Component {...props} />;
            } else if (!isAuthenticated) {
                return <Redirect to="/" />;
            }
        }}
    />
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
