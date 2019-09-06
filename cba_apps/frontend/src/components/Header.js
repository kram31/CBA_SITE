import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

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
                    <NavbarBrand style={{ color: "#ffed00" }} href="/">
                        CBA
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink style={{ color: "#ffed00" }} href="#">
                                    #
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ color: "#ffed00" }} href="#">
                                    #
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        );
    }
}
