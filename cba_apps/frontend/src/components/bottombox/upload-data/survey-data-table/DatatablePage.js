import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';

import { connect } from 'react-redux';

import { deleteSurvey } from '../../../../actions/surveyActions';
import { toggle } from '../../../../actions/modalToggleActions';

import RCAFormModal from '../../rca/RCAFormModal';

import { getSurvey, getAgentDetails } from '../../../../actions/surveyActions';

import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Col } from 'reactstrap';

class DatatablePage extends Component {
	state = { cellprops: null, filtered: [] };

	handleDelete = (e) => this.props.deleteSurvey(e);

	handleToggle = (data) => {
		this.props.getSurvey(data);
		this.props.getAgentDetails(data.operator_lan_id);
		this.props.toggle();
	};

	handleClick = () => {
		let sortedData = this.reactTable.getResolvedState().sortedData;
		console.log(sortedData);
	};

	handleSubmit = (e) => {
		console.log('Submit');
	};

	handleChange = (e) => {
		console.log('change');
	};

	render() {
		// Creating Headers for table
		const headers = this.props.headers.map(
			(val) =>
				val !== 'date_issued'
					? Object.assign({ ['Header']: val, ['accessor']: val })
					: Object.assign({ ['Header']: val, ['accessor']: val, ['filterable']: true })
		);
		// Creating buttons for table
		const buttons = {
			Header: 'Actions',
			Cell: (cellprops) => (
				<Fragment>
					<div className="btn-group">
						<Button
							color="danger"
							size="sm"
							onClick={() => this.handleDelete(cellprops.original.reference_number)}
						>
							Delete
						</Button>
						{cellprops.original.bottombox == 1 && (
							<div>
								<Button
									color="primary"
									size="sm"
									className="ml-1"
									onClick={() => this.handleToggle(cellprops.original)}
								>
									RCA
								</Button>
								<RCAFormModal />
							</div>
						)}
					</div>
				</Fragment>
			),
			width: 200
		};
		const columns = [ buttons, ...headers ];
		return (
			<Fragment>
				<h3>Survey Table</h3>
				<Button onClick={this.handleClick}>get data</Button>
				<Form onSubmit={this.handleSubmit}>
					<Row>
						<Col md={4}>
							<InputGroup size="sm">
								<InputGroupAddon addonType="prepend">
									<InputGroupText>From</InputGroupText>
								</InputGroupAddon>
								<Input type="date" name="from_date" onChange={this.handleChange} />
								<InputGroupAddon addonType="prepend">
									<InputGroupText>To</InputGroupText>
								</InputGroupAddon>
								<Input type="date" name="to_date" onChange={this.handleChange} />
							</InputGroup>
						</Col>
					</Row>
				</Form>
				<ReactTable
					className="-striped -highlight"
					ref={(r) => (this.reactTable = r)}
					// filtered={this.state.filtered}
					// onFilteredChange={(filtered) => {
					// 	this.setState({ filtered });
					// 	console.log(filtered);
					// }}
					style={{ backgroundColor: 'white' }}
					// DATA that will be displayed should be the same data to be extracted
					data={this.props.data}
					columns={columns}
					minRows={10}
					defaultPageSize={10}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	headers: state.surveys.headers,
	data: state.surveys.surveys,
	isOpen: state.modal.isOpen
});

export default connect(mapStateToProps, {
	deleteSurvey,
	toggle,
	getSurvey,
	getAgentDetails
})(DatatablePage);
