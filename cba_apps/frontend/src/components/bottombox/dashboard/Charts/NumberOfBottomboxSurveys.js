import React, { Component, Fragment } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { connect } from "react-redux";

class NumberOfBottomboxSurveys extends Component {
    render() {
        let d = new Date();
        let monthName = new Intl.DateTimeFormat("en-US", { month: "long" })
            .format;
        let longName = monthName(d); // "July"
        return (
            <Fragment>
                <Card style={{ border: "none" }}>
                    <CardHeader>
                        Bottombox Surveys for the month of {longName}
                    </CardHeader>
                    <CardBody>
                        <h1 style={{ fontSize: 100, textAlign: "center" }}>
                            {
                                this.props.surveys.filter(
                                    item => item.bottombox == 1
                                ).length
                            }
                        </h1>
                    </CardBody>
                </Card>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    surveys: state.surveys.surveys
});

export default connect(
    mapStateToProps,
    {}
)(NumberOfBottomboxSurveys);
