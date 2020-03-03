import React, { Fragment } from "react";
import ReactExport from "react-data-export";
import { connect } from "react-redux";
import { Button } from "reactstrap";

let agent_headers = [
    "operator_lan_id",
    "surveys",
    "name",
    "email",
    "location",
    "wave",
    "skill",
    "team_lead"
];

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ExtractData extends React.Component {
    render() {
        let rca_headers;
        this.props.rcas.length != 0 &&
            (rca_headers = Object.keys(this.props.rcas[0]));

        return (
            <Fragment>
                {this.props.rcas.length === 0 ? (
                    <ExcelFile
                        filename="Bottombox"
                        element={
                            <Button
                                className="mr-2 btn-bb"
                                onClick={this.handleClick}
                            >
                                Download
                            </Button>
                        }
                    >
                        <ExcelSheet data={this.props.surveys} name="Surveys">
                            {this.props.headers.map(item => (
                                <ExcelColumn
                                    key={item}
                                    label={item}
                                    value={item}
                                />
                            ))}
                        </ExcelSheet>
                    </ExcelFile>
                ) : (
                    <ExcelFile
                        filename="Bottombox"
                        element={
                            <Button
                                className="mr-2 btn-bb"
                                onClick={this.handleClick}
                            >
                                Download
                            </Button>
                        }
                    >
                        <ExcelSheet data={this.props.surveys} name="Surveys">
                            {this.props.headers.map(item => (
                                <ExcelColumn
                                    key={item}
                                    label={item}
                                    value={item}
                                />
                            ))}
                        </ExcelSheet>
                        <ExcelSheet data={this.props.rcas} name="RCAS">
                            {rca_headers.map(item => (
                                <ExcelColumn
                                    key={item}
                                    label={item}
                                    value={item}
                                />
                            ))}
                        </ExcelSheet>
                    </ExcelFile>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    surveys: state.surveys.surveys,
    headers: state.surveys.headers,
    rcas: state.surveys.rcas
});

export default connect(
    mapStateToProps,
    {}
)(ExtractData);
