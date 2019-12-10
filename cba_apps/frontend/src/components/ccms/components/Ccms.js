import React, { Component } from "react";
import { connect } from "react-redux";

import { Table } from "reactstrap";

import { getMails, isFetching, getSurveys } from "../../../actions/ccmsActions";

import config from "../../Config";
import { getUserMails } from "../../GraphService";

class Ccms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mails: []
        };
    }

    async componentDidMount() {
        try {
            // Get the user's access token
            var accessToken = await window.msal.acquireTokenSilent({
                scopes: config.scopes
            });
            // Get the user's events
            var mails = await getUserMails(accessToken);
            // Update the array of events in state
            this.setState({ mails: mails.value });
            this.props.getMails(mails.value);
            this.props.getSurveys();

            console.log("initialize state");
        } catch (err) {
            console.log(err);
        }
        console.log(this.props.mails);
    }
    render() {
        return (
            <div>
                <h1>Mails</h1>
                <Table style={{ color: "white" }}>
                    <thead>
                        <tr>
                            <th scope="col">Subject</th>

                            <th scope="col">From</th>
                            <th scope="col">Email address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.mails.map(mail => {
                            return (
                                <tr key={mail.id}>
                                    <td>{mail.subject}</td>
                                    <td>{mail.sender.emailAddress.name}</td>
                                    <td>{mail.sender.emailAddress.address}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    mails: state.ccms.mails,
    auth: state.auth
});

export default connect(mapStateToProps, { getMails, isFetching, getSurveys })(
    Ccms
);
