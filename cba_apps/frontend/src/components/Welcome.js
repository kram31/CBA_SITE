import React, { Fragment } from "react";
import {
    Button,
    Jumbotron,
    Row,
    Col,
    Card,
    CardImg,
    CardTitle,
    Container,
    Fade
} from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import image1 from "../images/feedback.png";

function WelcomeContent(props) {
    // If authenticated, greet the user
    if (props.isAuthenticated) {
        return (
            <div className="mt-2">
                <h4 style={{ color: "white" }}>
                    Welcome {props.user.displayName}!
                </h4>
            </div>
        );
    }

    // Not authenticated, present a sign in button
    return (
        <Button color="primary" onClick={props.authButtonMethod}>
            Click here to sign in
        </Button>
    );
}

export default class Welcome extends React.Component {
    state = {
        isHovered: false,
        target_div: null
    };

    handleMouseEnter = e => {
        this.setState({ isHovered: true, target_div: e.target.id });
    };

    handleMouseLeave = () => {
        this.setState({ isHovered: false, target_div: null });
    };

    div_style = section => {
        return {
            backgroundColor: "black",
            width:
                this.state.target_div === null && !this.state.isHovered
                    ? "50%"
                    : this.state.isHovered && this.state.target_div === section
                    ? "80%"
                    : "20%",
            height: "400px",
            transition: "width 0.5s"
        };
    };

    render() {
        return (
            <Fragment>
                <Jumbotron style={{ backgroundColor: "black" }}>
                    <div className="jumbotroncontent">
                        <h1 className="mb-2 mt-4" style={{ color: "white" }}>
                            DXC - CBA App Site
                        </h1>
                        <WelcomeContent
                            isAuthenticated={this.props.isAuthenticated}
                            user={this.props.user}
                            authButtonMethod={this.props.authButtonMethod}
                        />
                    </div>
                </Jumbotron>
                <div className="section-main">
                    <Fade>
                        {/* <div style={{ display: "flex" }}>
                            <div
                                id="section1"
                                onMouseEnter={this.handleMouseEnter}
                                onMouseLeave={this.handleMouseLeave}
                                style={{
                                    backgroundColor: "white",
                                    width:
                                        this.state.target_div === null &&
                                        !this.state.isHovered
                                            ? "50%"
                                            : this.state.isHovered &&
                                              this.state.target_div ===
                                                  "section1"
                                            ? "80%"
                                            : "20%",
                                    height: "400px",
                                    transition: "width 0.5s"
                                }}
                            >
                                <h1>BOTTOMBOX</h1>
                            </div>
                            <div
                                id="section2"
                                onMouseEnter={this.handleMouseEnter}
                                onMouseLeave={this.handleMouseLeave}
                                style={{
                                    backgroundColor: "black",
                                    width:
                                        this.state.target_div === null &&
                                        !this.state.isHovered
                                            ? "50%"
                                            : this.state.isHovered &&
                                              this.state.target_div ===
                                                  "section2"
                                            ? "80%"
                                            : "20%",
                                    height: "400px",
                                    transition: "width 0.5s"
                                }}
                            ></div>
                        </div> */}
                        <Container>
                            <Row>
                                <Col
                                // md={this.state.isHovered === true ? 6 : 3}
                                >
                                    <RouterNavLink
                                        to="/bottombox"
                                        className="section-navlink"
                                        exact
                                        style={{ textDecoration: "none" }}
                                    >
                                        <h5 id="section1">CBA Surveys</h5>
                                    </RouterNavLink>
                                </Col>
                                <Col>
                                    <RouterNavLink
                                        to="/"
                                        className="section-navlink"
                                        exact
                                        style={{ textDecoration: "none" }}
                                    >
                                        <h5 id="section2">CCMS</h5>
                                    </RouterNavLink>
                                </Col>
                                <Col>
                                    <RouterNavLink
                                        to="/"
                                        className="section-navlink"
                                        exact
                                        style={{ textDecoration: "none" }}
                                    >
                                        <h5 id="section3">
                                            Quality Evaluatons
                                        </h5>
                                    </RouterNavLink>
                                </Col>
                                <Col>
                                    <RouterNavLink
                                        to="/"
                                        className="section-navlink"
                                        exact
                                        style={{ textDecoration: "none" }}
                                    >
                                        <h5 id="section4">Email Factory</h5>
                                    </RouterNavLink>
                                </Col>
                            </Row>
                        </Container>
                    </Fade>
                </div>
            </Fragment>
        );
    }
}
