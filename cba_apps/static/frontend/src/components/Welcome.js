import React, { Fragment } from "react";
import { Jumbotron, Row, Col, Container, Fade, Spinner } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import image1 from "../images/feedback.png";
import { connect } from "react-redux";

const WelcomeContent = props => {
    // If authenticated, greet the user
    if (props.isAuthenticated) {
        return (
            <div className="mt-2">
                <h4 style={{ color: "white" }}>
                    Welcome {props.user.fullname}!
                </h4>
            </div>
        );
    }

    // Not authenticated, present a sign in button
    return (
        <Spinner
            style={{
                width: "3rem",
                height: "3rem",
                top: "50%",
                left: "50%",
                position: "fixed"
            }}
        />
    );
};

class Welcome extends React.Component {
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
        const { user, isAuthenticated } = this.props.auth;
        return (
            <Fragment>
                <Jumbotron style={{ backgroundColor: "black" }}>
                    <div className="jumbotroncontent">
                        <h1 className="mb-2 mt-4" style={{ color: "white" }}>
                            DXC - CBA App Site
                        </h1>
                        <WelcomeContent
                            isAuthenticated={isAuthenticated}
                            user={user}
                        />
                    </div>
                </Jumbotron>
                <div className="section-main">
                    <Fade>
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
                                        to="/ccms"
                                        className="section-navlink"
                                        exact
                                        style={{ textDecoration: "none" }}
                                    >
                                        <h5 id="section2">CCMS</h5>
                                    </RouterNavLink>
                                </Col>
                                <Col>
                                    <a
                                        href="https://localhost:443/eval"
                                        className="section-navlink"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <h5 id="section3">
                                            Quality Evaluatons
                                        </h5>
                                    </a>
                                    {/* <RouterNavLink
                                        to="/eval"
                                        className="section-navlink"
                                        exact
                                        style={{ textDecoration: "none" }}
                                    >
                                        <h5 id="section3">
                                            Quality Evaluatons
                                        </h5>
                                    </RouterNavLink> */}
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

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, [])(Welcome);
