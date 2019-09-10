import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import UploadData from "./bottombox/upload-data/UploadData";
import BottomBox from "./bottombox/dashboard/BottomBox";
import { Provider } from "react-redux";
import store from "../store";
import SideBar from "./SideBar";
import "../font/stylesheet.css"
import "../App.css"



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


export default App