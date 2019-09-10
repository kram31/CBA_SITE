import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";

import dxc from "../dxc.png"

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar
                style={{ backgroundColor: "black", padding: "20px" }}
                expand="md"
                sticky={"top"}
            >
                <div className="container-fluid">
                    <NavbarBrand href="/">
                    <img src={dxc} width="250" height="45" alt="Logo" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#" className="navlink">
                                    Bottombox
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className="navlink">
                                    CCMS
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className="navlink">
                                    QA Eval
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        );
    }
}
