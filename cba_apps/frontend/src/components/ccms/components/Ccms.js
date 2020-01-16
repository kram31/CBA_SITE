import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
    getMails,
    isFetching,
    getSurveys,
    ack_entry,
    getComments
} from "../../../actions/ccmsActions";

import {
    Spinner,
    Card,
    CardBody,
    CardHeader,
    Container,
    Row,
    Col
} from "reactstrap";

import UpdateInput from "./UpdateInput";

class Ccms extends Component {
    constructor(props) {
        super(props);

        props.getMails();
        props.getComments();
    }

    handleClick = childData => {
        const { user } = this.props.auth;
        // console.log(`working ${childData}`);
        // console.log(this.getCurrentDate());
        // console.log(user.displayName);
        let data = {
            is_acknowledged: true,
            acknowledged_by: user.displayName,
            date_acknowledged: this.getCurrentDate()
        };
        this.props.ack_entry(childData, data);
        // console.log(this.props.auth);
    };

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

    getCurrentDate = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;

        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        return mm + "/" + dd + "/" + yyyy;
    };

    render() {
        const { mails } = this.props;

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
                    <h1 style={{ color: "white" }}>CCMS List</h1>
                    <CCMS_List
                        mails={this.props.mails.mails}
                        action={this.handleClick}
                        curr_date={this.getCurrentDate()}
                        comments={this.props.comments}
                    />
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    mails: state.ccms,
    auth: state.auth,
    comments: state.ccms.comments
});

const CCMS_List = props => {
    if (props.mails) {
        return props.mails.map(mail => {
            return (
                <Card key={mail.id} className="mb-4">
                    <CardHeader className="pt-3">
                        <h3>
                            <a href="" style={{ color: "blue" }}>
                                {mail.email_subject}
                            </a>
                        </h3>
                    </CardHeader>
                    <CardBody>
                        <p>
                            <span>Sender Name:</span> {mail.sender_name}
                        </p>
                        <p>
                            <span>Sender Email Address:</span>{" "}
                            {mail.sender_email_address}
                        </p>
                        <p>WILL DISPLAY THE EMAIL CONTENT HERE...</p>
                        <Container>
                            <Row className="border-top border-bottom text-center pt-3">
                                <Col className="align-middle">
                                    {mail.is_acknowledged ? (
                                        <p>
                                            <span>
                                                <i
                                                    className="fa fa-check-circle"
                                                    style={{ color: "green" }}
                                                />
                                            </span>{" "}
                                            Acknowledged by{" "}
                                            {mail.acknowledged_by} on{" "}
                                            {mail.date_acknowledged}
                                        </p>
                                    ) : (
                                        <p
                                            onClick={() =>
                                                props.action(mail.id)
                                            }
                                            style={{ cursor: "pointer" }}
                                        >
                                            <span>
                                                <i
                                                    className="fa fa-check-circle"
                                                    style={{ color: "red" }}
                                                />
                                            </span>{" "}
                                            Acknowledge?
                                        </p>
                                    )}
                                </Col>
                                <Col>
                                    <p>
                                        <span>
                                            <i
                                                className="fa fa-check-circle"
                                                style={{ color: "green" }}
                                            />
                                        </span>{" "}
                                        Resolved
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                        <Row className="my-3">
                            <Col>Updates: </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Comment_List
                                    comments={props.comments.filter(
                                        item => mail.id == item.mail
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className="pb-2">
                            <Col>
                                <UpdateInput
                                    curr_date={props.curr_date}
                                    mail={mail}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            );
        });
    } else {
        return <h1>No mails</h1>;
    }
};

const Comment_List = props => {
    const commentBoxStyle = {
        backgroundColor: "white",
        color: "black",
        display: "inline",
        paddingLeft: "10px",
        paddingRight: "10px",
        borderRadius: "25px",
        paddingTop: "3px",
        paddingBottom: "3px",
        fontSize: "15px"
    };

    const dateCommentStyle = {
        fontSize: "12px",
        marginTop: "6px",
        marginLeft: "5px"
    };

    return props.comments.map(comment => (
        <div key={comment.id}>
            <p style={commentBoxStyle}>
                <a href="" style={{ color: "blue", fontWeight: "bold" }}>
                    {comment.contributor_name}
                </a>
                : {comment.entry}
            </p>
            <p style={dateCommentStyle}>
                date posted: {comment.comment_entry_date}
            </p>
        </div>
    ));
};

export default connect(mapStateToProps, {
    getMails,
    isFetching,
    getSurveys,
    ack_entry,
    getComments
})(Ccms);
