import React, { Fragment } from "react";
import { Spinner } from "reactstrap";

const Loader = () => {
    return (
        <Fragment>
            <Spinner color="primary" size="sm" className="mb-1 mr-1" />
        </Fragment>
    );
};

export default Loader;
