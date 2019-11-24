import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class BottomboxCount extends Component {
    render() {
        return <Fragment></Fragment>;
    }
}

const mapStateToProps = state => ({
    surveys: state.surveys.surveys
});

export default connect(mapStateToProps, {})(BottomboxCount);
