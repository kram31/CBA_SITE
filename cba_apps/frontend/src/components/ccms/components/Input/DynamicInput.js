import React, { Component } from "react";
import { connect } from "react-redux";

import { Col, FormGroup, Input, Label } from "reactstrap";

import { Typeahead } from "react-bootstrap-typeahead";

import { capsFirstWord } from "../Helpers/Helpers";

class DynamicInput extends Component {
    constructor(props) {
        super(props);

        // props
        // type, name, onChange, value, required

        this.state = {};
    }

    typeaheadProps = (col, id) => ({
        bsSize: "sm",
        labelKey: this.props.labelKey,
        onChange: selected => this.props.onChange(selected[0], col),
        id: id,
        // this.props.select_options ? this.props.select_options : null
        options: this.props.select_options ? this.props.select_options : [],
        selected: this.props.value ? [this.props.value] : [],
        placeholder: "Select...",
        selectHintOnEnter: true,
        clearButton: true,
        name: col
    });

    render() {
        const {
            size,
            name,
            onChange,
            value,
            labelLength,
            form_title
        } = this.props;
        let newName = name.replace(/(select_|text_|textarea_)/i, "");
        let id = "id_" + form_title + newName;

        return (
            <FormGroup row size="sm">
                <Label for={id} md={labelLength}>
                    {capsFirstWord(newName.replace("_", " "))}
                </Label>

                <Col>
                    {name.includes("select_") ? (
                        <Typeahead
                            {...this.typeaheadProps(name, id)}
                            inputProps={{ required: true }}
                        />
                    ) : (
                        <Input
                            bsSize={size}
                            type="text"
                            name={name}
                            id={id}
                            onChange={e => {
                                const { value, name } = e.target;
                                return onChange(value, name);
                            }}
                            value={value}
                            required
                        />
                    )}
                </Col>
            </FormGroup>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(null, {})(DynamicInput);
