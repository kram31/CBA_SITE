import React, { Component, Fragment } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

class LineChartAverageScorePerMonth extends Component {
    state = {
        chartDataAveScorePerMonth: {},
        chartReference: {},
        yearSelection: [],
        curr_year: ""
    };

    componentDidMount() {
        // Selection for year
        let yearSelectionList = this.props.surveys.map(survey =>
            new Date(survey.date_issued).getFullYear()
        );

        let yearSelection = [...new Set(yearSelectionList)];

        // console.log(yearSelection);

        // Current Month and Year Range

        let curr = new Date();

        let curr_year = curr.getFullYear();
        let curr_month = curr.getMonth() + 1;

        let monthRangeInt = Array.from(new Array(curr_month), (x, i) => i + 1);

        // filter data per month

        let averageScorePerMonth = monthRangeInt.map(month => {
            // Filter Surveys per Month
            let surveyListCurrMonth = this.props.surveys.filter(
                survey =>
                    new Date(survey.date_issued).getMonth() + 1 == month &&
                    new Date(survey.date_issued).getFullYear() == curr_year
            );

            // get average score

            let ave_scoreList = surveyListCurrMonth.map(survey =>
                parseFloat(survey.average_score)
            );

            let ave_score =
                ave_scoreList.reduce((a, b) => a + b, 0) / ave_scoreList.length;

            // Month Name
            let monthName = new Intl.DateTimeFormat("en-US", { month: "short" })
                .format;
            let name = monthName(new Date(`${curr_year}-${month}-01`));

            // return obj ( {month : average_score})
            return {
                [name]: !Number.isNaN(ave_score) ? ave_score.toFixed(2) : 0
            };
        });

        // console.log(averageScorePerMonth);

        this.setState({
            chartDataAveScorePerMonth: {
                // dates span of 30 days
                labels: averageScorePerMonth.map(item => Object.keys(item)[0]),
                datasets: [
                    {
                        label: "Average score",
                        borderColor: "blue",
                        backgroundColor: "rgba(0, 0, 255, 0.3)",

                        data: averageScorePerMonth.map(
                            item => Object.values(item)[0]
                        )
                    }
                ]
            },
            yearSelection,
            curr_year
        });
    }

    render() {
        return (
            <Fragment>
                <Line
                    onElementsClick={elems => console.log(elems[0])}
                    ref={reference => (this.state.chartReference = reference)}
                    data={this.state.chartDataAveScorePerMonth}
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
                            text: `Average Score per Month / ${this.state.curr_year}`,
                            fontSize: "20"
                        },
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                            // Change options for ALL labels of THIS CHART
                            datalabels: {
                                color: "#36A2EB",
                                anchor: "end",
                                align: "start",
                                offset: 4
                            }
                        }
                    }}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    rcas: state.surveys.rcas,
    surveys: state.surveys.surveys
});

export default connect(
    mapStateToProps,
    {}
)(LineChartAverageScorePerMonth);
