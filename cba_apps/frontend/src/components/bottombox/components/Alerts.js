import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";

class Alerts extends Component {
    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;

        error !== prevProps.error && alert.error(error.msg);

        message !== prevProps.message &&
            ((message.surveyDeleted && alert.success(message.surveyDeleted)) ||
                (message.passwordsNotMatch &&
                    alert.error(message.passwordsNotMatch)));
    }
    render() {
        return <Fragment></Fragment>;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
