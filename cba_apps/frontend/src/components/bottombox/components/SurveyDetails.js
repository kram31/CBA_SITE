import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Container, Fade, Card, CardHeader, CardFooter, CardBody, Row, Col } from 'reactstrap';

class SurveyDetails extends Component {
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
			assignment_group
		} = this.props.survey;
		return (
			<Fragment>
				<Card>
					<CardHeader>
						<h5>Survey Details</h5>
					</CardHeader>
					<CardBody className="survey-detail">
						<Row className="survey-row">
							<Col md={4}>
								<p>Reference Number: {reference_number}</p>
							</Col>
							<Col md={4}>
								<p>Agent Name: {owner_name}</p>
							</Col>
							<Col md={4}>
								<p>Source: {origination_source}</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={4}>
								<p>
									<span>Customer Name:</span> {first_name} {last_name}
								</p>
							</Col>
							<Col md={4}>
								<p>Email Address: {customer_email_address}</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={4}>
								<p>
									<span>Callback Reference Number:</span> {callback_reference_number}
								</p>
							</Col>
							<Col md={4}>
								<p>
									<span>Related Incident Record:</span> {related_incident_record}
								</p>
							</Col>
							<Col md={4}>
								<p>
									<span>Phone number:</span> {phone_number}
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={3}>
								<p>
									<span>Site Location:</span> {site_location}
								</p>
							</Col>
							<Col md={3}>
								<p>
									<span>City:</span> {city}
								</p>
							</Col>
							<Col md={3}>
								<p>
									<span>State:</span> {state}
								</p>
							</Col>
							<Col md={3}>
								<p>
									<span>User Location:</span> {user_location}
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={3}>
								<p>
									<span>Call Type:</span> {call_type}
								</p>
							</Col>
							<Col md={3}>
								<p>
									<span>Service Type:</span> {service_type}
								</p>
							</Col>
							<Col md={3}>
								<p>
									<span>Service:</span> {service}
								</p>
							</Col>
							<Col md={3}>
								<p>
									<span>Service Component:</span> {service_component}
								</p>
							</Col>
						</Row>
						<Row className="survey-row">
							<Col md={4}>
								<p>
									<span>Average Score:</span> {average_score}
								</p>
							</Col>
							<Col md={4}>
								<p>
									<span>Fulfillment:</span> {fulfillment}
								</p>
							</Col>
							<Col md={4}>
								<p>
									<span>Assignment Group:</span> {assignment_group}
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
