import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import UploadDataModal from "./bottombox/upload-data/UploadDataModal";

class SideBar extends Component {
    render() {
        return (
            <Nav
                vertical
                style={{
                    height: "100%",
                    width: "250px",
                    position: "fixed",
                    zIndex: "1",
                    top: "0",
                    left: "0",
                    overflowX: "hidden",
                    paddingTop: "50px",
                    marginTop: "50px",
                    backgroundColor: "rgb(0,0,0)",
                    opacity: ".9"
                }}
            >
                <NavItem style={{ paddingLeft: "15px", color: "white" }}>
                    <h5>Dashboard</h5>
                </NavItem>
                <NavItem>
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
