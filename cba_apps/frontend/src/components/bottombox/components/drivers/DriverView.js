import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import DriversTable from "./DriversTable";

import { Row, Col } from "reactstrap";

class DriverView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: {
                dsat_code1: "",
                bb_driver_code2: "",
                bb_driver_code3: ""
            }
        };
    }

    filteredDriverList = (driverName, selectedData, tableName) => {
        console.log("driver name", driverName, "SELECTED DATA", selectedData);
        return driverName.filter(item => {
            if (tableName == "Driver Code 3") {
                return item.bb_Driver_Code2 == selectedData.id;
            } else if (tableName == "Driver Code 2") {
                return item.dsat_Code1 == selectedData.id;
            }
        });
    };

    handleSelect = (index, driver_type) => {
        const {
            dsat_code1,
            bb_driver_code2,
            bb_driver_code3
        } = this.props.surveys;

        let selected = { ...this.state.selected };

        if (driver_type == "DSAT Code 1") {
            selected.dsat_code1 = dsat_code1[index];
            selected.bb_driver_code2 = "";
            selected.bb_driver_code3 = "";
        } else if (driver_type == "Driver Code 2") {
            selected.bb_driver_code2 = this.filteredDriverList(
                bb_driver_code2,
                selected.dsat_code1,
                "Driver Code 2"
            )[index];
            selected.bb_driver_code3 = "";
        } else if (driver_type == "Driver Code 3") {
            selected.bb_driver_code3 = this.filteredDriverList(
                bb_driver_code3,
                selected.bb_driver_code2,
                "Driver Code 3"
            )[index];
        }

        this.setState(
            {
                selected
            },
            () => console.log(this.state.selected)
        );
    };

    render() {
        const { selected } = this.state;
        const {
            dsat_code1,
            bb_driver_code2,
            bb_driver_code3
        } = this.props.surveys;
        return (
            <Fragment>
                <Row>
                    {dsat_code1 ? (
                        <Col>
                            <DriversTable
                                tableName="DSAT Code 1"
                                driverList={dsat_code1}
                                selectCallback={this.handleSelect}
                            />
                        </Col>
                    ) : null}
                    {selected.dsat_code1 ? (
                        <Col>
                            <DriversTable
                                tableName="Driver Code 2"
                                driverList={bb_driver_code2.filter(
                                    driver =>
                                        driver.dsat_Code1 ==
                                        selected.dsat_code1.id
                                )}
                                // driverList={this.filteredDriverList(
                                //     bb_driver_code2,
                                //     selected.dsat_code1,
                                //     "Driver Code 2"
                                // )}
                                selectCallback={this.handleSelect}
                                selectedCode={selected.dsat_code1}
                            />
                        </Col>
                    ) : null}
                    {selected.bb_driver_code2 ? (
                        <Col>
                            <DriversTable
                                tableName="Driver Code 3"
                                driverList={this.filteredDriverList(
                                    bb_driver_code3,
                                    selected.bb_driver_code2,
                                    "Driver Code 3"
                                )}
                                selectCallback={this.handleSelect}
                                selectedCode={selected.bb_driver_code2}
                            />
                        </Col>
                    ) : null}
                </Row>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    surveys: state.surveys
});

export default connect(mapStateToProps, {})(DriverView);
