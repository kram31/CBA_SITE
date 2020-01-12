import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Table } from "reactstrap";

import { getMails, isFetching, getSurveys } from "../../../actions/ccmsActions";

import { Spinner, Card, CardBody, CardHeader, Container } from "reactstrap";

class Ccms extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     mails: props.mails
        // };
        props.getMails();
    }

    // componentDidMount() {
    //     // try {
    //     //     // Get the user's access token
    //     //     var accessToken = await window.msal.acquireTokenSilent({
    //     //         scopes: config.scopes
    //     //     });
    //     //     // Get the user's events
    //     //     var mails = await getUserMails(accessToken);
    //     //     // Update the array of events in state
    //     //     this.setState({ mails: mails.value });
    //     //     this.props.getMails(mails.value);
    //     //     this.props.getSurveys();
    //     //     console.log("initialize state");
    //     // } catch (err) {
    //     //     console.log(err);
    //     // }
    //     // this.props.getMails();
    //     console.log(this.props.mails);
    // }

    render() {
        const { mails } = this.props;

        console.log(mails.isFetching);

        if (mails.isFetching)
            return (
                <Spinner
                    style={{
                        width: "3rem",
                        height: "3rem",
                        top: "50%",
                        left: "50%",
                        position: "fixed"
                    }}
                />
            );

        return (
            <div>
                <Container>

                    <h1>CCMS List</h1>
                    <CCMS_List mails={this.props.mails.mails}/>
                </Container>
                {/* <Table style={{ color: "white" }}>
                    <thead>
                        <tr>
                            <th scope="col">Subject</th>

                            <th scope="col">From</th>
                            <th scope="col">Email address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Mail_Content mails={this.props.mails.mails} />
                    </tbody>
                </Table> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    mails: state.ccms,
    auth: state.auth
});

const Mail_Content = props => {
    if (props.mails) {
        return props.mails.map(mail => {
            console.log(mail);
            return (
                <tr key={mail.id}>
                    <td>{mail.email_subject}</td>
                    <td>{mail.sender_name}</td>
                    <td>{mail.sender_email_address}</td>
                </tr>
            );
        });
    } else {
        return <h1>No mails</h1>;
    }
};

const CCMS_List = props => {
    if (props.mails) {
        return props.mails.map(mail => {
            
            return (

        
                    <Card key={mail.id} className="mb-4">
                        <CardHeader>
                            <h3>{mail.email_subject}</h3>
                        </CardHeader>
                        <CardBody>
                            <p>{mail.sender_name}</p>
                            <p>{mail.sender_email_address}</p>
                        </CardBody>
                    </Card>

            )
        })
    } else {
        return <h1>No mails</h1>;
    }
}

export default connect(mapStateToProps, { getMails, isFetching, getSurveys })(
    Ccms
);
