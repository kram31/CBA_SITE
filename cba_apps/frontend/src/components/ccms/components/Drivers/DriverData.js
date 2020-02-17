import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_cause_code } from "../../../../actions/ccmsActions";

import { Fade } from "reactstrap";

const DriverData = ({ driverDetails }) => {
    // const count = useSelector(state => state.counter.count);
    const dispatch = useDispatch();

    return (
        <div>
            <div className="float-left">{driverDetails.name}</div>
            <div className="float-right">
                <i className="far fa-edit"></i>
            </div>
        </div>
    );
};

export default DriverData;
