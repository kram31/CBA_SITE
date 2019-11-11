import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

class StackedBarChart extends Component {
    state = {
        data: {}
    };

    // componentDidMount() {
    //     // data entry

    //     let filtered_list = this.props.from_parent_agent
    //         ? this.props.surveys.filter(
    //               survey =>
    //                   survey.operator_lan_id === this.props.from_parent_agent
    //           )
    //         : this.props.surveys;

    //     // Current Month and Year Range

    //     this.get_data(this.props.filtered_list);
    // }

    get_data = filtered_list => {
        let curr = new Date();

        let curr_year = curr.getFullYear();
        let curr_month = curr.getMonth() + 1;

        let monthRangeInt = Array.from(new Array(curr_month), (x, i) => i + 1);

        // filter data per month
        let surveyCountPerMonth = monthRangeInt.map(month => {
            let filteredSurveyPerMonth = filtered_list.filter(
                survey =>
                    new Date(survey.date_issued).getMonth() + 1 == month &&
                    new Date(survey.date_issued).getFullYear() == curr_year
            );

            let monthName = new Intl.DateTimeFormat("en-US", { month: "short" })
                .format;
            let name = monthName(new Date(`${curr_year}-${month}-01`));

            return {
                [name]: filteredSurveyPerMonth
            };
        });

        return surveyCountPerMonth;
    };

    options = {
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
        }
    };

    render() {
        console.log(this.props.filtered_list);
        return (
            <Fragment>
                <Bar
                    data={{
                        datasets: [
                            {
                                label: "Topbox",
                                data: this.get_data(
                                    this.props.filtered_list
                                ).map(
                                    item =>
                                        Object.values(item)[0].filter(
                                            survey => survey.bottombox != 1
                                        ).length
                                ),
                                backgroundColor: "black"
                            },
                            {
                                label: "Bottombox",
                                data: this.get_data(
                                    this.props.filtered_list
                                ).map(
                                    item =>
                                        Object.values(item)[0].filter(
                                            survey => survey.bottombox === 1
                                        ).length
                                ),
                                backgroundColor: "yellow"
                            }
                        ],
                        labels: this.get_data(this.props.filtered_list).map(
                            item => Object.keys(item)[0]
                        )
                    }}
                    options={this.options}
                    height={250}
                    // width={100}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    surveys: state.surveys.surveys
});

export default connect(
    mapStateToProps,
    {}
)(StackedBarChart);
