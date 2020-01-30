import React, { Fragment } from "react";
import { Table, Button } from "reactstrap";

const CcmsList = props => {
    const bucket_age = data => {
        if (data >= 0 && data <= 5) {
            return {
                displayText: "0 to 5",
                style: {
                    backgroundColor: "green",
                    color: "black"
                }
            };
        } else if (data >= 6 && data <= 10) {
            return {
                displayText: "6 to 10",
                style: {
                    backgroundColor: "blue",
                    color: "black"
                }
            };
        } else if (data >= 11 && data <= 30) {
            return {
                displayText: "11 to 30",
                style: {
                    backgroundColor: "red",
                    color: "black"
                }
            };
        } else if (data >= 30 && data <= 160) {
            return {
                displayText: "30 to 160",
                style: {
                    backgroundColor: "black",
                    color: "white"
                }
            };
        }
    };

    if (props.ccms) {
        return (
            <Fragment>
                <Table>
                    <thead>
                        <tr>
                            <th>CCMS ID</th>
                            <th>Escalator Name</th>
                            <th>Ticket Status</th>
                            <th>Bucket Age</th>
                            <th>Update CCMS Case</th>
                            <th>Review Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.ccms.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    {item.escalated_by == ""
                                        ? "-"
                                        : item.escalated_by}
                                </td>
                                <td>{item.ticket_status}</td>
                                <td style={bucket_age(item.mail_age).style}>
                                    {bucket_age(item.mail_age).displayText}
                                </td>
                                <td>
                                    <Button>View Case</Button>
                                </td>
                                <td>
                                    <Button>Open RCA</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Fragment>
        );
    } else {
        return <h1>No CCMS entry</h1>;
    }
};

export default CcmsList;
