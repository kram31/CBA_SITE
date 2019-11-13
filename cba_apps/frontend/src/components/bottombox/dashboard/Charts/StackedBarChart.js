import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import moment from "moment";

import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { FormGroup, Label, Input, Row, Col } from "reactstrap";

import {
  updateChartData,
  updatedSelectedMonth,
  updatedSelectedWeek,
  updatedSelectedYear
} from "../../../../actions/surveyActions";

// default by month > select month > by week

class StackedBarChart extends Component {
  state = {
    data: {},
    monthSelection: [],
    weekSelection: [],
    selectedMonth: this.props.selectedMonth,
    selectedWeek: this.props.selectedWeek,
    selectedYear: "",
    curr_year: "",
    curr_month: "",
    curr_month_string: "",
    days_per_week: [],
    selectedMonth_chart_data: []
  };

  componentDidMount() {
    let curr = new Date();

    let curr_year = curr.getFullYear();
    let curr_month = curr.getMonth() + 1;

    let monthRangeInt = Array.from(new Array(curr_month), (x, i) => i + 1);

    let monthSelection = monthRangeInt.map(item => {
      let monthName = new Intl.DateTimeFormat("en-US", { month: "short" })
        .format;
      let name = monthName(new Date(`${curr_year}-${item}-01`));
      return { string: name, int: item };
    });

    this.setState({
      monthSelection,
      curr_year,
      curr_month,
      curr_month_string: monthSelection[10].string
    });
  }

