import React, { Component, Fragment } from "react";
import XLSX from "xlsx";
import { SheetJSFT } from "./helpers/types";
import { keys } from "./helpers/obj-keys";
import { addSurveysBulk } from "../../../actions/surveyActions";

import { connect } from "react-redux";

import ReactTable from "react-table";
import add_data from "../../../adddata.png"

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Input,
    Label,
    ListGroupItem,
    NavLink
} from "reactstrap";

import { toggle } from "../../../actions/modalToggleActions";

class UploadDataModal extends Component {
    state = {
        file: {},
        data: [],
        isStaged: false,
        keys: keys,
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
                header: keys,
                range: 1
            });

            /* Update state */

            // this.setState(
            //     { data: data, isStaged: !this.state.isStaged },
            //     () => {
            //         console.log(JSON.stringify(this.state.data, null, 2));
            //     }
            // );

            this.setState({ data: data, isStaged: !this.state.isStaged });
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
                className="mt-3"
                    style={{ cursor: "pointer", color: "black", textAlign: "center" }}
                    onClick={this.toggle}
                >
                        <img src={add_data} width="85" height="45"></img>
                        <br/>
                        Upload Data
                </NavLink>
                {/* <Button
                    color="dark"
                    size="md"
                    onClick={this.toggle}
                    style={{ color: "#ffed00", padding: "7px 30px" }}
                >
                    Upload Data
                </Button> */}
                <Modal
                    scrollable={true}
                    className="modal-lg"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <Form className="modal-content">
                        <ModalHeader
                            toggle={this.toggle}
                            className="bg-dark text-warning"
                        >
                            Upload Surveys
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                type="file"
                                name="selectedFile"
                                className="form-control-file"
                                id="file"
                                accept={SheetJSFT}
                                onChange={this.handleChange}
                            ></Input>

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
                            <Button color="primary" onClick={this.handleFile}>
                                Send
                            </Button>{" "}
                            <Button color="secondary" onClick={this.toggle}>
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
    headers: state.surveys.headers
});

export default connect(
    mapStateToProps,
    { addSurveysBulk, toggle }
)(UploadDataModal);
