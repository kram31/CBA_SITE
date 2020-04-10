import React, { Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";

import { GeneralRequest } from "../../../../actions/surveyActions";
import { REQUEST_ACCESS } from "../../../../actions/types";

const RequestAccess = ({ user }) => {
    const csat_access_request = useSelector(
        (state) => state.surveys.csat_access_request
    );
    const dispatch = useDispatch();

    const handleClick = (data, reqType) => {
        const reduxReq = new GeneralRequest(
            "csat_access_request",
            { user: data.user },
            REQUEST_ACCESS
        );

        reqType === "new"
            ? dispatch(reduxReq.addData())
            : dispatch(reduxReq.addData());
    };

    return (
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
            {!csat_access_request
                .map(({ user }) => user.id)
                .includes(user.user.id) ? (
                <p style={{ color: "white" }}>
                    You are not authorized to access this application. Click{" "}
                    <span
                        style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                        }}
                        onClick={() => handleClick(user, "new")}
                    >
                        this
                    </span>{" "}
                    to request access.
                </p>
            ) : (
                <p style={{ color: "white" }}>
                    You have already requested access, Click{" "}
                    <span
                        style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                        }}
                        onClick={() => handleClick(user, "followUp")}
                    >
                        this
                    </span>{" "}
                    to follow up.
                </p>
            )}
        </div>
    );
};

export default RequestAccess;
