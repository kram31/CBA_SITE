import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { Row, Col } from "reactstrap";
import "chartjs-plugin-datalabels";
import { connect } from "react-redux";

class DougnutChartBottomboxSurveys extends Component {
    state = {
        chartData: {},
        chartReference: {}
    };

    render() {
        return (
            <div>
                <Col>
                    <Doughnut
                        onElementsClick={elems => console.log(elems[0])}
                        ref={reference =>
                            (this.state.chartReference = reference)
                        }
                        data={{
                            labels: ["Passing Surveys", "Bottombox Surveys"],
                            datasets: [
                                {
                                    label: "Number of Surveys",
                                    data: [
                                        this.props.dateFilteredSurveys.length,

                                        this.props.dateFilteredSurveys.filter(
                                            item => item.bottombox == 1
                                        ).length
                                    ],
                                    backgroundColor: ["green", "black"]
                                }
                            ]
                        }}
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
                </Col>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    surveys: state.surveys.surveys,
    bottombox: state.surveys.surveys.filter(item => item.bottombox == 1)
});

export default connect(mapStateToProps)(DougnutChartBottomboxSurveys);
