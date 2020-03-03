import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Ccms from "./ccms/components/Ccms";

import BottomBox from "./bottombox/dashboard/BottomBox";
import Alerts from "./bottombox/components/Alerts";

import PrivateRoute from "./common/PrivateRoute";
import NavBar from "./NavBar";
import ErrorMessage from "./ErrorMessage";
import Welcome from "./Welcome";

import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { loadUser } from "../actions/auth";

import store from "../store";
import "react-bootstrap-typeahead/css/Typeahead.css";

// import "bootstrap/dist/css/bootstrap.css";
import "../font/stylesheet.css";
import "../css/main.css";

// Alert options
const alertOptions = {
    timeout: 6000,
    position: "bottom center"
};

class App extends Component {
    constructor(props) {
        super(props);

        this.getCreds();

        // this.userAgentApplication = new UserAgentApplication({
        //     auth: {
        //         clientId: config.appId
        //     },
        //     cache: {
        //         cacheLocation: "localStorage",
        //         storeAuthStateInCookie: true
        //     }
        // });

        // var user = this.userAgentApplication.getAccount();

        this.state = {
            isAuthenticated: false,
            user: {},
            error: null
        };
    }

    async getCreds() {
        try {
            await store.dispatch(loadUser());
        } catch (err) {
            console.log(err);
        }
    }

    setErrorMessage(message, debug) {
        this.setState({
            error: { message: message, debug: debug }
        });
    }

    render() {
        let error = null;
        if (this.state.error) {
            error = (
                <ErrorMessage
                    message={this.state.error.message}
                    debug={this.state.error.debug}
                />
            );
        }

        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <div>
                            <NavBar />
                            <Alerts />

                            <Route
                                exact
                                path="/cba"
                                render={props => <Welcome />}
                            />
                            <div style={{ marginTop: "100px" }}>
                                <div className="container-fluid">
                                    <PrivateRoute
                                        name="BottomBox"
                                        exact
                                        path="/bottombox"
                                        component={BottomBox}
                                    />
                                    <PrivateRoute
                                        name="Ccms"
                                        exact
                                        path="/ccms"
                                        component={Ccms}
                                    />
                                </div>
                            </div>
                        </div>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    }
}

export default App;
