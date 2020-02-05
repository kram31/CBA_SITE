import React, { Fragment, Component } from "react";
import {
    Table,
    Button,
    Collapse,
    Fade,
    Card,
    CardHeader,
    CardBody
} from "reactstrap";
import { connect } from "react-redux";

import CcmsForm from "./CcmsForm";

import { get_business_unit } from "../../../actions/ccmsActions";

class CcmsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            activeItem: null
        };
    }

    bucket_age = data => {
        if (data >= 0 && data <= 5) {
            return {
                displayText: "0 to 5",
                style: {
                    // backgroundColor: "green",
                    // color: "black"

                    color: "green",
                    fontWeight: "bold"
                }
            };
        } else if (data >= 6 && data <= 10) {
            return {
                displayText: "6 to 10",
                style: {
                    // backgroundColor: "blue",
                    // color: "black"
                    color: "blue",
                    fontWeight: "bold"
                }
            };
        } else if (data >= 11 && data <= 30) {
            return {
                displayText: "11 to 30",
                style: {
                    // backgroundColor: "red",
                    // color: "black"
                    color: "red",
                    fontWeight: "bold"
                }
            };
        } else if (data >= 30 && data <= 160) {
            return {
                displayText: "30 to 160",
                style: {
                    // backgroundColor: "black",
                    // color: "white"
                    color: "gray",
                    fontWeight: "bold"
                }
            };
        }
    };

    setOptions = () => {
        if (this.props.list_type) {
            return {
                th: (
                    <Fragment>
                        <th>Open CCMS Case</th>
                        <th>Reassign Case</th>
                    </Fragment>
                ),
                td: (
                    <Fragment>
                        <td>
                            <Button>View Case</Button>
                        </td>
                        <td>
                            <Button>Change Owner</Button>
                        </td>
                    </Fragment>
                )
            };
        }
        return {
            th: (
                <Fragment>
                    <th>Update CCMS Case</th>
                    <th>Review Case</th>
                </Fragment>
            ),
            td: (
                <Fragment>
                    <td>
                        <Button>View Case</Button>
                    </td>
                    <td>
                        <Button>Open RCA</Button>
                    </td>
                </Fragment>
            )
        };
    };

    handleClick = data => {
        const { isOpen, activeItem } = this.state;

        this.setState({
            isOpen: !isOpen,
            activeItem: activeItem ? null : data
        });
    };

    render() {
        const { activeItem, isOpen } = this.state;

        if (this.props.ccms) {
            return (
                <Fragment>
                    <Table hover style={{ color: "white" }}>
                        <thead>
                            <tr>
                                <th>CCMS ID</th>
                                <th>Escalator Name</th>
                                <th>Ticket Status</th>
                                <th>Bucket Age</th>
                                {this.setOptions().th}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.ccms.map(item => (
                                <Fragment key={item.id}>
                                    <tr
                                        style={{ cursor: "pointer" }}
                                        onClick={() => this.handleClick(item)}
                                    >
                                        <td>{item.id}</td>
                                        <td>
                                            {item.escalated_by === ""
                                                ? "-"
                                                : item.escalated_by}
                                        </td>
                                        <td>
                                            {!item.ticket_status
                                                ? null
                                                : item.ticket_status.name}
                                        </td>
                                        <td
                                            style={
                                                this.bucket_age(item.mail_age)
                                                    .style
                                            }
                                        >
                                            {
                                                this.bucket_age(item.mail_age)
                                                    .displayText
                                            }
                                        </td>
                                        {this.setOptions().td}
                                    </tr>
                                    {activeItem && activeItem.id === item.id && (
                                        <tr>
                                            <td colSpan={10}>
                                                <Collapse isOpen={isOpen}>
                                                    <Fade>
                                                        <Card>
                                                            <CardHeader>
                                                                <h3>
                                                                    CCMS ID:{" "}
                                                                    {
                                                                        activeItem.id
                                                                    }
                                                                </h3>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <CcmsForm
                                                                    list_type={
                                                                        this
                                                                            .props
                                                                            .list_type
                                                                    }
                                                                    ccms_entry={
                                                                        activeItem
                                                                    }
                                                                />
                                                            </CardBody>
                                                        </Card>
                                                    </Fade>
                                                </Collapse>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </Table>
                </Fragment>
            );
        } else {
            return <h1>No CCMS entry</h1>;
        }
    }
}

const mapStateToProps = state => ({
    business_unit: state.ccms.business_unit,
    comments: state.ccms.comments
});

export default connect(mapStateToProps, { get_business_unit })(CcmsList);
