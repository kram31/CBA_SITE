import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Fade, Row, Col } from "reactstrap";

import AddDriverForm from "./AddDriverForm";
import { delete_cause_code } from "../../../../actions/ccmsActions";
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
            }
            // }
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
                onMouseEnter={() => setOptions(true)}
                onMouseLeave={() => setOptions(false)}
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
                                    onClick={() => setEdit(true)}
                                    style={{
                                        float: "left",
                                        marginRight: "5px",
                                        color: "green"
                                    }}
                                >
                                    {/* EDIT */}
                                    <i
                                        className="fas fa-pencil-alt"
                                        style={{ top: "20px" }}
                                    ></i>
                                </div>
                                <div
                                    onClick={() => setModal(true)}
                                    style={{
                                        float: "right",
                                        color: "red"
                                    }}
                                >
                                    {/* DELETE */}
                                    <i className="far fa-minus-square"></i>
                                </div>
                            </Fragment>
                        )}
                    </div>
                ) : (
                    <i className="fas fa-ellipsis-h"></i>
                )}
            </div>
        </div>
    );
};

export default DriverData;
