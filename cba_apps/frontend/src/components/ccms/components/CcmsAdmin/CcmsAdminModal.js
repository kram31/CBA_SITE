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
        const { color, buttonLabel } = this.props;

        return (
            <Fragment>
                <Button color={color} onClick={this.toggle}>
                    {buttonLabel}
                </Button>
                <Modal
                    isOpen={this.state.isOpen}
                    toggle={this.toggle}
                    size="lg"
                >
                    <ModalHeader toggle={this.toggle}>CCMS Admin</ModalHeader>
                    <ModalBody>
                        <CcmsAdminForm />
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button
                            color="primary"
                            onClick={e => sendData(e.target.value)}
                            value="Yes"
                        >
                            Yes
                        </Button>{" "}
                        <Button
                            color="secondary"
                            onClick={e => sendData(e.target.value)}
                            value="No"
                        >
                            No
                        </Button>
                    </ModalFooter> */}
                </Modal>
            </Fragment>
        );
    }
}

export default CcmsAdminModal;
