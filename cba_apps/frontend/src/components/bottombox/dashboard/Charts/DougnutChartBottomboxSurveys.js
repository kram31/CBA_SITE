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
        console.log(this.props.selectedMonth);
        console.log(this.props.curr_year);
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
                                        !this.props.selectedMonth
                                            ? this.props.surveys.filter(
                                                  survey =>
                                                      new Date(
                                                          survey.date_issued
                                                      ).getMonth() +
                                                          1 ==
                                                      this.props.curr_month
                                              ).length
                                            : this.props.surveys.filter(
                                                  survey =>
                                                      new Date(
                                                          survey.date_issued
                                                      ).getMonth() +
                                                          1 ==
                                                      this.props.selectedMonth
                                              ).length,
                                        !this.props.selectedMonth
                                            ? this.props.bottombox.filter(
                                                  survey =>
                                                      new Date(
                                                          survey.date_issued
                                                      ).getMonth() +
                                                          1 ==
                                                      this.props.curr_month
                                              ).length
                                            : this.props.bottombox.filter(
                                                  survey =>
                                                      new Date(
                                                          survey.date_issued
                                                      ).getMonth() +
                                                          1 ==
                                                      this.props.selectedMonth
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
