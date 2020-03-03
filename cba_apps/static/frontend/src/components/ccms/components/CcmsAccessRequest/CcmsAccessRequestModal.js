import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, Badge, Button } from "reactstrap";

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
                <Button
                    onClick={this.toggle}
                    color={this.props.color}
                    className="mr-1"
                >
                    <Badge style={{ fontSize: "10px" }} color="danger">
                        {this.props.requestCount}
                    </Badge>
                    <span className="mx-1">
                        <i id="btn_ccms_admin" className="fas fa-user-plus"></i>
                    </span>
                    Access Request
                </Button>
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
