import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, Badge } from "reactstrap";

import CcmsAccessRequest from "./CcmsAccessRequest";

class CcmsAccessRequestModal extends Component {
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
                    <Badge style={{ fontSize: "12px" }} color="primary">
                        {this.props.requestCount}
                    </Badge>
                    <i
                        id="btn_ccms_admin"
                        onClick={this.toggle}
                        className="fas fa-user-plus"
                    ></i>
                    <figcaption style={{ fontSize: "12px" }}>
                        Access Request
                    </figcaption>
                </div>
                <Modal
                    isOpen={this.state.isOpen}
                    toggle={this.toggle}
                    size="lg"
                >
                    <ModalHeader toggle={this.toggle}>
                        CCMS Access Requests
                    </ModalHeader>
                    <ModalBody style={{ backgroundColor: "black" }}>
                        <CcmsAccessRequest />
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

export default CcmsAccessRequestModal;
