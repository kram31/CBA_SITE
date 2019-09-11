import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import UploadDataModal from "./bottombox/upload-data/UploadDataModal";
import logo from "../images/logo.png"

class SideBar extends Component {
    render() {
        return (
            
            <Nav
                vertical
                sticky={"left"}
            >
           
                <NavItem className="sidebar-navitem">
                    <UploadDataModal />
                </NavItem>
                <NavItem>
                    <NavLink href="#">CCMS</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">QUALITY EVALUATION</NavLink>
                </NavItem>
            </Nav>
        );
    }
}

export default SideBar;
