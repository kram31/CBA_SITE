import React, { Component, Fragment } from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";

import {
    Row,
    Col,
    Form,
    Input,
    Card,
    CardHeader,
    CardBody,
    Button,
    Fade,
    Collapse,
    ButtonGroup
} from "reactstrap";

import { columns } from "./columns";
import { connect } from "react-redux";

import NewCcmsFormModal from "../Modals/NewCcmsFormModal";
import CcmsAdminModal from "../CcmsAdmin/CcmsAdminModal";
import CcmsAccessRequestModal from "../CcmsAccessRequest/CcmsAccessRequestModal";
import DriverForm from "../Drivers/DriversForm";
import CcmsRcaModal from "../CcmsRca/CcmsRcaModal";
import DynamicFormModal from "../Modals/DynamicFormModal";
import DynamicForm from "../Forms/DynamicForm";
import DataTableDropdownButton from "../Tables/DataTableDropdownButton";
import GeneralDataTable from "./GeneralDataTable";

import { search_ccms } from "../../../../actions/ccmsActions";

class CcmsTable2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapseDrivers: false,
            isModalOpen: false,
            collapseGeneralTable: false,
            table: null
        };
    }

    toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });

    buttonOptions = title => {
        if (title) {
            return [
                {
                    Header: "Open CCMS Case",
                    Cell: cellprops => {
                        return (
                            <NewCcmsFormModal
                                ccms_entry={cellprops.original}
                                list_type={this.props.title}
                            />
                        );
                    }
                },
                {
                    Header: "Reassign Case",
                    Cell: cellprops => (
                        <DynamicFormModal
                            modal={this.state.isModalOpen}
                            form_inputs={{
                                select_ccms_owner: ""
                            }}
                            formattedFormTitle="Change Owner"
                            form_title="change_owner"
                            toggleModal={this.toggleModal}
                            ComponentForm={DynamicForm}
                            select_options={this.props.ccms.ccms_owner}
                            labelKey={option => `${option.user.email}`}
                            size="lg"
                            ccms_entry={cellprops.original}
                        />
                    )
                }
            ];
        } else {
            return [
                {
                    Header: "Update CCMS Case",
                    Cell: cellprops => (
                        <NewCcmsFormModal
                            ccms_entry={cellprops.original}
                            list_type={this.props.title}
                        />
                    )
                },
                {
                    Header: "Review Case",
                    Cell: cellprops =>
                        cellprops.original.rca_required ? (
                            <CcmsRcaModal ccms={cellprops.original} />
                        ) : (
                            <Button color="success">NO RCA</Button>
                        )
                }
            ];
        }
    };

    handleSearch = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

        let kw = e.target.value;
        this.props.search_ccms(kw);
    };

    tableSelectionCallback = childData => {
        this.setState(
            {
                table: null
            },
            () =>
                this.updateTable(childData).then(res =>
                    this.setState({ collapseGeneralTable: true })
                )
        );
    };

    async updateTable(childData) {
        this.setState({
            table: childData
        });
    }

    handlecollapseGeneralTable = () =>
        this.setState(
            {
                table: null
            },
            () => this.setState({ collapseGeneralTable: false })
        );

    handlecollapseDrivers = () =>
        this.setState({
            collapseDrivers: !this.state.collapseDrivers
        });

    render() {
        const btnColor = "primary";

        const { table } = this.state;

        return (
            <Fragment>
                {this.props.ccms && table ? (
                    <Collapse
                        isOpen={this.state.collapseGeneralTable}
                        className="mb-3"
                    >
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col className="d-flex justify-content-start">
                                        <h5>{table.name}</h5>
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                        <i
                                            onClick={
                                                this.handlecollapseGeneralTable
                                            }
                                            style={{ cursor: "pointer" }}
                                            className="fas fa-times mt-1"
                                        ></i>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <GeneralDataTable
                                    table={table}
                                    // columns={this.props.columns}
                                />
                            </CardBody>
                        </Card>
                    </Collapse>
                ) : null}

                <Collapse isOpen={this.state.collapseDrivers} className="mb-3">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col className="d-flex justify-content-start">
                                    Drivers
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <i
                                        onClick={this.handlecollapseDrivers}
                                        style={{ cursor: "pointer" }}
                                        className="fas fa-times mt-1"
                                    ></i>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <DriverForm />
                        </CardBody>
                    </Card>
                </Collapse>
                <Card>
                    <CardHeader>
                        <h2>
                            {!this.props.title
                                ? "CCMS CCA VIEW - Assigning Escalation"
                                : this.props.title}
                        </h2>
                    </CardHeader>
                    <CardBody
                        style={{ backgroundColor: "rgb(169,169,169,0.5)" }}
                    >
                        <Row>
                            <Col md={3} className="mb-3">
                                <Form autoComplete="off">
                                    <Input
                                        bsSize="sm"
                                        type="text"
                                        name="search"
                                        placeholder="Search"
                                        onChange={this.handleSearch}
                                    />
                                </Form>
                            </Col>

                            {!this.props.title ? (
                                <Col style={{ textAlign: "right" }}>
                                    <ButtonGroup>
                                        <DataTableDropdownButton
                                            dataList={[
                                                {
                                                    name: "Ticket Type",
                                                    endpoint: "ticket_type",
                                                    data: this.props.ccms
                                                        .ticket_type
                                                },
                                                {
                                                    name: "Business Unit",
                                                    endpoint: "business_unit",
                                                    data: this.props.ccms
                                                        .business_unit
                                                }
                                            ]}
                                            color={btnColor}
                                            selectionCallback={
                                                this.tableSelectionCallback
                                            }
                                            toggleCollapse={
                                                this.handlecollapseGeneralTable
                                            }
                                        />
                                        {this.props.access_request &&
                                        this.props.access_request.length !=
                                            0 ? (
                                            <CcmsAccessRequestModal
                                                requestCount={
                                                    this.props.access_request
                                                        .length
                                                }
                                                color={btnColor}
                                            />
                                        ) : null}
                                        <Button
                                            onClick={this.handlecollapseDrivers}
                                            color={btnColor}
                                            className="mr-1"
                                        >
                                            <span className="mr-1">
                                                <i className="fas fa-table"></i>
                                            </span>
                                            Drivers
                                        </Button>

                                        <CcmsAdminModal color={btnColor} />
                                    </ButtonGroup>
                                </Col>
                            ) : null}
                        </Row>
                        <ReactTable
                            className="-striped -highlight"
                            style={{ backgroundColor: "white" }}
                            data={
                                this.state.search
                                    ? this.props.filtered_ccms_list
                                    : this.props.data
                            }
                            columns={[
                                ...columns,
                                ...this.buttonOptions(this.props.title)
                            ]}
                            minRows={5}
                            defaultPageSize={10}
                        />
                    </CardBody>
                </Card>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    business_unit: state.ccms.business_unit,
    comments: state.ccms.comments,
    filtered_ccms_list: state.ccms.filtered_ccms_list,
    ccms: state.ccms,
    access_request: state.ccms.access_request
});

export default connect(mapStateToProps, {
    search_ccms
})(CcmsTable2);
