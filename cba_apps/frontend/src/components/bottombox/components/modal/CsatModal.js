import React, { useState, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

const CsatModal = props => {
    const {
        buttonLabel,
        buttonColor,
        className,
        component: Component,
        cellData
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <Button color={buttonColor} onClick={toggle}>
                {buttonLabel}
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>
                    {buttonLabel}
                    {cellData
                        ? ` - ${cellData.surveyed_ticket.reference_number}`
                        : null}
                </ModalHeader>
                <ModalBody>
                    <Component cellData={cellData} />
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Do Something
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter> */}
            </Modal>
        </Fragment>
    );
};

export default CsatModal;
