import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

import CcmsAdminForm from "./CcmsAdminForm";

class CcmsAdminModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        return (
            <Fragment>
                <Button onClick={this.toggle} color={this.props.color}>
                    <i className="fas fa-user-shield mr-1"></i>
                    CCMS Admin
                </Button>

                <Modal
                    isOpen={this.state.isOpen}
                    toggle={this.toggle}
                    size="lg"
                >
                    <ModalHeader toggle={this.toggle}>CCMS Admin</ModalHeader>
                    <ModalBody style={{ backgroundColor: "black" }}>
                        <CcmsAdminForm />
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

export default CcmsAdminModal;
