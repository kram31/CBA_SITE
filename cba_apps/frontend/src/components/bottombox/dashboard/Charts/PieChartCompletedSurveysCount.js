import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { connect } from "react-redux";

class PieChartCompletedSurveysCount extends Component {
    state = {
        chartData: {
            labels: ["Completed Surveys", "Total number of Surveys"],
            datasets: [
                {
                    label: "Completed number of Surveys",
                    data: this.props.pieChartCompletedSurveysCount,
                    backgroundColor: ["green", "black"]
                }
            ]
        },
        chartReference: {}
    };
    render() {
        return (
            <div>
                <Pie
                    onElementsClick={elems => console.log(elems[0])}
                    ref={reference => (this.state.chartReference = reference)}
                    data={this.state.chartData}
                    // width={100}
                    height={250}
                    options={{
                        title: {
                            display: true,
                            text: "Completed number of Surveys",
                            fontSize: "20"
                        },
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                            // Change options for ALL labels of THIS CHART
                            datalabels: {
                                formatter: (value, ctx) => {
                                    let sum = 0;
                                    let dataArr =
                                        ctx.chart.data.datasets[0].data;
                                    dataArr.map(data => {
                                        sum += data;
                                    });
                                    let percentage =
                                        ((value * 100) / sum).toFixed(2) + "%";

                                    return percentage;
                                },
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

export default connect(mapStateToProps)(PieChartCompletedSurveysCount);
