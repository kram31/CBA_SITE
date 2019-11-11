import React, { Component, Fragment } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Fade,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import BarChartSurveyTopDrivers from "./Charts/BarChartSurveyTopDrivers";
import DougnutChartBottomboxSurveys from "./Charts/DougnutChartBottomboxSurveys";
import PieChartCompletedSurveysCount from "./Charts/PieChartCompletedSurveysCount";
import NumberOfBottomboxSurveys from "./Charts/NumberOfBottomboxSurveys";
import LineChartCountofBottombox from "./Charts/LineChartCountofBottombox";
import LineChartAverageScorePerMonth from "./Charts/LineChartAverageScorePerMonth";
import { connect } from "react-redux";

class Dashboard extends Component {
    state = {
        monthSelection: [],
        selectedMonth: "",
        curr_year: "",
        curr_month: "",
        curr_month_string: "",
        dateFilteredSurveys: [],
        dateFilteredRcas: [],
        noDataStyle: {
            lineHeight: "100px",
            textAlign: "center",
            margin: "auto"
        }
    };
    componentDidMount() {
        let curr = new Date();

        let curr_year = curr.getFullYear();
        let curr_month = curr.getMonth() + 1;

        let monthRangeInt = Array.from(new Array(curr_month), (x, i) => i + 1);

        let monthSelection = monthRangeInt.map(item => {
            let monthName = new Intl.DateTimeFormat("en-US", { month: "short" })
                .format;
            let name = monthName(new Date(`${curr_year}-${item}-01`));
            return { string: name, int: item };
        });

        // let x = this.props.rcas.map(rca => {
        //     let m = {};
        //     this.props.surveys.forEach(survey =>
        //         survey.reference_number == rca.surveyed_ticket
        //             ? (m = { ...rca, survey_date_issued: survey.date_issued })
        //             : console.log("none")
        //     );

        //     return m;
        // });

        console.log(monthSelection[10].string);
        console.log(typeof curr_month);

        this.setState({
            monthSelection,
            curr_year,
            curr_month,
            curr_month_string: monthSelection[10].string,
            dateFilteredSurveys: this.props.surveys.filter(
                survey =>
                    new Date(survey.date_issued).getMonth() + 1 == curr_month
            ),
            dateFilteredRcas: this.props.rcas.filter(
                rca =>
                    new Date(rca.survey_date_issued).getMonth() + 1 ==
                    curr_month
            )
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            dateFilteredSurveys: this.props.surveys.filter(
                survey =>
                    new Date(survey.date_issued).getMonth() + 1 ==
                    e.target.value
            ),
            dateFilteredRcas: this.props.rcas.filter(
                rca =>
                    new Date(rca.survey_date_issued).getMonth() + 1 ==
                    e.target.value
            )
        });
    };

    render() {
        return (
            <Fragment>
                {console.log(this.props.rcas)}
                {console.log(this.state.dateFilteredSurveys)}
                <Card>
                    <CardHeader>Dashboard</CardHeader>
                    <CardBody>
                        <FormGroup>
                            <Label size="sm" for="selectMonth">
                                Select Month
                            </Label>
                            <Input
                                type="select"
                                name="select"
                                id="selectMonth"
                                name="selectedMonth"
                                value={this.state.selectedMonth}
                                onChange={this.handleChange}
                            >
                                <option value="">
                                    Current Month -{" "}
                                    {this.state.curr_month_string}
                                </option>

                                {this.state.monthSelection.map(item => (
                                    <option key={item.int} value={item.int}>
                                        {item.string}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                        <Row className="mb-5">
                            {this.state.dateFilteredSurveys.length != 0 ? (
                                <Fragment>
                                    <Col md={4}>
                                        <Fade>
                                            <DougnutChartBottomboxSurveys
                                                dateFilteredSurveys={
                                                    this.state
                                                        .dateFilteredSurveys
                                                }
                                            />
                                        </Fade>
                                    </Col>
                                    <Col md={4}>
                                        <Fade>
                                            <PieChartCompletedSurveysCount
                                                dateFilteredSurveys={
                                                    this.state
                                                        .dateFilteredSurveys
                                                }
                                            />
                                        </Fade>
                                    </Col>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Col md={4}>
                                        <Fade>
                                            <h4 style={this.state.noDataStyle}>
                                                No Data
                                            </h4>
                                        </Fade>
                                    </Col>
                                    <Col md={4}>
                                        <Fade>
                                            <h4 style={this.state.noDataStyle}>
                                                No Data
                                            </h4>
                                        </Fade>
                                    </Col>
                                </Fragment>
                            )}
                        </Row>
                        <Row>
                            {this.state.dateFilteredRcas.length != 0 ? (
                                <Col>
                                    <Fade>
                                        <BarChartSurveyTopDrivers
                                            dateFilteredRcas={
                                                this.state.dateFilteredRcas
                                            }
                                        />
                                    </Fade>
                                </Col>
                            ) : (
                                <Col>
                                    <Fade>
                                        <h4 style={this.state.noDataStyle}>
                                            No Data
                                        </h4>
                                    </Fade>
                                </Col>
                            )}
                        </Row>
                        <Row className="mb-5">
                            <Col>
                                <Fade>
                                    <LineChartAverageScorePerMonth />
                                </Fade>
                            </Col>
                            <Col>
                                <Fade>
                                    <LineChartCountofBottombox />
                                </Fade>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    rcas: state.surveys.rcas.map(rca => {
        let m = {};
        state.surveys.surveys.forEach(
            survey =>
                survey.reference_number == rca.surveyed_ticket &&
                (m = { ...rca, survey_date_issued: survey.date_issued })
        );

        return m;
    }),
    surveys: state.surveys.surveys
});

export default connect(
    mapStateToProps,
    {}
)(Dashboard);
