import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form
} from "reactstrap";

const ConfirmModal = ({
    open,
    toggle,
    parentCallback,
    tableName,
    input,
    task
}) => {
    const sendConfirmation = e => {
        const { value } = e.target;

        parentCallback(value);
        toggle();
    };

    return (
        <div>
            {/* <Button size="sm" color="success">
                <i className="fas fa-plus"></i>
            </Button> */}

            <Modal isOpen={open} toggle={e => sendConfirmation(e)}>
                <ModalHeader toggle={e => sendConfirmation(e)}>
                    {tableName}
                </ModalHeader>
                <ModalBody>
                    {task == "add" ? (
                        <div>
                            <p>
                                Are you sure you want to add{" "}
                                <strong>{input}</strong> to{" "}
                                <strong>{tableName}</strong> table?
                            </p>
                        </div>
                    ) : (
                        <div>
                            <p>
                                Are you sure you want to change it to{" "}
                                <strong>{input}</strong>?
                            </p>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={e => sendConfirmation(e)}
                        value="Yes"
                    >
                        Yes
                    </Button>{" "}
                    <Button color="danger" onClick={e => sendConfirmation(e)}>
                        No
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ConfirmModal;
