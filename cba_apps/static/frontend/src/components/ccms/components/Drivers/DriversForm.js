import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import DriverTable from "./DriverTable";

class DriverForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: {
                cause_code: "",
                escalation_driver: "",
                escalation_driver_cause: ""
            }
        };
    }

    handleSelect = (index, driver_type) => {
        const {
            cause_code,
            escalation_driver,
            escalation_driver_cause
        } = this.props.ccms;

        let selected = { ...this.state.selected };

        if (driver_type == "Cause Code") {
            selected.cause_code = cause_code[index];
            selected.escalation_driver = "";
            selected.escalation_driver_cause = "";
        } else if (driver_type == "Escalation Driver") {
            selected.escalation_driver = this.filteredDriverList(
                escalation_driver,
                selected.cause_code,
                "Escalation Driver"
            )[index];
            selected.escalation_driver_cause = "";
        } else if (driver_type == "Escalation Driver Cause") {
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

    render() {
        const { selected } = this.state;

        const {
            cause_code,
            escalation_driver,
            escalation_driver_cause
        } = this.props.ccms;

        return (
            <Fragment>
                <Row>
                    {cause_code ? (
                        <Col>
                            <DriverTable
                                tableName="Cause Code"
                                driverList={cause_code}
                                selectCallback={this.handleSelect}
                            />
                        </Col>
                    ) : null}
                    {selected.cause_code ? (
                        <Col>
                            <DriverTable
                                tableName="Escalation Driver"
                                driverList={this.filteredDriverList(
                                    escalation_driver,
                                    selected.cause_code,
                                    "Escalation Driver"
                                )}
                                selectCallback={this.handleSelect}
                                selectedCode={selected.cause_code}
                            />
                        </Col>
                    ) : null}
                    {selected.escalation_driver ? (
                        <Col>
                            <DriverTable
                                tableName="Escalation Driver Cause"
                                driverList={this.filteredDriverList(
                                    escalation_driver_cause,
                                    selected.escalation_driver,
                                    "Escalation Driver Cause"
                                )}
                                selectCallback={this.handleSelect}
                                selectedCode={selected.escalation_driver}
                            />
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
