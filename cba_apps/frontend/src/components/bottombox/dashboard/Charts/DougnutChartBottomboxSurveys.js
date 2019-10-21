import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { connect } from "react-redux";

class DougnutChartBottomboxSurveys extends Component {
    state = {
        chartData: {
            labels: ["Passing Surveys", "Bottombox Surveys"],
            datasets: [
                {
                    label: "Number of Surveys",
                    data: this.props.doughnutChartSurveyData,
                    backgroundColor: ["green", "black"]
                }
            ]
        },
        chartReference: {}
    };
    render() {
        return (
            <div>
                <Doughnut
                    onElementsClick={elems => console.log(elems[0])}
                    ref={reference => (this.state.chartReference = reference)}
                    data={this.state.chartData}
                    // width={100}
                    height={250}
                    options={{
                        title: {
                            display: true,
                            text: "Survey count",
                            fontSize: "20"
                        },
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                            // Change options for ALL labels of THIS CHART
                            datalabels: {
                                color: "#36A2EB",
                                anchor: "end",
                                align: "end",
                                offset: 8
                            }
                        }
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    doughnutChartSurveyData: state.surveys.doughnutChartSurveyData
});

export default connect(mapStateToProps)(DougnutChartBottomboxSurveys);
