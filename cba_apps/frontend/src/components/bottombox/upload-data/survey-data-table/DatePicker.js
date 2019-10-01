import React, { Component } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';


class DatePicker extends Component {
    handleEvent = (e, picker) => {
        console.log(moment(picker.startDate).format('DD/MM/YYYY'))
    }
    render() {
        return (
            <div>
                <DateRangePicker onApply={this.handleEvent}>
                    <button>Click Me To Open Picker!</button>
                </DateRangePicker>                
            </div>
        )
    }
}

export default DatePicker
