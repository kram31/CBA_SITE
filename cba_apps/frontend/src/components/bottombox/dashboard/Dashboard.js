import React, { Component, Fragment } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

import StackedBarChart from "./Charts/StackedBarChart";
import { connect } from "react-redux";

import { Bar, HorizontalBar, Line } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";

defaults.global.defaultFontColor = "white";
defaults.global.legend.display = true;
defaults.global.title.position = "top";

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
    // componentDidMount() {
    //     let curr = new Date();

    //     let curr_year = curr.getFullYear();
    //     let curr_month = curr.getMonth() + 1;

    //     let monthRangeInt = Array.from(new Array(curr_month), (x, i) => i + 1);

    //     let monthSelection = monthRangeInt.map(item => {
    //         let monthName = new Intl.DateTimeFormat("en-US", { month: "short" })
    //             .format;
    //         let name = monthName(new Date(`${curr_year}-${item}-01`));
    //         return { string: name, int: item };
    //     });

    //     this.setState({
    //         monthSelection,
    //         curr_year,
    //         curr_month,
    //         curr_month_string: monthSelection[10].string,
    //         dateFilteredSurveys: this.props.surveys.filter(
    //             survey =>
    //                 new Date(survey.date_issued).getMonth() + 1 == curr_month
    //         ),
    //         dateFilteredRcas: this.props.rcas.filter(
    //             rca =>
    //                 new Date(rca.survey_date_issued).getMonth() + 1 ==
    //                 curr_month
    //         )
    //     });
    // }

    // console.log(nextState.selectedMonth)

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.selectedMonth === nextState.selectedMonth; // equals() is your implementation
    // }

    datasetKeyProvider = () => Math.random();

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

    getListTopDrivers = () => {
        return this.props.chart_data.map(item =>
            Object.values(item)[0]
                .filter(survey => survey.completed === true)
                .map(item => item.dsat_cause.name)
                .reduce((r, k) => {
                    r[k] = 1 + r[k] || 1;
                    return r;
                }, {})
        );
    };

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
            .map((code, i) => {
                let data = [];
                dataset.forEach(x => {
                    return Object.keys(x).includes(code.name)
                        ? data.push(x[code.name])
                        : data.push(0);
                });

                return {
                    label: code.name,
                    data: data,
                    backgroundColor: !this.props.colors[i]
                        ? this.getRandomColor()
                        : this.props.colors[i]
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
            .map((team, i) => {
                let data = [];
                dataset.forEach(x => {
                    return Object.keys(x).includes(team.name)
                        ? data.push(x[team.name])
                        : data.push(0);
                });

                return {
                    label: team.name,
                    data: data,
                    backgroundColor: !this.props.colors[i]
                        ? this.getRandomColor()
                        : this.props.colors[i]
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
            .map((team, i) => {
                let data = [];
                dataset.forEach(x => {
                    return Object.keys(x).includes(team.name)
                        ? data.push(x[team.name])
                        : data.push(0);
                });

                return {
                    label: team.name,
                    data: data,
                    backgroundColor: !this.props.colors[i]
                        ? this.getRandomColor()
                        : this.props.colors[i]
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
            .map((spg, i) => {
                let data = [];
                dataset.forEach(x => {
                    return Object.keys(x).includes(spg)
                        ? data.push(x[spg])
                        : data.push(0);
                });
                // let color_length = this.props.color.length;
                return {
                    label: spg,
                    data: data,
                    backgroundColor: !this.props.colors[i]
                        ? this.getRandomColor()
                        : this.props.colors[i]
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

    chart_height = 350;

    combinedData = this.props.surveys.map(survey => {
        let x = this.props.rcas.filter(
            rca => rca.surveyed_ticket === survey.reference_number
        )[0];
        return { ...survey, ...x };
    });
    render() {
  
        return (
            <Fragment>
                <Card>
                    <CardHeader>
                        <h4>
                            <strong>Dashboard</strong>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <StackedBarChart
                            filtered_list={this.combinedData}
                            chart_parent={
                                <Fragment>
                                    <Row className="mt-3 px-3">
                                        <Col className="py-4 mx-2 border border-white">
                                            <Line
                                                datasetKeyProvider={
                                                    this.datasetKeyProvider
                                                }
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
                                                                "white",
                                                            fill: true,
                                                            backgroundColor:
                                                                "rgba(100, 255, 0, .8)",

                                                            borderColor: "white"
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
                                                height={this.chart_height}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-4 px-3">
                                        <Col className="py-4 mx-2 border border-white">
                                            <Bar
                                                datasetKeyProvider={
                                                    this.datasetKeyProvider
                                                }
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
                                                                "#ffed00"
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
                                                                "#64ff00"
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
                                                            anchor: "start",
                                                            align: "top",
                                                            // formatter: Math.round,
                                                            font: {
                                                                weight: "bold"
                                                            },
                                                            display: function(
                                                                context
                                                            ) {
                                                                return (
                                                                    context
                                                                        .dataset
                                                                        .data[
                                                                        context
                                                                            .dataIndex
                                                                    ] > 1
                                                                );
                                                            }
                                                        }
                                                    }
                                                }}
                                                height={this.chart_height}
                                            />
                                        </Col>
                                        <Col className="py-4 ml-2 border border-white">
                                            <Bar
                                                datasetKeyProvider={
                                                    this.datasetKeyProvider
                                                }
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
                                                                "#ffed00"
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
                                                                "#64ff00"
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
                                                            display: function(
                                                                context
                                                            ) {
                                                                return (
                                                                    context
                                                                        .dataset
                                                                        .data[
                                                                        context
                                                                            .dataIndex
                                                                    ] > 1
                                                                );
                                                            }
                                                        }
                                                    }
                                                }}
                                                height={this.chart_height}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-4 px-3">
                                        <Col className="py-4 mx-2 border border-white">
                                            <Bar
                                                datasetKeyProvider={
                                                    this.datasetKeyProvider
                                                }
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
                                                            }
                                                        },
                                                        display: function(
                                                            context
                                                        ) {
                                                            return (
                                                                context.dataset
                                                                    .data[
                                                                    context
                                                                        .dataIndex
                                                                ] > 1
                                                            );
                                                        }
                                                    }
                                                }}
                                                height={this.chart_height}
                                            />
                                        </Col>
                                        <Col className="py-4 ml-2 border border-white">
                                            <Bar
                                                datasetKeyProvider={
                                                    this.datasetKeyProvider
                                                }
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
                                                        },
                                                        display: function(
                                                            context
                                                        ) {
                                                            return (
                                                                context.dataset
                                                                    .data[
                                                                    context
                                                                        .dataIndex
                                                                ] > 1
                                                            );
                                                        }
                                                    }
                                                }}
                                                height={this.chart_height}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-4 px-3">
                                        <Col className="py-4 mx-2 border border-white">
                                            <HorizontalBar
                                                datasetKeyProvider={
                                                    this.datasetKeyProvider
                                                }
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
                                                                "#ffed00"
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
                                                                "#64ff00"
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

                                                            color: "white"
                                                        },
                                                        display: function(
                                                            context
                                                        ) {
                                                            return (
                                                                context.dataset
                                                                    .data[
                                                                    context
                                                                        .dataIndex
                                                                ] > 1
                                                            );
                                                        }
                                                    }
                                                }}
                                                height={this.chart_height}
                                            />
                                        </Col>
                                        <Col className="py-4 ml-2 border border-white">
                                            <Bar
                                                datasetKeyProvider={
                                                    this.datasetKeyProvider
                                                }
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
                                                        },
                                                        display: function(
                                                            context
                                                        ) {
                                                            return (
                                                                context.dataset
                                                                    .data[
                                                                    context
                                                                        .dataIndex
                                                                ] > 1
                                                            );
                                                        }
                                                    }
                                                }}
                                                height={this.chart_height}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-4 px-3">
                                        <Col className="py-4 mx-2 border border-white">
                                            <HorizontalBar
                                                datasetKeyProvider={
                                                    this.datasetKeyProvider
                                                }
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
                                                            }
                                                        },
                                                        display: function(
                                                            context
                                                        ) {
                                                            return (
                                                                context.dataset
                                                                    .data[
                                                                    context
                                                                        .dataIndex
                                                                ] > 1
                                                            );
                                                        }
                                                    }
                                                }}
                                                height={600}
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
    bottombox_view_collapse: state.surveys.bottombox_view_collapse,
    colors: state.surveys.colors
});

export default connect(mapStateToProps, {})(Dashboard);
