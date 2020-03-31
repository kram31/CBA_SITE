import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Form,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Input,
    FormGroup,
    Label,
    Col,
    Collapse,
    Row,
    ButtonGroup
} from "reactstrap";

import { GeneralRequest } from "../../../../actions/ccmsActions";
import {
    ADD_BUSINESS_UNIT,
    DELETE_BUSINESS_UNIT,
    EDIT_BUSINESS_UNIT
} from "../../../../actions/types";

const GeneralDataConfirmModal = props => {
    const { buttonLabel, className, data, table, color } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const properties = (buttonLabel, selectedData, toggle) => {
        let dispatchType =
            buttonLabel.toUpperCase() + "_" + table.endpoint.toUpperCase();

        switch (buttonLabel) {
            case "Delete":
                return {
                    bgColor: "bg-danger",
                    content: (
                        <DeleteContent
                            buttonLabel={buttonLabel}
                            selectedData={selectedData}
                            textColor="text-danger"
                            toggle={toggle}
                            table={table}
                            dispatchType={dispatchType}
                        />
                    )
                };
            case "Edit":
                return {
                    bgColor: "bg-warning",
                    content: (
                        <EditContent
                            buttonLabel={buttonLabel}
                            selectedData={selectedData}
                            textColor="text-warning"
                            toggle={toggle}
                            table={table}
                            dispatchType={dispatchType}
                        />
                    )
                };
            case "Add":
                return {
                    bgColor: "bg-success",
                    content: (
                        <AddContent
                            buttonLabel={buttonLabel}
                            selectedDataName={
                                selectedData ? selectedData.name : ""
                            }
                            textColor="text-success"
                            table={table}
                            toggle={toggle}
                            dispatchType={dispatchType}
                        />
                    )
                };

            default:
                break;
        }
    };

    return (
        <Fragment>
            <Button color={color} onClick={toggle} className="mr-1">
                {buttonLabel.includes("Add")
                    ? `${buttonLabel} ${table.name}`
                    : `${buttonLabel}`}
            </Button>
            <Modal
                size="lg"
                isOpen={modal}
                toggle={toggle}
                className={className}
            >
                <ModalHeader
                    toggle={toggle}
                    className={properties(buttonLabel).bgColor}
                >
                    {buttonLabel.includes("Add")
                        ? `${buttonLabel} data to ${table.name} Table`
                        : `${buttonLabel} ${data.name} from ${table.name} Table`}
                </ModalHeader>
                <ModalBody>
                    {properties(buttonLabel, data, toggle).content}
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

// endpoint, data, dispatchType

const AddContent = ({
    buttonLabel,
    selectedDataName,
    textColor,
    toggle,
    table,
    dispatchType
}) => {
    const initialInputState = { name: selectedDataName };
    const [eachEntry, setEachEntry] = useState(initialInputState);

    const { name } = eachEntry;

    // REDUX

    const handleChange = e => {
        // console.log({ ...eachEntry }); // state
        setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(eachEntry, "Submit Working");
        dispatchRedux(reduxAction.addData());
        toggle();
    };

    const reduxAction = new GeneralRequest(
        table.endpoint,
        eachEntry,
        dispatchType
    );
    const dispatchRedux = useDispatch();

    return (
        <div className="mb-3">
            <Form onSubmit={handleSubmit} autoComplete="off">
                <FormGroup>
                    <Label for="id_general_data">
                        {table.name}{" "}
                        {table.name === "Recipients" ? "Email:" : "Name:"}
                    </Label>

                    <Input
                        type="text"
                        id="id_general_data"
                        onChange={handleChange}
                        value={name}
                        name="name"
                        required
                    />
                </FormGroup>
                <Button color="primary">Submit</Button>
            </Form>
        </div>
    );
};

// DELETE_BUSINESS_UNIT

const DeleteContent = ({
    buttonLabel,
    selectedData,
    textColor,
    toggle,
    table,
    dispatchType
}) => {
    const reduxAction = new GeneralRequest(
        table.endpoint,
        selectedData,
        dispatchType
    );
    const dispatchRedux = useDispatch();

    const handleDelete = () => {
        dispatchRedux(reduxAction.deleteData());
        toggle();
    };

    return (
        <Fragment>
            <p>
                Are you sure you want to{" "}
                <span className={textColor}>{buttonLabel}</span>{" "}
                {selectedData.name}?
            </p>
            <ButtonGroup>
                <Button className="mr-1" color="primary" onClick={handleDelete}>
                    Yes
                </Button>
                <Button color="secondary" onClick={toggle}>
                    No
                </Button>
            </ButtonGroup>
        </Fragment>
    );
};

const EditContent = ({
    buttonLabel,
    selectedData,
    textColor,
    toggle,
    table,
    dispatchType
}) => {
    const initialInputState = { name: selectedData.name };
    const [eachEntry, setEachEntry] = useState(initialInputState);

    const { name } = eachEntry;

    const handleChange = e => {
        console.log({ ...eachEntry }); // state
        setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(eachEntry, "Submit Working");
        dispatchRedux(reduxAction.editData());
        toggle();
    };

    const reduxAction = new GeneralRequest(
        table.endpoint,
        { id: selectedData.id, ...eachEntry },
        dispatchType
    );
    const dispatchRedux = useDispatch();

    const [isCollapseOpen, setCollapse] = useState(false);
    const toggleCollapse = () => setCollapse(!isCollapseOpen);

    return (
        <div className="mb-3">
            <Collapse isOpen={!isCollapseOpen}>
                <Row>
                    <Col>
                        <p>
                            Are you sure you want to{" "}
                            <span className={textColor}>{buttonLabel}</span>{" "}
                            {selectedData.name}?
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonGroup>
                            <Button
                                className="mr-1"
                                color="primary"
                                onClick={toggleCollapse}
                            >
                                Yes
                            </Button>
                            <Button
                                className="mr-1"
                                color="secondary"
                                onClick={toggle}
                            >
                                No
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Collapse>
            <Collapse isOpen={isCollapseOpen}>
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <FormGroup>
                        <Label for="id_general_data">
                            {table.name === "Recipients" ? "Email:" : "Name:"}
                        </Label>

                        <Input
                            type="text"
                            id="id_general_data"
                            onChange={handleChange}
                            value={name}
                            name="name"
                            required
                        />
                    </FormGroup>
                    <ButtonGroup>
                        <Button className="mr-1" color="primary">
                            Submit
                        </Button>
                        <Button
                            className="mr-1"
                            color="secondary"
                            onClick={toggle}
                        >
                            Cancel
                        </Button>
                    </ButtonGroup>
                </Form>
            </Collapse>
        </div>
    );
};

export default GeneralDataConfirmModal;
