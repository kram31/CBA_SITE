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

import StackedBarChart from "./Charts/StackedBarChart";
import { connect } from "react-redux";

import { Bar, HorizontalBar, Line } from "react-chartjs-2";

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
        let dataset = this.props.chart_data.map(item =>
            Object.values(item)[0]
                .filter(survey => survey.completed === true)
                .map(item => item.dsat_cause.name)
                .reduce((r, k) => {
                    r[k] = 1 + r[k] || 1;
                    return r;
                }, {})
        );

        return this.props.dsat_code1
            .map(code => {
                let data = [];
                dataset.forEach(x => {
                    return Object.keys(x).includes(code.name)
                        ? data.push(x[code.name])
                        : data.push(0);
                });

                return {
                    label: code.name,
                    data: data,
                    backgroundColor: this.getRandomColor()
                };
            })
            .filter(item => item.data.reduce((total, num) => total - num) != 0);
    };

    getAccountableTeams = () => {
        let dataset = this.props.chart_data.map(item =>
            Object.values(item)[0]
                .filter(survey => survey.completed === true)
                .map(item => item.accountable_team)
                .reduce((r, k) => {
                    r[k] = 1 + r[k] || 1;
                    return r;
                }, {})
        );

        return this.props.teams
            .map(team => {
                let data = [];
                dataset.forEach(x => {
                    return Object.keys(x).includes(team.name)
                        ? data.push(x[team.name])
                        : data.push(0);
                });

                return {
                    label: team.name,
                    data: data,
                    backgroundColor: this.getRandomColor()
                };
            })
            .filter(item => item.data.reduce((total, num) => total - num) != 0);
    };

    getSurveyPerSilo = () => {
        let dataset = this.props.chart_data.map(item =>
            Object.values(item)[0]
                .filter(survey => survey.completed === true)
                .map(item => item.support_silo_issue_based)
                .reduce((r, k) => {
                    r[k] = 1 + r[k] || 1;
                    return r;
                }, {})
        );

        return this.props.skills
            .map(team => {
                let data = [];
                dataset.forEach(x => {
                    return Object.keys(x).includes(team.name)
                        ? data.push(x[team.name])
                        : data.push(0);
                });

                return {
                    label: team.name,
                    data: data,
                    backgroundColor: this.getRandomColor()
                };
            })
            .filter(item => item.data.reduce((total, num) => total - num) != 0);
    };

    getSPGControllability = () => {
        let budi_bu_list = [
            ...new Set(this.props.surveys.map(survey => survey.budi_bu))
        ];
        let dataset = this.props.chart_data.map(item =>
            Object.values(item)[0]
                .map(item => item.budi_bu)
                .reduce((r, k) => {
                    r[k] = 1 + r[k] || 1;
                    return r;
                }, {})
        );

        return budi_bu_list
            .map(spg => {
                let data = [];
                dataset.forEach(x => {
                    return Object.keys(x).includes(spg)
                        ? data.push(x[spg])
                        : data.push(0);
                });

                return {
                    label: spg,
                    data: data,
                    backgroundColor: this.getRandomColor()
                };
            })
            .filter(item => item.data.reduce((total, num) => total - num) != 0);
    };

    getRandomColor = () => {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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
                                    <Row className="mt-3">
                                        <Col>
                                            <Line
                                                data={{
                                                    datasets: [
                                                        {
                                                            label:
                                                                "Bottombox %",
                                                            data: this.props.chart_data.map(
                                                                item => {
                                                                    let surveyCount = Object.values(
                                                                        item
                                                                    )[0].length;

                                                                    let bottomboxCount = Object.values(
                                                                        item
                                                                    )[0].filter(
                                                                        survey =>
                                                                            survey.bottombox ===
                                                                            1
                                                                    ).length;

                                                                    let percentage =
                                                                        (bottomboxCount /
                                                                            surveyCount) *
                                                                        100;

                                                                    return percentage.toFixed(
                                                                        2
                                                                    );
                                                                }
                                                            ),
                                                            backgroundColor:
                                                                "black",
                                                            fill: true,
                                                            backgroundColor:
                                                                "rgba(240, 255, 0, .5)",

                                                            borderColor: "black"
                                                        }
                                                    ],
                                                    labels: this.props.chart_data.map(
                                                        item =>
                                                            Object.keys(item)[0]
                                                    )
                                                }}
                                                options={{
                                                    title: {
                                                        display: true,
                                                        text:
                                                            "Bottombox % Trend",
                                                        fontSize: "20"
                                                    },
                                                    tooltips: {
                                                        mode: "index",
                                                        intersect: false
                                                    },
                                                    hover: {
                                                        mode: "nearest",
                                                        intersect: true
                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,

                                                    scales: {
                                                        xAxes: [],
                                                        yAxes: [
                                                            {
                                                                ticks: {
                                                                    callback: function(
                                                                        value
                                                                    ) {
                                                                        return (
                                                                            value +
                                                                            "%"
                                                                        );
                                                                    }
                                                                }
                                                                // scaleLabel: {
                                                                //     display: true,
                                                                //     labelString:
                                                                //         "Percentage"
                                                                // }
                                                            }
                                                        ]
                                                    },
                                                    plugins: {
                                                        datalabels: {
                                                            anchor: "end",
                                                            align: "top",
                                                            // formatter: Math.round,
                                                            font: {
                                                                weight: "bold"
                                                            }
                                                        }
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
                                                    title: {
                                                        display: true,
                                                        text:
                                                            "Bottombox count trend",
                                                        fontSize: "20"
                                                    },
                                                    tooltips: {
                                                        mode: "index",
                                                        intersect: false
                                                    },
                                                    hover: {
                                                        mode: "nearest",
                                                        intersect: true
                                                    },
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
                                                    },
                                                    plugins: {
                                                        datalabels: {
                                                            // formatter: Math.round,
                                                            font: {
                                                                weight: "bold"
                                                            },

                                                            color: "gray"
                                                        }
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
                                                                "Completed RCA",
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
                                                            label: "",
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
                                                    title: {
                                                        display: true,
                                                        text:
                                                            "RCA completion count",
                                                        fontSize: "20"
                                                    },
                                                    tooltips: {
                                                        mode: "index",
                                                        intersect: false
                                                    },
                                                    hover: {
                                                        mode: "nearest",
                                                        intersect: true
                                                    },
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
                                                    },
                                                    plugins: {
                                                        datalabels: {
                                                            // formatter: Math.round,
                                                            font: {
                                                                weight: "bold"
                                                            },

                                                            color: "gray"
                                                        }
                                                    }
                                                }}
                                                height={300}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-3">
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
                                                    barShowStroke: false,
                                                    title: {
                                                        display: true,
                                                        text:
                                                            "Bottombox Top Drivers",
                                                        fontSize: "20"
                                                    },
                                                    tooltips: {
                                                        mode: "index",
                                                        intersect: false
                                                    },
                                                    hover: {
                                                        mode: "nearest",
                                                        intersect: true
                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    scales: {
                                                        yAxes: [
                                                            {
                                                                ticks: {
                                                                    beginAtZero: true
                                                                },
                                                                stacked: true
                                                            }
                                                        ],
                                                        xAxes: [
                                                            {
                                                                stacked: true
                                                            }
                                                        ]
                                                    },

                                                    plugins: {
                                                        datalabels: {
                                                            // formatter: Math.round,
                                                            font: {
                                                                weight: "bold"
                                                            },

                                                            color: "gray"
                                                        }
                                                    }
                                                }}
                                                height={300}
                                            />
                                        </Col>
                                        <Col>
                                            <Bar
                                                data={{
                                                    datasets: this.getAccountableTeams(),
                                                    labels: this.props.chart_data.map(
                                                        item =>
                                                            Object.keys(item)[0]
                                                    )
                                                }}
                                                options={{
                                                    barShowStroke: false,
                                                    title: {
                                                        display: true,
                                                        text:
                                                            "Bottombox Accountable Teams",
                                                        fontSize: "20"
                                                    },
                                                    tooltips: {
                                                        mode: "index",
                                                        intersect: false
                                                    },
                                                    hover: {
                                                        mode: "nearest",
                                                        intersect: true
                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    scales: {
                                                        yAxes: [
                                                            {
                                                                ticks: {
                                                                    beginAtZero: true
                                                                },
                                                                stacked: true
                                                            }
                                                        ],
                                                        xAxes: [
                                                            {
                                                                stacked: true
                                                            }
                                                        ]
                                                    },

                                                    plugins: {
                                                        datalabels: {
                                                            // formatter: Math.round,
                                                            font: {
                                                                weight: "bold"
                                                            },

                                                            color: "gray"
                                                        }
                                                    }
                                                }}
                                                height={300}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            <HorizontalBar
                                                data={{
                                                    datasets: [
                                                        {
                                                            label:
                                                                "ITSD Controllable",
                                                            data: this.props.chart_data.map(
                                                                item => {
                                                                    let itsd_count = Object.values(
                                                                        item
                                                                    )[0].filter(
                                                                        survey =>
                                                                            survey.controllability ===
                                                                            "ITSD Controllable"
                                                                    ).length;

                                                                    let bottombox_count = Object.values(
                                                                        item
                                                                    )[0].filter(
                                                                        survey =>
                                                                            survey.completed ===
                                                                            true
                                                                    ).length;

                                                                    return (
                                                                        (itsd_count /
                                                                            bottombox_count) *
                                                                        100
                                                                    ).toFixed(
                                                                        2
                                                                    );
                                                                }
                                                            ),
                                                            backgroundColor:
                                                                "green"
                                                        },
                                                        {
                                                            label:
                                                                "Non ITSD Controllable",
                                                            data: this.props.chart_data.map(
                                                                item => {
                                                                    let non_itsd_count = Object.values(
                                                                        item
                                                                    )[0].filter(
                                                                        survey =>
                                                                            survey.controllability ===
                                                                            "Non ITSD Controllable"
                                                                    ).length;

                                                                    let bottombox_count = Object.values(
                                                                        item
                                                                    )[0].filter(
                                                                        survey =>
                                                                            survey.completed ===
                                                                            true
                                                                    ).length;

                                                                    return (
                                                                        (non_itsd_count /
                                                                            bottombox_count) *
                                                                        100
                                                                    ).toFixed(
                                                                        2
                                                                    );
                                                                }
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
                                                    title: {
                                                        display: true,
                                                        text:
                                                            "Bottombox Controllability",
                                                        fontSize: "20"
                                                    },
                                                    tooltips: {
                                                        mode: "index",
                                                        intersect: false
                                                    },
                                                    hover: {
                                                        mode: "nearest",
                                                        intersect: true
                                                    },
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
                                                    },
                                                    plugins: {
                                                        datalabels: {
                                                            // formatter: Math.round,
                                                            font: {
                                                                weight: "bold"
                                                            },

                                                            color: "yellow"
                                                        }
                                                    }
                                                }}
                                                height={300}
                                            />
                                        </Col>
                                        <Col>
                                            <Bar
                                                data={{
                                                    datasets: this.getSurveyPerSilo(),
                                                    labels: this.props.chart_data.map(
                                                        item =>
                                                            Object.keys(item)[0]
                                                    )
                                                }}
                                                options={{
                                                    barShowStroke: false,
                                                    title: {
                                                        display: true,
                                                        text: "Survey Per SILO",
                                                        fontSize: "20"
                                                    },
                                                    tooltips: {
                                                        mode: "index",
                                                        intersect: false
                                                    },
                                                    hover: {
                                                        mode: "nearest",
                                                        intersect: true
                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    scales: {
                                                        yAxes: [
                                                            {
                                                                ticks: {
                                                                    beginAtZero: true
                                                                },
                                                                stacked: true
                                                            }
                                                        ],
                                                        xAxes: [
                                                            {
                                                                stacked: true
                                                            }
                                                        ]
                                                    },

                                                    plugins: {
                                                        datalabels: {
                                                            // formatter: Math.round,
                                                            font: {
                                                                weight: "bold"
                                                            },

                                                            color: "gray"
                                                        }
                                                    }
                                                }}
                                                height={300}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            <HorizontalBar
                                                data={{
                                                    datasets: this.getSPGControllability(),
                                                    labels: this.props.chart_data.map(
                                                        item =>
                                                            Object.keys(item)[0]
                                                    )
                                                }}
                                                options={{
                                                    legend: {
                                                        display: true,
                                                        position: "right",
                                                        onClick: null
                                                    },
                                                    barShowStroke: false,
                                                    title: {
                                                        display: true,
                                                        text:
                                                            "SPG Controllability",
                                                        fontSize: "20"
                                                    },
                                                    tooltips: {
                                                        mode: "index",
                                                        intersect: false
                                                    },
                                                    hover: {
                                                        mode: "nearest",
                                                        intersect: true
                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    scales: {
                                                        yAxes: [
                                                            {
                                                                ticks: {
                                                                    beginAtZero: true
                                                                },
                                                                stacked: true
                                                            }
                                                        ],
                                                        xAxes: [
                                                            {
                                                                stacked: true
                                                            }
                                                        ]
                                                    },

                                                    plugins: {
                                                        datalabels: {
                                                            // formatter: Math.round,
                                                            font: {
                                                                weight: "bold"
                                                            },

                                                            color: "gray"
                                                        }
                                                    }
                                                }}
                                                height={300}
                                            />
                                        </Col>
                                    </Row>
                                </Fragment>
                            }
                        />
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
    teams: state.surveys.teams,
    agentCompState: state.surveys.agentCompState,
    teamleads: state.surveys.teamleads,
    skills: state.surveys.skills,
    surveys: state.surveys.surveys,
    filtered_data: state.surveys.filtered_data,
    chart_data: state.surveys.chart_data,
    rcas: state.surveys.rcas,
    dsat_code1: state.surveys.dsat_code1,
    agent_view_collapse: state.surveys.agent_view_collapse,
    bottombox_view_collapse: state.surveys.bottombox_view_collapse
});

export default connect(mapStateToProps, {})(Dashboard);
