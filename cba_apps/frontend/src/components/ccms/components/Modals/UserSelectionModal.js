import React, { Component, Fragment } from "react";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form
} from "reactstrap";

import { connect } from "react-redux";

class UserSelectionModal extends Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: false };
    }

    toggle = () => this.setState(!this.state.isOpen);

    render() {
        return (
            <Fragment>
                <Form>
                    <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>
                            Submit Form
                        </ModalHeader>
                        <ModalBody>
                            Are you sure you want to submit this {value}?
                        </ModalBody>
                        <ModalFooter>
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
                        </ModalFooter>
                    </Modal>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    users_list: state.ccms.users_list
});

export default connect(mapStateToProps, {})(UserSelectionModal);
