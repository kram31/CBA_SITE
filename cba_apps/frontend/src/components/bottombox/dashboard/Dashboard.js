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

class Dashboard extends Component {
    state = {
        monthSelection: [],
        selectedMonth: "",
        curr_year: "",
        curr_month: ""
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

        this.setState({
            monthSelection,
            curr_year,
            curr_month
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <Fragment>
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
                                <option value="">Select Month</option>
                                {this.state.monthSelection.map(item => (
                                    <option key={item.int} value={item.int}>
                                        {item.string}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                        <Row className="mb-5">
                            <Col md={4}>
                                <Fade>
                                    <DougnutChartBottomboxSurveys
                                        selectedMonth={this.state.selectedMonth}
                                        curr_year={this.state.curr_year}
                                        curr_month={this.state.curr_month}
                                    />
                                </Fade>
                            </Col>
                            <Col md={4}>
                                <Fade>
                                    <PieChartCompletedSurveysCount />
                                </Fade>
                            </Col>
                            <Col md={4}>
                                <Fade>
                                    <BarChartSurveyTopDrivers />
                                </Fade>
                            </Col>
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

export default Dashboard;
