import React from "react";

import { Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    add_access_request,
    get_access_request
} from "../../../../actions/ccmsActions";

const NoAccess = props => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const access_request_list = useSelector(state => state.ccms.access_request);

    return (
        <Container>
            <h2>
                You are currently not authorized to access this app. Click this{" "}
                <a href="#" onClick={e => dispatch(add_access_request(user))}>
                    link
                </a>
                to request access{" "}
            </h2>
        </Container>
    );
};

export default NoAccess;
