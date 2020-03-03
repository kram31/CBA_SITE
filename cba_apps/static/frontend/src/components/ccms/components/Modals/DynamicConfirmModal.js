import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const DynamicConfirmModal = ({
    parentCallback,
    modal,
    formattedFormTitle,
    form_inputs,
    toggleModal
}) => {
    return (
        <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>{formattedFormTitle}</ModalHeader>
            <ModalBody>
                Sending {formattedFormTitle} for ticket{" "}
                {(form_inputs.fni || {}).ticket_number
                    ? form_inputs.fni.ticket_number
                    : null}
                ?
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    value="Yes"
                    onClick={e => parentCallback(e.target.value)}
                >
                    Yes
                </Button>{" "}
                <Button color="secondary" onClick={toggleModal}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

const Content = ({ formattedFormTitle, form_inputs }) => (
    <div>
        Sending {formattedFormTitle} for ticket{" "}
        {(form_inputs.fni || {}).ticket_number
            ? form_inputs.fni.ticket_number
            : null}
        ?
    </div>
);

export default DynamicConfirmModal;
