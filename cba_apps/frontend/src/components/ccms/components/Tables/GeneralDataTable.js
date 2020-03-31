import React, { Component, Fragment } from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";

import { Button, Row, Col, ButtonGroup, Form, Input } from "reactstrap";

import GeneralDataConfirmModal from "../Modals/GeneralDataConfirmModal";

// Needed PROPS
// data
// data name

class GeneralDataTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterOn: false
        };
    }

    render() {
        // console.log(this.props.data);

        // const table = { name: "Business Unit", endpoint: "business_unit" };

        const { table } = this.props;
        let columns = table.data.length
            ? Object.keys(table.data[0]).map(item => ({
                  Header: item.charAt(0).toUpperCase() + item.slice(1),
                  accessor: item,
                  show: !item.includes("id"),
                  filterable: item.includes("name") && this.state.filterOn
              }))
            : [];

        let buttons = [
            {
                Header: "Actions",
                Cell: cellprops => (
                    <ButtonGroup>
                        <GeneralDataConfirmModal
                            buttonLabel="Delete"
                            data={cellprops.original}
                            table={table}
                            color="danger"
                        />

                        <GeneralDataConfirmModal
                            buttonLabel="Edit"
                            data={cellprops.original}
                            table={table}
                            color="warning"
                        />
                    </ButtonGroup>
                )
            }
        ];

        return (
            <Fragment>
                {/* ADD DATA */}
                <ButtonGroup className="mb-2">
                    <GeneralDataConfirmModal
                        buttonLabel="Add"
                        table={table}
                        color="primary"
                    />
                    {/* NEED TO ADD SEARCH */}
                    <Button
                        onClick={() =>
                            this.setState({ filterOn: !this.state.filterOn })
                        }
                    >
                        Filter Name
                    </Button>
                </ButtonGroup>

                <ReactTable
                    className="-striped -highlight"
                    style={{ backgroundColor: "white" }}
                    data={table.data}
                    columns={[...columns, ...buttons]}
                    minRows={table.data.length + 1}
                    defaultPageSize={table.data.length + 1}
                    showPagination={false}
                />
            </Fragment>
        );
    }
}

export default GeneralDataTable;
