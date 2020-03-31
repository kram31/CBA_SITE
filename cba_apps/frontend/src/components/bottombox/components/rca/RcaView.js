import React, { Component, Fragment } from "react";

import { Row, Col, FormGroup, Label, Input } from "reactstrap";

import RcaForm from "../rca/RcaForm";

class RcaView extends Component {
    render() {
        const { cellData } = this.props;
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h5>Survey Details</h5>

                        {Object.keys(cellData.surveyed_ticket)
                            .filter(key => key !== "rca")
                            .map((key, index) => (
                                <Fragment key={index}>
                                    <FormGroup>
                                        <Label for={`id ${key}`}>
                                            {key
                                                .split("_")
                                                .join(" ")
                                                .replace(
                                                    /(^\w{1})|(\s{1}\w{1})/g,
                                                    match => match.toUpperCase()
                                                )}
                                        </Label>
                                        <Col>
                                            <Input
                                                size="sm"
                                                type="text"
                                                name={key}
                                                id={`id ${key}`}
                                                value={
                                                    cellData.surveyed_ticket[
                                                        key
                                                    ]
                                                }
                                                disabled
                                            />
                                        </Col>
                                    </FormGroup>
                                </Fragment>
                            ))}
                    </Col>
                    <Col>
                        <RcaForm cellData={cellData} />
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default RcaView;
