import React, { Fragment } from "react";
import { Button, Jumbotron, Row, Col } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import image1 from "../images/csat.PNG";

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
                    <Row>
                        <Col>
                            <RouterNavLink
                                to="/bottombox"
                                className="section-navlink"
                                exact
                                style={{ color: "black" }}
                            >
                                <img
                                    id="image1"
                                    src={image1}
                                    alt="image1"
                                ></img>
                            </RouterNavLink>
                        </Col>
                        <Col>CCMS</Col>
                        <Col>QA</Col>
                        <Col>Email Factory</Col>
                    </Row>
                </div>
            </Fragment>
        );
    }
}
