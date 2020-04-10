import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import { Form, Button, Col, FormGroup, Label, Input } from "reactstrap";

import { Typeahead } from "react-bootstrap-typeahead";

import FormInput from "./FormInput";

import { updateRca } from "../../../../actions/surveyActions";

import ConfirmRcaSubmitModal from "../../../ccms/components/CcmsRca/ConfirmRcaSubmitModal";

class RcaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rca: { ...props.cellData },
            modal: false,
        };
    }

    handleChange = (e) => {
        let rca = this.state.rca;

        const { value, name } = e.target;

        rca[name] = value;

        if (this.selectList.includes(name)) {
            rca[name] = this.props[name][value];
        }

        this.setState({ rca });
    };

    handleCheckbox = (event) => {
        let rca = this.state.rca;
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        rca[name] = value;

        this.setState({
            rca,
        });
    };

    selectList = [
        "support_silo_issue_based",
        "controllability",
        "accountable_team",
        "q1_answer",
        "contacted_customer",
    ];

    filteredDriverList = (driverName, selectedData, tableName) => {
        if (
            tableName === "bb_driver_code2" ||
            tableName === "bb_driver_code3"
        ) {
            return driverName.filter((item) => {
                if (selectedData.dsat_code1 && selectedData.bb_driver_code2) {
                    return (
                        item.bb_Driver_Code2 == selectedData.bb_driver_code2.id
                    );
                } else if (selectedData.dsat_code1) {
                    return item.dsat_Code1 == selectedData.dsat_code1.id;
                }
            });
        }

        return driverName;
    };

    exemptions = ["bb_driver_code2", "bb_driver_code3"];

    typeaheadProps = (col) => ({
        bsSize: "sm",
        labelKey: "name",
        onChange: (selected) => {
            let rca = { ...this.state.rca };

            rca[col] = selected[0];

            if (col === "dsat_code1" && !selected[0]) {
                rca.bb_driver_code2 = null;
                rca.bb_driver_code3 = null;
            } else if (col === "bb_driver_code2" && !selected[0]) {
                rca.bb_driver_code3 = null;
            }
            return this.setState({ rca });
        },
        id: "id_rca_" + col,
        options: !this.exemptions.includes(col)
            ? this.props[col]
            : this.filteredDriverList(this.props[col], this.state.rca, col),
        selected: this.state.rca[col]
            ? this.exemptions.includes(col) && !this.state.rca.dsat_code1
                ? []
                : [this.state.rca[col]]
            : [],
        placeholder: "Select...",
        selectHintOnEnter: true,
        clearButton: true,
        name: col,
    });

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            modal: true,
        });
    };

    destructValues = (param) => (param.name ? param.name : param);

    parentCallback = (childData) => {
        const { updateRca } = this.props;

        const {
            q1_answer,
            contacted_customer,
            controllability,
        } = this.state.rca;

        let rca = { ...this.state.rca };

        rca["q1_answer"] = this.destructValues(q1_answer);
        rca["contacted_customer"] = this.destructValues(contacted_customer);
        rca["controllability"] = this.destructValues(controllability);

        console.log(childData);

        if (childData === "Yes") {
            // Save RCA
            // complete_ccms_rca(rca);

            rca["user"] = this.props.user;

            console.log(rca);

            updateRca(rca);
        }

        this.toggle();
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    render() {
        const { cellData } = this.props;

        const { rca, modal } = this.state;

        return (
            <Fragment>
                <ConfirmRcaSubmitModal
                    modal={modal}
                    toggle={this.toggle}
                    parentCallback={this.parentCallback}
                    ccms_rca={rca}
                />
                <Form autoComplete="off" onSubmit={this.handleSubmit}>
                    <h5>RCA Form</h5>

                    {Object.keys(cellData.agent.user).map((key, index) => {
                        if (key === "first_name") {
                            return (
                                <FormInput
                                    key={index}
                                    type="text"
                                    objKey="owner_fullname"
                                    index={index}
                                    inputValue={`${cellData.agent.user[key]} ${cellData.agent.user["last_name"]}`}
                                    disabled={true}
                                    onChange={this.handleChange}
                                />
                            );
                        }
                        if (["username"].includes(key)) {
                            return (
                                <FormInput
                                    key={index}
                                    type="text"
                                    objKey={key}
                                    index={index}
                                    inputValue={cellData.agent.user[key]}
                                    disabled={true}
                                    onChange={this.handleChange}
                                />
                            );
                        }
                    })}

                    {Object.keys(cellData.agent).map((key, index) => {
                        if (
                            ["operator_lan_id", "location", "wave"].includes(
                                key
                            )
                        ) {
                            return (
                                <FormInput
                                    key={index}
                                    type="text"
                                    objKey={key}
                                    index={index}
                                    inputValue={cellData.agent[key]}
                                    disabled={true}
                                    onChange={this.handleChange}
                                />
                            );
                        }
                    })}

                    {cellData.agent.teams.length
                        ? cellData.agent.teams.map((team) =>
                              Object.keys(team).map((key, index) => {
                                  if (key === "team_lead") {
                                      return (
                                          <FormInput
                                              key={index}
                                              type="text"
                                              objKey={key}
                                              index={index}
                                              inputValue={
                                                  team[key] ? team[key] : ""
                                              }
                                              disabled={true}
                                              onChange={this.handleChange}
                                          />
                                      );
                                  }

                                  if (key === "agent_skill") {
                                      return (
                                          <FormInput
                                              key={index}
                                              type="text"
                                              objKey="agent_skill"
                                              index={index}
                                              inputValue={team.agent_skill.name}
                                              disabled={true}
                                              onChange={this.handleChange}
                                          />
                                      );
                                  }
                              })
                          )
                        : // Object.keys(cellData.agent.teams[0].team).map(
                          //       (key, index) => {
                          //           if (key === "team_lead") {
                          //               return (
                          //                   <FormInput
                          //                       key={index}
                          //                       type="text"
                          //                       objKey={key}
                          //                       index={index}
                          //                       inputValue={
                          //                           cellData.agent.teams[0].team[
                          //                               key
                          //                           ]
                          //                               ? cellData.agent.teams[0]
                          //                                     .team[key]
                          //                               : "Not Set"
                          //                       }
                          //                       disabled={true}
                          //                       onChange={this.handleChange}
                          //                   />
                          //               );
                          //           }

                          //           if (key === "agent_skill") {
                          //               return (
                          //                   <FormInput
                          //                       key={index}
                          //                       type="text"
                          //                       objKey="agent_skill"
                          //                       index={index}
                          //                       inputValue={
                          //                           cellData.agent.teams[0].team
                          //                               .agent_skill.name
                          //                       }
                          //                       disabled={true}
                          //                       onChange={this.handleChange}
                          //                   />
                          //               );
                          //           }
                          //       }
                          //   )
                          null}

                    {Object.keys(this.state.rca).map((key, index) => {
                        if (
                            ![
                                "surveyed_ticket",
                                "agent",
                                "id",
                                "coaching",
                                "completed_by",
                                "date_completed",
                                "dsat_code1",
                                "bb_driver_code2",
                                "bb_driver_code3",
                                ...this.selectList,
                            ].includes(key)
                        ) {
                            return (
                                <FormInput
                                    key={index}
                                    type="text"
                                    objKey={key}
                                    index={index}
                                    inputValue={
                                        this.state.rca[key]
                                            ? this.state.rca[key]
                                            : ""
                                    }
                                    disabled={false}
                                    onChange={this.handleChange}
                                />
                            );
                        }
                    })}

                    <FormGroup size="sm">
                        <Label for="id_rca_dsat_code1">DSAT Code 1</Label>

                        <Typeahead
                            {...this.typeaheadProps("dsat_code1")}
                            inputProps={{ required: true }}
                        />
                    </FormGroup>

                    <FormGroup size="sm">
                        <Label for="id_rca_bb_driver_code2">
                            Bottombox Driver 2
                        </Label>

                        <Typeahead
                            {...this.typeaheadProps("bb_driver_code2")}
                            inputProps={{
                                required: true,
                            }}
                            disabled={!rca.dsat_code1}
                        />
                    </FormGroup>

                    <FormGroup size="sm">
                        <Label for="id_rca_bb_driver_code3">
                            Bottombox Driver 3
                        </Label>

                        <Typeahead
                            {...this.typeaheadProps("bb_driver_code3")}
                            inputProps={{
                                required: true,
                            }}
                            disabled={!rca.bb_driver_code2 || !rca.dsat_code1}
                        />
                    </FormGroup>

                    {Object.keys(this.state.rca).map((key, index) => {
                        if (this.selectList.includes(key)) {
                            return (
                                <FormInput
                                    key={index}
                                    type="select"
                                    objKey={key}
                                    index={index}
                                    inputValue={
                                        this.state.rca[key]
                                            ? this.state.rca[key]
                                            : ""
                                    }
                                    disabled={false}
                                    onChange={this.handleChange}
                                    options={this.props[key]}
                                />
                            );
                        }
                    })}
                    <FormGroup row>
                        <Label for={`id_coaching`}>Coaching done? </Label>
                        <Col className="ml-2">
                            <Input
                                type="checkbox"
                                name="coaching"
                                id="id_coaching"
                                checked={this.state.rca.coaching}
                                onChange={this.handleCheckbox}
                            />
                        </Col>
                    </FormGroup>
                    {rca.date_completed ? (
                        <Button color="success">
                            <i className="fas fa-pen mr-1"></i>Update RCA
                        </Button>
                    ) : (
                        <Button color="primary">
                            <i className="fas fa-paper-plane mr-1"></i>
                            Complete RCA
                        </Button>
                    )}
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    support_silo_issue_based: state.surveys.agent_skills,
    controllability: [
        { id: 1, name: "ITSD Controllable" },
        { id: 2, name: "Non ITSD Controllable" },
    ],
    q1_answer: [
        { id: 1, name: "Yes" },
        { id: 2, name: "No" },
    ],
    contacted_customer: [
        { id: 1, name: "Yes" },
        { id: 2, name: "No" },
    ],
    accountable_team: state.surveys.csat_accountable_team,
    dsat_code1: state.surveys.dsat_code1,
    bb_driver_code2: state.surveys.bb_driver_code2,
    bb_driver_code3: state.surveys.bb_driver_code3,
    user: state.auth.user,
});

export default connect(mapStateToProps, { updateRca })(RcaForm);
