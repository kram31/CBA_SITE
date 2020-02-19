import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Fade, Row, Col, UncontrolledTooltip } from "reactstrap";

import AddDriverForm from "./AddDriverForm";
import {
    delete_cause_code,
    deleteEscalationDriver,
    deleteEscalationDriverCause
} from "../../../../actions/ccmsActions";
import ConfirmModal from "./ConfirmModal";

const DriverData = ({ driverDetails, color, tableName }) => {
    const tdStyle = { cursor: "pointer" };
    // const count = useSelector(state => state.counter.count);
    const [options, setOptions] = useState(false);
    const [edit, setEdit] = useState(false);
    // Modal
    const [isModalOpen, setModal] = useState(false);

    const dispatch = useDispatch();

    const callbackCancelEdit = () => {
        setEdit(false);
    };

    const handleModalToggle = () => {
        setModal(!isModalOpen);
    };

    const parentCallback = childData => {
        if (childData == "Yes") {
            // Send
            // if (task == "delete") {
            //  DELETE
            if (tableName == "Cause Code") {
                dispatch(delete_cause_code(driverDetails));
            } else if (tableName == "Escalation Driver") {
                dispatch(deleteEscalationDriver(driverDetails));
            } else if (tableName == "Escalation Driver Cause") {
                dispatch(deleteEscalationDriverCause(driverDetails));
            }
            // }
        }
    };

    const toolTip = {
        hide: {
            placement: "top",
            text: "Hide",
            target: "id_hide"
        },
        edit: {
            placement: "top",
            text: "Edit",
            target: "id_edit"
        },
        delete: {
            placement: "top",
            text: "Delete",
            target: "id_delete"
        }
    };

    return (
        <div>
            <ConfirmModal
                open={isModalOpen}
                toggle={handleModalToggle}
                parentCallback={parentCallback}
                tableName={tableName}
                input={driverDetails.name}
                task="delete"
            />
            <div className="float-left" style={{ ...tdStyle, color: color }}>
                {edit ? (
                    <AddDriverForm
                        tableName={tableName}
                        driverDetails={driverDetails}
                        task="edit"
                        cancelEdit={callbackCancelEdit}
                    />
                ) : (
                    driverDetails.name
                )}
            </div>
            <div
                className="float-right"
                style={{ ...tdStyle }}
                onClick={() => setOptions(!options)}
            >
                {options || edit ? (
                    <div style={{ fontSize: "18px" }}>
                        {edit ? (
                            <i
                                onClick={() => setEdit(false)}
                                style={{ color: "red" }}
                                className="fas fa-ban"
                            ></i>
                        ) : (
                            <Fragment>
                                <div
                                    className="d-inline"
                                    onClick={() => setModal(true)}
                                    style={{
                                        marginRight: "5px",
                                        color: "red"
                                    }}
                                >
                                    {/* DELETE */}
                                    <i
                                        className="far fa-minus-square"
                                        id="id_delete"
                                    ></i>
                                    <UncontrolledTooltip {...toolTip.delete}>
                                        {toolTip.delete.text}
                                    </UncontrolledTooltip>
                                </div>
                                <div
                                    className="d-inline"
                                    onClick={() => setEdit(true)}
                                    style={{
                                        color: "green",
                                        marginRight: "5px"
                                    }}
                                >
                                    {/* EDIT */}
                                    <i
                                        className="fas fa-pencil-alt"
                                        id="id_edit"
                                        style={{ top: "20px" }}
                                    ></i>
                                    <UncontrolledTooltip {...toolTip.edit}>
                                        {toolTip.edit.text}
                                    </UncontrolledTooltip>
                                </div>
                                <div className="d-inline">
                                    <i
                                        onClick={() => setOptions(!options)}
                                        style={{ color: "white" }}
                                        className="fas fa-angle-double-right"
                                        id="id_hide"
                                    ></i>
                                    <UncontrolledTooltip {...toolTip.hide}>
                                        {toolTip.hide.text}
                                    </UncontrolledTooltip>
                                </div>
                            </Fragment>
                        )}
                    </div>
                ) : (
                    <Fragment>
                        <i className="fas fa-ellipsis-h"></i>
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export default DriverData;
