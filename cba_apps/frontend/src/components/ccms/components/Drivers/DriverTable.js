import React, { Component } from "react";

import { connect } from "react-redux";

import { Table } from "reactstrap";
import AddDriverForm from "./AddDriverForm";
import DriverData from "./DriverData";

class DriverTable extends Component {
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

    handleEditOptionClick = () => {
        this.setState({
            addOption: !this.state.addOption
        });
    };

    // tableName, driverList, selectCallback

    render() {
        const { tableName, driverList, selectCallback } = this.props;
        const { addOption } = this.state;

        return (
            <Table dark hover>
                <thead>
                    <tr>
                        <th>
                            <div className="float-left">{tableName}</div>
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
                                                    this.handleEditOptionClick
                                                }
                                            />
                                        </div>
                                        <div
                                            style={{
                                                float: "right",
                                                textAlign: "center",
                                                marginLeft: "10px"
                                            }}
                                        >
                                            <i
                                                onClick={
                                                    this.handleEditOptionClick
                                                }
                                                style={{
                                                    color: "red",
                                                    fontSize: "25px",
                                                    cursor: "pointer"
                                                }}
                                                className="fas fa-ban"
                                            ></i>
                                        </div>
                                    </div>
                                ) : (
                                    <i
                                        onClick={this.handleEditOptionClick}
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
                    {driverList.map((code, index) => (
                        <tr key={code.id}>
                            <td
                                onClick={() =>
                                    this.handleSelect(index, tableName)
                                }
                            >
                                <DriverData
                                    tableName={tableName}
                                    driverDetails={code}
                                    // color={
                                    //     selected.cause_code.id == code.id
                                    //         ? "yellow"
                                    //         : null
                                    // }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = state => ({
    ccms: state.ccms
});

export default connect(mapStateToProps, {})(DriverTable);
