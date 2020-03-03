import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import {
    Table,
    Row,
    Col,
    PopoverHeader,
    PopoverBody,
    UncontrolledPopover
} from "reactstrap";
import AddDriverForm from "./AddDriverForm";
import DriverData from "./DriverData";

class DriverTable extends Component {
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

    // tableName, driverList, selectCallback

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
                                {/* {!addOption ? (
                                    <Col className="d-flex justify-content-end">
                                        <i
                                            onClick={this.handleEditOptionClick}
                                            style={{
                                                cursor: "pointer"
                                            }}
                                            className="fas fa-ellipsis-h"
                                            id="id_add"
                                        ></i>
                                    </Col>
                                ) : (
                                    <Col className="d-flex justify-content-end">
                                        <i
                                            onClick={this.handleEditOptionClick}
                                            style={{
                                                color: "red",
                                                fontSize: "20px",
                                                cursor: "pointer",
                                                verticalAlign: "middle",
                                                marginTop: "5px"
                                            }}
                                            className="fas fa-ban"
                                        ></i>
                                    </Col>
                                )} */}
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
                                    <AddDriverForm
                                        tableName={tableName}
                                        task="add"
                                        cancelEdit={this.handleEditOptionClick}
                                        selectedCode={selectedCode}
                                    />
                                </PopoverBody>
                            </UncontrolledPopover>
                            {/* {addOption ? (
                                <Row className="my-3">
                                    <Col sm={12}>
                                        <AddDriverForm
                                            tableName={tableName}
                                            task="add"
                                            cancelEdit={
                                                this.handleEditOptionClick
                                            }
                                            selectedCode={selectedCode}
                                        />
                                    </Col>
                                </Row>
                            ) : null} */}
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

const mapStateToProps = state => ({
    ccms: state.ccms
});

export default connect(mapStateToProps, {})(DriverTable);
