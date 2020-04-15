import React, { useState } from "react";

import { Modal, ModalHeader, ModalBody, Container } from "reactstrap";

import TeamLeadForm from "./TeamLeadForm";

const TeamLeadModal = ({ className, task, userProp }) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const iconStyle = {
        color: "#28a745",
        cursor: "pointer",
    };

    return (
        <div>
            <i
                style={iconStyle}
                className={
                    task === "Add" ? "fas fa-user-plus" : "fas fa-user-edit"
                }
                onClick={toggle}
            ></i>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader
                    style={{
                        backgroundColor: task === "Add" ? "#28a745" : "#f0ad4e",
                    }}
                    toggle={toggle}
                >
                    {task} Team Lead
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <TeamLeadForm
                            task={task}
                            toggle={toggle}
                            userProp={userProp}
                        />
                    </Container>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default TeamLeadModal;
