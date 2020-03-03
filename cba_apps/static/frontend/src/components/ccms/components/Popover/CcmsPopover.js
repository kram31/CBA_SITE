import React, { useState } from "react";

import { Popover, PopoverHeader, PopoverBody } from "reactstrap";

const CcmsPopover = props => {
    const { popoverOpen, targetElement } = props;

    const [popoverOpen, setPopoverOpen] = useState(false);

    // const toggle = () => setPopoverOpen(!popoverOpen);

    return (
        <Popover placement="bottom" isOpen={popoverOpen} target={targetElement}>
            <PopoverHeader>Popover Title</PopoverHeader>
            <PopoverBody>
                Sed posuere consectetur est at lobortis. Aenean eu leo quam.
                Pellentesque ornare sem lacinia quam venenatis vestibulum.
            </PopoverBody>
        </Popover>
    );
};

export default CcmsPopover;
