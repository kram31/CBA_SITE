import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import Header from "./Header";
import BottomBox from "./bottombox/dashboard/BottomBox";
import Alerts from "./bottombox/components/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { loadUser } from "../actions/auth";

import store from "../store";

import "../font/stylesheet.css";
import "../css/main.css";

// Alert options
const alertOptions = {
    timeout: 6000,
    position: "bottom center"
};

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        store.dispatch(loadUser());
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />

                            <div className="container-fluid">
                                <Switch>
                                    <PrivateRoute
                                        exact
                                        path="/"
                                        component={BottomBox}
                                    />
                                    <Route
                                        exact
                                        path="/register"
                                        component={Register}
                                    />
                                    <Route
                                        exact
                                        path="/login"
                                        component={Login}
                                    />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    }
}

export default App;
