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
                {props.options.map(item => {
                    if (
                        props.attr == "support_silo_issue_based" ||
                        props.attr == "controllability" ||
                        props.attr == "accountable_team" ||
                        props.attr == "q1_answer" ||
                        props.attr == "contacted_customer" ||
                        props.attr == "coaching"
                    ) {
                        return (
                            <option key={item.name} value={item.name}>
                                {item.name}
                            </option>
                        );
                    } else if (props.attr == "dsat_cause") {
                        return (
                            <option key={item.name} value={item.id}>
                                {item.name}
                            </option>
                        );
                    } else {
                        return (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        );
                    }
                })}
            </Input>
        </FormGroup>
    );
}

export default SelectInput;
