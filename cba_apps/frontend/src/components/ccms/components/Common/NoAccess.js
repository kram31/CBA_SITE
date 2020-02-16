import React from "react";

import { Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

const NoAccess = props => {
    const user = useSelector(state => state.auth.user);

    return (
        <Container>
            <h2>
                You are currently not authorized to access this app. Click this{" "}
                <a href="/cba" onClick={e => console.log("send axios request")}>
                    link
                </a>
                to request access{" "}
            </h2>
        </Container>
    );
};

export default NoAccess;
