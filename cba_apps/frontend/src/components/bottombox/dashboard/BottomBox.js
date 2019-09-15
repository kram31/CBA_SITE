import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import UploadDataModal from '../upload-data/UploadDataModal';
import RCAFormModal from '../rca/RCAFormModal';
import UploadData from '../upload-data/UploadData';
import SurveyContent from './SurveyContent';
import DatatablePage from '../upload-data/survey-data-table/DatatablePage';
import SideBar from '../../SideBar';

import { Spinner, Card, Fade, CardHeader, CardFooter, CardBody, Row, Col, ButtonGroup, Button } from 'reactstrap';

import {
	getSurveys,
	deleteSurvey,
	getSurvey,
	getAgentDetails,
	getSkills,
	getDsatCode1,
	getBBDriverCode2,
	getBBDriverCode3,
	removeSurvey,
	getTeams
} from '../../../actions/surveyActions';

class BottomBox extends Component {
	componentDidMount() {
		this.props.getSurveys();
		this.props.getSkills();
		this.props.getDsatCode1();
		this.props.getBBDriverCode2();
		this.props.getBBDriverCode3();
		this.props.getTeams();
	}

	render() {
		return (
			<Fragment>
				{this.props.isFetching ? (
					<Spinner style={{ width: '3rem', height: '3rem', top: '50%', left: '50%', position: 'fixed' }} />
				) : (
					<div>
						<div className="sidebar-main">
							<SideBar />
						</div>
						<div className="main">
							<div className="section section-a">
								<SurveyContent />
							</div>
							<div className="section section-b">
								<h1>Markup for survey details + RCA form</h1>
							</div>
							<div className="section section-c">
								<DatatablePage />
							</div>
						</div>
					</div>
				)}
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	isFetching: state.surveys.isFetching
});

export default connect(mapStateToProps, {
	getSurveys,
	getSkills,
	getDsatCode1,
	getBBDriverCode2,
	getBBDriverCode3,
	removeSurvey,
	getTeams
})(BottomBox);
