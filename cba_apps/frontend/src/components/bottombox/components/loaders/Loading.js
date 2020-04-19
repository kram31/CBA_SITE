import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";

const Loading = () => {
    const isLoading = useSelector(({ surveys }) => surveys.isLoading);

    const dispatch = useDispatch();

    return (
        <Fragment>
            {isLoading ? <Spinner className="mb-1 mr-2" size="sm" /> : null}
        </Fragment>
    );
};

export default Loading;
