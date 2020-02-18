import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Table, Row, Col } from "reactstrap";

import DriverData from "./DriverData";
import AddDriverForm from "./AddDriverForm";

class DriverForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: {
                cause_code: "",
                escalation_driver: "",
                escalation_driver_cause: ""
            },
            addOption: false
        };
    }

    handleSelect = (index, driver_type) => {
        const {
            cause_code,
            escalation_driver,
            escalation_driver_cause
        } = this.props.ccms;

        let selected = { ...this.state.selected };

        if (driver_type == "cause_code") {
            selected.cause_code = cause_code[index];
            selected.escalation_driver = "";
            selected.escalation_driver_cause = "";
        } else if (driver_type == "escalation_driver") {
            selected.escalation_driver = this.filteredDriverList(
                escalation_driver,
                selected.cause_code,
                "Escalation Driver"
            )[index];
            selected.escalation_driver_cause = "";
        } else if (driver_type == "escalation_driver_cause") {
            selected.escalation_driver_cause = this.filteredDriverList(
                escalation_driver_cause,
                selected.escalation_driver,
                "Escalation Driver Cause"
            )[index];
        }

        this.setState({
            selected
        });
    };

    handleEditOptionClick = () => {
        this.setState({
            addOption: !this.state.addOption
        });
    };

    render() {
        const { selected, addOption } = this.state;

        const {
            cause_code,
            escalation_driver,
            escalation_driver_cause
        } = this.props.ccms;

        return (
            <Fragment>
                <h3>Driver Form</h3>

                <Row>
                    {cause_code ? (
                        <Col>
                            <Table dark hover>
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="float-left">
                                                Cause Code
                                            </div>
                                            <div className="float-right">
                                                {addOption ? (
                                                    <div>
                                                        <div
                                                            style={{
                                                                float: "left"
                                                            }}
                                                        >
                                                            <AddDriverForm
                                                                tableName="Cause Code"
                                                                task="add"
                                                                cancelEdit={
                                                                    this
                                                                        .handleEditOptionClick
                                                                }
                                                            />
                                                        </div>
                                                        <div
                                                            style={{
                                                                float: "right",
                                                                textAlign:
                                                                    "center",
                                                                marginLeft:
                                                                    "10px"
                                                            }}
                                                        >
                                                            <i
                                                                onClick={
                                                                    this
                                                                        .handleEditOptionClick
                                                                }
                                                                style={{
                                                                    color:
                                                                        "red",
                                                                    fontSize:
                                                                        "25px",
                                                                    cursor:
                                                                        "pointer"
                                                                }}
                                                                className="fas fa-ban"
                                                            ></i>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <i
                                                        onClick={
                                                            this
                                                                .handleEditOptionClick
                                                        }
                                                        style={{
                                                            cursor: "pointer"
                                                        }}
                                                        className="fas fa-ellipsis-h"
                                                    ></i>
                                                )}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cause_code.map((code, index) => (
                                        <tr key={code.id}>
                                            <td
                                                onClick={() =>
                                                    this.handleSelect(
                                                        index,
                                                        "cause_code"
                                                    )
                                                }
                                            >
                                                <DriverData
                                                    tableName="Cause Code"
                                                    driverDetails={code}
                                                    color={
                                                        selected.cause_code
                                                            .id == code.id
                                                            ? "yellow"
                                                            : null
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    ) : null}
                    {selected.cause_code ? (
                        <Col>
                            <Table dark hover>
                                <thead>
                                    <tr>
                                        <th>Escalation Driver</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.filteredDriverList(
                                        escalation_driver,
                                        selected.cause_code,
                                        "Escalation Driver"
                                    ).map((code, index) => (
                                        <tr key={code.id}>
                                            <td
                                                onClick={() =>
                                                    this.handleSelect(
                                                        index,
                                                        "escalation_driver"
                                                    )
                                                }
                                            >
                                                {code.name}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    ) : null}
                    {selected.escalation_driver ? (
                        <Col>
                            <Table dark hover>
                                <thead>
                                    <tr>
                                        <th>Escalation Driver Cause</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.filteredDriverList(
                                        escalation_driver_cause,
                                        selected.escalation_driver,
                                        "Escalation Driver Cause"
                                    ).map((code, index) => (
                                        <tr key={code.id}>
                                            <td
                                                onClick={() =>
                                                    this.handleSelect(
                                                        index,
                                                        "escalation_driver_cause"
                                                    )
                                                }
                                            >
                                                {code.name}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    ) : null}
                </Row>
            </Fragment>
        );
    }

    filteredDriverList = (driverName, selectedData, tableName) => {
        return driverName.filter(item => {
            if (tableName == "Escalation Driver Cause") {
                return item.escalation_driver == selectedData.id;
            } else if (tableName == "Escalation Driver") {
                return item.cause_code == selectedData.id;
            }
        });
    };
}

const mapStateToProps = state => ({
    ccms: state.ccms
});

export default connect(mapStateToProps, {})(DriverForm);
