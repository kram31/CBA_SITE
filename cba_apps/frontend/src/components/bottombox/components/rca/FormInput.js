import React, { Component, Fragment } from "react";

import { Row, Col, FormGroup, Label, Input } from "reactstrap";

class FormInput extends Component {
    render() {
        const {
            objKey,
            type,
            index,
            inputValue,
            disabled,
            onChange,
            options
        } = this.props;

        return (
            <FormGroup key={index}>
                <Label for={`id_${objKey}`}>
                    {objKey
                        .split("_")
                        .join(" ")
                        .replace(/(^\w{1})|(\s{1}\w{1})/g, match =>
                            match.toUpperCase()
                        )}
                </Label>
                <Col>
                    {type === "text" ? (
                        <Input
                            size="sm"
                            type={type}
                            name={objKey}
                            id={`id_${objKey}`}
                            value={inputValue}
                            disabled={disabled}
                            onChange={e => onChange(e)}
                        ></Input>
                    ) : (
                        <Input
                            type={type}
                            size="sm"
                            name={objKey}
                            id={`id_${objKey}`}
                            value={inputValue}
                            disabled={disabled}
                            onChange={e => onChange(e)}
                        >
                            {this.getInputValue(inputValue, options)}

                            {options ? this.getOptions(options) : null}
                        </Input>
                    )}
                </Col>
            </FormGroup>
        );
    }

    getOptions = options =>
        options.map((item, index) => (
            <option key={index} value={index}>
                {item.name}
            </option>
        ));

    getInputValue = (inputValue, options) =>
        inputValue ? (
            options
                .filter(item => inputValue.name === item.name)
                .map((item, index) => (
                    <option key={index} value={index}>
                        {item.name}
                    </option>
                ))[0]
        ) : (
            <option key={options.length + 1} value={null}>
                {"Select..."}
            </option>
        );
}

export default FormInput;
