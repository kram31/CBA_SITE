import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const RcaFniModal = ({ modal, toggle, parentCallback, ccms_rca }) => {
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader
                    toggle={toggle}
                    style={{ backgroundColor: "green" }}
                >
                    CCMS RCA ID {ccms_rca.id}
                </ModalHeader>
                <ModalBody>
                    <p>
                        Are you sure you want to submit findings and
                        investigation to CCMS RCA ID {ccms_rca.id}{" "}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        value="Yes"
                        onClick={e => parentCallback(e.target.value)}
                    >
                        Yes
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        No
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default RcaFniModal;
