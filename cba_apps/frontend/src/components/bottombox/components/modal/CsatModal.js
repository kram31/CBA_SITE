import React, { useState, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

const CsatModal = (props) => {
    const {
        buttonLabel,
        buttonColor,
        className,
        component: Component,
        cellData,
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const color = cellData
        ? cellData.date_completed
            ? "#5cb85c"
            : cellData.surveyed_ticket.bottombox === 1
            ? "#d9534f"
            : "#f0ad4e"
        : null;

    return (
        <Fragment>
            <Button color={buttonColor} onClick={toggle}>
                {buttonLabel}
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader style={{ backgroundColor: color }} toggle={toggle}>
                    {buttonLabel}
                    {cellData
                        ? ` - ${cellData.surveyed_ticket.reference_number}`
                        : null}
                </ModalHeader>
                <ModalBody>
                    <Component cellData={cellData} />
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default CsatModal;
