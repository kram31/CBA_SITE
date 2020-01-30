import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
    get_ccms_list,
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
    Col,
    Table,
    Form,
    Input,
    Button
} from "reactstrap";

import UpdateInput from "./UpdateInput";
import CcmsView from "./CcmsView";

class Ccms extends Component {
    constructor(props) {
        super(props);

        props.get_ccms_list();
        props.getComments();

        this.state = {
            search: "",
            search_results: []
        };
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
    //     //     this.props.get_ccms_list(mails.value);
    //     //     this.props.getSurveys();
    //     //     console.log("initialize state");
    //     // } catch (err) {
    //     //     console.log(err);
    //     // }
    //     // this.props.get_ccms_list();
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

    // 2 Search boxes : All CCMS Entry List and Assigned CCMS List
    // add identifiers for each Search box then include as arguments

    handleSearch = e => {
        const { ccms_list } = this.props.ccms;

        // e.target.name: e.target.value
        console.log(e.target.value);

        this.setState({
            [e.target.name]: e.target.value
        });

        let kw = e.target.value;

        // search for ccms.ccms_list.id, ccms.ccms_list.escalated_ticket, ccms.ccms_list.escalated_email_address, ccms.ccms_list.escalated_name
        // all results will be stored in an array of objects

        let items = ccms_list.filter(
            item =>
                kw == item.id ||
                kw == item.escalated_ticket ||
                kw == item.escalated_email_address ||
                kw == item.escalated_name
        );

        console.log(items);

        this.setState({
            search_results: items
        });
    };

    render() {
        const { ccms } = this.props;

        if (ccms.isFetching)
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

        // New View CCMS_View
        // args = title, data_list, input name, callback function (child to parent)

        return (
            <Container>
                <CcmsView />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    ccms: state.ccms,
    auth: state.auth,
    comments: state.ccms.comments
});

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
    get_ccms_list,
    isFetching,
    getSurveys,
    ack_entry,
    getComments
})(Ccms);
