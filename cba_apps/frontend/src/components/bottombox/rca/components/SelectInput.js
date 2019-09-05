import React from "react";

import { FormGroup, Label, Input } from "reactstrap";

function SelectInput(props) {
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
                required
            >
                <option value="">--select--</option>
                {props.options.map(item => (
                    <option key={item.name} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </Input>
        </FormGroup>
    );
}

export default SelectInput;
