import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Form, FormGroup } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ccms_status: (props || {}).ccms_status };
    }

    typeaheadProps = {
        bsSize: "sm",
        labelKey: "name",
        onChange: selected =>
            this.setState(
                { ccms_status: selected[0] },
                console.log({ ccms_status: selected[0] })
            ),
        id: "id_" + this.state.ccms_status,
        options: this.props.ccms_status,
        selected: this.state.ccms_status ? [this.state.ccms_status] : [],
        placeholder: "Select...",
        selectHintOnEnter: true,
        clearButton: true
    };

    render() {
        return (
            <Fragment>
                <Form>
                    <FormGroup>
                        <Typeahead {...this.typeaheadProps} />
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ccms_status: state.ccms.ccms_status
});

export default connect(mapStateToProps, {})(CommentForm);
