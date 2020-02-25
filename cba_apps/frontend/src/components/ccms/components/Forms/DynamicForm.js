import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Form, Row, Col, Button, Card, CardTitle } from "reactstrap";

import DynamicInput from "../Input/DynamicInput";
import DynamicConfirmModal from "../Modals/DynamicConfirmModal";
import DynamicList from "../List/DynamicList";

import { capsFirstWord } from "../Helpers/Helpers";
import { submit_ca, update_ccms } from "../../../../actions/ccmsActions";

class DynamicForm extends Component {
    constructor(props) {
        super(props);

        // props
        // form title, form keys

        const { form_title, form_inputs } = props;

        this.state = {
            form_title,
            form_inputs: { ...form_inputs },
            isModalOpen: false
        };
    }

    toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });

    parentCallback = childData => {
        let form_inputs = { ...this.state.form_inputs };

        // Removes input type identifier in obj keys
        let newInput = {};
        Object.keys(form_inputs).forEach(item => {
            let name = item.replace(/(select_|text_|textarea_)/i, "");

            let newPair = {
                [name]: form_inputs[item]
            };

            newInput = { ...newInput, ...newPair };
        });

        if (childData === "Yes") {
            switch (this.state.form_title) {
                case "corrective_actions":
                    this.props.submit_ca(newInput);
                    break;
                case "change_owner":
                    console.log(newInput);
                    console.log(this.props.ccms_entry.id);
                    this.props.update_ccms(newInput, this.props.ccms_entry.id);
                    break;

                default:
                    break;
            }
            // console.log(newInput);
        }

        // clear form_inputs values after successful submit
        Object.keys(form_inputs).forEach(item => {
            return (form_inputs[item] = "");
        });
        this.setState({
            form_inputs
        });

        this.toggleModal();
    };

    handleChange = (value, name) => {
        let form_inputs = { ...this.state.form_inputs };

        form_inputs[name] = value;

        this.setState(
            {
                form_inputs
            }
            // () => console.log(this.state) // Check State on every input Change
        );
    };

    handleSubmit = e => {
        e.preventDefault();
        this.toggleModal();
    };

    render() {
        const labelLength = 3;
        const { form_title, form_inputs, isModalOpen } = this.state;
        let labels = form_inputs ? Object.keys(form_inputs) : null;
        let formattedFormTitle = capsFirstWord(form_title.replace("_", " "));

        return (
            <Fragment>
                <DynamicConfirmModal
                    modal={isModalOpen}
                    toggleModal={this.toggleModal}
                    parentCallback={this.parentCallback}
                    formattedFormTitle={formattedFormTitle}
                    form_inputs={form_inputs}
                    form_title={form_title}
                />
                <Form autoComplete="off" onSubmit={this.handleSubmit}>
                    <Card body className="mb-2">
                        <CardTitle>
                            <h5>
                                {form_title
                                    ? formattedFormTitle
                                    : "No Title Provided"}
                            </h5>
                        </CardTitle>

                        {labels
                            ? labels.map((label, index) => (
                                  <DynamicInput
                                      form_title={form_title}
                                      key={index}
                                      size="sm"
                                      name={label}
                                      onChange={this.handleChange}
                                      value={form_inputs[label]}
                                      labelLength={labelLength}
                                      select_options={this.props.select_options}
                                      labelKey={this.props.labelKey}
                                  />
                              ))
                            : "No Inputs"}

                        <Row className="mb-2">
                            <Col>
                                <Button color="success">Submit</Button>
                            </Col>
                        </Row>
                    </Card>
                </Form>
                {this.props.display_list && this.props.display_list.length ? (
                    <Card body>
                        <CardTitle>{formattedFormTitle}</CardTitle>
                        <DynamicList list={this.props.display_list} />
                    </Card>
                ) : null}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    fni_list: state.ccms.fni
});

export default connect(mapStateToProps, { submit_ca, update_ccms })(
    DynamicForm
);
