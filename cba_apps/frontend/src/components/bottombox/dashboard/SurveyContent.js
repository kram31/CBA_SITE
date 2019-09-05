import React from "react";
import UploadData from "../upload-data/UploadData";
import RCAFormModal from "../rca/RCAFormModal";
import {
    Card,
    Fade,
    CardHeader,
    CardFooter,
    CardBody,
    Row,
    Col
} from "reactstrap";

export default function SurveyContent(props) {
    return (
        <div>
            {props.bottombox_not_completed.length != 0 ? (
                props.bottombox_not_completed.map(survey => (
                    <Row key={survey.reference_number}>
                        <Col
                            md={11}
                            className="mx-auto mb-4"
                            style={{ fontSize: "14px" }}
                        >
                            <Fade in={true}>
                                <Card>
                                    <CardHeader
                                        className="bg-dark text-warning"
                                        style={{ fontSize: "16px" }}
                                    >
                                        {survey.first_name} {survey.last_name}{" "}
                                        {survey.vip && <b>- VIP</b>}
                                    </CardHeader>
                                    <CardBody>
                                        <Row className="mb-2">
                                            <Col>
                                                Ticket Number:{" "}
                                                {survey.reference_number}
                                            </Col>
                                            <Col>
                                                Agent: {survey.owner_name}
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>Q4 Score: {survey.q4}</Col>
                                            <Col>
                                                FulFillment:{" "}
                                                {survey.fulfillment}
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col>
                                                Date issued:{" "}
                                                {survey.date_issued}
                                            </Col>
                                            <Col>
                                                Ticket Description:{" "}
                                                {
                                                    survey.originating_ticket_description
                                                }
                                            </Col>
                                        </Row>
                                        {survey.follow_up_commnets && (
                                            <Row>
                                                <Col>
                                                    <i>
                                                        {
                                                            survey.follow_up_commnets
                                                        }
                                                    </i>
                                                </Col>
                                            </Row>
                                        )}
                                    </CardBody>
                                    <CardFooter>
                                        <RCAFormModal cellprops={survey} />
                                    </CardFooter>
                                </Card>
                            </Fade>
                        </Col>
                    </Row>
                ))
            ) : (
                <Row>
                    <Col md={10} className="mx-auto mb-4">
                        <UploadData />
                    </Col>
                </Row>
            )}
        </div>
    );
}
