import React, { Component } from "react";

import config from "./Config";
import { UserAgentApplication } from "msal";
import { getUserDetails } from "./GraphService";

import { BrowserRouter as Router, Route } from "react-router-dom";

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
import { getAllData2 } from "../actions/surveyActions";

import store from "../store";

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

        this.userAgentApplication = new UserAgentApplication({
            auth: {
                clientId: config.appId
            },
            cache: {
                cacheLocation: "localStorage",
                storeAuthStateInCookie: true
            }
        });

        var user = this.userAgentApplication.getAccount();

        this.state = {
            isAuthenticated: user !== null,
            user: {},
            error: null
        };

        if (user) {
            // Enhance user object with data from Graph
            this.getUserProfile();
        }
    }
    // componentDidMount() {
    //     store.dispatch(getAllData2());
    // }

    async login() {
        try {
            await this.userAgentApplication.loginPopup({
                scopes: config.scopes,
                prompt: "select_account"
            });
            await this.getUserProfile();
        } catch (err) {
            var error = {};

            if (typeof err === "string") {
                var errParts = err.split("|");
                error =
                    errParts.length > 1
                        ? { message: errParts[1], debug: errParts[0] }
                        : { message: err };
            } else {
                error = {
                    message: err.message,
                    debug: JSON.stringify(err)
                };
            }

            this.setState({
                isAuthenticated: false,
                user: {},
                error: error
            });
        }
    }

    logout() {
        this.userAgentApplication.logout();
    }

    async getUserProfile() {
        try {
            // Get the access token silently
            // If the cache contains a non-expired token, this function
            // will just return the cached token. Otherwise, it will
            // make a request to the Azure OAuth endpoint to get a token

            var accessToken = await this.userAgentApplication.acquireTokenSilent(
                {
                    scopes: config.scopes
                }
            );

            if (accessToken) {
                // Get the user's profile from Graph
                var user = await getUserDetails(accessToken);
                this.setState({
                    isAuthenticated: true,
                    user: {
                        displayName: user.displayName,
                        email: user.mail || user.userPrincipalName
                    },
                    error: null
                });
                store.dispatch(
                    loadUser({
                        displayName: user.displayName,
                        email: user.mail || user.userPrincipalName
                    })
                );
                // store.dispatch(getAllData2());
            }
        } catch (err) {
            var error = {};
            if (typeof err === "string") {
                var errParts = err.split("|");
                error =
                    errParts.length > 1
                        ? { message: errParts[1], debug: errParts[0] }
                        : { message: err };
            } else {
                error = {
                    message: err.message,
                    debug: JSON.stringify(err)
                };
            }

            this.setState({
                isAuthenticated: false,
                user: {},
                error: error
            });
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
        // store.dispatch(loadUser());
        // if (store.getState().auth.isAuthenticated != null) {
        //     store.dispatch(getAllData2());
        // }
        // store.dispatch(getAllData2());

        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <div>
                            <NavBar
                                isAuthenticated={this.state.isAuthenticated}
                                authButtonMethod={
                                    this.state.isAuthenticated
                                        ? this.logout.bind(this)
                                        : this.login.bind(this)
                                }
                                user={this.state.user}
                            />
                            <Alerts />

                            <Route
                                exact
                                path="/cba"
                                render={props => (
                                    <Welcome
                                        {...props}
                                        isAuthenticated={
                                            this.state.isAuthenticated
                                        }
                                        user={this.state.user}
                                        authButtonMethod={this.login.bind(this)}
                                    />
                                )}
                            />
                            <div style={{ marginTop: "100px" }}>
                                <div className="container-fluid">
                                    <PrivateRoute
                                        exact
                                        path="/bottombox"
                                        isAuthenticated={
                                            this.state.isAuthenticated
                                        }
                                        user={this.state.user}
                                        component={
                                            this.state.isAuthenticated &&
                                            BottomBox
                                        }
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
