import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

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
                <i
                    id="btn_ccms_admin"
                    onClick={this.toggle}
                    className="fas fa-user-shield"
                ></i>

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
