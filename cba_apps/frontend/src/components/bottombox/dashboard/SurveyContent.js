import React, { Fragment, Component } from 'react';
import SurveyDetails from '../components/SurveyDetails';
import RCAFormModal from '../rca/RCAFormModal';
import { connect } from 'react-redux';
import { toggle } from '../../../actions/modalToggleActions';
import { getSurvey, getAgentDetails } from '../../../actions/surveyActions';
import { Button, Table, Container, Fade, Card, CardHeader, CardFooter, CardBody, Row, Col, Collapse } from 'reactstrap';

class SurveyContent extends Component {
	state = {
		activeItem: {},
		isOpen: false
	};

	handleToggle = (data) => {
		this.props.getSurvey(data);
		this.props.toggle();
	};

	handleClick = (item) => {
		this.props.getSurvey(item);
		this.setState((state, props) => ({
			activeItem: item,
			isOpen: !state.isOpen
		}));
		console.log('Clicking');
	};

	render() {
		return (
			<Fragment>
				<Card>
					<CardHeader>Bottombox Surveys</CardHeader>
					<CardBody>
						<Table size="sm">
							<thead>
								<tr>
									<th>Action</th>
									<th>Reference Number</th>
									<th>Agent Name</th>
									<th>Customer Name</th>
								</tr>
							</thead>
							<tbody>
								{this.props.bottombox.map((item) => (
									<tr key={item.reference_number}>
										<td>
											<Button
												outline
												size="sm"
												className="ml-1"
												onClick={() => this.handleToggle(item)}
											>
												RCA
											</Button>
											<RCAFormModal />
										</td>
										<td onClick={() => this.handleClick(item)}>{item.reference_number}</td>
										<td>{item.owner_name}</td>
										<td>
											{item.first_name} {item.last_name}
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						<Collapse isOpen={this.state.isOpen}>
							<Row>
								<Col>
									<SurveyDetails survey={this.state.activeItem} />
								</Col>
								<Col>
									<h4>RCA FORM</h4>
								</Col>
							</Row>
						</Collapse>
					</CardBody>
				</Card>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	isOpen: state.modal.isOpen,
	bottombox: state.surveys.surveys.filter((item) => item.bottombox == 1)
});

export default connect(mapStateToProps, { toggle, getSurvey, getAgentDetails })(SurveyContent);
