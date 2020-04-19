import React, { useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <Filter />
        </div>
    );
};

export default Dashboard;

const Filter = () => {
    let yearAppStarted = 2020;
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;

    const yearRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (_, i) => start + i * step
        );

    console.log(
        "Current Year Range",
        yearRange(currentYear, yearAppStarted, -1)
    );

    const currentMonthRange = (currentMonth, currentYear) =>
        Array.from(new Array(currentMonth), (x, i) => i + 1).map((item) =>
            new Intl.DateTimeFormat("en-US", { month: "short" }).format(
                new Date(`${currentYear}-${item}-01`)
            )
        );

    console.log(
        "Current Month Range",
        currentMonthRange(currentMonth, currentYear)
    );

    const getWeeksInMonth = (month, year) => {
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
                        end: end,
                    });
                }
            }

            dayOfWeek = new Date(y, month - 1, i).getDay();
        }

        return weeks;
    };

    console.log("Weeks in Month", getWeeksInMonth(currentMonth, currentYear));

    return <h2>Filter</h2>;
};

const SelectInput = ({ options, name }) => {
    const [selected, setSelected] = useState("");

    return (
        <FormGroup>
            <Label size="sm" for={`id_${name}`}>
                Select Year
            </Label>
            <Input
                type="select"
                id={`id_${name}`}
                name={name}
                value={selected}
                onChange={() => setSelected(options)}
            >
                {options.map((item, i) => (
                    <option key={i} value={item}>
                        {item}
                    </option>
                ))}
            </Input>
        </FormGroup>
    );
};
