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
import StackedBarChart from "./Charts/StackedBarChart";
import { connect } from "react-redux";

import { Bar, HorizontalBar } from "react-chartjs-2";

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

    // FIX THIS!!!!

    getTopDrivers = () => {
    
        let dataset = this.props.chart_data
            .map(item =>
                Object.values(item)[0]
                    .filter(survey => survey.completed === true)
                    .map(item => item.dsat_cause.name)
                    .reduce((r, k) => {
                        r[k] = 1 + r[k] || 1;
                        return r;
                    }, {})
            )
        
        return this.props.dsat_code1.map(code => {
            let data = [];
            dataset.forEach(x => {
                return Object.keys(x).includes(code.name) ? data.push(x[code.name]) : data.push(0)
            })

            return {
                label: code.name,
                data: data,
                backgroundColor: "yellow"
            }
        })
      
    };

    render() {
        let combinedData = this.props.surveys.map(survey => {
            let x = this.props.rcas.filter(
                rca => rca.surveyed_ticket === survey.reference_number
            )[0];
            return { ...survey, ...x };
        });
        return (
            <Fragment>
                <Card>
                    <CardHeader>Dashboard</CardHeader>
                    <CardBody>
                        <StackedBarChart
                            filtered_list={combinedData}
                            chart_parent={
                                <Fragment>
                                    <Row>
                                        <Col>
                                            <Bar
                                                data={{
                                                    datasets: [
                                                        {
                                                            label: "Topbox",
                                                            data: this.props.chart_data.map(
                                                                item =>
                                                                    Object.values(
                                                                        item
                                                                    )[0].filter(
                                                                        survey =>
                                                                            survey.bottombox !=
                                                                            1
                                                                    ).length
                                                            ),
                                                            backgroundColor:
                                                                "black"
                                                        },
                                                        {
                                                            label: "Bottombox",
                                                            data: this.props.chart_data.map(
                                                                item =>
                                                                    Object.values(
                                                                        item
                                                                    )[0].filter(
                                                                        survey =>
                                                                            survey.bottombox ===
                                                                            1
                                                                    ).length
                                                            ),
                                                            backgroundColor:
                                                                "yellow"
                                                        }
                                                    ],
                                                    labels: this.props.chart_data.map(
                                                        item =>
                                                            Object.keys(item)[0]
                                                    )
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    scales: {
                                                        xAxes: [
                                                            {
                                                                stacked: true
                                                            }
                                                        ],
                                                        yAxes: [
                                                            {
                                                                stacked: true
                                                            }
                                                        ]
                                                    }
                                                }}
                                                height={300}
                                            />
                                        </Col>
                                        <Col>
                                            <Bar
                                                data={{
                                                    datasets: [
                                                        {
                                                            label:
                                                                "RCA Completed",
                                                            data: this.props.chart_data.map(
                                                                item =>
                                                                    Object.values(
                                                                        item
                                                                    )[0].filter(
                                                                        survey =>
                                                                            survey.completed ===
                                                                            true
                                                                    ).length
                                                            ),
                                                            backgroundColor:
                                                                "yellow"
                                                        },
                                                        {
                                                            label:
                                                                "Surveys needs RCA",
                                                            data: this.props.chart_data.map(
                                                                item =>
                                                                    Object.values(
                                                                        item
                                                                    )[0].filter(
                                                                        survey =>
                                                                            survey.completed ===
                                                                            false
                                                                    ).length
                                                            ),
                                                            backgroundColor:
                                                                "black"
                                                        }
                                                    ],
                                                    labels: this.props.chart_data.map(
                                                        item =>
                                                            Object.keys(item)[0]
                                                    )
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    scales: {
                                                        xAxes: [
                                                            {
                                                                stacked: true
                                                            }
                                                        ],
                                                        yAxes: [
                                                            {
                                                                stacked: true
                                                            }
                                                        ]
                                                    }
                                                }}
                                                height={300}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
         
                     
                                            <Bar
                                              
                                                data={{
                                      
                                                    datasets: this.getTopDrivers(),
                                                    labels: this.props.chart_data.map(
                                                        item =>
                                                            Object.keys(item)[0]
                                                    )
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    scales: {
                                                        yAxes: [
                                                            {
                                                                ticks: {
                                                                    beginAtZero: true
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }}
                                                height={300}
                                            />
                                        </Col>
                                        <Col>
                                            <HorizontalBar
                                                data={{
                                                    datasets: [
                                                        {
                                                            label:
                                                                "ITSD Controllable",
                                                            data: this.props.chart_data.map(
                                                                item =>
                                                                    Object.values(
                                                                        item
                                                                    )[0].filter(
                                                                        survey =>
                                                                            survey.controllability ===
                                                                            "ITSD Controllable"
                                                                    ).length
                                                            ),
                                                            backgroundColor:
                                                                "green"
                                                        },
                                                        {
                                                            label:
                                                                "Non ITSD Controllable",
                                                            data: this.props.chart_data.map(
                                                                item =>
                                                                    Object.values(
                                                                        item
                                                                    )[0].filter(
                                                                        survey =>
                                                                            survey.controllability ===
                                                                            "Non ITSD Controllable"
                                                                    ).length
                                                            ),
                                                            backgroundColor:
                                                                "black"
                                                        }
                                                    ],
                                                    labels: this.props.chart_data.map(
                                                        item =>
                                                            Object.keys(item)[0]
                                                    )
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    scales: {
                                                        xAxes: [
                                                            {
                                                                stacked: true
                                                            }
                                                        ],
                                                        yAxes: [
                                                            {
                                                                stacked: true
                                                            }
                                                        ]
                                                    }
                                                }}
                                                height={300}
                                            />
                                        </Col>
                                    </Row>
                                </Fragment>
                            }
                        />
                        {/* <FormGroup>
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
                  Current Month - {this.state.curr_month_string}
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
                        dateFilteredSurveys={this.state.dateFilteredSurveys}
                      />
                    </Fade>
                  </Col>
                  <Col md={4}>
                    <Fade>
                      <PieChartCompletedSurveysCount
                        dateFilteredSurveys={this.state.dateFilteredSurveys}
                      />
                    </Fade>
                  </Col>
                </Fragment>
              ) : (
                <Fragment>
                  <Col md={4}>
                    <Fade>
                      <h4 style={this.state.noDataStyle}>No Data</h4>
                    </Fade>
                  </Col>
                  <Col md={4}>
                    <Fade>
                      <h4 style={this.state.noDataStyle}>No Data</h4>
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
                      dateFilteredRcas={this.state.dateFilteredRcas}
                    />
                  </Fade>
                </Col>
              ) : (
                <Col>
                  <Fade>
                    <h4 style={this.state.noDataStyle}>No Data</h4>
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
            </Row> */}
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
    agents: state.surveys.agents,
    agent: state.surveys.agent,
    agentCompState: state.surveys.agentCompState,
    teamleads: state.surveys.teamleads,
    skills: state.surveys.skills,
    surveys: state.surveys.surveys,
    filtered_data: state.surveys.filtered_data,
    chart_data: state.surveys.chart_data,
    rcas: state.surveys.rcas,
    dsat_code1: state.surveys.dsat_code1
});

export default connect(mapStateToProps, {})(Dashboard);
