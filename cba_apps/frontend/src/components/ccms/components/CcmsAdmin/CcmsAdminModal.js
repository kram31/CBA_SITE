import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

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
                <div style={{ textAlign: "center" }} id="icon_w_badge">
                    <i
                        id="btn_ccms_admin"
                        onClick={this.toggle}
                        className="fas fa-user-shield"
                    ></i>
                    <figcaption style={{ fontSize: "12px" }}>
                        CCMS Admin
                    </figcaption>
                </div>

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
