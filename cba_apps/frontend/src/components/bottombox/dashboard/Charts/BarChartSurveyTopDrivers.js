import React, { Component } from "react";
import { Bar, HorizontalBar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

class BarChartSurveyTopDrivers extends Component {
    state = {
        code3_labels: [],
        code3_data: [],
        dateFilteredRcas: [],
        labels: [],
        data: [],
        chartReference: {},
        code2_top_drivers: [],
        option: {
            legend: { display: false },
            layout: {
                padding: {
                    left: 50,
                    right: 50,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            },

            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                // Change options for ALL labels of THIS CHART
                datalabels: {
                    // formatter: (value, ctx) => {
                    //     let sum = 0;
                    //     let dataArr =
                    //         ctx.chart.data.datasets[0].data;
                    //     dataArr.map(data => {
                    //         sum += data;
                    //     });
                    //     let percentage =
                    //         ((value * 100) / sum).toFixed(2) + "%";

                    //     return percentage;
                    // },
                    color: "#36A2EB",
                    anchor: "end",
                    align: "start",
                    offset: 4
                }
            }
        }
    };

    componentDidMount() {
        let rca_data = this.props.dateFilteredRcas
            .map(item => item.dsat_cause.name)
            .reduce((r, k) => {
                r[k] = 1 + r[k] || 1;
                return r;
            }, {});

        let labels = Object.keys(rca_data);
        let data = Object.values(rca_data);

        let code2_top_drivers = [];

        labels.forEach(item =>
            code2_top_drivers.push({
                [item]: this.props.dateFilteredRcas
                    .filter(rca => rca.dsat_cause.name === item)
                    .map(rca => rca.bb_driver_code2.name)
            })
        );

        let dateFilteredRcas = this.props.dateFilteredRcas;

        let code3_drivers = this.props.dateFilteredRcas
            .map(item => item.bb_driver_code3.name)
            .reduce((r, k) => {
                r[k] = 1 + r[k] || 1;
                return r;
            }, {});

        this.setState({
            labels,
            data,
            code2_top_drivers,
            dateFilteredRcas,
            code3_labels: Object.keys(code3_drivers),
            code3_data: Object.values(code3_drivers)
        });
    }

    render() {
        console.log(this.props.dateFilteredRcas);
        return (
            <div>
                <Row>
                    <Col>
                        <HorizontalBar
                            onElementsClick={elems => console.log(elems[0])}
                            ref={reference =>
                                (this.state.chartReference = reference)
                            }
                            data={{
                                labels: this.state.labels,
                                datasets: [
                                    {
                                        label: "DSAT Top Drivers",

                                        data: this.state.data,
                                        backgroundColor: [
                                            "blue",
                                            "black",
                                            "yellow"
                                        ]
                                    }
                                ]
                            }}
                            // width={100}
                            height={250}
                            options={{
                                ...this.state.option,
                                title: {
                                    display: true,
                                    text: "DSAT Top Drivers",
                                    fontSize: "20"
                                },
                                scales: {
                                    xAxes: [
                                        {
                                            ticks: {
                                                beginAtZero: true
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Bottombox Code 2 Top drivers per DSAT Code</h3>
                    </Col>
                </Row>
                <Row>
                    {this.state.code2_top_drivers
                        .map(item => Object.keys(item)[0])
                        .map(item => (
                            <Col key={item}>
                                <Bar
                                    onElementsClick={elems =>
                                        console.log(elems[0])
                                    }
                                    ref={reference =>
                                        (this.state.chartReference = reference)
                                    }
                                    data={{
                                        labels: Object.keys(
                                            this.props.dateFilteredRcas
                                                .filter(
                                                    a =>
                                                        a.dsat_cause.name ===
                                                        item
                                                )
                                                .map(
                                                    b => b.bb_driver_code2.name
                                                )
                                                .reduce((r, k) => {
                                                    r[k] = 1 + r[k] || 1;
                                                    return r;
                                                }, {})
                                        ),
                                        datasets: [
                                            {
                                                label: "BB Code 2 Top Drivers",

                                                data: Object.values(
                                                    this.props.dateFilteredRcas
                                                        .filter(
                                                            a =>
                                                                a.dsat_cause
                                                                    .name ===
                                                                item
                                                        )
                                                        .map(
                                                            b =>
                                                                b
                                                                    .bb_driver_code2
                                                                    .name
                                                        )
                                                        .reduce((r, k) => {
                                                            r[k] =
                                                                1 + r[k] || 1;
                                                            return r;
                                                        }, {})
                                                ),
                                                backgroundColor: [
                                                    "blue",
                                                    "black",
                                                    "yellow"
                                                ]
                                            }
                                        ]
                                    }}
                                    // width={100}
                                    height={250}
                                    options={{
                                        ...this.state.option,
                                        title: {
                                            display: true,
                                            text: item,
                                            fontSize: "20"
                                        }
                                    }}
                                />
                            </Col>
                        ))}
                </Row>
                <Row>
                    <Col>
                        <Bar
                            onElementsClick={elems => console.log(elems[0])}
                            ref={reference =>
                                (this.state.chartReference = reference)
                            }
                            data={{
                                labels: this.state.code3_labels,
                                datasets: [
                                    {
                                        label: "Bottombox Code 3 Top Drivers",

                                        data: this.state.code3_data,
                                        backgroundColor: [
                                            "blue",
                                            "black",
                                            "yellow"
                                        ]
                                    }
                                ]
                            }}
                            // width={100}
                            height={250}
                            options={{
                                ...this.state.option,
                                title: {
                                    display: true,
                                    text: "Bottombox Code 3 Top Drivers",
                                    fontSize: "20"
                                },
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
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    rcas: state.surveys.rcas
});

export default connect(
    mapStateToProps,
    {}
)(BarChartSurveyTopDrivers);
