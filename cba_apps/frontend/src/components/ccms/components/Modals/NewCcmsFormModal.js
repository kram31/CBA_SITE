import React, { Component, Fragment } from "react";

import CcmsForm from "../CcmsForm";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form
} from "reactstrap";

import { connect } from "react-redux";

import {
    open_collapse,
    close_modal,
    toggle_modal,
    get_selected_ccms_new
} from "../../../../actions/ccmsActions";

class NewCcmsFormModal extends Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: false };
    }

    // toggle = () => this.setState({ isOpen: !this.state.isOpen });
    toggle = () => {
        console.log("working");
        this.props.get_selected_ccms_new(this.props.ccms_entry);
    };

    render() {
        return (
            <Fragment>
                <Button color="primary" onClick={this.toggle}>
                    View Case
                </Button>
                <Form>
                    <Modal
                        style={{
                            color: "white"
                        }}
                        isOpen={
                            this.props.modal &&
                            this.props.selected_ccms.id ==
                                this.props.ccms_entry.id
                        }
                        toggle={this.props.close_modal}
                        size="lg"
                    >
                        <ModalHeader
                            toggle={this.props.close_modal}
                            style={{
                                color: "black",
                                border: "1px solid white"
                            }}
                        >
                            CCMS ID {this.props.ccms_entry.id}
                        </ModalHeader>
                        <ModalBody
                            style={{
                                backgroundColor: "black",
                                border: "1px solid white"
                            }}
                        >
                            <CcmsForm
                                list_type={this.props.list_type}
                                ccms_entry={this.props.selected_ccms}
                            />
                        </ModalBody>
                        {/* <ModalFooter>
                            <Button
                                color="primary"
                                onClick={this.toggle}
                                value="Yes"
                            >
                                Yes
                            </Button>{" "}
                            <Button
                                color="secondary"
                                onClick={this.toggle}
                                value="No"
                            >
                                No
                            </Button>
                        </ModalFooter> */}
                    </Modal>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    users_list: state.ccms.users_list,
    modal: state.ccms.modal,
    selected_ccms: state.ccms.selected_ccms
});

export default connect(mapStateToProps, {
    open_collapse,
    close_modal,
    toggle_modal,
    get_selected_ccms_new
})(NewCcmsFormModal);
