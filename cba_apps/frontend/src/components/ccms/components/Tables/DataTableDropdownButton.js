import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    ButtonDropdown,
} from "reactstrap";

const DataTableDropdownButton = ({
    dataList,
    color,
    selectionCallback,
    toggleCollapse,
}) => {
    const [dropdownOpen, setdropdownOpen] = useState(false);

    const toggle = () => setdropdownOpen(!dropdownOpen);

    // const handleSelection = item => {
    //     selectionCallback();
    // };

    return (
        <Fragment>
            <ButtonDropdown
                isOpen={dropdownOpen}
                toggle={toggle}
                className="mr-1"
            >
                <DropdownToggle color={color} caret>
                    <i className="fas fa-list mr-1"></i>Data Table List
                </DropdownToggle>
                <DropdownMenu>
                    {dataList.map((item, index) => (
                        <DropdownItem
                            key={index}
                            onClick={() => {
                                selectionCallback(item);
                            }}
                            value
                        >
                            {item.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </ButtonDropdown>
        </Fragment>
    );
};

DataTableDropdownButton.propTypes = {};

export default DataTableDropdownButton;
