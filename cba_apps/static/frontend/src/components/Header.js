import React, { Fragment } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from "reactstrap";

import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { logout } from "../actions/auth";

import dxc from "../images/dxc.png";

class Header extends React.Component {
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
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <span className="navbar-text mr-3" style={{ color: "white" }}>
                    <strong>{user ? `Welcome ${user.username}` : ""}</strong>
                </span>
                <NavItem>
                    <Button onClick={this.props.logout} color="danger">
                        Logout
                    </Button>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem className="mr-2">
                    <Link to="/register" className="navlink">
                        Register
                    </Link>
                </NavItem>
                <NavItem className="mr-2">
                    <Link to="/login" className="navlink">
                        Login
                    </Link>
                </NavItem>
            </Fragment>
        );

        return (
            <Navbar
                style={{
                    backgroundColor: "black",
                    padding: "20px"
                }}
                expand="md"
                sticky={"top"}
            >
                <div className="container-fluid">
                    <NavbarBrand href="/">
                        <img src={dxc} width="250" height="45" alt="Logo" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle}>
                        <span>
                            <i
                                style={{ color: "white" }}
                                className="fa fa-navicon"
                            ></i>
                        </span>
                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logout }
)(Header);
