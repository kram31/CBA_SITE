import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

class SurveyDetails extends Component {
	sendData = () => {
		this.props.parentCallback('x');
	};

	render() {
		let {
			reference_number,
			owner_name,
			first_name,
			last_name,
			customer_email_address,
			origination_source,
			callback_reference_number,
			related_incident_record,
			site_location,
			city,
			state,
			user_location,
			phone_number,
			call_type,
			service_type,
			service,
			service_component,
			average_score,
			fulfillment,
			assignment_group,
			originating_ticket_description,
			follow_up_comments,
			q1,
			q2,
			q2a,
			q3,
			q3a,
			q4,
			q5,
			q6,
			budi_bu,
			budi_lv7,
			bu_catg,
			date_issued,
			uploaded_by,
			date_uploaded

		} = this.props.survey;
		return (
			<Fragment>
				<Card id="survey-details" style={{ flexGrow: '1' }}>
					<CardHeader>
						<Row className="mt-2">
							<Col md={6}>
								<h5>Survey Details - {reference_number}</h5>
							</Col>
							<Col md={6} className="mr-auto" style={{ textAlign: 'right' }}>
								<span id="bottombox-close" onClick={this.sendData}>
									<i className="fa fa-times" />
								</span>
							</Col>
						</Row>
					</CardHeader>
					<CardBody className="survey-detail">
		
						<Row className="survey-row">
							<Col md={6}>
								<p>
									<span>Customer Name: </span>
									<strong>
										{first_name} {last_name}
									</strong>
								</p>
							</Col>
							<Col md={6}>
								<p>
									<span>Email Address: </span>
									<strong>{customer_email_address}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={6}>
								<p>
									<span>Phone number: </span>
									<strong>{phone_number}</strong>
								</p>
							</Col>
							<Col md={6}>
								<p>
									<span>User Location: </span>
									<strong>{user_location}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={6}>
								<p>
									<span>Callback Reference Number: </span>
									<strong>{callback_reference_number}</strong>
								</p>
							</Col>
							<Col md={6}>
								<p>
									<span>Related Incident Record: </span>
									<strong>{related_incident_record}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={6}>
								<p>
									<span>Site Location: </span>
									<strong>{site_location}</strong>
								</p>
							</Col>
							<Col md={3}>
								<p>
									<span>City: </span>
									<strong>{city}</strong>
								</p>
							</Col>
							<Col md={3}>
								<p>
									<span>State: </span>
									<strong>{state}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={6}>
								<p>
									<span>Call Type: </span>
									<strong>{call_type}</strong>
								</p>
							</Col>
							<Col md={6}>
								<p>
									<span>Service Type: </span>
									<strong>{service_type}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={6}>
								<p>
									<span>Service: </span>
									<strong>{service}</strong>
								</p>
							</Col>
							<Col md={6}>
								<p>
									<span>Service Component: </span>
									<strong>{service_component}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={6}>
								<p>
									<span>Assignment Group: </span>
									<strong>{assignment_group}</strong>
								</p>
							</Col>

							<Col md={6}>
								<p>
									<span>Source: </span>
									<strong>{origination_source}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={12}>
								<p>
									<span>Originating Ticket Description: </span>
									<strong>{originating_ticket_description}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={12}>
								<p>
									<span>Follow up comments: </span>
									<strong>{follow_up_comments}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={6}>
								<p>
									<span>Average Score: </span>
									<strong>{average_score}</strong>
								</p>
							</Col>
							<Col md={6}>
								<p>
									<span>Fulfillment: </span>
									<strong>{fulfillment}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={12}>
								<p>
									<span>Q1: </span>
									<strong>{q1}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={12}>
								<p>
									<span>Q2: </span>
									<strong>{q2}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={12}>
								<p>
									<span>Q2a: </span>
									<strong>{q2a}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={12}>
								<p>
									<span>Q3: </span>
									<strong>{q3}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={12}>
								<p>
									<span>Q3a: </span>
									<strong>{q3a}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={12}>
								<p>
									<span>Q4: </span>
									<strong>{q4}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={12}>
								<p>
									<span>Q4: </span>
									<strong>{q5}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={12}>
								<p>
									<span>Q6: </span>
									<strong>{q6}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={6}>
								<p>
									<span>BUDI_BU: </span>
									<strong>{budi_bu}</strong>
								</p>
							</Col>
							<Col md={6}>
								<p>
									<span>BUDI_LV7: </span>
									<strong>{budi_lv7}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={6}>
								<p>
									<span>BU_CATG: </span>
									<strong>{bu_catg}</strong>
								</p>
							</Col>
							<Col md={6}>
								<p>
									<span>Date Issued: </span>
									<strong>{date_issued}</strong>
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={6}>
								<p>
									<span>Uploaded by: </span>
									<strong>{uploaded_by}</strong>
								</p>
							</Col>
							<Col md={6}>
								<p>
									<span>Date uploaded: </span>
									<strong>{date_uploaded}</strong>
								</p>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	survey: state.surveys.survey
});

export default connect(null, {})(SurveyDetails);
