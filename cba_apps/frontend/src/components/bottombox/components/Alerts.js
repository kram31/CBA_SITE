import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";

class Alerts extends Component {
    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;

        if (error !== prevProps.error) {
            if (error.msg.username) {
                alert.error(error.msg.username[0]);
            }
            if (error.msg.email) {
                alert.error(error.msg.email[0]);
            }
        }

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
