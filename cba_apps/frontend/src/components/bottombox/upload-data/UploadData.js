import React, { Component, Fragment } from "react";
import XLSX from "xlsx";
import { SheetJSFT } from "./helpers/types";
import { keys } from "./helpers/obj-keys";
import { addSurveysBulk } from "../../../actions/surveyActions";

import { connect } from "react-redux";
import DatatablePage from "./survey-data-table/DatatablePage";

class UploadData extends Component {
    state = {
        file: {},
        data: [],
        cols: [],
        keys: keys
    };

    handleChange = e => {
        const files = e.target.files;

        if (files && files[0]) this.setState({ file: files[0] });
    };

    handleFile = e => {
        e.preventDefault();
        /* Boilerplate to set up FileReader */
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
            // console.log(JSON.stringify(data, null, 2));

            // this.setState({ data: data, cols: make_cols(ws["!ref"]) }, () => {
            //     console.log(JSON.stringify(this.state.data, null, 2));
            // });
            this.props.addSurveysBulk(data);
        };

        if (rABS) {
            reader.readAsBinaryString(this.state.file);
        } else {
            reader.readAsArrayBuffer(this.state.file);
        }
    };

    render() {
        return (
            <Fragment>
                <form>
                    <fieldset>
                        <div className="form-group">
                            <h5>File Input</h5>
                            <input
                                type="file"
                                name="selectedFile"
                                className="form-control-file"
                                id="file"
                                accept={SheetJSFT}
                                aria-describedby="fileHelp"
                                onChange={this.handleChange}
                            />
                            <small
                                id="fileHelp"
                                className="form-text text-muted"
                            >
                                Choose file to upload
                            </small>
                        </div>

                        <button
                            onClick={this.handleFile}
                            type="submit"
                            className="btn btn-primary"
                        >
                            Submit
                        </button>
                    </fieldset>
                </form>
                <DatatablePage />
            </Fragment>
        );
    }
}

export default connect(
    null,
    { addSurveysBulk }
)(UploadData);
