import React, { useState, Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";
import { collapseComponent } from "../../../../actions/surveyActions";

import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    ButtonDropdown,
} from "reactstrap";

const GeneralDropDown = ({ dataList }) => {
    const [dropdownOpen, setdropdownOpen] = useState(false);

    const toggle = () => setdropdownOpen(!dropdownOpen);

    // const count = useSelector(state => state.counter.count);
    const dispatch = useDispatch();

    return (
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className="ml-1">
            <DropdownToggle color="success" caret>
                <i className="fas fa-list mr-1"></i>Data Table List
            </DropdownToggle>
            <DropdownMenu>
                {dataList.map((item, index) => (
                    <DropdownItem
                        key={index}
                        onClick={() =>
                            dispatch(collapseComponent(item.component))
                        }
                        value
                    >
                        {item.name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </ButtonDropdown>
    );
};

export default GeneralDropDown;
