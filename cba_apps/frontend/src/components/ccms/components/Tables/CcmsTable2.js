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
    Button
} from "reactstrap";

import { columns } from "./columns";
import { connect } from "react-redux";

import NewCcmsFormModal from "../Modals/NewCcmsFormModal";
import CcmsAdminModal from "../CcmsAdmin/CcmsAdminModal";

import { search_ccms } from "../../../../actions/ccmsActions";

class CcmsTable2 extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

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
                    Cell: cellprops => <Button>Change Owner</Button>
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
                    Cell: cellprops => <Button color="success">Open RCA</Button>
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

    render() {
        return (
            <Fragment>
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
                                <Col>
                                    <div className="float-right">
                                        <CcmsAdminModal />
                                    </div>
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
    ccms: state.ccms
});

export default connect(mapStateToProps, {
    search_ccms
})(CcmsTable2);
