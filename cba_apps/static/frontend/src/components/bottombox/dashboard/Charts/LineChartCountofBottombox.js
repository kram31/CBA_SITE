import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { connect } from "react-redux";

class LineChartCountofBottombox extends Component {
    state = {
        chartData: {},
        chartReference: {}
    };

    componentDidMount() {
        const dateList = (array, dates) => {
            let surveyCountPerDay = array
                .map(survey => survey.date_issued)
                .reduce((acc, currValue) => {
                    acc[currValue] = 1 + acc[currValue] || 1;
                    return acc;
                }, {});

            let surveyCountPerDayArray = Object.keys(surveyCountPerDay).map(
                key => {
                    return {
                        [key]: surveyCountPerDay[key]
                    };
                }
            );

            // Filter for included dates in date range

            let filteredData = surveyCountPerDayArray.filter(item =>
                dates.includes(Object.keys(item)[0])
            );

            // combine arrays

            let finalDateList = dates.map(date => {
                let a = {};
                filteredData.forEach(item => {
                    if (Object.keys(item)[0] == date) {
                        return (a = item);
                    }
                });

                if (Object.keys(a)[0]) {
                    return a;
                } else {
                    return { [date]: 0 };
                }
            });

            return finalDateList;
        };

        // Date Range

        let getDaysArray = function(start, end) {
            for (
                var arr = [], dt = start;
                dt <= end;
                dt.setDate(dt.getDate() + 1)
            ) {
                arr.push(new Date(dt));
            }
            return arr;
        };

        let curr = new Date();

        let curr_year = curr.getFullYear();
        let curr_month = curr.getMonth();

        curr.setDate(curr.getDate() - 9);
        let startDate = curr.toISOString().substr(0, 10);

        let daylist = getDaysArray(new Date(startDate), new Date());
        let dates = daylist.map(v => v.toISOString().substr(0, 10));

        let surveyList = dateList(this.props.surveys, dates);
        let bottomboxList = dateList(
            this.props.surveys.filter(item => item.bottombox == 1),
            dates
        );

        this.setState({
            chartData: {
                // dates span of 30 days
                labels: surveyList.map(item => Object.keys(item)[0]),
                datasets: [
                    {
                        label: "Survey count",
                        borderColor: "blue",
                        backgroundColor: "rgba(0, 0, 255, 0.3)",

                        data: surveyList.map(item => Object.values(item)[0])
                    },
                    {
                        label: "Bottombox count",
                        borderColor: "red",
                        backgroundColor: "rgba(255, 0, 0, 0.3)",

                        data: bottomboxList.map(item => Object.values(item)[0])
                    }
                ]
            }
        });
    }

    render() {
        return (
            <div>
                <Line
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
                            text: "Survey/ Bottombox per day",
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
    rcas: state.surveys.rcas,
    surveys: state.surveys.surveys
});

export default connect(
    mapStateToProps,
    {}
)(LineChartCountofBottombox);
