import React, { Component, Fragment } from "react";

import {
    Table,
    Row,
    Col,
    PopoverHeader,
    PopoverBody,
    UncontrolledPopover
} from "reactstrap";

import { ADD_DSAT_CODE1 } from "../../../../actions/types";

import DriverForm from "./DriverForm";

import DriverData from "./DriverData";

class DriversTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: "",
            addOption: false
        };
    }
    handleEditOptionClick = () => {
        this.setState({
            addOption: !this.state.addOption
        });
    };
    render() {
        const {
            tableName,
            driverList,
            selectCallback,
            selectedCode
        } = this.props;
        const { addOption, selected } = this.state;
        let newName = tableName.replace(/\s/g, "_").toLowerCase();
        let icon_id = "id_" + newName;

        return (
            <Table dark hover bordered>
                <thead>
                    <tr>
                        <th>
                            <Row className="text-warning">
                                <Col className="d-flex justify-content-start">
                                    {tableName}
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <i
                                        onClick={this.handleEditOptionClick}
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        className="fas fa-plus-square"
                                        id={icon_id}
                                    ></i>
                                </Col>
                            </Row>
                            <UncontrolledPopover
                                placement="left"
                                isOpen={addOption}
                                target={icon_id}
                                toggle={this.handleEditOptionClick}
                                trigger="legacy"
                            >
                                <PopoverHeader>Add {tableName}</PopoverHeader>
                                <PopoverBody>
                                    <DriverForm
                                        tableName={tableName}
                                        task="add"
                                        cancelEdit={this.handleEditOptionClick}
                                        selectedCode={selectedCode}
                                    />
                                </PopoverBody>
                            </UncontrolledPopover>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {driverList.map((code, index) => (
                        <tr key={code.id}>
                            <td
                                onClick={() => {
                                    this.setState({
                                        selected: code
                                    });
                                    selectCallback(index, tableName);
                                }}
                            >
                                <DriverData
                                    tableName={tableName}
                                    driverDetails={code}
                                    color={
                                        selected.id == code.id ? "green" : null
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}

export default DriversTable;
