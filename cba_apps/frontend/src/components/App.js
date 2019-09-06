import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import UploadData from "./bottombox/upload-data/UploadData";
import BottomBox from "./bottombox/dashboard/BottomBox";
import { Provider } from "react-redux";
import store from "../store";
import SideBar from "./SideBar";

import { Row, Col } from "reactstrap";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    <Header />
                    <div className="container-fluid">
                        <SideBar />
                        <div className="main" style={{ marginLeft: "250px" }}>
                            <BottomBox />
                        </div>
                    </div>
                </Fragment>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
