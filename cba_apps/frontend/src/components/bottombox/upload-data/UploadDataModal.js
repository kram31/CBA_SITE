import React, { Component, Fragment } from "react";
import XLSX from "xlsx";
import { SheetJSFT } from "./helpers/types"; // enable other file types
import { keys } from "./helpers/obj-keys"; // expected headers
import { addSurveysBulk, getSurveys } from "../../../actions/surveyActions";

import { connect } from "react-redux";

import ReactTable from "react-table";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Input,
    NavLink
} from "reactstrap";

import { toggle } from "../../../actions/modalToggleActions";

class UploadDataModal extends Component {
    state = {
        file: {},
        data: [],
        isStaged: false,
        keys: keys.filter(
            item =>
                item != "uploaded_by" &&
                item != "date_uploaded" &&
                item != "completed"
        ),
        modal: false
    };

    handleChange = e => {
        const files = e.target.files;

        if (files && files[0]) this.setState({ file: files[0] });

        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = e => {
            /* Parse data */
            const bstr = e.target.result;

            const wb = XLSX.read(bstr, {
                type: rABS ? "binary" : "array",
                bookVBA: true,
                sheetStubs: true
            });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, {
                defval: "",
                header: this.state.keys,
                range: 1
            });

            let filtered_data = data.filter(
                item =>
                    !this.props.surveys
                        .map(survey => survey.reference_number)
                        .includes(item.reference_number)
            );

            /* Update state */

            this.setState(
                {
                    data: filtered_data.map(item => ({
                        ...item,
                        uploaded_by: this.props.user.email
                    })),
                    isStaged: !this.state.isStaged
                },
                () => {
                    console.log(JSON.stringify(this.state.data, null, 2));
                }
            );

            // this.setState({ data: data, isStaged: !this.state.isStaged });
        };

        if (rABS) {
            reader.readAsBinaryString(files[0]);
        } else {
            reader.readAsArrayBuffer(files[0]);
        }
    };

    handleFile = e => {
        e.preventDefault();

        this.props.addSurveysBulk(this.state.data);

        this.toggle();
    };

    handleCancel = () => {
        this.setState(
            (state, props) => state.isStaged && { isStaged: !state.isStaged }
        );
        this.toggle();
    };

    toggle = () => {
        this.setState((state, props) => ({ modal: !state.modal }));
    };

    render() {
        const headers = this.props.headers.map(val =>
            Object.assign({
                ["Header"]: val,
                ["accessor"]: val
            })
        );
        const columns = [...headers];
        return (
            <Fragment>
                <NavLink
                    style={{ textAlign: "center", color: "white" }}
                    className="sidebar-navlink"
                    onClick={this.toggle}
                >
                    <i className="fa fa-upload fa-2x" />
                    <p style={{ fontSize: "12px" }}>Upload Data</p>
                </NavLink>
                <Modal
                    scrollable={true}
                    className="modal-lg modal-main"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <Form className="modal-content">
                        <ModalHeader
                            toggle={this.toggle}
                            className="modal-header"
                        >
                            Upload Surveys
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                type="file"
                                name="selectedFile"
                                className="form-control-file"
                                id="id_upload_data"
                                accept={SheetJSFT}
                                onChange={this.handleChange}
                            />

                            {this.state.isStaged && (
                                <ReactTable
                                    className="-striped -highlight"
                                    data={this.state.data}
                                    columns={columns}
                                    minRows={10}
                                    defaultPageSize={10}
                                />
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                className="btn-submit"
                                onClick={this.handleFile}
                            >
                                Send
                            </Button>{" "}
                            <Button
                                className="btn-submit"
                                onClick={this.handleCancel}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    headers: state.surveys.headers,
    user: state.auth.user,
    surveys: state.surveys.surveys
});

export default connect(mapStateToProps, { addSurveysBulk, toggle, getSurveys })(
    UploadDataModal
);
