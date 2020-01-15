import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import {
    getMails,
    isFetching,
    getSurveys,
    ack_entry
} from "../../../actions/ccmsActions";

import { Form, Input } from "reactstrap";

class UpdateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: "",
            curr_date: props.curr_date,
            mail: props.mail
        };
    }
    handleChange = e => {
        // console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleEnter = e => {
        if (e.keyCode == 13) {
            e.preventDefault();
            const { user } = this.props.auth;

            const { mail, entry, curr_date } = this.state;

            let data = {
                entry,
                contributor_name: user.displayName,
                comment_entry_date: curr_date,
                mail: mail.id
            };

            // entry send
            console.log(data);

            this.setState({
                entry: ""
            });
        }
    };

    render() {
        return (
            <Fragment>
                <Form>
                    <Input
                        type="text"
                        name="entry"
                        onChange={this.handleChange}
                        onKeyDown={e => this.handleEnter(e)}
                        value={this.state.entry}
                    />
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    mails: state.ccms,
    auth: state.auth
});

export default connect(mapStateToProps, {})(UpdateInput);
