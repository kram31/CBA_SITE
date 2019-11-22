import React from "react";
import { Button, Jumbotron } from "reactstrap";

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
            <Jumbotron style={{ backgroundColor: "black" }}>
                <div className="my-auto">
                    <h1 className="mb-2" style={{ color: "white" }}>
                        DXC - CBA App Site
                    </h1>
                    <WelcomeContent
                        isAuthenticated={this.props.isAuthenticated}
                        user={this.props.user}
                        authButtonMethod={this.props.authButtonMethod}
                    />
                </div>
            </Jumbotron>
        );
    }
}
