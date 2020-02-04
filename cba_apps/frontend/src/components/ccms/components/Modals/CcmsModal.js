import React, { useState, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CcmsModal = props => {
    const {
        color,
        className,
        buttonLabel,
        parentCallback,
        value,
        ccms_entry_id,
        submitForm,
        // Testing new modal button
        isOpen,
        parentToggle
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const sendData = e =>
        e == "Yes"
            ? parentCallback({ is_sending: e, value, ccms_entry_id }, toggle())
            : toggle();

    return (
        <Fragment>
            {/* <Button color={color} className={className} onSubmit={submitForm}>
                {buttonLabel}
            </Button> */}
            <Modal isOpen={isOpen} toggle={parentToggle}>
                <ModalHeader toggle={parentToggle}>Submit Form</ModalHeader>
                <ModalBody>
                    Are you sure you want to submit this {value}?
                </ModalBody>
                <ModalFooter>
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
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default CcmsModal;
