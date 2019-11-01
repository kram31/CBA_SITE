import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { connect } from "react-redux";

class BarChartSurveyTopDrivers extends Component {
    state = {
        chartData: {
            labels: Object.keys(
                this.props.rcas
                    .map(item => item.dsat_cause.name)
                    .reduce((r, k) => {
                        r[k] = 1 + r[k] || 1;
                        return r;
                    }, {})
            ),
            datasets: [
                {
                    label: "Top Drivers",

                    data: Object.values(
                        this.props.rcas
                            .map(item => item.dsat_cause.name)
                            .reduce((acc, currValue) => {
                                acc[currValue] = 1 + acc[currValue] || 1;
                                return acc;
                            }, {})
                    ),
                    backgroundColor: ["blue", "black", "yellow"]
                }
            ]
        },
        chartReference: {}
    };

    render() {
        return (
            <div>
                <Bar
                    onElementsClick={elems => console.log(elems[0])}
                    ref={reference => (this.state.chartReference = reference)}
                    data={this.state.chartData}
                    // width={100}
                    height={250}
                    options={{
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
                        title: {
                            display: true,
                            text: "Top Drivers",
                            fontSize: "20"
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
                    }}
                />
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
