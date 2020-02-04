import React, { useState, Fragment } from "react";
import { Popover, PopoverHeader, PopoverBody, Label } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const CcmsInput = props => {
    const { popoverOpen, id, name, ...rest } = props;

    console.log({ ...rest, id });

    let displayName = name
        .split("_")
        .map(item => item.charAt(0).toUpperCase() + item.slice(1))
        .join(" ");

    // const [popoverOpen, setPopoverOpen] = useState(false);

    // const toggle = () => setPopoverOpen(!popoverOpen);

    return (
        <Fragment>
            {/* <button id={id}>test</button> */}
            <Label for={id}>{displayName}: </Label>
            <Typeahead {...rest} id={id} inputProps={{ required: true }} />
        </Fragment>
    );
};

export default CcmsInput;
