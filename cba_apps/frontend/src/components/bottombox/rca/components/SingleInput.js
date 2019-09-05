import React from "react";

import { FormGroup, Label, Input } from "reactstrap";

function SingleInput(props) {
    return (
        <FormGroup>
            <Label size="sm" for={props.attr}>
                {props.label_name}
            </Label>
            <Input
                key={props.attr}
                bsSize={props.size}
                type={props.type}
                name={props.attr}
                id={props.attr}
                onChange={props.controlFunc}
                value={props.value}
                readOnly={props.readOnly}
                required
            />
        </FormGroup>
    );
}

export default SingleInput;