  get_data = (filtered_list, year) => {
    let curr = new Date();

    let curr_year = !year ? curr.getFullYear() : year;
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

  get_data_by_month = (filtered_list, month) => {
    let y = !this.state.selectedYear
      ? new Date().getFullYear()
      : this.state.selectedYear;

    //  if date === item.start %% item
    let days_per_week = this.getWeeksInMonth(month);
    // console.log(days_per_week);

    this.setState({
      days_per_week
    });

    let data_per_week = [];

    days_per_week.forEach((item, i) => {
      let m = filtered_list.filter(survey => {
        let date = new Date(survey.date_issued);

        return (
          date >= new Date(`${y}-${month}-${item.start}`) &&
          date <= new Date(`${y}-${month}-${item.end}`)
        );
      });

      let val = `Week ${i + 1}`;
      return data_per_week.push({ [val]: m });
    });
    // console.log(data_per_week);
    return data_per_week;
  };

  getWeeksInMonth = (month, year) => {
    let y = !year ? new Date().getFullYear() : year;

    const weeks = [];
    const firstDay = new Date(y, month - 1, 1);
    const lastDay = new Date(y, month, 0);
    const daysInMonth = lastDay.getDate();
    let dayOfWeek = firstDay.getDay();
    let start = "";
    let end = "";

    for (let i = 1; i < daysInMonth + 1; i++) {
      if (dayOfWeek === 0 || i === 1) {
        start = i;
      }

      if (dayOfWeek === 6 || i === daysInMonth) {
        end = i;

        if (start != end) {
          weeks.push({
            start: start,
            end: end
          });
        }
      }

      dayOfWeek = new Date(y, month - 1, i).getDay();
    }

    return weeks;
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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    if (e.target.name === "selectedYear") {
      let new_data = this.get_data(this.props.filtered_list, e.target.value);

      this.props.updateChartData(new_data);
      let defaultSelectedMonth = "";
      this.props.updatedSelectedMonth(defaultSelectedMonth);
      this.props.updatedSelectedYear(e.target.value);
    }

    if (e.target.name === "selectedMonth") {
      this.props.updatedSelectedMonth(e.target.value);

      let selectedMonth_chart_data = this.get_data_by_month(
        this.props.filtered_list,
        e.target.value
      );

      this.props.updateChartData(selectedMonth_chart_data);
      this.setState({
        weekSelection: selectedMonth_chart_data.map(item => Object.keys(item)),
        selectedMonth_chart_data
      });

      let resetWeek = "";

      this.props.updatedSelectedWeek(resetWeek);

      if (e.target.value === "reset") {
        this.props.updateChartData(this.get_data(this.props.filtered_list));
      }
    }

    if (e.target.name === "selectedWeek") {
      if (e.target.value === "reset") {
        let reset_week = "";
        this.props.updatedSelectedWeek(reset_week);
        this.props.updateChartData(
          this.get_data_by_month(
            this.props.filtered_list,
            this.props.selectedMonth
          )
        );
      } else {
        this.props.updatedSelectedWeek(e.target.value);
        const { selectedMonth, selectedYear } = this.state;
        const { selectedIndex } = e.target.options;
        const chart_data = this.state.selectedMonth_chart_data;
        let week_data = chart_data[selectedIndex - 1];
        let days_of_selectedWeek = this.state.days_per_week[selectedIndex - 1];
        //   console.log(Object.values(week_data)[0]);
        //   console.log(days_of_selectedWeek);

        let selectedWeek_dates = [];

        let y = !selectedYear ? new Date().getFullYear() : selectedYear;

        for (
          let i = days_of_selectedWeek.start;
          i <= days_of_selectedWeek.end;
          i++
        ) {
          let newDate = moment(`${y},${selectedMonth},${i}`).format(
            "YYYY-MM-DD"
          );
          //   console.log(`${newDate} = ${y},${selectedMonth},${i}`);
          selectedWeek_dates.push(newDate);
        }

        // console.log(selectedWeek_dates);

        let week_data_array = Object.values(week_data)[0];

        let selectedWeek_data = selectedWeek_dates.map(item => {
          let x = week_data_array.filter(survey => {
            // console.log(`${survey.date_issued} === ${item}`);
            return survey.date_issued === item;
          });
          return { [item]: x };
        });

        // console.log(selectedWeek_data);

        this.props.updateChartData(selectedWeek_data);
      }
    }
  };

  // Data entry this.props.filtered_list

  // GET number days in a month
  // console.log(new Date(2019, filter, 0).getDate())

  // GET number of weeks in a month
  // console.log(new Date(2019, filter - 1, 1).getDay())

  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <FormGroup>
              <Label size="sm" for="selectedYear">
                Select Year
              </Label>
              <Input
                type="select"
                id="selectedYear"
                name="selectedYear"
                value={this.state.selectedYear || ""}
                onChange={this.handleChange}
              >
                {this.props.yearSelection.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label size="sm" for="selectedMonth">
                Select Month
              </Label>
              <Input
                type="select"
                id="selectedMonth"
                name="selectedMonth"
                value={this.props.selectedMonth}
                onChange={this.handleChange}
              >
                <option value="reset">----</option>

                {this.state.monthSelection.map(item => (
                  <option key={item.int} value={item.int}>
                    {item.string}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          {this.props.selectedMonth && this.props.selectedMonth != "reset" && (
            <Col>
              <FormGroup>
                <Label size="sm" for="selectedWeek">
                  Select Week
                </Label>
                <Input
                  type="select"
                  id="selectedWeek"
                  name="selectedWeek"
                  value={this.props.selectedWeek}
                  onChange={this.handleChange}
                >
                  <option value="reset">----</option>

                  {this.state.weekSelection.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          )}
        </Row>

        {this.props.chart_parent}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  surveys: state.surveys.surveys,
  agent: state.surveys.agent,
  filtered_agent_data: state.surveys.filtered_agent_data,
  chart_data: state.surveys.chart_data,
  selectedMonth: state.surveys.selectedMonth,
  selectedYear: state.surveys.selectedYear,
  selectedWeek: state.surveys.selectedWeek,
  yearSelection: state.surveys.yearSelection
});

export default connect(mapStateToProps, {
  updateChartData,
  updatedSelectedMonth,
  updatedSelectedWeek,
  updatedSelectedYear
})(StackedBarChart);
