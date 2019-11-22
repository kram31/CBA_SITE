import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
    addDsatCode1,
    addBbDriverCode2,
    addBbDriverCode3,
    deleteDsatCode1,
    updateDsatCode1,
    updateBbDriverCode2,
    updateBBDriverState,
    deleteBbDriverCode2,
    deleteBbDriverCode3,
    updateBbDriverCode3
} from "../../../actions/surveyActions";
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Fade,
    Table,
    Form,
    Input,
    InputGroup,
    InputGroupAddon
} from "reactstrap";

class BottomboxDrivers extends Component {
    state = {
        name: "",
        edit: false,
        toggle: false,
        code1_name: "",
        code2_name: "",
        code3_name: "",
        code1: "",
        code2: "",
        code3: "",
        code2_list: [],
        code3_list: []
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleClick = data => {
        // console.log(data);
        if (data.type === "code1") {
            this.setState({
                toggle: false,
                code1: data,
                code2: "",
                code2_list: this.props.bb_driver_code2.filter(
                    item => item.dsat_Code1 === data.id
                ),
                code3: []
            });
            this.props.updateBBDriverState({
                toggle: false,
                code1: data,
                code2: "",
                code2_list: this.props.bb_driver_code2.filter(
                    item => item.dsat_Code1 === data.id
                ),
                code3: []
            });
        }

        if (data.type === "code2") {
            this.setState({
                toggle: false,
                code2: data,
                code3: "",
                code3_list: this.props.bb_driver_code3.filter(
                    item => item.bb_Driver_Code2 === data.id
                )
            });
            this.props.updateBBDriverState({
                toggle: false,
                code2: data,
                code3: "",
                code3_list: this.props.bb_driver_code3.filter(
                    item => item.bb_Driver_Code2 === data.id
                )
            });
        }

        if (data.type === "code3") {
            this.setState({
                toggle: false,
                code3: data
            });
            this.props.updateBBDriverState({
                toggle: false,
                code3: data
            });
        }

        this.editOff(data);
    };

    showButtons = data => {
        this.handleClick(data);
        this.editOff(data);
        this.setState({
            toggle: true,
            name: data.name
        });
    };

    hideButtons = data => {
        this.handleClick(data);
        this.editOff(data);

        this.setState({
            toggle: false
        });
    };

    editOn = data => {
        if (data.type === "code1") {
            this.setState({
                code1: data,
                edit: true
            });
        } else if (data.type === "code2") {
            this.setState({
                code1: "",
                code2: data,
                edit: true
            });
        } else if (data.type === "code3") {
            this.setState({
                code1: "",
                code2: "",
                code3: data,
                edit: true
            });
        }
    };

    editOff = data => {
        // console.log(data);
        if (data.type === "code2" || data.type === "code3") {
            this.setState({
                edit: false
            });
        } else {
            this.setState({
                code1: data,
                edit: false
            });
        }
    };

    // REQUESTS

    handleAddDriverCode3Submit = e => {
        e.preventDefault();

        let data = {
            name: this.state.code3_name,
            bb_Driver_Code2: this.props.bbState.code2.id
        };

        // console.log(data);

        this.props.addBbDriverCode3(data);

        this.setState({
            code3_name: ""
        });
        this.props.updateBBDriverState({
            code3_name: ""
        });
    };

    handleAddDriverCode2Submit = e => {
        e.preventDefault();

        let data = {
            name: this.state.code2_name,
            dsat_Code1: this.props.bbState.code1.id
        };

        this.props.addBbDriverCode2(data);

        this.setState({
            code2_name: ""
        });
        this.props.updateBBDriverState({
            code2_name: ""
        });
    };

    handleAddDsatCode1Submit = e => {
        e.preventDefault();

        let data = { name: this.state.code1_name };

        this.props.addDsatCode1(data);

        this.setState({
            code1_name: ""
        });
        this.props.updateBBDriverState({
            code2_name: ""
        });
    };

    handleDelete = data => {
        if (data.type === "code1") {
            let need_update = this.props.rcas.filter(
                rca => rca.dsat_cause.id === data.id
            );
            this.props.deleteDsatCode1(data.id, need_update);
        } else if (data.type === "code2") {
            let need_update = this.props.rcas.filter(
                rca => rca.bb_driver_code2.id === data.id
            );
            this.props.deleteBbDriverCode2(data.id, need_update);
        } else if (data.type === "code3") {
            let need_update = this.props.rcas.filter(
                rca => rca.bb_driver_code3.id === data.id
            );
            this.props.deleteBbDriverCode3(data.id, need_update);
        }
    };

    handleEdit = data => {
        if (data.type === "code1") {
            let newData = {
                id: this.state.code1.id,
                name: this.state.name
            };

            this.props.updateDsatCode1(newData);
        }

        if (data.type === "code2") {
            let newData = {
                id: data.id,
                dsat_Code1: data.dsat_Code1,
                name: this.state.name
            };

            this.props.updateBbDriverCode2(newData);
        }

        if (data.type === "code3") {
            let newData = {
                id: data.id,
                bb_Driver_Code2: data.bb_Driver_Code2,
                name: this.state.name
            };

            this.props.updateBbDriverCode3(newData);
        }
    };

    render() {
        let text_color = "white";
        return (
            <Fragment>
                <Fade>
                    <Card>
                        <CardHeader>
                            <h4>
                                <strong>Bottombox Drivers</strong>
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col>
                                    <Table hover bordered>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <Row className="mt-2">
                                                        <Col md={4}>
                                                            <h5
                                                                style={{
                                                                    color: text_color
                                                                }}
                                                            >
                                                                Code 1
                                                            </h5>
                                                        </Col>
                                                        <Col
                                                            md={8}
                                                            className="mr-auto"
                                                            style={{
                                                                textAlign:
                                                                    "right"
                                                            }}
                                                        >
                                                            <Form
                                                                onSubmit={
                                                                    this
                                                                        .handleAddDsatCode1Submit
                                                                }
                                                            >
                                                                <Row>
                                                                    <Col md={1}>
                                                                        <button
                                                                            className="mr-2"
                                                                            style={{
                                                                                cursor:
                                                                                    "pointer"
                                                                            }}
                                                                            onSubmit={
                                                                                this
                                                                                    .handleAddDsatCode1Submit
                                                                            }
                                                                        >
                                                                            <i
                                                                                className="fa fa-plus"
                                                                                onSubmit={
                                                                                    this
                                                                                        .handleAddDsatCode1Submit
                                                                                }
                                                                            />
                                                                        </button>
                                                                    </Col>
                                                                    <Col className="my-auto ml-2">
                                                                        <Input
                                                                            bsSize="sm"
                                                                            name="code1_name"
                                                                            onChange={
                                                                                this
                                                                                    .handleChange
                                                                            }
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .code1_name
                                                                            }
                                                                            readOnly={
                                                                                false
                                                                            }
                                                                            placeholder="Enter new Bottombox Code 1"
                                                                            required
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form>
                                                        </Col>
                                                    </Row>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.dsat_code1.map(item => (
                                                <tr key={item.id}>
                                                    <td
                                                        style={
                                                            this.props.bbState
                                                                .code1.id ===
                                                            item.id
                                                                ? {
                                                                      backgroundColor:
                                                                          "gray"
                                                                  }
                                                                : {
                                                                      backgroundColor:
                                                                          "white"
                                                                  }
                                                        }
                                                    >
                                                        <Row>
                                                            {this.state.edit ? (
                                                                this.state.code1
                                                                    .id ===
                                                                item.id ? (
                                                                    <Col md={8}>
                                                                        <Form>
                                                                            <InputGroup size="sm">
                                                                                <InputGroupAddon addonType="prepend">
                                                                                    <i
                                                                                        onClick={() =>
                                                                                            this.handleEdit(
                                                                                                {
                                                                                                    type:
                                                                                                        "code1",
                                                                                                    ...item
                                                                                                }
                                                                                            )
                                                                                        }
                                                                                        style={{
                                                                                            color:
                                                                                                "black",
                                                                                            cursor:
                                                                                                "pointer"
                                                                                        }}
                                                                                        className="fa fa-check-square fa-2x"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </InputGroupAddon>
                                                                                <Input
                                                                                    bsSize="sm"
                                                                                    name="name"
                                                                                    onChange={
                                                                                        this
                                                                                            .handleChange
                                                                                    }
                                                                                    value={
                                                                                        this
                                                                                            .state
                                                                                            .name
                                                                                    }
                                                                                    readOnly={
                                                                                        false
                                                                                    }
                                                                                    required
                                                                                />
                                                                            </InputGroup>
                                                                        </Form>
                                                                    </Col>
                                                                ) : (
                                                                    <Col md={8}>
                                                                        <span
                                                                            onClick={() =>
                                                                                this.handleClick(
                                                                                    {
                                                                                        type:
                                                                                            "code1",
                                                                                        ...item
                                                                                    }
                                                                                )
                                                                            }
                                                                            style={{
                                                                                cursor:
                                                                                    "pointer"
                                                                            }}
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </span>
                                                                    </Col>
                                                                )
                                                            ) : (
                                                                <Col md={8}>
                                                                    <span
                                                                        onClick={() =>
                                                                            this.handleClick(
                                                                                {
                                                                                    type:
                                                                                        "code1",
                                                                                    ...item
                                                                                }
                                                                            )
                                                                        }
                                                                        style={{
                                                                            cursor:
                                                                                "pointer"
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </span>
                                                                </Col>
                                                            )}

                                                            {/*HIDDEN BUTTONS  */}

                                                            {!this.state
                                                                .toggle ? (
                                                                <Col>
                                                                    <span
                                                                        onClick={() =>
                                                                            this.showButtons(
                                                                                {
                                                                                    type:
                                                                                        "code1",
                                                                                    ...item
                                                                                }
                                                                            )
                                                                        }
                                                                        style={{
                                                                            float:
                                                                                "right",
                                                                            cursor:
                                                                                "pointer"
                                                                        }}
                                                                    >
                                                                        <i
                                                                            onClick={() =>
                                                                                this.showButtons(
                                                                                    {
                                                                                        type:
                                                                                            "code1",
                                                                                        ...item
                                                                                    }
                                                                                )
                                                                            }
                                                                            style={{
                                                                                color:
                                                                                    "black",
                                                                                cursor:
                                                                                    "pointer"
                                                                            }}
                                                                            className="fa fa-chevron-circle-left fa-lg icon"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                </Col>
                                                            ) : this.state.code1
                                                                  .id ===
                                                                  item.id &&
                                                              !this.state
                                                                  .code2 ? (
                                                                <Col className="my-auto">
                                                                    <Fragment>
                                                                        <span
                                                                            style={{
                                                                                float:
                                                                                    "right"
                                                                            }}
                                                                        >
                                                                            <i
                                                                                onClick={() =>
                                                                                    this.hideButtons(
                                                                                        {
                                                                                            type:
                                                                                                "code1",
                                                                                            ...item
                                                                                        }
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    color:
                                                                                        "black",
                                                                                    cursor:
                                                                                        "pointer"
                                                                                }}
                                                                                className="fa fa-chevron-circle-right fa-lg icon"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </span>
                                                                        <span
                                                                            style={{
                                                                                float:
                                                                                    "right"
                                                                            }}
                                                                        >
                                                                            <i
                                                                                onClick={() =>
                                                                                    this.editOn(
                                                                                        {
                                                                                            type:
                                                                                                "code1",
                                                                                            ...item
                                                                                        }
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    color:
                                                                                        "black",
                                                                                    cursor:
                                                                                        "pointer"
                                                                                }}
                                                                                className="fa fa-edit fa-lg icon"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </span>
                                                                        <span
                                                                            style={{
                                                                                float:
                                                                                    "right"
                                                                            }}
                                                                        >
                                                                            <i
                                                                                onClick={() =>
                                                                                    this.handleDelete(
                                                                                        {
                                                                                            type:
                                                                                                "code1",
                                                                                            ...item
                                                                                        }
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    color:
                                                                                        "black",
                                                                                    cursor:
                                                                                        "pointer"
                                                                                }}
                                                                                className="fa fa-minus-circle fa-lg mr-1 icon"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </span>
                                                                    </Fragment>
                                                                </Col>
                                                            ) : (
                                                                <Col>
                                                                    <span
                                                                        onClick={() =>
                                                                            this.showButtons(
                                                                                {
                                                                                    type:
                                                                                        "code1",
                                                                                    ...item
                                                                                }
                                                                            )
                                                                        }
                                                                        style={{
                                                                            float:
                                                                                "right",
                                                                            cursor:
                                                                                "pointer"
                                                                        }}
                                                                    >
                                                                        <i
                                                                            onClick={() =>
                                                                                this.showButtons(
                                                                                    {
                                                                                        type:
                                                                                            "code1",
                                                                                        ...item
                                                                                    }
                                                                                )
                                                                            }
                                                                            style={{
                                                                                color:
                                                                                    "black",
                                                                                cursor:
                                                                                    "pointer"
                                                                            }}
                                                                            className="fa fa-chevron-circle-left fa-lg"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                </Col>
                                                            )}
                                                        </Row>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                                {this.props.bbState.code1 && (
                                    <Col>
                                        <Table hover bordered>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <Row className="mt-2">
                                                            <Col md={4}>
                                                                <h5
                                                                    style={{
                                                                        color: text_color
                                                                    }}
                                                                >
                                                                    Code 2
                                                                </h5>
                                                            </Col>
                                                            <Col
                                                                md={8}
                                                                className="mr-auto"
                                                                style={{
                                                                    textAlign:
                                                                        "right"
                                                                }}
                                                            >
                                                                <Form
                                                                    onSubmit={
                                                                        this
                                                                            .handleAddDriverCode2Submit
                                                                    }
                                                                >
                                                                    <Row>
                                                                        <Col
                                                                            md={
                                                                                1
                                                                            }
                                                                        >
                                                                            <button
                                                                                className="mr-2"
                                                                                style={{
                                                                                    cursor:
                                                                                        "pointer"
                                                                                }}
                                                                                onSubmit={
                                                                                    this
                                                                                        .handleAddDriverCode2Submit
                                                                                }
                                                                            >
                                                                                <i
                                                                                    className="fa fa-plus"
                                                                                    onSubmit={
                                                                                        this
                                                                                            .handleAddDriverCode2Submit
                                                                                    }
                                                                                />
                                                                            </button>
                                                                        </Col>
                                                                        <Col className="my-auto ml-2">
                                                                            <Input
                                                                                bsSize="sm"
                                                                                name="code2_name"
                                                                                onChange={
                                                                                    this
                                                                                        .handleChange
                                                                                }
                                                                                value={
                                                                                    this
                                                                                        .state
                                                                                        .code2_name
                                                                                }
                                                                                readOnly={
                                                                                    false
                                                                                }
                                                                                placeholder="Enter new Bottombox Code 2"
                                                                                required
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Form>
                                                            </Col>
                                                        </Row>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.bb_driver_code2
                                                    .filter(
                                                        filter_item =>
                                                            filter_item.dsat_Code1 ===
                                                            this.props.bbState
                                                                .code1.id
                                                    )
                                                    .map(code2_item => (
                                                        <tr key={code2_item.id}>
                                                            <td
                                                                style={
                                                                    this.props
                                                                        .bbState
                                                                        .code2
                                                                        .id ===
                                                                    code2_item.id
                                                                        ? {
                                                                              backgroundColor:
                                                                                  "gray"
                                                                          }
                                                                        : {
                                                                              backgroundColor:
                                                                                  "white"
                                                                          }
                                                                }
                                                            >
                                                                {/* CODE 2 */}
                                                                <Row>
                                                                    {this.state
                                                                        .edit ? (
                                                                        this
                                                                            .state
                                                                            .code2
                                                                            .id ===
                                                                        code2_item.id ? (
                                                                            <Col
                                                                                md={
                                                                                    8
                                                                                }
                                                                            >
                                                                                <Form>
                                                                                    <InputGroup size="sm">
                                                                                        <InputGroupAddon addonType="prepend">
                                                                                            <i
                                                                                                onClick={() =>
                                                                                                    this.handleEdit(
                                                                                                        {
                                                                                                            type:
                                                                                                                "code2",
                                                                                                            ...code2_item
                                                                                                        }
                                                                                                    )
                                                                                                }
                                                                                                style={{
                                                                                                    color:
                                                                                                        "black",
                                                                                                    cursor:
                                                                                                        "pointer"
                                                                                                }}
                                                                                                className="fa fa-check-square fa-2x"
                                                                                                aria-hidden="true"
                                                                                            />
                                                                                        </InputGroupAddon>
                                                                                        <Input
                                                                                            bsSize="sm"
                                                                                            name="name"
                                                                                            onChange={
                                                                                                this
                                                                                                    .handleChange
                                                                                            }
                                                                                            value={
                                                                                                this
                                                                                                    .state
                                                                                                    .name
                                                                                            }
                                                                                            readOnly={
                                                                                                false
                                                                                            }
                                                                                            required
                                                                                        />
                                                                                    </InputGroup>
                                                                                </Form>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                md={
                                                                                    8
                                                                                }
                                                                            >
                                                                                <span
                                                                                    onClick={() =>
                                                                                        this.handleClick(
                                                                                            {
                                                                                                type:
                                                                                                    "code2",
                                                                                                ...code2_item
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    style={{
                                                                                        cursor:
                                                                                            "pointer"
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        code2_item.name
                                                                                    }
                                                                                </span>
                                                                            </Col>
                                                                        )
                                                                    ) : (
                                                                        <Col
                                                                            md={
                                                                                8
                                                                            }
                                                                        >
                                                                            <span
                                                                                onClick={() =>
                                                                                    this.handleClick(
                                                                                        {
                                                                                            type:
                                                                                                "code2",
                                                                                            ...code2_item
                                                                                        }
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    cursor:
                                                                                        "pointer"
                                                                                }}
                                                                            >
                                                                                {
                                                                                    code2_item.name
                                                                                }
                                                                            </span>
                                                                        </Col>
                                                                    )}

                                                                    {/*HIDDEN BUTTONS  */}

                                                                    {!this.state
                                                                        .toggle ? (
                                                                        <Col>
                                                                            <span
                                                                                onClick={() =>
                                                                                    this.showButtons(
                                                                                        {
                                                                                            type:
                                                                                                "code2",
                                                                                            ...code2_item
                                                                                        }
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    float:
                                                                                        "right",
                                                                                    cursor:
                                                                                        "pointer"
                                                                                }}
                                                                            >
                                                                                <i
                                                                                    onClick={() =>
                                                                                        this.showButtons(
                                                                                            {
                                                                                                type:
                                                                                                    "code2",
                                                                                                ...code2_item
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    style={{
                                                                                        color:
                                                                                            "black",
                                                                                        cursor:
                                                                                            "pointer"
                                                                                    }}
                                                                                    className="fa fa-chevron-circle-left fa-lg icon"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </span>
                                                                        </Col>
                                                                    ) : this
                                                                          .state
                                                                          .code2
                                                                          .id ===
                                                                          code2_item.id &&
                                                                      !this
                                                                          .state
                                                                          .code3 ? (
                                                                        <Col className="my-auto">
                                                                            <Fragment>
                                                                                <span
                                                                                    style={{
                                                                                        float:
                                                                                            "right"
                                                                                    }}
                                                                                >
                                                                                    <i
                                                                                        onClick={() =>
                                                                                            this.hideButtons(
                                                                                                {
                                                                                                    type:
                                                                                                        "code2",
                                                                                                    ...code2_item
                                                                                                }
                                                                                            )
                                                                                        }
                                                                                        style={{
                                                                                            color:
                                                                                                "black",
                                                                                            cursor:
                                                                                                "pointer"
                                                                                        }}
                                                                                        className="fa fa-chevron-circle-right fa-lg icon"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                                <span
                                                                                    style={{
                                                                                        float:
                                                                                            "right"
                                                                                    }}
                                                                                >
                                                                                    <i
                                                                                        onClick={() =>
                                                                                            this.editOn(
                                                                                                {
                                                                                                    type:
                                                                                                        "code2",
                                                                                                    ...code2_item
                                                                                                }
                                                                                            )
                                                                                        }
                                                                                        style={{
                                                                                            color:
                                                                                                "black",
                                                                                            cursor:
                                                                                                "pointer"
                                                                                        }}
                                                                                        className="fa fa-edit fa-lg icon"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                                <span
                                                                                    style={{
                                                                                        float:
                                                                                            "right"
                                                                                    }}
                                                                                >
                                                                                    <i
                                                                                        onClick={() =>
                                                                                            this.handleDelete(
                                                                                                {
                                                                                                    type:
                                                                                                        "code2",
                                                                                                    ...code2_item
                                                                                                }
                                                                                            )
                                                                                        }
                                                                                        style={{
                                                                                            color:
                                                                                                "black",
                                                                                            cursor:
                                                                                                "pointer"
                                                                                        }}
                                                                                        className="fa fa-minus-circle fa-lg mr-1 icon"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                            </Fragment>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col>
                                                                            <span
                                                                                onClick={() =>
                                                                                    this.showButtons(
                                                                                        {
                                                                                            type:
                                                                                                "code2",
                                                                                            ...code2_item
                                                                                        }
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    float:
                                                                                        "right",
                                                                                    cursor:
                                                                                        "pointer"
                                                                                }}
                                                                            >
                                                                                <i
                                                                                    onClick={() =>
                                                                                        this.showButtons(
                                                                                            {
                                                                                                type:
                                                                                                    "code2",
                                                                                                ...code2_item
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    style={{
                                                                                        color:
                                                                                            "black",
                                                                                        cursor:
                                                                                            "pointer"
                                                                                    }}
                                                                                    className="fa fa-chevron-circle-left fa-lg"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </span>
                                                                        </Col>
                                                                    )}
                                                                </Row>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </Table>
                                    </Col>
                                )}

                                {/* CODE 3 */}

                                {this.props.bbState.code2 && (
                                    <Col md={4}>
                                        <Table hover bordered>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <Row className="mt-2">
                                                            <Col md={4}>
                                                                <h5
                                                                    style={{
                                                                        color: text_color
                                                                    }}
                                                                >
                                                                    Code 3
                                                                </h5>
                                                            </Col>
                                                            <Col
                                                                md={8}
                                                                className="mr-auto"
                                                                style={{
                                                                    textAlign:
                                                                        "right"
                                                                }}
                                                            >
                                                                <Form
                                                                    onSubmit={
                                                                        this
                                                                            .handleAddDriverCode3Submit
                                                                    }
                                                                >
                                                                    <Row>
                                                                        <Col
                                                                            md={
                                                                                1
                                                                            }
                                                                        >
                                                                            <button
                                                                                className="mr-2"
                                                                                style={{
                                                                                    cursor:
                                                                                        "pointer"
                                                                                }}
                                                                                onSubmit={
                                                                                    this
                                                                                        .handleAddDriverCode3Submit
                                                                                }
                                                                            >
                                                                                <i
                                                                                    className="fa fa-plus"
                                                                                    onSubmit={
                                                                                        this
                                                                                            .handleAddDriverCode3Submit
                                                                                    }
                                                                                />
                                                                            </button>
                                                                        </Col>
                                                                        <Col className="my-auto ml-2">
                                                                            <Input
                                                                                bsSize="sm"
                                                                                name="code3_name"
                                                                                onChange={
                                                                                    this
                                                                                        .handleChange
                                                                                }
                                                                                value={
                                                                                    this
                                                                                        .state
                                                                                        .code3_name
                                                                                }
                                                                                readOnly={
                                                                                    false
                                                                                }
                                                                                placeholder="Enter new Bottombox Code 3"
                                                                                required
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Form>
                                                            </Col>
                                                        </Row>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.bb_driver_code3
                                                    .filter(
                                                        code3_filter_item =>
                                                            code3_filter_item.bb_Driver_Code2 ===
                                                            this.props.bbState
                                                                .code2.id
                                                    )
                                                    .map(code3_item => (
                                                        <tr key={code3_item.id}>
                                                            <td
                                                                style={
                                                                    this.props
                                                                        .bbState
                                                                        .code3
                                                                        .id ===
                                                                    code3_item.id
                                                                        ? {
                                                                              backgroundColor:
                                                                                  "gray"
                                                                          }
                                                                        : {
                                                                              backgroundColor:
                                                                                  "white"
                                                                          }
                                                                }
                                                            >
                                                                {/* CODE 3 BODY */}
                                                                <Row>
                                                                    {this.state
                                                                        .edit ? (
                                                                        this
                                                                            .state
                                                                            .code3
                                                                            .id ===
                                                                        code3_item.id ? (
                                                                            <Col
                                                                                md={
                                                                                    8
                                                                                }
                                                                            >
                                                                                <Form>
                                                                                    <InputGroup size="sm">
                                                                                        <InputGroupAddon addonType="prepend">
                                                                                            <i
                                                                                                onClick={() =>
                                                                                                    this.handleEdit(
                                                                                                        {
                                                                                                            type:
                                                                                                                "code3",
                                                                                                            ...code3_item
                                                                                                        }
                                                                                                    )
                                                                                                }
                                                                                                style={{
                                                                                                    color:
                                                                                                        "black",
                                                                                                    cursor:
                                                                                                        "pointer"
                                                                                                }}
                                                                                                className="fa fa-check-square fa-2x"
                                                                                                aria-hidden="true"
                                                                                            />
                                                                                        </InputGroupAddon>
                                                                                        <Input
                                                                                            bsSize="sm"
                                                                                            name="name"
                                                                                            onChange={
                                                                                                this
                                                                                                    .handleChange
                                                                                            }
                                                                                            value={
                                                                                                this
                                                                                                    .state
                                                                                                    .name
                                                                                            }
                                                                                            readOnly={
                                                                                                false
                                                                                            }
                                                                                            required
                                                                                        />
                                                                                    </InputGroup>
                                                                                </Form>
                                                                            </Col>
                                                                        ) : (
                                                                            <Col
                                                                                md={
                                                                                    8
                                                                                }
                                                                            >
                                                                                <span
                                                                                    onClick={() =>
                                                                                        this.handleClick(
                                                                                            {
                                                                                                type:
                                                                                                    "code3",
                                                                                                ...code3_item
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    style={{
                                                                                        cursor:
                                                                                            "pointer"
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        code3_item.name
                                                                                    }
                                                                                </span>
                                                                            </Col>
                                                                        )
                                                                    ) : (
                                                                        <Col
                                                                            md={
                                                                                8
                                                                            }
                                                                        >
                                                                            <span
                                                                                onClick={() =>
                                                                                    this.handleClick(
                                                                                        {
                                                                                            type:
                                                                                                "code3",
                                                                                            ...code3_item
                                                                                        }
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    cursor:
                                                                                        "pointer"
                                                                                }}
                                                                            >
                                                                                {
                                                                                    code3_item.name
                                                                                }
                                                                            </span>
                                                                        </Col>
                                                                    )}

                                                                    {/*HIDDEN BUTTONS  */}

                                                                    {!this.state
                                                                        .toggle ? (
                                                                        // HIDDEN - UNHIDE BUTTONS
                                                                        <Col>
                                                                            <span
                                                                                onClick={() =>
                                                                                    this.showButtons(
                                                                                        {
                                                                                            type:
                                                                                                "code3",
                                                                                            ...code3_item
                                                                                        }
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    float:
                                                                                        "right",
                                                                                    cursor:
                                                                                        "pointer"
                                                                                }}
                                                                            >
                                                                                <i
                                                                                    onClick={() =>
                                                                                        this.showButtons(
                                                                                            {
                                                                                                type:
                                                                                                    "code3",
                                                                                                ...code3_item
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    style={{
                                                                                        color:
                                                                                            "black",
                                                                                        cursor:
                                                                                            "pointer"
                                                                                    }}
                                                                                    className="fa fa-chevron-circle-left fa-lg icon"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </span>
                                                                        </Col>
                                                                    ) : this
                                                                          .state
                                                                          .code3
                                                                          .id ===
                                                                      code3_item.id ? (
                                                                        //   VISIBLE BUTTONS - HIDE/ DELETE/ EDIT BUTTONS
                                                                        <Col className="my-auto">
                                                                            <Fragment>
                                                                                <span
                                                                                    style={{
                                                                                        float:
                                                                                            "right"
                                                                                    }}
                                                                                >
                                                                                    <i
                                                                                        onClick={() =>
                                                                                            this.hideButtons(
                                                                                                {
                                                                                                    type:
                                                                                                        "code3",
                                                                                                    ...code3_item
                                                                                                }
                                                                                            )
                                                                                        }
                                                                                        style={{
                                                                                            color:
                                                                                                "black",
                                                                                            cursor:
                                                                                                "pointer"
                                                                                        }}
                                                                                        className="fa fa-chevron-circle-right fa-lg icon"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                                <span
                                                                                    style={{
                                                                                        float:
                                                                                            "right"
                                                                                    }}
                                                                                >
                                                                                    <i
                                                                                        onClick={() =>
                                                                                            this.editOn(
                                                                                                {
                                                                                                    type:
                                                                                                        "code3",
                                                                                                    ...code3_item
                                                                                                }
                                                                                            )
                                                                                        }
                                                                                        style={{
                                                                                            color:
                                                                                                "black",
                                                                                            cursor:
                                                                                                "pointer"
                                                                                        }}
                                                                                        className="fa fa-edit fa-lg icon"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                                <span
                                                                                    style={{
                                                                                        float:
                                                                                            "right"
                                                                                    }}
                                                                                >
                                                                                    <i
                                                                                        onClick={() =>
                                                                                            this.handleDelete(
                                                                                                {
                                                                                                    type:
                                                                                                        "code3",
                                                                                                    ...code3_item
                                                                                                }
                                                                                            )
                                                                                        }
                                                                                        style={{
                                                                                            color:
                                                                                                "black",
                                                                                            cursor:
                                                                                                "pointer"
                                                                                        }}
                                                                                        className="fa fa-minus-circle fa-lg mr-1 icon"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                            </Fragment>
                                                                        </Col>
                                                                    ) : (
                                                                        // HIDDEN - UNHIDE BUTTONS
                                                                        <Col>
                                                                            <span
                                                                                onClick={() =>
                                                                                    this.showButtons(
                                                                                        {
                                                                                            type:
                                                                                                "code3",
                                                                                            ...code3_item
                                                                                        }
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    float:
                                                                                        "right",
                                                                                    cursor:
                                                                                        "pointer"
                                                                                }}
                                                                            >
                                                                                <i
                                                                                    onClick={() =>
                                                                                        this.showButtons(
                                                                                            {
                                                                                                type:
                                                                                                    "code3",
                                                                                                ...code3_item
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    style={{
                                                                                        color:
                                                                                            "black",
                                                                                        cursor:
                                                                                            "pointer"
                                                                                    }}
                                                                                    className="fa fa-chevron-circle-left fa-lg"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            </span>
                                                                        </Col>
                                                                    )}
                                                                </Row>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </Table>
                                    </Col>
                                )}
                            </Row>
                        </CardBody>
                    </Card>
                </Fade>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    dsat_code1: state.surveys.dsat_code1,
    bb_driver_code2: state.surveys.bb_driver_code2,
    bb_driver_code3: state.surveys.bb_driver_code3,
    bbState: state.surveys.bbState,
    rcas: state.surveys.rcas
});

export default connect(mapStateToProps, {
    addDsatCode1,
    addBbDriverCode2,
    addBbDriverCode3,
    deleteDsatCode1,
    updateDsatCode1,
    updateBbDriverCode2,
    updateBBDriverState,
    deleteBbDriverCode2,
    deleteBbDriverCode3,
    updateBbDriverCode3
})(BottomboxDrivers);
