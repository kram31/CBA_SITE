import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import UploadData from "../upload/UploadData"

import {
    Spinner,

} from "reactstrap";

import {
    getAllData2
} from "../../../../actions/surveyActions";

class Main extends Component {
    componentDidMount() {
        this.props.getAllData2();

    }

    render() {
        return (
            <Fragment>
                {this.props.isFetching ? (
                    <Spinner
                        style={{
                            width: "3rem",
                            height: "3rem",
                            top: "50%",
                            left: "50%",
                            position: "fixed"
                        }}
                    />
                ) : (
                    <UploadData />
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    surveys: state.surveys.surveys,
    isFetching: state.surveys.isFetching,
    auth: state.auth
});

export default connect(mapStateToProps, {

    getAllData2
})(Main);
