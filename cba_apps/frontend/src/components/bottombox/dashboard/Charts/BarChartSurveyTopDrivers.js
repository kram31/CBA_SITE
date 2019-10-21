import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { connect } from "react-redux";

class BarChartSurveyTopDrivers extends Component {
    state = {
        chartData: {
            labels: ["Code 1", "Code 2", "Code 3"],
            datasets: [
                {
                    label: "Top Drivers",
                    data: [8, 5, 10],
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
    pieChartCompletedSurveysCount: state.surveys.pieChartCompletedSurveysCount
});

export default connect()(BarChartSurveyTopDrivers);
