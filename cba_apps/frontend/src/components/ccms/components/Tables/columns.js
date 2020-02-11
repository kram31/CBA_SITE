import React from "react";

export const columns = [
    {
        Header: "CCMS ID",
        accessor: "id"
    },
    {
        Header: "Escalator Name",
        accessor: "escalated_by"
    },
    {
        Header: "Ticket Status",
        id: "ticket_status",
        accessor: row => (row.ticket_status || {}).name
    },
    {
        Header: "Bucket Age",
        accessor: "mail_age",
        Cell: row => newBucketAge(row)
    }
];

const style = {
    fontWeight: "bold"
};

const newBucketAge = row => {
    let data = row.value;
    if (data >= 0 && data <= 5) {
        return <div style={{ ...style, color: "green" }}>{"0 to 5"}</div>;
    } else if (data >= 6 && data <= 10) {
        return <div style={{ ...style, color: "blue" }}>{"6 to 10"}</div>;
    } else if (data >= 11 && data <= 30) {
        return <div style={{ ...style, color: "red" }}>{"11 to 30"}</div>;
    } else if (data >= 30 && data <= 160) {
        return <div style={{ ...style, color: "gray" }}>{"30 to 160"}</div>;
    }
};
