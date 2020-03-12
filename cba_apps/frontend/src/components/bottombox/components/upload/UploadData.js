import React, { Component, Fragment } from "react";
import XLSX from "xlsx";
import { SheetJSFT } from "./helpers/types";
import { surveyKeys } from "./helpers/surveyKeys";
import { addSurveysBulk } from "../../../../actions/surveyActions";

import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

import { connect } from "react-redux";

class UploadData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: {},
            data: []
        };
    }

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
                header: surveyKeys,
                range: 1
            });

            // let filtered_data = data.filter(
            //     item =>
            //         !this.props.surveys
            //             .map(survey => survey.reference_number)
            //             .includes(item.reference_number)
            // );

            /* Update state */

            this.setState(
                {
                    data: data.map(item => ({
                        ...item,
                        uploaded_by: this.props.user.user.email
                    }))
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

        // this.props.addSurveysBulk(this.state.data);

        console.log(this.state.data);
    };

    render() {
        return (
            <Fragment>
                <Form>
                    <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input
                            type="file"
                            name="selectedFile"
                            className="form-control-file"
                            id="id_upload_data"
                            accept={SheetJSFT}
                            onChange={this.handleChange}
                        />

                        <FormText color="muted">
                            IMPORTANT! Check headers and data before upload...
                        </FormText>
                    </FormGroup>
                    <Button onClick={this.handleFile}>Show State Data</Button>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { addSurveysBulk })(UploadData);
