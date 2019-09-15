import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import UploadData from './bottombox/upload-data/UploadData';
import BottomBox from './bottombox/dashboard/BottomBox';
import { Provider } from 'react-redux';
import store from '../store';
import SideBar from './SideBar';
import '../font/stylesheet.css';
import '../css/main.css';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Fragment>
					<Header />

					<div className="container-fluid">
						<BottomBox />
					</div>
				</Fragment>
			</Provider>
		);
	}
}

export default App;
