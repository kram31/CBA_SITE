import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import UploadData from "../upload/UploadData";
import DriverView from "../drivers/DriverView";
import SurveyView from "../survey/SurveyView";

import { Spinner } from "reactstrap";

import { getAllData2 } from "../../../../actions/surveyActions";

class Main extends Component {
    constructor(props) {
        super(props);

        this.props.getAllData2();
    }

    // componentDidMount() {
    //     this.props.getAllData2();
    // }

    render() {
        const { surveys, csat_rcas } = this.props;

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
                    <Fragment>
                        {csat_rcas ? (
                            <Fragment>
                                <DriverView />
                                <SurveyView data={csat_rcas} />
                            </Fragment>
                        ) : (
                            "No Survey found"
                        )}
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    surveys: state.surveys.surveys,
    csat_rcas: state.surveys.csat_rcas,
    isFetching: state.surveys.isFetching,
    auth: state.auth
});

export default connect(mapStateToProps, {
    getAllData2
})(Main);
