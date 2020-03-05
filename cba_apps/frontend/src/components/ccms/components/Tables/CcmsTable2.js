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
    Container,
    Collapse,
    ButtonGroup
} from "reactstrap";

import { Link } from "react-router-dom";

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

import { search_ccms, set_table_page } from "../../../../actions/ccmsActions";

class CcmsTable2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapseDrivers: false,
            isModalOpen: false,
            collapseGeneralTable: false,
            table: null,
            search: props.search,
            page: props.page
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
                            "RCA not required"
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

    handlePageChange = data => {
        this.setState({
            page: data
        });

        this.props.set_table_page(data);
    };

    handlecollapseDrivers = () =>
        this.setState({
            collapseDrivers: !this.state.collapseDrivers
        });

    // HANDLERS FOR DATA TABLE LIST
    tableSelectionCallback = childData => {
        // close collapse > remove data table > update data table > open collapse
        this.closeCollapse().then(res =>
            this.removeDataTable().then(res =>
                this.updateTable(childData).then(res =>
                    this.setState({ collapseGeneralTable: true })
                )
            )
        );
    };

    async closeCollapse() {
        this.setState({ collapseGeneralTable: false });
    }

    async removeDataTable() {
        this.setState({
            table: null
        });
    }

    async updateTable(childData) {
        this.closeCollapse().then(res =>
            this.setState({
                table: childData
            })
        );
    }

    handlecollapseGeneralTable = () =>
        this.setState({
            collapseGeneralTable: false
        });

    render() {
        const btnColor = "primary";

        const {
            table,
            collapseGeneralTable,
            collapseDrivers,
            search
        } = this.state;

        const { ccms } = this.props;

        const dataList = [
            {
                name: "SILO",
                endpoint: "silo"
            },
            {
                name: "CCMS Status",
                endpoint: "ccms_status"
            },
            {
                name: "Site Code",
                endpoint: "site_code"
            },
            {
                name: "Accountable Team",
                endpoint: "accountable_team"
            },
            {
                name: "Ticket Type",
                endpoint: "ticket_type"
            },
            {
                name: "Escalation Type",
                endpoint: "escalation_type"
            },
            {
                name: "Business Unit",
                endpoint: "business_unit"
            }
        ];

        return (
            <Fragment>
                {ccms && table ? (
                    <Collapse isOpen={collapseGeneralTable} className="mb-3">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col className="d-flex justify-content-start">
                                        <h5>{table.name} Data Table</h5>
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
                                {/* FOR ADDING DATA TABLE >> UPDATE dataList >> UPDATE action/type.js >> UPDATE ccmsReducer */}
                                <Container>
                                    <GeneralDataTable
                                        table={{
                                            ...table,
                                            data: this.props.ccms[
                                                table.endpoint
                                            ]
                                        }}
                                    />
                                </Container>
                            </CardBody>
                        </Card>
                    </Collapse>
                ) : null}

                <Collapse isOpen={collapseDrivers} className="mb-3">
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
                        <Row className="mb-3">
                            <Col md={3}>
                                <Form autoComplete="off">
                                    <Input
                                        type="text"
                                        name="search"
                                        placeholder="Search"
                                        onChange={this.handleSearch}
                                        value={this.state.search}
                                    />
                                </Form>
                            </Col>

                            {!this.props.title ? (
                                <Col style={{ textAlign: "right" }}>
                                    <ButtonGroup>
                                        <DataTableDropdownButton
                                            dataList={dataList}
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

                                        <a href="https://10.235.83.26/control">
                                            <Button
                                                onClick={() =>
                                                    console.log(
                                                        "got to control page"
                                                    )
                                                }
                                                color={btnColor}
                                                className="mr-1"
                                            >
                                                <span className="mr-1">
                                                    <i className="fas fa-table"></i>
                                                </span>
                                                Mailbox Monitor
                                            </Button>
                                        </a>

                                        <CcmsAdminModal color={btnColor} />
                                    </ButtonGroup>
                                </Col>
                            ) : null}
                        </Row>
                        <ReactTable
                            className="-striped -highlight"
                            style={{ backgroundColor: "white" }}
                            data={
                                search
                                    ? this.props.filtered_ccms_list
                                    : this.props.data
                            }
                            columns={[
                                ...columns,
                                ...this.buttonOptions(this.props.title)
                            ]}
                            minRows={5}
                            defaultPageSize={10}
                            onPageChange={page => this.handlePageChange(page)}
                            page={this.state.page}
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
    search: state.ccms.search,
    page: state.ccms.page,
    ccms: state.ccms,
    access_request: state.ccms.access_request
});

export default connect(mapStateToProps, {
    search_ccms,
    set_table_page
})(CcmsTable2);
