import React, { Fragment } from 'react';
import ReactExport from 'react-data-export';
import { connect } from 'react-redux';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
	{
		name: 'Johson',
		amount: 30000,
		sex: 'M',
		is_married: true
	},
	{
		name: 'Monika',
		amount: 355000,
		sex: 'F',
		is_married: false
	},
	{
		name: 'John',
		amount: 250000,
		sex: 'M',
		is_married: false
	},
	{
		name: 'Josef',
		amount: 450500,
		sex: 'M',
		is_married: true
	}
];

var dataSet2 = [
	{
		name: 'Johnson',
		total: 25,
		remainig: 16
	},
	{
		name: 'Josef',
		total: 25,
		remainig: 7
	}
];

class ExtractData extends React.Component {
	render() {
		let rca_headers;
		this.props.rcas[0] && (rca_headers = Object.keys(this.props.first_rca));

		return (
			<ExcelFile filename="Bottombox" element={<button>Download Data</button>}>
				<ExcelSheet data={this.props.surveys} name="Surveys">
					{this.props.headers.map((item) => <ExcelColumn key={item} label={item} value={item} />)}
				</ExcelSheet>
				{this.props.rcas[0] && (
					<ExcelSheet data={this.props.rcas} name="RCAs">
						{rca_headers.map((item) => <ExcelColumn key={item} label={item} value={item} />)}
					</ExcelSheet>
				)}
			</ExcelFile>
		);
	}
}

const mapStateToProps = (state) => ({
	surveys: state.surveys.surveys,
	headers: state.surveys.headers,
	rcas: state.surveys.rcas
});

export default connect(mapStateToProps, {})(ExtractData);
